"use client";

import { useState } from "react";
import {
  ScrollText,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Search,
  Download,
  Filter,
  ChevronDown,
  RefreshCw,
} from "lucide-react";
import { syncLogs, type LogStatus, type LogAction } from "@/lib/mockData";

const statusConfig: Record<LogStatus, { class: string; icon: React.ReactNode }> = {
  Başarılı: {
    class: "bg-green-50 text-green-700 border-green-200",
    icon: <CheckCircle2 className="w-3.5 h-3.5" />,
  },
  Hata: {
    class: "bg-red-50 text-red-700 border-red-200",
    icon: <XCircle className="w-3.5 h-3.5" />,
  },
  Uyarı: {
    class: "bg-amber-50 text-amber-700 border-amber-200",
    icon: <AlertTriangle className="w-3.5 h-3.5" />,
  },
};

const actionConfig: Record<LogAction, string> = {
  "Fiyat Güncelleme": "bg-blue-50 text-blue-700",
  "Künye Eşleştirme": "bg-emerald-50 text-emerald-700",
  "Etiket Güncelleme": "bg-violet-50 text-violet-700",
  "Barkod Kontrolü": "bg-amber-50 text-amber-700",
  "HKS Sorgulama": "bg-teal-50 text-teal-700",
};

export default function LogsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tümü");
  const [branchFilter, setBranchFilter] = useState("Tümü");
  const [exporting, setExporting] = useState(false);

  const filtered = syncLogs.filter((log) => {
    const matchSearch =
      log.description.toLowerCase().includes(search.toLowerCase()) ||
      log.product.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "Tümü" || log.status === statusFilter;
    const matchBranch = branchFilter === "Tümü" || log.branch === branchFilter;
    return matchSearch && matchStatus && matchBranch;
  });

  const counts = {
    total: syncLogs.length,
    success: syncLogs.filter((l) => l.status === "Başarılı").length,
    warn: syncLogs.filter((l) => l.status === "Uyarı").length,
    error: syncLogs.filter((l) => l.status === "Hata").length,
  };

  const handleExport = async () => {
    setExporting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setExporting(false);
  };

  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      {/* Başlık */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Senkronizasyon Logları</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Tüm işlem kayıtları ve hata takibi
          </p>
        </div>
        <button
          onClick={handleExport}
          disabled={exporting}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
            exporting
              ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
          }`}
        >
          {exporting ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Dışa Aktarılıyor...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              CSV Dışa Aktar
            </>
          )}
        </button>
      </div>

      {/* Sayaç Kartları */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Toplam İşlem", value: counts.total, color: "slate", icon: ScrollText },
          { label: "Başarılı", value: counts.success, color: "green", icon: CheckCircle2 },
          { label: "Uyarı", value: counts.warn, color: "amber", icon: AlertTriangle },
          { label: "Hata", value: counts.error, color: "red", icon: XCircle },
        ].map(({ label, value, color, icon: Icon }) => (
          <div
            key={label}
            className={`bg-white rounded-xl border border-${color}-200 p-4 shadow-sm`}
          >
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-medium text-slate-500">{label}</p>
              <Icon
                className={`w-4 h-4 text-${color}-500`}
              />
            </div>
            <p className={`text-3xl font-bold text-${color === "slate" ? "slate-800" : color + "-600"}`}>
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Filtreler */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Ürün veya açıklamada ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-8 pr-8 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none cursor-pointer"
          >
            {["Tümü", "Başarılı", "Uyarı", "Hata"].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
        </div>
        <div className="relative">
          <select
            value={branchFilter}
            onChange={(e) => setBranchFilter(e.target.value)}
            className="pl-3 pr-8 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none cursor-pointer"
          >
            {["Tümü", "Merkez Market", "Şube Market"].map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Log Tablosu */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Tarih & Saat
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Şube
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Ürün
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  İşlem
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Durum
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Açıklama
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-slate-400 text-sm">
                    Filtre kriterlerine uygun log bulunamadı.
                  </td>
                </tr>
              ) : (
                filtered.map((log) => {
                  const statusCfg = statusConfig[log.status];
                  const actionClass = actionConfig[log.action];
                  return (
                    <tr
                      key={log.id}
                      className={`hover:bg-slate-50 transition-colors ${
                        log.status === "Hata" ? "bg-red-50/30" : ""
                      }`}
                    >
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-xs font-semibold text-slate-700">
                            {log.date.split(" ")[1]}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            {log.date.split(" ")[0]}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs text-slate-600 font-medium">
                          {log.branch}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0">
                            {log.product[0]}
                          </div>
                          <span className="font-medium text-slate-700 text-sm">
                            {log.product}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full ${actionClass}`}
                        >
                          {log.action}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${statusCfg.class}`}
                        >
                          {statusCfg.icon}
                          {log.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-500 max-w-xs">
                        {log.description}
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
            {filtered.length} / {syncLogs.length} kayıt gösteriliyor
          </p>
          <p className="text-xs text-slate-400">
            Son güncelleme: 25.06.2026 17:42
          </p>
        </div>
      </div>
    </div>
  );
}
