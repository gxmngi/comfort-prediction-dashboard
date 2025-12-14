// app/dashboard/history/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";

export default function PredictionHistoryPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

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

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Loading prediction history...</p>
      </main>
    );
  }

  return (
    <div className="h-screen w-full overflow-hidden flex bg-[#008C95] text-slate-900">
      <Sidebar />

      <main className="flex-1 flex flex-col p-4 md:p-8 overflow-hidden h-full">
        <TopBar userName={user.name} userImage={user.image} onLogout={handleLogout} />

        <div className="bg-white rounded-2xl md:rounded-[2.5rem] p-4 md:p-8 flex flex-col gap-6 md:gap-8 shadow-xl min-h-[calc(100vh-8rem)] items-center justify-center">
          <h1 className="text-xl font-semibold text-slate-800 mb-2">
            Prediction History
          </h1>
          <p className="text-sm text-slate-500 text-center">
            This page will show your past comfort predictions.
            <br />
            (Coming soon)
          </p>
        </div>
      </main>
    </div>
  );
}
