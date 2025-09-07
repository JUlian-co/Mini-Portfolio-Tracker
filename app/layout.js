import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { TokenProvider } from "@/hooks/TokenProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Portfolio Tracker",
  description: "A simple crypto portfolio tracker built with Next.js and the Alchemy API",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased m-8`}
      >
        <TokenProvider>
          {children}
        </TokenProvider>
      </body>
    </html>
  );
}
