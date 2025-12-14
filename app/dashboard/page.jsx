// app/dashboard/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import PredictionCard from "@/components/dashboard/PredictionCard";

export default function DashboardPage() {
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

  // ฟังก์ชันเวลาเปลี่ยน wearable device จาก dropdown
  async function handleDeviceChange(newDeviceId) {
    try {
      // เรียก API เพื่ออัปเดต selectedDevice ใน DB (ถ้าคุณสร้าง route นี้แล้ว)
      await fetch("/api/device/select", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deviceId: newDeviceId }),
      });

      // อัปเดต state ฝั่งหน้าเว็บ
      setUser((prev) =>
        prev
          ? {
            ...prev,
            selectedDevice: newDeviceId,
          }
          : prev
      );
    } catch (err) {
      console.error("Change device error:", err);
    }
  }

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Loading dashboard...</p>
      </main>
    );
  }

  // เตรียม list ของ wearable device
  const deviceList =
    (user.deviceList && user.deviceList.length > 0 && user.deviceList) ||
    (user.deviceId ? [user.deviceId] : ["EMO-00000"]);

  // ค่า device ปัจจุบันที่เลือกอยู่
  const currentDeviceId =
    user.selectedDevice || deviceList[0] || "EMO-00000";

  return (
    <div className="h-screen w-full overflow-hidden flex bg-[#008C95] text-slate-900 font-sans">
      <Sidebar />

      <main className="flex-1 flex flex-col p-4 md:p-8 overflow-hidden h-full">
        <TopBar userName={user.name} userImage={user.image} onLogout={handleLogout} />

        <div className="bg-white rounded-2xl md:rounded-[2.5rem] p-4 md:p-8 flex flex-col gap-6 md:gap-8 shadow-xl min-h-[calc(100vh-8rem)]">
          <PredictionCard
            deviceId={currentDeviceId}
            deviceList={deviceList}
            onDeviceChange={handleDeviceChange}
          />
        </div>
      </main>
    </div>
  );
}
