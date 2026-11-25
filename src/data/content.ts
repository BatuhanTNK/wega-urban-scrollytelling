export type Locale = "tr" | "en";

export interface ContentDictionary {
  nav: {
    links: { label: string; target: string; progress?: number }[];
    cta: string;
  };
  loader: {
    label: string;
  };
  beats: {
    hero: {
      eyebrow: string;
      headline: string;
      modelTag: string;
      tagline: string;
      supporting: string;
      scrollHint: string;
    };
    beat1: {
      eyebrow: string;
      headline: string;
      line1: string;
      line2: string;
      metrics: { value: string; label: string }[];
    };
    beat2: {
      eyebrow: string;
      headline: string;
      points: { title: string; detail: string }[];
    };
    beat3: {
      eyebrow: string;
      headline: string;
      subcopy: string;
      telemetry: { pressure: string; temp: string; status: string };
    };
    resolution: {
      eyebrow: string;
      headline: string;
      subheadline: string;
      primaryCta: string;
      secondaryCta: string;
    };
  };
  chapters: string[];
  specs: {
    eyebrow: string;
    title: string;
    subtitle: string;
    pillars: {
      index: string;
      title: string;
      description: string;
    }[];
    tableTitle: string;
    rows: { label: string; value: string }[];
    closingBanner: {
      title: string;
      desc: string;
      cta: string;
    };
    footerNote: string;
  };
  modal: {
    eyebrow: string;
    title: string;
    subtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    venueLabel: string;
    venuePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    submit: string;
    successTitle: string;
    successDesc: string;
    close: string;
  };
}

export const CONTENT: Record<Locale, ContentDictionary> = {
  tr: {
    nav: {
      links: [
        { label: "Genel Bakış", target: "stage", progress: 0 },
        { label: "Mimari", target: "stage", progress: 0.27 },
        { label: "İnovasyon", target: "stage", progress: 0.54 },
        { label: "Ekstraksiyon", target: "stage", progress: 0.76 },
        { label: "Özellikler", target: "specs" },
      ],
      cta: "Urban'ı Deneyimle",
    },
    loader: {
      label: "Sekans hazırlanıyor",
    },
    beats: {
      hero: {
        eyebrow: "ITALIAN FLAGSHIP SERIES",
        headline: "WEGA URBAN",
        modelTag: "EVD 3GR",
        tagline: "Mühendislik, kusursuz ritüele dönüştüğünde.",
        supporting:
          "Venedik espresso mirasını saf bakır termal mimari ve heykelsi endüstriyel tasarımla buluşturan amiral gemisi 3 gruplu profesyonel espresso makinesi.",
        scrollHint: "Keşfetmek için kaydırın",
      },
      beat1: {
        eyebrow: "01 — MİMARİ & ZANAAT",
        headline: "Her milimetrede saf bakır ve fırçalanmış çelik.",
        line1:
          "Yüksek yoğunluklu bakır kazanlar, pirinç hidrolik hatlar ve lazer kesim paslanmaz şasi tek bir bütünsel blokta birleşir.",
        line2:
          "En yoğun servis saatlerinde bile termal dengeyi koruyan, uzun ömürlü İtalyan makine mühendisliği.",
        metrics: [
          { value: "±0.1°C", label: "PID Termal Kararlılık" },
          { value: "3 Grup", label: "Bağımsız Demleme Mimarisi" },
        ],
      },
      beat2: {
        eyebrow: "02 — İMZA İNOVASYON",
        headline: "Akıllı kontrol. Mimari ışık imzası.",
        points: [
          {
            title: "Çoklu Kazan Termal Otonomi",
            detail: "Her grup için bağımsız sıcaklık profilleme ve anında buhar gücü.",
          },
          {
            title: "Kapasitif Kontrol & OLED Merkez",
            detail: "Gerçek zamanlı ekstraksiyon sayacı, dokunsal tepki ve sezgisel barista akışı.",
          },
          {
            title: "İmza LED Kontur Aydınlatma",
            detail: "Mat siyah yan panelleri ve çalışma alanını çerçeveleyen keskin mimari ışık çizgisi.",
          },
        ],
      },
      beat3: {
        eyebrow: "03 — DUYUSAL EKSTRAKSİYON",
        headline: "9 bar basınç. Kadifemsi fındık krema.",
        subcopy:
          "Hassas ön demleme profili, her çekirdeğin aromatik katmanlarını yakmadan açığa çıkarır. İlk damladan son yuduma kadar değişmeyen yoğunluk ve İtalyan espresso karakteri.",
        telemetry: {
          pressure: "9.0 BAR",
          temp: "93.2°C",
          status: "OPTİMAL EKSTRAKSİYON",
        },
      },
      resolution: {
        eyebrow: "WEGA URBAN EVD 3GR",
        headline: "Barın yeni merkez üssü.",
        subheadline:
          "Ödünsüz mühendislik, zamansız estetik ve her fincanda tekrarlanabilir mükemmellik.",
        primaryCta: "Urban'ı Deneyimle",
        secondaryCta: "Tüm teknik özellikleri incele",
      },
    },
    chapters: ["Giriş", "Mimari", "İnovasyon", "Ekstraksiyon", "Final"],
    specs: {
      eyebrow: "TEKNİK MİMARİ",
      title: "Kusursuzluk, detaylarda ölçülür.",
      subtitle:
        "Yüksek hacimli özel kahve barları, lüks oteller ve tasarım odaklı mekanlar için kalibre edildi.",
      pillars: [
        {
          index: "01",
          title: "Saf Bakır & Pirinç Hidrolik",
          description:
            "Üstün ısı iletkenliği sunan bakır kazan mimarisi ve pirinç valf grupları ile ardışık ekstraksiyonlarda sıfır sıcaklık sapması.",
        },
        {
          index: "02",
          title: "Ergonomik Barista İş Akışı",
          description:
            "Çift soğuk dokunuşlu buhar çubuğu, kademesiz döner kontrol düğmeleri ve geniş aydınlatmalı çalışma alanı.",
        },
        {
          index: "03",
          title: "Akıllı Enerji Yönetimi",
          description:
            "Gece modu, programlanabilir otomatik açılış ve grup bazlı bekleme yönetimi ile %30'a varan enerji verimliliği.",
        },
      ],
      tableTitle: "WEGA Urban EVD 3GR — Teknik Özellikler",
      rows: [
        { label: "Konfigürasyon", value: "3 Grup • Elektronik Hacimsel Dozaj (EVD)" },
        { label: "Kazan Mimarisi", value: "Çoklu Kazan — Saf Bakır Buhar & Bağımsız Demleme" },
        { label: "Buhar Kazanı Kapasitesi", value: "17.0 Litre (Yüksek Basınçlı)" },
        { label: "Sıcaklık Kontrolü", value: "Grup Bazlı Dijital PID (±0.1°C Hassasiyet)" },
        { label: "Pompa Basıncı", value: "9.0 Bar Sabit Rotatif Pompa • Ön Demleme Destekli" },
        { label: "Gövde & Kaplama", value: "Fırçalanmış Paslanmaz Çelik & Mat Obsidyen Paneller" },
        { label: "Aydınlatma", value: "Entegre Beyaz LED Yan Kontur & Barista Alan Işığı" },
        { label: "Buhar & Sıcak Su", value: "2× Cool-Touch Buhar Çubuğu • 1× Programlanabilir Sıcak Su" },
        { label: "Elektrik Gücü", value: "380–415V 3N~ • 5.8 kW" },
        { label: "Boyutlar (G × D × Y)", value: "1020 × 605 × 555 mm • 94 kg" },
      ],
      closingBanner: {
        title: "Mekanınız için özel sunum planlayın.",
        desc: "Wega uzman ekibiyle birebir showroom demosu, hidrolik kurulum danışmanlığı ve özel konfigürasyon seçeneklerini keşfedin.",
        cta: "Özel Demo Talep Et",
      },
      footerNote: "WEGA Macchine per Caffè • Crafted in Susegana, Italy",
    },
    modal: {
      eyebrow: "ÖZEL DENEYİM & TEKLİF",
      title: "WEGA Urban ile tanışın.",
      subtitle:
        "Bilgilerinizi bırakın; teknik danışmanımız showroom demosu ve mekanınıza özel teklif için sizinle iletişime geçsin.",
      nameLabel: "Ad Soyad",
      namePlaceholder: "Örn. Deniz Kaya",
      venueLabel: "İşletme / Mekan",
      venuePlaceholder: "Örn. Roastery & Espresso Bar",
      emailLabel: "E-posta",
      emailPlaceholder: "deniz@roastery.com",
      submit: "Talebi Gönder",
      successTitle: "Talebiniz alındı.",
      successDesc:
        "Wega flagship danışmanlık ekibimiz en kısa sürede özel demo planlaması için dönüş yapacaktır.",
      close: "Kapat",
    },
  },
  en: {
    nav: {
      links: [
        { label: "Overview", target: "stage", progress: 0 },
        { label: "Architecture", target: "stage", progress: 0.27 },
        { label: "Innovation", target: "stage", progress: 0.54 },
        { label: "Extraction", target: "stage", progress: 0.76 },
        { label: "Specs", target: "specs" },
      ],
      cta: "Experience Urban",
    },
    loader: {
      label: "Preparing sequence",
    },
    beats: {
      hero: {
        eyebrow: "ITALIAN FLAGSHIP SERIES",
        headline: "WEGA URBAN",
        modelTag: "EVD 3GR",
        tagline: "Precision engineering, perfected in every drop.",
        supporting:
          "A flagship three-group commercial espresso machine uniting Venetian coffee heritage with pure copper thermal architecture and sculpted industrial design.",
        scrollHint: "Scroll to explore",
      },
      beat1: {
        eyebrow: "01 — ARCHITECTURE & CRAFT",
        headline: "Pure copper heart. Brushed steel skeleton.",
        line1:
          "High-mass copper boilers, brass hydraulic manifolds, and laser-cut stainless framing lock together with millimeter precision.",
        line2:
          "Built to maintain unwavering thermal equilibrium through peak-hour service, year after year.",
        metrics: [
          { value: "±0.1°C", label: "PID Thermal Stability" },
          { value: "3-Group", label: "Independent Brew Architecture" },
        ],
      },
      beat2: {
        eyebrow: "02 — SIGNATURE INNOVATION",
        headline: "Intelligent control. Sculptural light signature.",
        points: [
          {
            title: "Multi-Boiler Thermal Autonomy",
            detail: "Independent temperature profiling per group with continuous dry-steam power.",
          },
          {
            title: "Capacitive Touch & OLED Center",
            detail: "Real-time shot chronometer, tactile feedback, and effortless barista ergonomics.",
          },
          {
            title: "Architectural LED Contour",
            detail: "Crisp white light framing matte obsidian side panels and illuminating the brew bay.",
          },
        ],
      },
      beat3: {
        eyebrow: "03 — SENSORY EXTRACTION",
        headline: "Nine bars of pressure. Velvety hazelnut crema.",
        subcopy:
          "Calibrated pre-infusion gently unlocks every volatile aromatic note without scorching. Consistent body, sweet clarity, and unmistakable Italian espresso character in every cup.",
        telemetry: {
          pressure: "9.0 BAR",
          temp: "93.2°C",
          status: "OPTIMAL EXTRACTION",
        },
      },
      resolution: {
        eyebrow: "WEGA URBAN EVD 3GR",
        headline: "The new centerpiece of the bar.",
        subheadline:
          "Uncompromising engineering, timeless presence, and repeatable perfection in every pour.",
        primaryCta: "Experience Urban",
        secondaryCta: "Explore full specifications",
      },
    },
    chapters: ["Intro", "Architecture", "Innovation", "Extraction", "Finale"],
    specs: {
      eyebrow: "TECHNICAL ARCHITECTURE",
      title: "Perfection is measured in tolerances.",
      subtitle:
        "Calibrated for high-volume specialty coffee bars, luxury hospitality, and design-led flagship spaces.",
      pillars: [
        {
          index: "01",
          title: "Pure Copper & Brass Hydraulics",
          description:
            "Superior thermal conductivity across copper boilers and precision brass valves delivers zero temperature drift during back-to-back rushes.",
        },
        {
          index: "02",
          title: "Ergonomic Barista Workflow",
          description:
            "Dual cool-touch steam wands, progressive rotary controls, and an illuminated stainless workspace designed around speed and grace.",
        },
        {
          index: "03",
          title: "Eco-Smart Energy Architecture",
          description:
            "Night-mode insulation, programmable wake schedules, and individual group standby cut energy draw by up to 30%.",
        },
      ],
      tableTitle: "WEGA Urban EVD 3GR — Full Specifications",
      rows: [
        { label: "Configuration", value: "3-Group • Electronic Volumetric Dosage (EVD)" },
        { label: "Boiler Architecture", value: "Multi-Boiler — Pure Copper Steam & Independent Brew" },
        { label: "Steam Boiler Capacity", value: "17.0 Liters (High-Pressure Recovery)" },
        { label: "Thermal Control", value: "Per-Group Digital PID (±0.1°C Precision)" },
        { label: "Extraction Pressure", value: "9.0 Bar Rotary Vane Pump • Calibrated Pre-Infusion" },
        { label: "Chassis & Finish", value: "Brushed Stainless Steel & Matte Obsidian Panels" },
        { label: "Lighting", value: "Integrated Architectural White LED Contour & Workspace" },
        { label: "Steam & Hot Water", value: "2× Cool-Touch Steam Wands • 1× Programmable Hot Water" },
        { label: "Electrical Rating", value: "380–415V 3N~ • 5.8 kW" },
        { label: "Dimensions (W × D × H)", value: "1020 × 605 × 555 mm • 94 kg" },
      ],
      closingBanner: {
        title: "Schedule a private flagship presentation.",
        desc: "Connect with Wega specialists for a live showroom tasting, hydraulic installation guidance, and bespoke finish options.",
        cta: "Request Private Demo",
      },
      footerNote: "WEGA Macchine per Caffè • Crafted in Susegana, Italy",
    },
    modal: {
      eyebrow: "PRIVATE EXPERIENCE & INQUIRY",
      title: "Discover WEGA Urban.",
      subtitle:
        "Leave your details and our flagship specialist team will arrange a private showroom demonstration and tailored quote.",
      nameLabel: "Full Name",
      namePlaceholder: "e.g. Elena Rossi",
      venueLabel: "Hospitality / Coffee Bar",
      venuePlaceholder: "e.g. Atelier Coffee Roasters",
      emailLabel: "Email",
      emailPlaceholder: "elena@ateliercoffee.com",
      submit: "Submit Request",
      successTitle: "Request received.",
      successDesc:
        "Our Wega flagship concierge team will contact you shortly to schedule your private demonstration.",
      close: "Close",
    },
  },
};
