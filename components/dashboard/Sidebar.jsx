// components/dashboard/Sidebar.jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const isHome = pathname === "/dashboard";
  const isHistory = pathname.startsWith("/dashboard/history");

  const baseItem =
    "w-full text-left rounded-full py-2 px-4 text-sm transition";

  return (
    <aside className="w-64 flex flex-col py-8 px-6 gap-8 hidden md:flex h-screen sticky top-0 text-white">
      {/* University logo top */}
      <div className="w-full py-4 flex items-center justify-center bg-white rounded-xl shadow-sm">
        <img
          src="/university-logo.png"
          alt="University Logo"
          className="h-12 object-contain"
        />
      </div>

      {/* Logo text */}
      <div className="text-left">
        <div className="text-2xl font-bold leading-tight tracking-tight text-[#FFD8A3]">
          Comfort
          <span className="text-white">.</span>
          <br />
          Prediction
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 text-sm font-medium">
        {/* Home */}
        <Link
          href="/dashboard"
          className={
            baseItem +
            " " +
            (isHome
              ? "bg-white text-[#008C95] font-bold shadow-sm"
              : "text-white/80 hover:bg-white/10 hover:text-white")
          }
        >
          Home
        </Link>

        {/* Personal Information */}
        <Link
          href="/dashboard/info"
          className={
            baseItem +
            " " +
            (pathname.startsWith("/dashboard/info")
              ? "bg-white text-[#008C95] font-bold shadow-sm"
              : "text-white/80 hover:bg-white/10 hover:text-white")
          }
        >
          Personal Information
        </Link>

        {/* Prediction History */}
        <Link
          href="/dashboard/history"
          className={
            baseItem +
            " " +
            (isHistory
              ? "bg-white text-[#008C95] font-bold shadow-sm"
              : "text-white/80 hover:bg-white/10 hover:text-white")
          }
        >
          Prediction History
        </Link>


      </nav>
    </aside>
  );
}
