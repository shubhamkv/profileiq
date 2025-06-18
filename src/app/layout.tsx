import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ProfileIQ",
  description:
    "ProfileIQ is a modern web application that analyzes a developer's GitHub profile and provides insightful feedback based on activity, contributions, and repository metrics. It evaluates strengths, highlights areas of improvement, and offers a personalized score that reflects your GitHub presence.",
  keywords: [
    "GitHub profile analyzer",
    "GitHub profile score",
    "GitHub profile insights",
    "Open-source contributor analysis",
    "GitHub activity tracker",
    "GitHub strengths and weaknesses",
    "GitHub improvement suggestions",
    "GitHub pull request analysis",
    "GitHub issue tracker",
    "Next.js GitHub API project",
    "Prisma PostgreSQL project",
    "How to analyze GitHub profile professionally",
    "Best GitHub profile analysis tools",
  ],
  authors: [{ name: "Shubham Kumar" }],
  creator: "Shubham Kumar",
  publisher: "Shubham Kumar",
  icons: {
    icon: "/profile_iq_64.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
      <GoogleAnalytics gaId="G-7YED9C7VH1" />
    </html>
  );
}
