import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YouTube Video Transkripti",
  description: "YouTube videolarının transkriptini çıkaran uygulama",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={geist.className}>
        {children}
      </body>
    </html>
  );
}