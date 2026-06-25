"use client";

import { useState } from "react";
import {
  Package,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ChevronDown,
} from "lucide-react";
import { products, type LabelStatus } from "@/lib/mockData";

const labelStatusConfig: Record<
  LabelStatus,
  { label: string; class: string; icon: React.ReactNode }
> = {
  Güncel: {
    label: "Güncel",
    class: "bg-green-50 text-green-700 border-green-200",
    icon: <CheckCircle2 className="w-3.5 h-3.5" />,
  },
  Bekliyor: {
    label: "Bekliyor",
    class: "bg-amber-50 text-amber-700 border-amber-200",
    icon: <Clock className="w-3.5 h-3.5" />,
  },
  Hata: {
    label: "Hata",
    class: "bg-red-50 text-red-700 border-red-200",
    icon: <AlertTriangle className="w-3.5 h-3.5" />,
  },
};

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [branchFilter, setBranchFilter] = useState("Tümü");
  const [statusFilter, setStatusFilter] = useState("Tümü");

  const filtered = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.barcode.includes(search) ||
      p.hksId.toLowerCase().includes(search.toLowerCase());
    const matchBranch = branchFilter === "Tümü" || p.branch === branchFilter;
    const matchStatus = statusFilter === "Tümü" || p.labelStatus === statusFilter;
    return matchSearch && matchBranch && matchStatus;
  });

  const branches = ["Tümü", "Merkez Market", "Şube Market"];
  const statuses = ["Tümü", "Güncel", "Bekliyor", "Hata"];

  const counts = {
    total: products.length,
    current: products.filter((p) => p.labelStatus === "Güncel").length,
    pending: products.filter((p) => p.labelStatus === "Bekliyor").length,
    error: products.filter((p) => p.labelStatus === "Hata").length,
  };

  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      {/* Başlık */}
      <div>
        <h2 className="text-xl font-bold text-slate-800">Ürünler</h2>
        <p className="text-sm text-slate-500 mt-0.5">
          Tüm ürünler, HKS künye bilgileri ve etiket durumları
        </p>
      </div>

      {/* Özet Sayaçlar */}
      <div className="flex gap-3 flex-wrap">
        {[
          { label: "Toplam", count: counts.total, color: "text-slate-700 bg-slate-100" },
          { label: "Güncel", count: counts.current, color: "text-green-700 bg-green-50 border border-green-200" },
          { label: "Bekliyor", count: counts.pending, color: "text-amber-700 bg-amber-50 border border-amber-200" },
          { label: "Hata", count: counts.error, color: "text-red-700 bg-red-50 border border-red-200" },
        ].map(({ label, count, color }) => (
          <div key={label} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium ${color}`}>
            <Package className="w-3.5 h-3.5" />
            {label}: <span className="font-bold">{count}</span>
          </div>
        ))}
      </div>

      {/* Filtreler */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Ürün adı, barkod veya HKS No ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <select
            value={branchFilter}
            onChange={(e) => setBranchFilter(e.target.value)}
            className="pl-8 pr-8 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none cursor-pointer"
          >
            {branches.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
        </div>
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-3 pr-8 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none cursor-pointer"
          >
            {statuses.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Tablo */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Ürün Adı
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Barkod
                </th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Fiyat
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Birim
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Menşei
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Tedarikçi
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  HKS Künye No
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Şube
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Etiket Durumu
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-10 text-slate-400 text-sm">
                    Arama kriterlerine uygun ürün bulunamadı.
                  </td>
                </tr>
              ) : (
                filtered.map((product) => {
                  const statusCfg = labelStatusConfig[product.labelStatus];
                  return (
                    <tr
                      key={product.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs shrink-0">
                            {product.name[0]}
                          </div>
                          <span className="font-semibold text-slate-800">
                            {product.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <code className="text-xs bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono">
                          {product.barcode}
                        </code>
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-slate-800">
                        ₺{product.price.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-slate-600">{product.unit}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                          📍 {product.origin}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-600 text-xs max-w-32 truncate">
                        {product.supplier}
                      </td>
                      <td className="px-4 py-3">
                        {product.hksId !== "—" ? (
                          <code className="text-xs bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-mono border border-blue-100">
                            {product.hksId}
                          </code>
                        ) : (
                          <span className="text-xs text-red-500 font-medium">Eksik</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-600">
                        {product.branch}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${statusCfg.class}`}
                        >
                          {statusCfg.icon}
                          {statusCfg.label}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            {filtered.length} / {products.length} ürün gösteriliyor
          </p>
          <p className="text-xs text-slate-400">
            Son güncelleme: 25.06.2026 17:42
          </p>
        </div>
      </div>
    </div>
  );
}
