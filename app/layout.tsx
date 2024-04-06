import type { Metadata } from "next";
import { Radio_Canada } from "next/font/google";
import "./globals.css";

const radioCanada = Radio_Canada({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Counter Trade",
  description: "CS Skins",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={radioCanada.className}>{children}</body>
    </html>
  );
}
