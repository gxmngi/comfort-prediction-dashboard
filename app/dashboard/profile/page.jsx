// app/dashboard/profile/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        gender: "Male",
        bmiCategory: "Normalweight",
        allergy: "",
    });

    useEffect(() => {
        async function fetchMe() {
            try {
                const res = await fetch("/api/auth/me");
                if (!res.ok) {
                    router.push("/login");
                    return;
                }
                const data = await res.json();
                setUser(data.user);
                setFormData({
                    name: data.user.name || "",
                    age: data.user.age || "",
                    gender: data.user.gender || "Male",
                    bmiCategory: data.user.bmiCategory || "Normalweight",
                    allergy: data.user.allergy || "",
                });
            } catch (err) {
                console.error(err);
                router.push("/login");
            } finally {
                setLoading(false);
            }
        }

        fetchMe();
    }, [router]);

    async function handleLogout() {
        try {
            await fetch("/api/auth/logout", { method: "POST" });
            router.push("/login");
        } catch (err) {
            console.error(err);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/user/update", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Failed to update profile");

            const data = await res.json();
            setUser(data.user);
            alert("Profile updated successfully!");
        } catch (err) {
            console.error(err);
            alert("Error updating profile");
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const data = new FormData();
        data.append("file", file);

        try {
            const res = await fetch("/api/user/upload-avatar", {
                method: "POST",
                body: data,
            });

            if (!res.ok) throw new Error("Failed to upload avatar");

            const result = await res.json();
            setUser(result.user); // Update user state with new image URL
            alert("Avatar updated!");
        } catch (err) {
            console.error(err);
            alert("Error uploading avatar");
        }
    };

    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-[#008C95] text-white">
                <p>Loading profile...</p>
            </main>
        );
    }

    return (
        <div className="min-h-screen flex bg-[#008C95] text-slate-900 font-sans">
            <Sidebar />

            <main className="flex-1 flex flex-col p-4 md:p-8 overflow-y-auto h-screen">
                <TopBar userName={user?.name} userImage={user?.image} onLogout={handleLogout} />


                <div className="bg-white rounded-2xl md:rounded-[2.5rem] p-6 md:p-10 flex flex-col gap-8 shadow-xl min-h-[calc(100vh-8rem)] max-w-4xl mx-auto w-full">
                    <h2 className="text-2xl font-bold text-[#008C95]">Profile Settings</h2>


                    <form onSubmit={handleSave} className="flex flex-col gap-8">
                        {/* Avatar Section */}
                        <div className="flex flex-col items-center gap-4">
                            <div className="relative group cursor-pointer">
                                <label htmlFor="avatar-upload" className="cursor-pointer">
                                    <div className="w-32 h-32 rounded-full bg-slate-200 flex items-center justify-center text-4xl text-slate-400 overflow-hidden border-4 border-white shadow-md relative">
                                        {user?.image ? (
                                            <img
                                                src={user.image}
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            user?.name?.charAt(0).toUpperCase() || "U"
                                        )}
                                    </div>
                                    <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="text-white text-sm font-semibold">
                                            Change
                                        </span>
                                    </div>
                                </label>
                                <input
                                    id="avatar-upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </div>
                            <p className="text-sm text-slate-500">Click to upload new photo</p>
                        </div>

                        {/* Form Fields Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-slate-700">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#008C95]/50 bg-slate-50"
                                    placeholder="Enter your name"
                                />
                            </div>

                            {/* Age */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-slate-700">Age</label>
                                <input
                                    type="number"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    className="p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#008C95]/50 bg-slate-50"
                                    placeholder="Enter your age"
                                />
                            </div>

                            {/* Gender */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-slate-700">Gender</label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#008C95]/50 bg-slate-50 cursor-pointer"
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            {/* BMI Category */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-slate-700">BMI Category</label>
                                <select
                                    name="bmiCategory"
                                    value={formData.bmiCategory}
                                    onChange={handleChange}
                                    className="p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#008C95]/50 bg-slate-50 cursor-pointer"
                                >
                                    <option value="Underweight">Underweight</option>
                                    <option value="Normalweight">Normalweight</option>
                                    <option value="Overweight">Overweight</option>
                                    <option value="Obese">Obese</option>
                                </select>
                            </div>

                            {/* Allergy */}
                            <div className="flex flex-col gap-2 md:col-span-2">
                                <label className="text-sm font-bold text-slate-700">Allergies</label>
                                <input
                                    type="text"
                                    name="allergy"
                                    value={formData.allergy}
                                    onChange={handleChange}
                                    className="p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#008C95]/50 bg-slate-50"
                                    placeholder="e.g. Peanuts, Pollen (Leave empty if none)"
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-end gap-4 mt-4">
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="px-6 py-2 rounded-xl text-slate-500 font-semibold hover:bg-slate-100 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-8 py-3 rounded-xl bg-[#008C95] text-white font-bold shadow-lg hover:bg-[#007A82] transition-colors"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
