import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata = {
  title: "Aarav Wealth — Clarity in Every Decision",
  description:
    "Personalized wealth management, insurance, tax and estate planning. Disciplined, research-backed investing for long-term financial freedom.",
  openGraph: {
    title: "Aarav Wealth",
    description: "Clarity in every financial decision.",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#0a1626",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen flex flex-col antialiased"
        suppressHydrationWarning
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
