import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://kabirbisanal.com"),

  alternates: {
    canonical: "/",
  },

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
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: "https://kabirbisanal.com",
  mainEntity: {
    "@type": "Person",
    name: "Kabir Bisanal",
    url: "https://kabirbisanal.com",
    description:
      "Software developer and Computer Science and Engineering student building full-stack, data science, automation, and software projects.",
    sameAs: [
      "https://github.com/Kabir-Bisanal",
      "https://www.linkedin.com/in/kabir-bisanal-638ba7276/",
    ],
    knowsAbout: [
      "Software Development",
      "Python",
      "C#",
      "SQL",
      "Web Development",
      "Data Science",
      "Machine Learning",
      "Automation",
    ],
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
      <body>
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
    }}
  />

  {children}
  <SpeedInsights />
</body>
    </html>
  );
}