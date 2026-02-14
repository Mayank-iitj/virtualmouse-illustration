import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://virtualmouse.vercel.app"),
  title: "Virtual Mouse — AI-Powered Gesture Control | Mayank Sharma",
  description:
    "Control your computer using hand gestures with real-time computer vision. AI-powered Virtual Mouse using MediaPipe, OpenCV, and Python.",
  keywords: [
    "virtual mouse",
    "hand gesture control",
    "computer vision",
    "MediaPipe",
    "OpenCV",
    "AI",
    "HCI",
    "gesture recognition",
    "Mayank Sharma",
  ],
  authors: [{ name: "Mayank Sharma", url: "https://mayyanks.app" }],
  creator: "Mayank Sharma",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Virtual Mouse — AI-Powered Gesture Control",
    description:
      "Control your computer using hand gestures with real-time computer vision and AI.",
    type: "website",
    siteName: "Virtual Mouse",
    locale: "en_US",
    url: "https://virtualmouse.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Virtual Mouse — AI-Powered Gesture Control",
    description:
      "Control your computer using hand gestures with real-time computer vision and AI.",
    creator: "@mayyankks",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#050505" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
