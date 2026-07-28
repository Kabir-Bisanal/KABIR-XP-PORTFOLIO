import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  applicationName: "Kabir XP Portfolio",

  title: {
    default: "Kabir Bisanal | Software Developer",
    template: "%s | Kabir Bisanal",
  },

  description:
    "The professional portfolio of Kabir Bisanal, a Computer Science and Engineering student interested in software development, web applications, databases, automation, C#, Python and SQL.",

  keywords: [
    "Kabir Bisanal",
    "Software Developer",
    "Computer Science Student",
    "C# Developer",
    "Python Developer",
    "Web Developer",
    "Next.js Portfolio",
    "Windows XP Portfolio",
    "Automation",
    "SQL",
  ],

  authors: [
    {
      name: "Kabir Bisanal",
    },
  ],

  creator: "Kabir Bisanal",
  publisher: "Kabir Bisanal",

  category: "Technology",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Kabir Bisanal | Software Developer",
    description:
      "Explore my software-development projects, technical skills, education, résumé and professional experience through an interactive Windows XP-inspired portfolio.",
    type: "website",
    siteName: "Kabir XP Portfolio",
  },

  twitter: {
    card: "summary",
    title: "Kabir Bisanal | Software Developer",
    description:
      "An interactive Windows XP-inspired software-development portfolio.",
  },
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}