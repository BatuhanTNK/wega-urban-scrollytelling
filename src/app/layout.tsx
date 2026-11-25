import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "WEGA Urban EVD 3GR — Flagship Espresso Engineering",
  description:
    "Italian commercial espresso engineering, revealed frame by frame. Discover the Wega Urban EVD 3GR flagship three-group espresso machine.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${inter.variable} dark scroll-smooth`}>
      <body className="bg-[#070707] text-white/90 font-sans antialiased selection:bg-[#C88A55]/30 selection:text-[#F2D2A9] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
