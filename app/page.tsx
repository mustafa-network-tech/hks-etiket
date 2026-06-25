"use client";

import { useState } from "react";
import {
  Package,
  Store,
  Tag,
  AlertTriangle,
  Clock,
  RefreshCw,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  Zap,
} from "lucide-react";
import { branches, dashboardStats, syncLogs } from "@/lib/mockData";

export default function DashboardPage() {
  const [syncing, setSyncing] = useState(false);
  const [syncDone, setSyncDone] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSync = async () => {
    setSyncing(true);
    setSyncDone(false);
    setProgress(0);

    const steps = [15, 35, 55, 75, 90, 100];
    for (const step of steps) {
      await new Promise((r) => setTimeout(r, 400));
      setProgress(step);
    }

    setSyncing(false);
    setSyncDone(true);
    setTimeout(() => setSyncDone(false), 4000);
  };

  const stats = [
    {
      label: "Toplam Ürün",
      value: dashboardStats.totalProducts.toLocaleString("tr-TR"),
      icon: Package,
      color: "blue",
      sub: "2 şubede toplam",
    },
    {
      label: "Senkronize Etiket",
      value: dashboardStats.syncedLabels.toLocaleString("tr-TR"),
      icon: Tag,
      color: "green",
      sub: "%94,7 başarı oranı",
    },
    {
      label: "Hatalı Kayıt",
      value: dashboardStats.errorCount.toString(),
      icon: AlertTriangle,
      color: "red",
      sub: "Manuel inceleme gerekli",
    },
    {
      label: "Bekleyen İşlem",
      value: dashboardStats.pendingCount.toString(),
      icon: Clock,
      color: "amber",
      sub: "Kuyrukta bekliyor",
    },
  ];

  const colorMap: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    green: "bg-green-50 text-green-600 border-green-100",
    red: "bg-red-50 text-red-600 border-red-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
  };

  const iconBgMap: Record<string, string> = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    red: "bg-red-100 text-red-600",
    amber: "bg-amber-100 text-amber-600",
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Sayfa Başlığı */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Dashboard</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Entegrasyon durumu ve genel özet
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs text-slate-400">Son Senkronizasyon</p>
            <p className="text-xs font-semibold text-slate-600">
              {dashboardStats.lastSync}
            </p>
          </div>
          <button
            onClick={handleSync}
            disabled={syncing}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm ${
              syncing
                ? "bg-blue-400 text-white cursor-not-allowed"
                : syncDone
                ? "bg-green-500 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {syncing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Senkronize ediliyor...
              </>
            ) : syncDone ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Tamamlandı!
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                Senkronizasyonu Başlat
              </>
            )}
          </button>
        </div>
      </div>

      {/* Progress Bar (senkronizasyon sırasında) */}
      {(syncing || (syncDone && progress === 100)) && (
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-slate-700">
                {syncing ? "Senkronizasyon çalışıyor..." : "Senkronizasyon tamamlandı"}
              </span>
            </div>
            <span className="text-sm font-bold text-blue-600">{progress}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                syncDone ? "bg-green-500" : "bg-blue-500"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex gap-6 mt-3 text-xs text-slate-500">
            <span className={progress >= 20 ? "text-green-600 font-medium" : ""}>
              ✓ ERP Bağlantısı
            </span>
            <span className={progress >= 50 ? "text-green-600 font-medium" : ""}>
              ✓ HKS Sorgusu
            </span>
            <span className={progress >= 75 ? "text-green-600 font-medium" : ""}>
              ✓ Künye Eşleştirme
            </span>
            <span className={progress >= 100 ? "text-green-600 font-medium" : ""}>
              ✓ Etiket Güncelleme
            </span>
          </div>
        </div>
      )}

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color, sub }) => (
          <div
            key={label}
            className={`bg-white rounded-xl border p-5 shadow-sm ${colorMap[color]}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 mb-1">{label}</p>
                <p className="text-3xl font-bold text-slate-800">{value}</p>
                <p className="text-xs text-slate-400 mt-1">{sub}</p>
              </div>
              <div className={`p-2.5 rounded-lg ${iconBgMap[color]}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Şube Kartları */}
      <div>
        <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
          <Store className="w-4 h-4" /> Şube Durumu
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {branches.map((branch) => (
            <div
              key={branch.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    <h4 className="font-semibold text-slate-800">{branch.name}</h4>
                  </div>
                  <p className="text-xs text-slate-400">{branch.location}</p>
                </div>
                <span className="text-xs bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 rounded-full font-medium">
                  {branch.status}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-2 bg-slate-50 rounded-lg">
                  <p className="text-lg font-bold text-slate-800">{branch.productCount}</p>
                  <p className="text-[10px] text-slate-500">Ürün</p>
                </div>
                <div className="text-center p-2 bg-blue-50 rounded-lg">
                  <p className="text-lg font-bold text-blue-700">{branch.activeLabelCount}</p>
                  <p className="text-[10px] text-blue-500">Aktif Etiket</p>
                </div>
                <div className="text-center p-2 bg-slate-50 rounded-lg">
                  <p className="text-[11px] font-semibold text-slate-700 leading-tight">
                    {branch.lastSync.split(" ")[1]}
                  </p>
                  <p className="text-[10px] text-slate-500">Son Sync</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Son Log Özeti */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-slate-500" />
            <h3 className="text-sm font-semibold text-slate-700">Son İşlemler</h3>
          </div>
          <a
            href="/logs"
            className="flex items-center gap-1 text-xs text-blue-600 hover:underline font-medium"
          >
            Tümünü Gör <ArrowRight className="w-3 h-3" />
          </a>
        </div>
        <div className="divide-y divide-slate-50">
          {syncLogs.slice(0, 5).map((log) => (
            <div key={log.id} className="flex items-center gap-4 px-5 py-3">
              <span
                className={`w-2 h-2 rounded-full shrink-0 ${
                  log.status === "Başarılı"
                    ? "bg-green-500"
                    : log.status === "Hata"
                    ? "bg-red-500"
                    : "bg-amber-400"
                }`}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-700 truncate">{log.description}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs text-slate-400">{log.branch}</span>
                <span className="text-xs text-slate-400">{log.date.split(" ")[1]}</span>
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    log.status === "Başarılı"
                      ? "bg-green-50 text-green-700"
                      : log.status === "Hata"
                      ? "bg-red-50 text-red-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {log.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
