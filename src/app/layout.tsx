import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Project Showcase - Vote for Awesome Kid Projects!",
  description:
    "Discover and vote for the most creative AI-powered projects built by kids. Submit your own project and inspire others!",
  openGraph: {
    title: "AI Project Showcase",
    description:
      "Vote for the most awesome AI projects built by kids!",
    url: "https://beautifuldata.org",
    siteName: "AI Project Showcase",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="text-gray-800 antialiased">
        {children}
      </body>
    </html>
  );
}
