// app/layout.js
import "./globals.css";
import { Prompt } from "next/font/google";

const prompt = Prompt({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "ComfortSense Dashboard",
  description: "Comfort web app for comfort monitoring",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={prompt.className}>{children}</body>
    </html>
  );
}
