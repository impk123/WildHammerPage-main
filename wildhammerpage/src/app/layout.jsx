import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Force dynamic rendering to prevent caching issues
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import CustomCursor from "../components/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "WildHammer",
  description: "WildHammer - HunterDev",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="fixed inset-0 pointer-events-none z-[10000]">
          <CustomCursor />
        </div>
        <nav className="sticky top-0 z-[9999]">
          <Navigation />
        </nav>
        <main className="min-h-screen">
          {children}
        </main>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
