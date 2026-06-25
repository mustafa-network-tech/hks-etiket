# MK Digital Systems — Demo Panel

**ERP + HKS + Elektronik Raf Etiketi Entegrasyon Demo Paneli**

Bu panel, 2 şubeli market yapısında **Mikro ERP**, **HKS Hal Kayıt Sistemi** ve **Elektronik Raf Etiketi** entegrasyon akışını müşterilere göstermek amacıyla hazırlanmış bir demo uygulamasıdır.

> ⚠️ **Demo Modu:** Tüm veriler simüle edilmektedir. Gerçek API bağlantısı içermez.

---

## Sayfalar

| Sayfa | Açıklama |
|---|---|
| Dashboard | Genel istatistikler, şube kartları, senkronizasyon butonu |
| Şubeler | Şube bazlı ürün & etiket durumu |
| Ürünler | Filtreli ürün tablosu (barkod, HKS No, etiket durumu) |
| Entegrasyon Akışı | ERP → HKS → ESL görsel akış diyagramı |
| Senkronizasyon Logları | İşlem kayıtları ve hata takibi |
| Ayarlar | API bağlantı yapılandırması |

## Teknoloji

- [Next.js 16](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/)

## Kurulum

```bash
npm install
npm run dev
```

Uygulama `http://localhost:3000` adresinde çalışır.

## Üretim Derlemesi

```bash
npm run build
npm start
```

---

© 2026 MK Digital Systems
