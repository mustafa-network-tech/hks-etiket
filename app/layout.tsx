import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MK Digital Systems — Demo Panel",
  description:
    "ERP + HKS + Elektronik Raf Etiketi Entegrasyon Demo Paneli",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 text-slate-800`}
      >
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0">
            {/* Topbar */}
            <header className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between shadow-sm">
              <h1 className="text-sm font-semibold text-slate-700 tracking-wide">
                MK Digital Systems{" "}
                <span className="text-slate-400 font-normal">— Demo Panel</span>
              </h1>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400">
                  ERP + HKS + ESL Entegrasyon Gösterimi
                </span>
                <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full border border-green-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Canlı Demo
                </span>
              </div>
            </header>

            {/* İçerik */}
            <main className="flex-1 p-6">{children}</main>

            {/* Footer */}
            <footer className="px-6 py-3 border-t border-slate-200 bg-white">
              <p className="text-[11px] text-slate-400 text-center">
                © 2026 MK Digital Systems — Bu panel demo amaçlıdır. Gerçek
                API bağlantısı içermez.
              </p>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
