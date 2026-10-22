import { Inter, Manrope } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Motion from "@/components/Motion";
import Spotlight from "@/components/Spotlight";
import Magnetic from "@/components/Magnetic";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata = {
  metadataBase: new URL("https://apexrevenuesolutions.com"),
  title: {
    default: "APEX REVENUE SOLUTIONS | Healthcare Revenue Cycle Management",
    template: "%s | APEX REVENUE SOLUTIONS",
  },
  description:
    "Revenue cycle management and medical billing services for physicians, independent medical practices and healthcare organizations.",
  icons: { icon: "/brand/apex-icon.png", apple: "/brand/apex-icon.png" },
  openGraph: {
    title: "APEX REVENUE SOLUTIONS",
    description: "People, Process, Technology, Better Revenue.",
    images: ["/brand/apex-logo-full.png"],
    type: "website",
  },
};

export const viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Motion />
        <Spotlight />
        <Magnetic />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
