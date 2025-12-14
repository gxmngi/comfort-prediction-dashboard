// components/dashboard/PredictionCard.jsx
import { useState } from "react";

export default function PredictionCard({
  deviceId,
  deviceList,
  onDeviceChange,
}) {
  const [isTestDiscomfort, setIsTestDiscomfort] = useState(false);

  const prediction = isTestDiscomfort
    ? {
      levelText: "Discomfortable",
      levelStatus: "Comfort Level",
      bpm: 128,
      spo2: 98,
      recommendation:
        "Your comfort level is low. Please check your environment or take a break.",
    }
    : {
      levelText: "Comfortable",
      levelStatus: "Comfort Level",
      bpm: 128,
      spo2: 98,
      recommendation:
        "Keep monitoring your comfort level. Your vitals are in excellent condition. Continue your current routine.",
    };

  // Styles based on state
  const theme = isTestDiscomfort
    ? {
      containerBg: "bg-[#008C95]", // Keep teal container
      cardBorder: "border-4 border-rose-300", // Thick pink border
      iconColor: "text-[#A63C3C]", // Dark red/brown
      textColor: "text-[#A63C3C]",
      subTextColor: "text-rose-400",
      icon: "😫",
    }
    : {
      containerBg: "bg-[#008C95]",
      cardBorder: "border-transparent",
      iconColor: "text-emerald-500",
      textColor: "text-emerald-500",
      subTextColor: "text-[#008C95]",
      icon: "😊",
    };

  return (
    <section className="flex flex-col flex-1 bg-[#FFD8A3] rounded-3xl p-6 md:p-8 gap-6 shadow-sm relative">
      {/* Test Toggle Button */}
      <button
        onClick={() => setIsTestDiscomfort(!isTestDiscomfort)}
        className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-[#A63C3C] text-xs font-bold px-2 py-1 rounded z-10"
      >
        {isTestDiscomfort ? "Reset Test" : "Test Discomfort"}
      </button>

      {/* Header & Device Selection */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3 bg-[#008C95] px-4 py-2 rounded-lg shadow-md">
          <span className="text-xs font-bold text-white uppercase tracking-wide">
            Wearable Device
          </span>
          <select
            className="bg-white text-[#008C95] text-sm font-bold rounded px-2 py-1 outline-none cursor-pointer"
            value={deviceId}
            onChange={(e) => onDeviceChange(e.target.value)}
          >
            {deviceList.map((dev, i) => (
              <option key={i} value={dev}>
                {dev}
              </option>
            ))}
          </select>
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>
      </div>

      {/* Teal Card Container */}
      <div className={`${theme.containerBg} rounded-3xl p-6 md:p-8 flex flex-col gap-6 shadow-inner flex-1`}>
        <h2 className="text-xl font-bold text-white">Prediction Result</h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
          {/* LEFT: Comfort Level */}
          <div className={`bg-white rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center gap-4 ${theme.cardBorder}`}>
            <p className={`text-sm font-bold uppercase tracking-wide ${isTestDiscomfort ? "text-[#A63C3C]" : "text-[#008C95]"}`}>
              {prediction.levelStatus}
            </p>
            <div className={`text-7xl drop-shadow-sm ${theme.iconColor}`}>{theme.icon}</div>
            <p className={`text-2xl font-bold ${theme.textColor}`}>
              {prediction.levelText}
            </p>
          </div>

          {/* CENTER: Vitals */}
          <div className="flex flex-col gap-6">
            {/* Heart Rate */}
            <div className={`bg-white rounded-2xl p-6 shadow-lg flex items-center justify-between flex-1 ${theme.cardBorder}`}>
              <div className={`text-5xl ${isTestDiscomfort ? "text-[#A63C3C]" : "text-rose-600"}`}>❤️</div>
              <div className="flex flex-col items-end">
                <span className={`text-4xl font-bold ${isTestDiscomfort ? "text-[#A63C3C]" : "text-rose-600"}`}>
                  {prediction.bpm} <span className="text-lg text-slate-400">BPM</span>
                </span>
              </div>
            </div>

            {/* SpO2 */}
            <div className={`bg-white rounded-2xl p-6 shadow-lg flex items-center justify-between flex-1 ${theme.cardBorder}`}>
              <div className={`text-5xl ${isTestDiscomfort ? "text-sky-600" : "text-sky-500"}`}>💧</div>
              <div className="flex flex-col items-end">
                <span className={`text-4xl font-bold ${isTestDiscomfort ? "text-sky-600" : "text-sky-500"}`}>
                  {prediction.spo2}<span className="text-2xl">%</span>
                </span>
                <span className="text-xs text-slate-400 uppercase tracking-wider font-medium">
                  SpO₂
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Recommendation */}
          <div className={`bg-white rounded-2xl p-6 shadow-lg flex flex-col gap-4 ${theme.cardBorder} md:col-span-2 lg:col-span-1`}>
            <h3 className={`font-bold text-lg ${isTestDiscomfort ? "text-[#A63C3C]" : "text-[#008C95]"}`}>Recommendation</h3>
            <div className="flex-1 flex items-center">
              <p className={`leading-relaxed font-medium text-lg ${isTestDiscomfort ? "text-[#A63C3C]" : "text-slate-600"}`}>
                "{prediction.recommendation}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
