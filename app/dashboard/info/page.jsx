"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";

export default function PersonalInfoPage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

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

    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-[#F8FAFC] text-slate-400">
                <p>Loading...</p>
            </main>
        );
    }

    // Helper for clean data rows
    const InfoRow = ({ label, value }) => (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-slate-100 last:border-0">
            <span className="text-sm font-medium text-slate-500 uppercase tracking-wide">{label}</span>
            <span className="text-lg font-semibold text-slate-800 mt-1 sm:mt-0">{value || "-"}</span>
        </div>
    );

    return (
        <div className="h-screen w-full overflow-hidden flex bg-[#008C95] text-slate-900 font-sans">
            <Sidebar />

            <main className="flex-1 flex flex-col p-4 md:p-8 overflow-hidden h-full">
                <TopBar userName={user?.name} userImage={user?.image} onLogout={handleLogout} />

                <div className="bg-white rounded-2xl md:rounded-[2.5rem] p-6 md:p-10 flex flex-col gap-8 shadow-xl min-h-[calc(100vh-8rem)] items-center">
                    {/* Header Section */}
                    <div className="flex flex-col items-center">
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full shadow-xl bg-white p-1 mb-6">
                            <div className="w-full h-full rounded-full overflow-hidden bg-slate-100">
                                {user?.image ? (
                                    <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-300 font-bold text-5xl">
                                        {user?.name?.charAt(0).toUpperCase() || "U"}
                                    </div>
                                )}
                            </div>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{user?.name}</h1>
                        <p className="text-slate-500 text-lg">Personal Profile</p>
                    </div>

                    {/* Clean Info List */}
                    <div className="w-full max-w-2xl bg-slate-50 rounded-3xl p-8">
                        <div className="space-y-2">
                            <InfoRow label="Full Name" value={user?.name} />
                            <InfoRow label="Age" value={user?.age ? `${user.age} Years` : null} />
                            <InfoRow label="Gender" value={user?.gender} />
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-slate-200 last:border-0">
                                <span className="text-sm font-medium text-slate-500 uppercase tracking-wide">BMI Category</span>
                                <span className={`text-lg font-semibold mt-1 sm:mt-0 px-3 py-1 rounded-full text-sm inline-block
                                        ${user?.bmiCategory === 'Normalweight' ? 'bg-emerald-100 text-emerald-700' :
                                        user?.bmiCategory === 'Overweight' ? 'bg-yellow-100 text-yellow-700' :
                                            user?.bmiCategory === 'Obese' ? 'bg-red-100 text-red-700' :
                                                'bg-slate-200 text-slate-600'}`}>
                                    {user?.bmiCategory || "-"}
                                </span>
                            </div>
                            <InfoRow label="Allergies" value={user?.allergy} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
