"use client";

import { useState } from "react";
import {
  CheckCircle2,
  ArrowRight,
  Play,
  RefreshCw,
  Database,
  Leaf,
  Radio,
  Wifi,
  AlertCircle,
  Clock,
  Zap,
} from "lucide-react";

const systemIcons = [Database, Leaf, Radio];

const systemColors = [
  {
    bg: "bg-blue-600",
    lightBg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    badge: "bg-blue-100 text-blue-700",
    dot: "bg-blue-500",
  },
  {
    bg: "bg-emerald-600",
    lightBg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    badge: "bg-emerald-100 text-emerald-700",
    dot: "bg-emerald-500",
  },
  {
    bg: "bg-violet-600",
    lightBg: "bg-violet-50",
    text: "text-violet-700",
    border: "border-violet-200",
    badge: "bg-violet-100 text-violet-700",
    dot: "bg-violet-500",
  },
];

const steps = [
  {
    id: "erp",
    title: "Mikro ERP",
    subtitle: "Kaynak Sistem",
    version: "v14.2.1",
    details: [
      { icon: CheckCircle2, text: "Bağlantı başarılı", status: "ok" },
      { icon: CheckCircle2, text: "214 ürün verisi çekildi", status: "ok" },
      { icon: CheckCircle2, text: "Fiyat & stok verileri hazır", status: "ok" },
      { icon: CheckCircle2, text: "Son sorgu: 17:42:14", status: "ok" },
    ],
    metrics: [
      { label: "Toplam Ürün", value: "214" },
      { label: "Güncellenen", value: "118" },
      { label: "Süre", value: "1.2s" },
    ],
  },
  {
    id: "hks",
    title: "HKS Hal Kayıt",
    subtitle: "Künye & Menşei",
    version: "API v3.1",
    details: [
      { icon: CheckCircle2, text: "API bağlantısı aktif", status: "ok" },
      { icon: CheckCircle2, text: "214 künye sorgulandı", status: "ok" },
      { icon: CheckCircle2, text: "212 künye eşleşti", status: "ok" },
      { icon: AlertCircle, text: "2 künye bulunamadı", status: "warn" },
    ],
    metrics: [
      { label: "Eşleşen", value: "212" },
      { label: "Eksik", value: "2" },
      { label: "Süre", value: "2.1s" },
    ],
  },
  {
    id: "esl",
    title: "Raf Etiketi",
    subtitle: "ESL Gateway",
    version: "Gateway v2.8",
    details: [
      { icon: CheckCircle2, text: "Gateway bağlantısı kuruldu", status: "ok" },
      { icon: CheckCircle2, text: "201 etiket aktif", status: "ok" },
      { icon: CheckCircle2, text: "198 etiket güncellendi", status: "ok" },
      { icon: AlertCircle, text: "3 etiket hata durumunda", status: "warn" },
    ],
    metrics: [
      { label: "Aktif Etiket", value: "201" },
      { label: "Güncellenen", value: "198" },
      { label: "Süre", value: "0.9s" },
    ],
  },
];

type SimStep = "idle" | "erp" | "hks" | "esl" | "done";

export default function IntegrationPage() {
  const [simStep, setSimStep] = useState<SimStep>("idle");

  const runSimulation = async () => {
    setSimStep("erp");
    await new Promise((r) => setTimeout(r, 1200));
    setSimStep("hks");
    await new Promise((r) => setTimeout(r, 1200));
    setSimStep("esl");
    await new Promise((r) => setTimeout(r, 1200));
    setSimStep("done");
    setTimeout(() => setSimStep("idle"), 5000);
  };

  const stepOrder: SimStep[] = ["erp", "hks", "esl", "done"];
  const activeIdx = stepOrder.indexOf(simStep);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Başlık */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Entegrasyon Akışı</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            ERP → HKS → Elektronik Raf Etiketi veri akışı
          </p>
        </div>
        <button
          onClick={runSimulation}
          disabled={simStep !== "idle"}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm ${
            simStep !== "idle"
              ? "bg-slate-200 text-slate-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {simStep === "idle" ? (
            <>
              <Play className="w-4 h-4" /> Akışı Simüle Et
            </>
          ) : simStep === "done" ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-green-500" /> Tamamlandı
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" /> Çalışıyor...
            </>
          )}
        </button>
      </div>

      {/* Akış Şeması */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm font-semibold text-slate-600 flex items-center gap-2">
            <Zap className="w-4 h-4 text-blue-500" />
            Veri Akış Diyagramı
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500" /> Aktif
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-400" /> Uyarı
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500" /> Hata
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2">
          {steps.map((step, idx) => {
            const Icon = systemIcons[idx];
            const colors = systemColors[idx];
            const isActive = simStep === step.id;
            const isDone =
              simStep !== "idle" && activeIdx > idx;
            const isIdle = simStep === "idle";

            return (
              <div key={step.id} className="flex items-center gap-2 flex-1">
                {/* Kart */}
                <div
                  className={`flex-1 rounded-xl border-2 p-5 transition-all duration-300 ${
                    isActive
                      ? `${colors.border} shadow-lg scale-105`
                      : isDone
                      ? "border-green-300 bg-green-50/50"
                      : "border-slate-200 bg-slate-50/50"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isDone
                          ? "bg-green-500"
                          : isActive
                          ? colors.bg
                          : "bg-slate-300"
                      } transition-all duration-300`}
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      ) : isActive ? (
                        <RefreshCw className="w-5 h-5 text-white animate-spin" />
                      ) : (
                        <Icon className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        isDone
                          ? "bg-green-100 text-green-700"
                          : isActive
                          ? colors.badge
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {isDone ? "✓ Tamam" : isActive ? "Çalışıyor" : step.version}
                    </span>
                  </div>
                  <h4
                    className={`font-bold text-base mb-0.5 ${
                      isActive ? colors.text : isDone ? "text-green-800" : "text-slate-600"
                    }`}
                  >
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-400 mb-4">{step.subtitle}</p>

                  {/* Detaylar */}
                  <ul className="space-y-1.5">
                    {step.details.map((d, di) => {
                      const DIcon = d.icon;
                      const show = isDone || (isActive && di <= activeIdx) || isIdle;
                      return (
                        <li
                          key={di}
                          className={`flex items-center gap-2 text-xs transition-opacity ${
                            show ? "opacity-100" : "opacity-30"
                          }`}
                        >
                          <DIcon
                            className={`w-3.5 h-3.5 shrink-0 ${
                              d.status === "warn" ? "text-amber-500" : "text-green-500"
                            }`}
                          />
                          <span className="text-slate-600">{d.text}</span>
                        </li>
                      );
                    })}
                  </ul>

                  {/* Metrikler */}
                  <div className={`grid grid-cols-3 gap-2 mt-4 pt-4 border-t ${
                    isDone ? "border-green-200" : "border-slate-200"
                  }`}>
                    {step.metrics.map((m) => (
                      <div key={m.label} className="text-center">
                        <p
                          className={`text-sm font-bold ${
                            isDone ? "text-green-700" : isActive ? colors.text : "text-slate-700"
                          }`}
                        >
                          {m.value}
                        </p>
                        <p className="text-[10px] text-slate-400">{m.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ok */}
                {idx < steps.length - 1 && (
                  <div className="flex flex-col items-center gap-1 shrink-0 w-10">
                    <div
                      className={`w-8 h-0.5 transition-all duration-300 ${
                        activeIdx > idx ? "bg-green-400" : "bg-slate-300"
                      }`}
                    />
                    <ArrowRight
                      className={`w-4 h-4 transition-all duration-300 ${
                        activeIdx > idx ? "text-green-500" : "text-slate-300"
                      }`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bağlantı Bilgileri */}
      <div className="grid grid-cols-3 gap-4">
        {[
  { label: "ERP → HKS Bağlantısı", latency: "38ms", uptime: "99.8%", color: "blue" },
  { label: "HKS → ESL Gateway", latency: "54ms", uptime: "99.4%", color: "emerald" },
          { label: "Toplam İşlem Süresi", latency: "4.2s", uptime: "—", color: "violet" },
        ].map(({ label, latency, uptime, color }) => (
          <div
            key={label}
            className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-3">
              <Wifi className={`w-4 h-4 text-${color}-500`} />
              <span className="text-xs font-semibold text-slate-600">{label}</span>
            </div>
            <div className="flex justify-between">
              <div>
                <p className="text-2xl font-bold text-slate-800">{latency}</p>
                <p className="text-xs text-slate-400">Gecikme</p>
              </div>
              {uptime !== "—" && (
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">{uptime}</p>
                  <p className="text-xs text-slate-400">Uptime</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Zamanlama Takvimi */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-4 h-4 text-slate-500" />
          <h3 className="text-sm font-semibold text-slate-700">Otomatik Senkronizasyon Takvimi</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { time: "08:00", desc: "Sabah senkronizasyonu", status: "Tamamlandı" },
            { time: "12:00", desc: "Öğle güncellemesi", status: "Tamamlandı" },
            { time: "17:42", desc: "Manuel tetikleme", status: "Tamamlandı" },
            { time: "20:00", desc: "Gece kapanış sync", status: "Bekliyor" },
          ].map((item) => (
            <div
              key={item.time}
              className={`p-3 rounded-lg border ${
                item.status === "Tamamlandı"
                  ? "bg-green-50 border-green-200"
                  : "bg-amber-50 border-amber-200"
              }`}
            >
              <p className={`text-lg font-bold ${
                item.status === "Tamamlandı" ? "text-green-700" : "text-amber-700"
              }`}>
                {item.time}
              </p>
              <p className="text-xs text-slate-600 mb-1">{item.desc}</p>
              <span
                className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                  item.status === "Tamamlandı"
                    ? "bg-green-100 text-green-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
