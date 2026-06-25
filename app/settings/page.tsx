"use client";

import { useState } from "react";
import {
  Settings,
  Database,
  Leaf,
  Radio,
  Key,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Eye,
  EyeOff,
  Save,
  Info,
} from "lucide-react";

type ConnectionStatus = "idle" | "testing" | "success" | "error";

interface ApiConfig {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  borderColor: string;
  defaultUrl: string;
  defaultKey: string;
}

const apiConfigs: ApiConfig[] = [
  {
    id: "erp",
    title: "Mikro ERP",
    subtitle: "Muhasebe & Stok Sistemi",
    icon: Database,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    defaultUrl: "https://erp.demo.mkdigital.com/api/v14",
    defaultKey: "erp_demo_key_mk2026_****",
  },
  {
    id: "hks",
    title: "HKS Hal Kayıt Sistemi",
    subtitle: "Tarım Bakanlığı Entegrasyonu",
    icon: Leaf,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    defaultUrl: "https://hks.gkgm.gov.tr/api/v3",
    defaultKey: "hks_demo_key_mk2026_****",
  },
  {
    id: "esl",
    title: "Raf Etiketi (ESL Gateway)",
    subtitle: "Elektronik Raf Etiketi Sistemi",
    icon: Radio,
    color: "text-violet-600",
    bgColor: "bg-violet-50",
    borderColor: "border-violet-200",
    defaultUrl: "https://esl-gw.demo.mkdigital.com/api/v2",
    defaultKey: "esl_demo_key_mk2026_****",
  },
];

export default function SettingsPage() {
  const [urls, setUrls] = useState<Record<string, string>>(
    Object.fromEntries(apiConfigs.map((c) => [c.id, c.defaultUrl]))
  );
  const [keys, setKeys] = useState<Record<string, string>>(
    Object.fromEntries(apiConfigs.map((c) => [c.id, c.defaultKey]))
  );
  const [showKey, setShowKey] = useState<Record<string, boolean>>({});
  const [statuses, setStatuses] = useState<Record<string, ConnectionStatus>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const testConnection = async (id: string) => {
    setStatuses((prev) => ({ ...prev, [id]: "testing" }));
    await new Promise((r) => setTimeout(r, 1800));
    const isSuccess = id !== "hks" || Math.random() > 0.2;
    setStatuses((prev) => ({
      ...prev,
      [id]: isSuccess ? "success" : "error",
    }));
    setTimeout(() => {
      setStatuses((prev) => ({ ...prev, [id]: "idle" }));
    }, 4000);
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const toggleKey = (id: string) => {
    setShowKey((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Başlık */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Ayarlar</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            API bağlantı yapılandırması
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm ${
            saving
              ? "bg-slate-200 text-slate-500 cursor-not-allowed"
              : saved
              ? "bg-green-500 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {saving ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Kaydediliyor...
            </>
          ) : saved ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              Kaydedildi!
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Değişiklikleri Kaydet
            </>
          )}
        </button>
      </div>

      {/* Demo Uyarısı */}
      <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
        <Info className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
        <div>
          <p className="text-sm font-semibold text-amber-800 mb-0.5">
            Demo Modu Aktif
          </p>
          <p className="text-xs text-amber-700">
            Bu panel demo amaçlıdır. Girilen API bilgileri gerçek sistemlere
            bağlanmaz. Tüm veriler simüle edilmektedir. Canlı sisteme geçişte
            gerçek API bilgilerinizi giriniz.
          </p>
        </div>
      </div>

      {/* API Yapılandırma Kartları */}
      <div className="space-y-4">
        {apiConfigs.map((config) => {
          const Icon = config.icon;
          const status = statuses[config.id] || "idle";

          return (
            <div
              key={config.id}
              className={`bg-white rounded-xl border ${config.borderColor} shadow-sm overflow-hidden`}
            >
              {/* Kart Başlığı */}
              <div className={`${config.bgColor} px-5 py-4 border-b ${config.borderColor}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-lg bg-white shadow-sm flex items-center justify-center`}
                    >
                      <Icon className={`w-5 h-5 ${config.color}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">{config.title}</h3>
                      <p className="text-xs text-slate-500">{config.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {status === "success" && (
                      <span className="flex items-center gap-1.5 text-xs font-medium text-green-700 bg-green-100 px-2.5 py-1 rounded-full border border-green-200">
                        <CheckCircle2 className="w-3 h-3" />
                        Bağlantı Başarılı
                      </span>
                    )}
                    {status === "error" && (
                      <span className="flex items-center gap-1.5 text-xs font-medium text-red-700 bg-red-100 px-2.5 py-1 rounded-full border border-red-200">
                        <XCircle className="w-3 h-3" />
                        Bağlantı Hatası
                      </span>
                    )}
                    <button
                      onClick={() => testConnection(config.id)}
                      disabled={status === "testing"}
                      className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                        status === "testing"
                          ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                          : `bg-white ${config.color} ${config.borderColor} hover:shadow-sm`
                      }`}
                    >
                      {status === "testing" ? (
                        <>
                          <RefreshCw className="w-3 h-3 animate-spin" />
                          Test ediliyor...
                        </>
                      ) : (
                        <>
                          <Settings className="w-3 h-3" />
                          Test Bağlantısı
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Form Alanları */}
              <div className="px-5 py-5 space-y-4">
                {/* API URL */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 mb-1.5">
                    <Database className="w-3.5 h-3.5" />
                    API Endpoint URL
                  </label>
                  <input
                    type="url"
                    value={urls[config.id]}
                    onChange={(e) =>
                      setUrls((prev) => ({
                        ...prev,
                        [config.id]: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-slate-700 bg-slate-50"
                    placeholder="https://api.example.com/v1"
                  />
                </div>

                {/* API Key */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 mb-1.5">
                    <Key className="w-3.5 h-3.5" />
                    API Key
                  </label>
                  <div className="relative">
                    <input
                      type={showKey[config.id] ? "text" : "password"}
                      value={keys[config.id]}
                      onChange={(e) =>
                        setKeys((prev) => ({
                          ...prev,
                          [config.id]: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2.5 pr-10 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-slate-700 bg-slate-50"
                      placeholder="sk-****"
                    />
                    <button
                      type="button"
                      onClick={() => toggleKey(config.id)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showKey[config.id] ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Genel Ayarlar */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-slate-50 px-5 py-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-slate-500" />
            <h3 className="font-semibold text-slate-700">Genel Senkronizasyon Ayarları</h3>
          </div>
        </div>
        <div className="px-5 py-5 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="text-xs font-semibold text-slate-600 mb-1.5 block">
              Otomatik Senkronizasyon Aralığı
            </label>
            <select className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50">
              <option>Her 30 dakikada bir</option>
              <option>Her 1 saatte bir</option>
              <option>Her 2 saatte bir</option>
              <option>Sadece manuel</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 mb-1.5 block">
              Hata Bildirimi Eşiği
            </label>
            <select className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50">
              <option>1 hata ve üzeri</option>
              <option>3 hata ve üzeri</option>
              <option>5 hata ve üzeri</option>
              <option>Bildirimleri kapat</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 mb-1.5 block">
              Log Saklama Süresi
            </label>
            <select className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50">
              <option>30 gün</option>
              <option>60 gün</option>
              <option>90 gün</option>
              <option>1 yıl</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 mb-1.5 block">
              Timeout Süresi (saniye)
            </label>
            <input
              type="number"
              defaultValue={30}
              className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
            />
          </div>
        </div>
      </div>

      {/* Sistem Bilgileri */}
      <div className="bg-slate-800 rounded-xl p-5 text-white">
        <h3 className="text-sm font-semibold mb-3 text-slate-300">
          Sistem Bilgileri
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          {[
            { label: "Panel Versiyonu", value: "v1.0.0-demo" },
            { label: "Next.js", value: "15.x" },
            { label: "Ortam", value: "Demo / Staging" },
            { label: "Son Derleme", value: "25.06.2026" },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-slate-500 mb-0.5">{label}</p>
              <p className="font-mono font-semibold text-slate-200">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
