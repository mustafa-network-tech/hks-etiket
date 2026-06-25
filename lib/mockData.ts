export type LabelStatus = "Güncel" | "Bekliyor" | "Hata";
export type LogStatus = "Başarılı" | "Hata" | "Uyarı";
export type LogAction =
  | "Fiyat Güncelleme"
  | "Künye Eşleştirme"
  | "Etiket Güncelleme"
  | "Barkod Kontrolü"
  | "HKS Sorgulama";

export interface Product {
  id: string;
  name: string;
  barcode: string;
  price: number;
  unit: string;
  origin: string;
  supplier: string;
  hksId: string;
  branch: string;
  labelStatus: LabelStatus;
  lastUpdated: string;
}

export interface Branch {
  id: string;
  name: string;
  location: string;
  productCount: number;
  activeLabelCount: number;
  lastSync: string;
  status: "Aktif" | "Pasif";
}

export interface SyncLog {
  id: string;
  date: string;
  branch: string;
  product: string;
  action: LogAction;
  status: LogStatus;
  description: string;
}

export interface IntegrationStep {
  id: string;
  title: string;
  subtitle: string;
  status: "success" | "pending" | "error";
  details: string[];
}

export const branches: Branch[] = [
  {
    id: "b1",
    name: "Merkez Market",
    location: "Kapalıçarşı Cad. No:12, İstanbul",
    productCount: 118,
    activeLabelCount: 112,
    lastSync: "25.06.2026 17:42",
    status: "Aktif",
  },
  {
    id: "b2",
    name: "Şube Market",
    location: "Bağcılar Mah. No:47, İstanbul",
    productCount: 96,
    activeLabelCount: 89,
    lastSync: "25.06.2026 17:38",
    status: "Aktif",
  },
];

export const products: Product[] = [
  {
    id: "p01",
    name: "Domates",
    barcode: "8690012345601",
    price: 24.9,
    unit: "kg",
    origin: "Antalya",
    supplier: "Akdeniz Tarım A.Ş.",
    hksId: "HKS-2026-00341",
    branch: "Merkez Market",
    labelStatus: "Güncel",
    lastUpdated: "25.06.2026 17:42",
  },
  {
    id: "p02",
    name: "Salatalık",
    barcode: "8690012345602",
    price: 18.5,
    unit: "kg",
    origin: "Mersin",
    supplier: "Güney Gıda Ltd.",
    hksId: "HKS-2026-00342",
    branch: "Merkez Market",
    labelStatus: "Güncel",
    lastUpdated: "25.06.2026 17:42",
  },
  {
    id: "p03",
    name: "Patates",
    barcode: "8690012345603",
    price: 12.75,
    unit: "kg",
    origin: "Niğde",
    supplier: "Anadolu Tarım Koop.",
    hksId: "HKS-2026-00343",
    branch: "Merkez Market",
    labelStatus: "Bekliyor",
    lastUpdated: "25.06.2026 16:30",
  },
  {
    id: "p04",
    name: "Elma",
    barcode: "8690012345604",
    price: 32.0,
    unit: "kg",
    origin: "Isparta",
    supplier: "Isparta Meyve San.",
    hksId: "HKS-2026-00344",
    branch: "Merkez Market",
    labelStatus: "Güncel",
    lastUpdated: "25.06.2026 17:40",
  },
  {
    id: "p05",
    name: "Portakal",
    barcode: "8690012345605",
    price: 22.5,
    unit: "kg",
    origin: "Adana",
    supplier: "Çukurova Narenciye",
    hksId: "HKS-2026-00345",
    branch: "Şube Market",
    labelStatus: "Güncel",
    lastUpdated: "25.06.2026 17:38",
  },
  {
    id: "p06",
    name: "Muz",
    barcode: "8690012345606",
    price: 54.9,
    unit: "kg",
    origin: "Alanya",
    supplier: "Akdeniz Meyve A.Ş.",
    hksId: "HKS-2026-00346",
    branch: "Şube Market",
    labelStatus: "Hata",
    lastUpdated: "25.06.2026 15:20",
  },
  {
    id: "p07",
    name: "Biber",
    barcode: "8690012345607",
    price: 29.9,
    unit: "kg",
    origin: "Gaziantep",
    supplier: "Güneydoğu Tarım Ltd.",
    hksId: "HKS-2026-00347",
    branch: "Şube Market",
    labelStatus: "Bekliyor",
    lastUpdated: "25.06.2026 16:55",
  },
  {
    id: "p08",
    name: "Soğan",
    barcode: "8690012345608",
    price: 8.9,
    unit: "kg",
    origin: "Afyonkarahisar",
    supplier: "Batı Anadolu Koop.",
    hksId: "—",
    branch: "Merkez Market",
    labelStatus: "Hata",
    lastUpdated: "25.06.2026 14:10",
  },
];

export const syncLogs: SyncLog[] = [
  {
    id: "l01",
    date: "25.06.2026 17:42",
    branch: "Merkez Market",
    product: "Domates",
    action: "Fiyat Güncelleme",
    status: "Başarılı",
    description: "Mikro ERP'den fiyat güncellendi: ₺22,90 → ₺24,90",
  },
  {
    id: "l02",
    date: "25.06.2026 17:42",
    branch: "Merkez Market",
    product: "Salatalık",
    action: "Etiket Güncelleme",
    status: "Başarılı",
    description: "Raf etiketi başarıyla güncellendi",
  },
  {
    id: "l03",
    date: "25.06.2026 17:41",
    branch: "Merkez Market",
    product: "Patates",
    action: "Künye Eşleştirme",
    status: "Başarılı",
    description: "HKS künye bilgisi eşleşti: HKS-2026-00343",
  },
  {
    id: "l04",
    date: "25.06.2026 17:38",
    branch: "Şube Market",
    product: "Portakal",
    action: "Etiket Güncelleme",
    status: "Başarılı",
    description: "Raf etiketi başarıyla güncellendi",
  },
  {
    id: "l05",
    date: "25.06.2026 16:55",
    branch: "Şube Market",
    product: "Biber",
    action: "Barkod Kontrolü",
    status: "Uyarı",
    description: "Barkod eşleşmedi — manuel doğrulama bekleniyor",
  },
  {
    id: "l06",
    date: "25.06.2026 15:20",
    branch: "Şube Market",
    product: "Muz",
    action: "HKS Sorgulama",
    status: "Hata",
    description: "HKS künye bulunamadı — kayıt sisteme ulaşamıyor",
  },
  {
    id: "l07",
    date: "25.06.2026 14:10",
    branch: "Merkez Market",
    product: "Soğan",
    action: "HKS Sorgulama",
    status: "Hata",
    description: "HKS künye no eksik — ERP kaydı tamamlanmamış",
  },
  {
    id: "l08",
    date: "25.06.2026 17:40",
    branch: "Merkez Market",
    product: "Elma",
    action: "Fiyat Güncelleme",
    status: "Başarılı",
    description: "Mikro ERP'den fiyat güncellendi: ₺28,00 → ₺32,00",
  },
  {
    id: "l09",
    date: "25.06.2026 16:30",
    branch: "Merkez Market",
    product: "Patates",
    action: "Etiket Güncelleme",
    status: "Uyarı",
    description: "Etiket güncellemesi kuyruğa alındı — bağlantı gecikmesi",
  },
  {
    id: "l10",
    date: "25.06.2026 17:38",
    branch: "Şube Market",
    product: "Muz",
    action: "Fiyat Güncelleme",
    status: "Başarılı",
    description: "Mikro ERP'den fiyat güncellendi: ₺49,90 → ₺54,90",
  },
];

export const integrationSteps: IntegrationStep[] = [
  {
    id: "s1",
    title: "Mikro ERP",
    subtitle: "Kaynak Sistem",
    status: "success",
    details: [
      "Bağlantı başarılı",
      "312 ürün çekildi",
      "Fiyat & stok verileri hazır",
      "Son sorgu: 17:42",
    ],
  },
  {
    id: "s2",
    title: "HKS Hal Kayıt Sistemi",
    subtitle: "Künye & Menşei",
    status: "success",
    details: [
      "API bağlantısı aktif",
      "286 künye eşleşti",
      "Menşei bilgileri doğrulandı",
      "2 künye bulunamadı",
    ],
  },
  {
    id: "s3",
    title: "Elektronik Raf Etiketi",
    subtitle: "ESL Gateway",
    status: "success",
    details: [
      "Gateway bağlantısı kuruldu",
      "559 etiket aktif",
      "274 etiket güncellendi",
      "3 etiket hata durumunda",
    ],
  },
];

export const dashboardStats = {
  totalProducts: 214,
  syncedLabels: 201,
  errorCount: 3,
  pendingCount: 7,
  lastSync: "25.06.2026 17:42:18",
  syncDuration: "4.2 sn",
};
