// app/register/page.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [bmiCategory, setBmiCategory] = useState("Normal weight");
  const [allergy, setAllergy] = useState("No");
  const [deviceId, setDeviceId] = useState("EMO-00001");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
          age: age ? Number(age) : undefined,
          gender,
          bmiCategory,
          allergy,
          deviceId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Register failed");
        setLoading(false);
        return;
      }

      router.push("/login");
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-md border border-gray-300 bg-[#F7FBFC] px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#008C95]/60 focus:border-[#008C95]";

  const labelClass =
    "block text-xs font-semibold text-gray-700 mb-1";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#008C95]">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl px-10 py-10">
        <h1 className="text-2xl font-semibold mb-6 text-center text-[#008C95]">
          Create an Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Name</label>
              <input
                type="text"
                className={inputClass}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                className={inputClass}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className={labelClass}>Password</label>
              <input
                type="password"
                className={inputClass}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label className={labelClass}>Role</label>
              <select
                className={inputClass}
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="user">User</option>
                <option value="researcher">Researcher</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Age</label>
              <input
                type="number"
                className={inputClass}
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Age"
              />
            </div>

            <div>
              <label className={labelClass}>Gender</label>
              <select
                className={inputClass}
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>BMI Category</label>
              <input
                type="text"
                className={inputClass}
                value={bmiCategory}
                onChange={(e) => setBmiCategory(e.target.value)}
                placeholder="Normal weight"
              />
            </div>

            <div>
              <label className={labelClass}>Allergy</label>
              <input
                type="text"
                className={inputClass}
                value={allergy}
                onChange={(e) => setAllergy(e.target.value)}
                placeholder="No / detail"
              />
            </div>

            <div>
              <label className={labelClass}>Wearable Device ID</label>
              <input
                type="text"
                className={inputClass}
                value={deviceId}
                onChange={(e) => setDeviceId(e.target.value)}
                placeholder="EMO-00001"
              />
            </div>
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full py-2 rounded-md bg-[#008C95] text-white font-semibold hover:bg-[#007580] disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="mt-5 text-xs text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="font-semibold text-[#008C95]">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
