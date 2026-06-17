import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alex Morgan — Full-Stack Developer & Designer",
  description:
    "Personal portfolio of Alex Morgan — crafting beautiful, performant web experiences with modern technologies.",
  keywords: [
    "portfolio",
    "full-stack developer",
    "designer",
    "Next.js",
    "TypeScript",
    "React",
  ],
  authors: [{ name: "Alex Morgan" }],
  openGraph: {
    title: "Alex Morgan — Full-Stack Developer & Designer",
    description:
      "Personal portfolio showcasing projects, skills, and experience in modern web development.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body
        className={`${inter.variable} font-sans bg-[#0f172a] text-[#f8fafc] antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}