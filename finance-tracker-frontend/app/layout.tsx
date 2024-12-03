import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "../src/components/Navbar"; // Import Navbar
import Footer from "../src/components/Footer"; // Import Footer
import "./globals.css"; // Global styles

// Local font definitions
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Metadata for the application
export const metadata: Metadata = {
  title: "Personal Finance Tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Add the Navbar at the top */}
        <Navbar />

        {/* Main content area */}
        <main style={{ minHeight: "calc(100vh - 100px)" }}>
          {children}
        </main>

        {/* Add the Footer at the bottom */}
        <Footer />
      </body>
    </html>
  );
}
