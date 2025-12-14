// components/dashboard/PersonalInfoSection.jsx

function InfoCard({ label, value }) {
  return (
    <div className="bg-[#D9F5F6] p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center gap-1 transition-transform hover:scale-105">
      <span className="text-xs font-bold text-[#006F77] uppercase tracking-wider">
        {label}
      </span>
      <span className="text-lg md:text-xl font-bold text-[#004D53] truncate w-full">
        {value || "-"}
      </span>
    </div>
  );
}

export default function PersonalInfoSection({ user }) {
  return (
    <section>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
        <InfoCard label="Name" value={user.name} />
        <InfoCard label="Age" value={user.age ? `${user.age} Years` : "-"} />
        <InfoCard label="Gender" value={user.gender} />
        <InfoCard label="BMI" value={user.bmiCategory} />
        <InfoCard label="Allergy" value={user.allergy} />
      </div>
    </section>
  );
}
