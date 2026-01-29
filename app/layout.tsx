import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Classroom of the Elite | 実力至上主義の教室へ",
  description: "Welcome to the elite. A psychological thriller where the only rule is survival of the fittest. Experience the world of Advanced Nurturing High School.",
  keywords: ["Classroom of the Elite", "COTE", "Ayanokoji", "Light Novel", "Anime", "Psychological"],
  authors: [{ name: "Elite Archives" }],
  openGraph: {
    title: "Classroom of the Elite",
    description: "In this school, the only rule is survival of the fittest.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        {/* Noise Overlay for Film Grain Effect */}
        <div className="noise-overlay" aria-hidden="true" />

        {/* Main Content */}
        {children}
      </body>
    </html>
  );
}
