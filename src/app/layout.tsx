import type { Metadata } from "next";
import localFont from "next/font/local";
import "react-loading-skeleton/dist/skeleton.css";
import { Toaster } from "react-hot-toast";
import RecoilContextProvider from "@/providers/recoil-provider";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Registration and Licensing Decentralized System",
  description: "A decentralized system for registration and licensing",
  keywords: [
    "registration",
    "licensing",
    "decentralized",
    "system",
    "blockchain",
    "algo",
    "did",
  ],
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
        <Toaster />
        <RecoilContextProvider>{children}</RecoilContextProvider>
      </body>
    </html>
  );
}
