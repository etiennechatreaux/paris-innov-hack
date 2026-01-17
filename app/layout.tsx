import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/components/LocaleProvider";
import enMessages from "@/messages/en.json";
import frMessages from "@/messages/fr.json";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VoiceHub - Voice Talent Marketplace",
  description: "Find and hire professional voice talent for your projects. The premier marketplace connecting businesses with voice actors worldwide.",
};

const messages = {
  en: enMessages,
  fr: frMessages,
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
        <LocaleProvider messages={messages}>
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
