"use client";

import { useState } from "react";
import {
  Store,
  MapPin,
  Package,
  Tag,
  Clock,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  BarChart3,
} from "lucide-react";
import { branches, products } from "@/lib/mockData";

export default function BranchesPage() {
  const [refreshing, setRefreshing] = useState<string | null>(null);
  const [refreshed, setRefreshed] = useState<string[]>([]);

  const handleRefresh = async (branchId: string) => {
    setRefreshing(branchId);
    await new Promise((r) => setTimeout(r, 1800));
    setRefreshing(null);
    setRefreshed((prev) => [...prev, branchId]);
    setTimeout(() => setRefreshed((prev) => prev.filter((id) => id !== branchId)), 3000);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Başlık */}
      <div>
        <h2 className="text-xl font-bold text-slate-800">Şubeler</h2>
        <p className="text-sm text-slate-500 mt-0.5">
          Şube bazlı ürün ve etiket durumu
        </p>
      </div>

      {/* Şube Kartları */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {branches.map((branch) => {
          const branchProducts = products.filter((p) => p.branch === branch.name);
          const current = branchProducts.filter((p) => p.labelStatus === "Güncel").length;
          const pending = branchProducts.filter((p) => p.labelStatus === "Bekliyor").length;
          const error = branchProducts.filter((p) => p.labelStatus === "Hata").length;
          const isRefreshing = refreshing === branch.id;
          const isRefreshed = refreshed.includes(branch.id);

          return (
            <div
              key={branch.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
            >
              {/* Kart Başlığı */}
              <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2.5 mb-1">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                        <Store className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">
                        {branch.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-1.5 ml-10">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <p className="text-xs text-slate-400">{branch.location}</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 bg-green-500/20 text-green-300 text-xs font-medium px-2.5 py-1 rounded-full border border-green-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    {branch.status}
                  </span>
                </div>
              </div>

              {/* İstatistikler */}
              <div className="grid grid-cols-3 divide-x divide-slate-100">
                <div className="px-5 py-4 text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <Package className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <p className="text-2xl font-bold text-slate-800">{branch.productCount}</p>
                  <p className="text-xs text-slate-500">Toplam Ürün</p>
                </div>
                <div className="px-5 py-4 text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <Tag className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <p className="text-2xl font-bold text-blue-700">{branch.activeLabelCount}</p>
                  <p className="text-xs text-slate-500">Aktif Etiket</p>
                </div>
                <div className="px-5 py-4 text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <p className="text-sm font-bold text-slate-800">{branch.lastSync.split(" ")[1]}</p>
                  <p className="text-xs text-slate-500">Son Sync</p>
                </div>
              </div>

              {/* Etiket Durumu Dağılımı */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <BarChart3 className="w-3.5 h-3.5 text-slate-500" />
                    <span className="text-xs font-semibold text-slate-600">
                      Etiket Durumu Dağılımı
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">
                    {branchProducts.length} ürün
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-24 text-right">
                      <span className="text-xs text-slate-500">Güncel</span>
                    </div>
                    <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{
                          width: branchProducts.length
                            ? `${(current / branchProducts.length) * 100}%`
                            : "0%",
                        }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-green-600 w-6 text-right">
                      {current}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24 text-right">
                      <span className="text-xs text-slate-500">Bekliyor</span>
                    </div>
                    <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full"
                        style={{
                          width: branchProducts.length
                            ? `${(pending / branchProducts.length) * 100}%`
                            : "0%",
                        }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-amber-600 w-6 text-right">
                      {pending}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24 text-right">
                      <span className="text-xs text-slate-500">Hata</span>
                    </div>
                    <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-red-500 rounded-full"
                        style={{
                          width: branchProducts.length
                            ? `${(error / branchProducts.length) * 100}%`
                            : "0%",
                        }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-red-600 w-6 text-right">
                      {error}
                    </span>
                  </div>
                </div>
              </div>

              {/* Ürün Listesi */}
              <div className="px-6 py-4 border-t border-slate-100">
                <p className="text-xs font-semibold text-slate-600 mb-3">
                  Bu Şubedeki Ürünler
                </p>
                <div className="flex flex-wrap gap-2">
                  {branchProducts.map((p) => (
                    <span
                      key={p.id}
                      className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border font-medium ${
                        p.labelStatus === "Güncel"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : p.labelStatus === "Bekliyor"
                          ? "bg-amber-50 text-amber-700 border-amber-200"
                          : "bg-red-50 text-red-700 border-red-200"
                      }`}
                    >
                      {p.labelStatus === "Güncel" ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : p.labelStatus === "Hata" ? (
                        <AlertTriangle className="w-3 h-3" />
                      ) : (
                        <Clock className="w-3 h-3" />
                      )}
                      {p.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Alt Aksiyon */}
              <div className="px-6 py-3 border-t border-slate-100 flex items-center justify-between">
                <p className="text-xs text-slate-400">
                  Son güncelleme: {branch.lastSync}
                </p>
                <button
                  onClick={() => handleRefresh(branch.id)}
                  disabled={isRefreshing}
                  className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all ${
                    isRefreshing
                      ? "bg-blue-100 text-blue-500 cursor-not-allowed"
                      : isRefreshed
                      ? "bg-green-100 text-green-700"
                      : "bg-slate-100 text-slate-600 hover:bg-blue-100 hover:text-blue-700"
                  }`}
                >
                  {isRefreshing ? (
                    <>
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      Güncelleniyor...
                    </>
                  ) : isRefreshed ? (
                    <>
                      <CheckCircle2 className="w-3 h-3" />
                      Güncellendi
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-3 h-3" />
                      Yenile
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
