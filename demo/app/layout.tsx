import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { ThemeFromQuery } from "./theme-from-query";

// Inter and Roboto Mono are the faces the Figma source uses. The mono face is
// reserved for machine-readable error codes.
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Solana Onboarding Kit",
  description: "Component showroom for the Solana UI/UX Onboarding Kit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${robotoMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeFromQuery />
        {children}
      </body>
    </html>
  );
}
