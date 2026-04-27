import type { Metadata } from "next";
import { Manrope, Public_Sans } from "next/font/google";
import "./globals.css";

import Providers from "./providers";
import Script from "next/script";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MentorPlus - Master Your Future",
  description: "MentorPlus Coaching platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${publicSans.variable} h-full antialiased`}
    >
      <body className="bg-surface dark:bg-[#0a0f18] font-body text-on-surface dark:text-inverse-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed transition-colors duration-300">
        <Providers>
          <main>{children}</main>
          <Script
            src="https://checkout.razorpay.com/v1/checkout.js"
            strategy="lazyOnload"
          />
        </Providers>
      </body>
    </html>
  );
}
