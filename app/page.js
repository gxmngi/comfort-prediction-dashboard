// app/page.js
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-semibold">ComfortSense Web</h1>
      <p className="text-sm text-gray-600">
        Prototype dashboard for indoor comfort monitoring.
      </p>
      <Link
        href="/login"
        className="px-4 py-2 rounded-md bg-slate-900 text-white text-sm"
      >
        Go to Login
      </Link>
    </main>
  );
}
