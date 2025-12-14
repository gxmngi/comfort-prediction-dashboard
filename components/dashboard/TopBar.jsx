// components/dashboard/TopBar.jsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TopBar({ userName, userImage, onLogout }) {
  const [now, setNow] = useState(new Date());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Update every minute
    const id = setInterval(() => {
      setNow(new Date());
    }, 60_000);

    // Initial set
    setNow(new Date());

    return () => clearInterval(id);
  }, []);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = String(now.getDate()).padStart(2, "0");
  const month = months[now.getMonth()];
  const year = now.getFullYear();

  const dateStr = `${year}, ${day} ${month}`;
  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <header className="flex items-center justify-between mb-8 text-white relative z-50">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>

        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-3 text-sm text-white/80 mt-1">
            <span>{dateStr}</span>
            <span className="w-1 h-1 rounded-full bg-white/50" />
            <span>{timeStr}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative">
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-3 hover:bg-white/10 p-2 rounded-xl transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold backdrop-blur-sm overflow-hidden border border-white/30">
              {userImage ? (
                <img
                  src={userImage}
                  alt={userName}
                  className="w-full h-full object-cover"
                />
              ) : (
                userName ? userName.charAt(0).toUpperCase() : "U"
              )}
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-sm font-semibold">
                {userName || "Username"}
              </span>
              <span className="text-xs text-white/70">User</span>
            </div>
            {/* Arrow Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-4 h-4 transition-transform ${isUserMenuOpen ? "rotate-180" : ""}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isUserMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl overflow-hidden text-slate-700 animate-in fade-in slide-in-from-top-2 z-50">
              <Link
                href="/dashboard/profile"
                className="flex items-center gap-2 px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-100"
                onClick={() => setIsUserMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Settings
              </Link>
              <button
                onClick={() => {
                  setIsUserMenuOpen(false);
                  onLogout();
                }}
                className="w-full flex items-center gap-2 px-4 py-3 hover:bg-red-50 text-red-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                </svg>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#007A82] rounded-xl shadow-xl mt-2 p-4 flex flex-col gap-2 md:hidden border border-white/10">
          <Link
            href="/dashboard"
            className={`p-3 rounded-lg font-semibold ${pathname === "/dashboard"
              ? "bg-white text-[#008C95]"
              : "text-white hover:bg-white/10"
              }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/dashboard/history"
            className={`p-3 rounded-lg font-semibold ${pathname.startsWith("/dashboard/history")
              ? "bg-white text-[#008C95]"
              : "text-white hover:bg-white/10"
              }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Prediction History
          </Link>
          <Link
            href="/dashboard/profile"
            className={`p-3 rounded-lg font-semibold ${pathname.startsWith("/dashboard/profile")
              ? "bg-white text-[#008C95]"
              : "text-white hover:bg-white/10"
              }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Profile
          </Link>
        </div>
      )}
    </header>
  );
}
