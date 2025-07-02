import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ToastClient from "@/components/ToastClient";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DevSource",
  description: "created by Adarsh Tiwari",
  icons: {
    icon: "/fav.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <ToastClient/>
      </body>
    </html>
  );
}
