import type { Metadata } from "next";
import { Radio_Canada } from "next/font/google";
<<<<<<< HEAD
import "./globals.scss";
=======
import "./globals.css";
>>>>>>> 04f5f7f8d26340a5fdd3b7819d59b35e7645aab4

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
