import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { AppProvider } from "./providers/AppProvider";

const fontInter = Inter({
  variable: "--font-primary",
  weight: ["500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fillout Take-Home Assessment",
  description: "Fillout Take-Home Assessment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontInter.variable} antialiased`}>
        <div className="w-full max-w-[1240px] p-4 sm:p-12 m-auto h-screen">
          <AppProvider>{children}</AppProvider>
        </div>
      </body>
    </html>
  );
}
