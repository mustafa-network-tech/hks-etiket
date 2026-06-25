"use client";

import { useState } from "react";
import { Menu, Zap } from "lucide-react";
import Sidebar from "./Sidebar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-20 bg-white border-b border-slate-200 px-4 lg:px-6 py-3.5 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            {/* Hamburger — sadece mobilde görünür */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
              aria-label="Menüyü aç"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Mobilde logo — masaüstünde gizli (sidebar zaten gösteriyor) */}
            <div className="flex items-center gap-2 lg:hidden">
              <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-sm font-semibold text-slate-700">MK Digital</span>
            </div>

            {/* Masaüstü başlık */}
            <h1 className="hidden lg:block text-sm font-semibold text-slate-700 tracking-wide">
              MK Digital Systems{" "}
              <span className="text-slate-400 font-normal">— Demo Panel</span>
            </h1>
          </div>

          <div className="flex items-center gap-2 lg:gap-3">
            <span className="hidden md:inline text-xs text-slate-400">
              ERP + HKS + ESL Entegrasyon Gösterimi
            </span>
            <span className="hidden sm:inline text-xs text-slate-400 border border-slate-200 px-2.5 py-1 rounded-full bg-white">
              Demo Version · Haziran 2026
            </span>
            <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full border border-green-200">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="hidden sm:inline">Canlı Demo</span>
              <span className="sm:hidden">Demo</span>
            </span>
          </div>
        </header>

        {/* İçerik */}
        <main className="flex-1 p-4 lg:p-6">{children}</main>

        {/* Footer */}
        <footer className="px-4 lg:px-6 py-3 border-t border-slate-200 bg-white">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-1">
            <p className="text-[11px] font-semibold text-slate-500">
              © MK Digital Systems
            </p>
            <p className="text-[11px] text-slate-400">
              Bu panel demo amaçlıdır · Gerçek API bağlantısı içermez
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
