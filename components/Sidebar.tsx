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
} from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/branches", label: "Şubeler", icon: Store },
  { href: "/products", label: "Ürünler", icon: Package },
  { href: "/integration", label: "Entegrasyon Akışı", icon: GitBranch },
  { href: "/logs", label: "Senkronizasyon Logları", icon: ScrollText },
  { href: "/settings", label: "Ayarlar", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col w-64 min-h-screen bg-slate-900 text-white shrink-0">
      {/* Logo & Başlık */}
      <div className="px-5 py-5 border-b border-slate-700">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-xs font-semibold text-blue-400 tracking-widest uppercase">
              MK Digital Systems
            </p>
          </div>
        </div>
        <p className="text-[10px] text-slate-400 mt-1.5 leading-tight pl-10">
          Demo Panel v1.0
        </p>
      </div>

      {/* Demo Rozeti */}
      <div className="mx-4 mt-4 mb-2 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
        <span className="text-xs text-amber-300 font-medium">Demo Ortamı</span>
      </div>

      {/* Navigasyon */}
      <nav className="flex-1 px-3 py-3 space-y-0.5">
        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest px-3 mb-2 mt-1">
          Menü
        </p>
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
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
        <p className="text-[10px] text-slate-600 ml-4">
          ERP · HKS · ESL Gateway
        </p>
      </div>
    </aside>
  );
}
