// UI 카피 다국어 번역. 영어/일본어 랜딩 페이지(`/en`, `/ja`)에서 사용.
export type Locale = "en" | "ja";

interface Promise {
  title: string;
  description: string;
}

export interface PageCopy {
  meta: { title: string; description: string };
  nav: { brand: string; menu: string; stores: string; franchise: string; contactCta: string };
  hero: {
    eyebrow: string;
    headline: string;
    headlineAccent: string;
    sub: string;
    priceLabel: string;
    priceUnit: string;
    priceNote: string;
    primaryCta: string;
    secondaryCta: string;
  };
  promises: { eyebrow: string; items: Promise[] };
  menu: {
    eyebrow: string;
    headline: string;
    signatureLabel: string;
    sideLabel: string;
    mealLabel: string;
    tableNote: string;
  };
  stores: {
    eyebrow: string;
    headline: string;
    intro: string;
    directLabel: string;
    partnerLabel: string;
    detailLink: string;
    flagshipBadge: string;
  };
  franchise: {
    eyebrow: string;
    headline: string;
    body: string;
    cta: string;
    note: string;
  };
  footer: {
    tagline: string;
    contactLabel: string;
    legalLine: string;
    sourceLabel: string;
    languageLabel: string;
  };
}

export const translations: Record<Locale, PageCopy> = {
  en: {
    meta: {
      title: "olbaroGALBI — Honest Charcoal Galbi from Busan",
      description:
        "Born in Busan, olbaroGALBI grills pork and beef ribs over real charcoal — house marinade, signature pork galbi at 3,500 KRW/100g, 10 locations across Busan, Gyeongnam, and Daegu.",
    },
    nav: {
      brand: "Brand",
      menu: "Menu",
      stores: "Stores",
      franchise: "Franchise",
      contactCta: "HQ +82-10-5722-4929",
    },
    hero: {
      eyebrow: "Brand Promise",
      headline: "Honest charcoal galbi,",
      headlineAccent: "anyone can enjoy.",
      sub: "Born in Busan — olbaroGALBI grills good meat the right way.",
      priceLabel: "House Marinated Pork Galbi",
      priceUnit: "/100g",
      priceNote:
        "Table charge KRW 3,000 per table · Prices may vary by location.",
      primaryCta: "Franchise Inquiry — 24h response",
      secondaryCta: "View 10 stores",
    },
    promises: {
      eyebrow: "Brand Promise",
      items: [
        {
          title: "Good Ingredients",
          description: "Honestly selected\ndomestic Korean pork.",
        },
        {
          title: "Real Charcoal",
          description: "Strong charcoal heat\nbrings out true flavor.",
        },
        {
          title: "House Marinade",
          description: "Our own recipe\nfor deep, lasting taste.",
        },
        {
          title: "Fair Price",
          description: "Affordable price\nanyone can enjoy.",
        },
        {
          title: "Stable Operation",
          description: "Systemized HQ support\nfor confident franchising.",
        },
      ],
    },
    menu: {
      eyebrow: "Signature Menu",
      headline: "Four signatures.\nOne unified HQ price.",
      signatureLabel: "Signature Galbi",
      sideLabel: "Sides & Specialty",
      mealLabel: "Meal · Soup · Noodles",
      tableNote:
        "※ Table charge KRW 3,000 per table · Prices may vary slightly by location.",
    },
    stores: {
      eyebrow: "Stores",
      headline: "10 locations across\nBusan · Gyeongnam · Daegu.",
      intro:
        "From 3 HQ-direct stores in Busan to 10 locations across Busan, Gyeongnam, and Daegu — all serving the four signature menus at the same unified price.",
      directLabel: "Direct · HQ-Run",
      partnerLabel: "Partner · Franchise",
      detailLink: "Details",
      flagshipBadge: "FLAGSHIP",
    },
    franchise: {
      eyebrow: "Franchise",
      headline: "Run by HQ.\nGrow with olbaro.",
      body: "Initial fee KRW 5.5M + Training KRW 5.5M, zero deposit, monthly royalty of 1.65% or KRW 440,000 (whichever is greater, VAT included). All costs are publicly disclosed in the Korea FTC franchise disclosure document (Reg. 2025.0854).",
      cta: "Inquire (Korean recommended)",
      note: "※ Franchise consultation is conducted in Korean. For inquiries from overseas, please contact HQ directly at +82-10-5722-4929 or frasier2015@naver.com.",
    },
    footer: {
      tagline:
        "Good meat, done right. The galbi brand you’ll enjoy without burden and remember for a long time.",
      contactLabel: "HQ Contact",
      legalLine:
        "Franchise disclosure registration 2025.0854 (Korea Fair Trade Commission) · Escrow: Shinhan Bank · Damage compensation insurance: Seoul Guarantee Insurance",
      sourceLabel:
        "※ This English page is a summary. Original Korean content takes precedence in case of discrepancy.",
      languageLabel: "Language",
    },
  },
  ja: {
    meta: {
      title: "オルバロカルビ olbaroGALBI — 釜山発の本格炭火カルビ",
      description:
        "釜山で生まれたオルバロカルビ。本物の炭火で焼き上げる豚・牛カルビ。自家製ヤンニョム、看板のヤンニョム豚カルビ 100gあたり3,500ウォン、釜山・慶南・大邱に10店舗。",
    },
    nav: {
      brand: "ブランド",
      menu: "メニュー",
      stores: "店舗",
      franchise: "フランチャイズ",
      contactCta: "本社 +82-10-5722-4929",
    },
    hero: {
      eyebrow: "Brand Promise",
      headline: "気軽に楽しめる、",
      headlineAccent: "本格炭火カルビ。",
      sub: "釜山が育んだ正直な味、オルバロカルビ。",
      priceLabel: "自家製ヤンニョム豚カルビ",
      priceUnit: "/100g",
      priceNote:
        "席料 1テーブル3,000ウォン別途 · 価格は店舗により変動の場合あり。",
      primaryCta: "加盟相談 — 24時間以内ご返信",
      secondaryCta: "全国10店舗を見る",
    },
    promises: {
      eyebrow: "ブランド約束",
      items: [
        {
          title: "良い食材",
          description: "厳選した国産豚肉を\n正直に選別します。",
        },
        {
          title: "本物の炭火",
          description: "炭火の強い火力で\n味と香りを最大化。",
        },
        {
          title: "特製ヤンニョム",
          description: "オルバロだけの秘伝で\n深い味わいを完成。",
        },
        {
          title: "手頃な価格",
          description: "合理的な価格で\nどなたでも楽しめます。",
        },
        {
          title: "安定した運営",
          description: "体系的な本社支援で\n安心の創業を後押し。",
        },
      ],
    },
    menu: {
      eyebrow: "シグネチャーメニュー",
      headline: "本社統一価格、\nシグネチャー4種。",
      signatureLabel: "シグネチャー カルビ",
      sideLabel: "サイド・特選部位",
      mealLabel: "食事・チゲ・麺",
      tableNote:
        "※ 席料 1テーブル3,000ウォン別途 · 店舗事情により価格が変動する場合があります。",
    },
    stores: {
      eyebrow: "店舗",
      headline: "釜山・慶南・大邱、\n全国10店舗。",
      intro:
        "釜山・釜田の本社直営3店舗からスタートし、釜山・慶南・大邱の10店舗まで展開。すべての店舗でシグネチャー4種を同じ統一価格で提供しています。",
      directLabel: "Direct · 本社直営",
      partnerLabel: "Partner · 加盟店",
      detailLink: "詳細",
      flagshipBadge: "FLAGSHIP",
    },
    franchise: {
      eyebrow: "加盟募集",
      headline: "本社直伝、\n一緒に行きましょう。",
      body: "加盟費550万ウォン + 教育費550万ウォン、保証金なし。ロイヤリティは月売上の1.65%もしくは月44万ウォン（高い方、税込）。全費用は公正取引委員会の情報公開書 2025.0854 に公開されています。",
      cta: "加盟相談（韓国語推奨）",
      note: "※ 加盟相談は韓国語で行います。海外からのお問い合わせは本社 +82-10-5722-4929 または frasier2015@naver.com まで直接ご連絡ください。",
    },
    footer: {
      tagline:
        "良い肉を、もっと正しく。気軽に楽しめて、長く記憶に残るカルビブランド。",
      contactLabel: "本社連絡先",
      legalLine:
        "情報公開書登録番号 2025.0854 (韓国公正取引委員会) · 加盟金預置機関 新韓銀行 · 被害補償保険 ソウル保証保険(株)",
      sourceLabel:
        "※ 本日本語ページは要約です。原文（韓国語）と相違がある場合は韓国語版が優先します。",
      languageLabel: "言語",
    },
  },
};
