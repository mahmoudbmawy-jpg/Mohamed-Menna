import type { Metadata, Viewport } from "next";
import "./globals.css";
import { WEDDING_CONFIG } from "@/config/wedding";

export const viewport: Viewport = {
  themeColor: "#11100E",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Mohamed & Menna — Our Wedding | 10 September 2026",
  description:
    "Join Mohamed & Menna as they celebrate their luxury wedding celebration on 10 September 2026 in Cairo, Egypt.",
  keywords: [
    "Mohamed and Menna",
    "Wedding Invitation",
    "Cairo Wedding",
    "10 September 2026",
    "Luxury Wedding Invitation",
  ],
  authors: [{ name: "Mohamed & Menna" }],
  openGraph: {
    title: "Mohamed & Menna — The Wedding Invitation",
    description:
      "Join Mohamed & Menna as they celebrate their love on 10 September 2026 in Cairo.",
    url: "https://mohamed-menna-wedding.com",
    siteName: "Mohamed & Menna Wedding",
    images: [
      {
        url: WEDDING_CONFIG.social.ogImage,
        width: 1200,
        height: 630,
        alt: "Mohamed & Menna Wedding Invitation",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamed & Menna — The Wedding Invitation",
    description:
      "Join Mohamed & Menna as they celebrate their wedding on 10 September 2026 in Cairo.",
    images: [WEDDING_CONFIG.social.ogImage],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#11100E] text-[#F4EFE7] antialiased">
        {children}
      </body>
    </html>
  );
}
