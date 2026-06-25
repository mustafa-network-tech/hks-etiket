"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Store,
  Package,
  GitBranch,
  ScrollText,
  Settings,
  Zap,
  ChevronRight,
  X,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/branches", label: "Şubeler", icon: Store },
  { href: "/products", label: "Ürünler", icon: Package },
  { href: "/integration", label: "Entegrasyon Akışı", icon: GitBranch },
  { href: "/logs", label: "Senkronizasyon Logları", icon: ScrollText },
  { href: "/settings", label: "Ayarlar", icon: Settings },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobil overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 flex flex-col w-64 bg-slate-900 text-white
          transform transition-transform duration-300 ease-in-out
          lg:static lg:translate-x-0 lg:z-auto lg:shrink-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo & Başlık */}
        <div className="px-5 py-5 border-b border-slate-700 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 shrink-0">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <p className="text-xs font-semibold text-blue-400 tracking-widest uppercase">
                MK Digital Systems
              </p>
            </div>
            <p className="text-[10px] text-slate-400 mt-1.5 leading-tight pl-10">
              Demo Panel v1.0
            </p>
          </div>
          {/* Mobilde kapat butonu */}
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors mt-0.5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Demo Rozeti */}
        <div className="mx-4 mt-4 mb-2 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
          <span className="text-xs text-amber-300 font-medium">Demo Ortamı</span>
        </div>

        {/* Navigasyon */}
        <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest px-3 mb-2 mt-1">
            Menü
          </p>
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                  active
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-900/40"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="flex-1">{label}</span>
                {active && <ChevronRight className="w-3 h-3 opacity-60" />}
              </Link>
            );
          })}
        </nav>

        {/* Alt Bilgi */}
        <div className="px-4 py-4 border-t border-slate-700">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-green-400" />
            <span className="text-xs text-slate-400">Sistemler Aktif</span>
          </div>
          <p className="text-[10px] text-slate-600 ml-4 mb-3">
            ERP · HKS · ESL Gateway
          </p>
          <p className="text-[10px] text-slate-500 font-semibold">
            © MK Digital Systems
          </p>
        </div>
      </aside>
    </>
  );
}
