import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

// A안 — Charcoal Kiln palette
const CHARCOAL = { r: 0x1C, g: 0x1A, b: 0x18 }; // #1C1A18
const IVORY    = { r: 0xF4, g: 0xEC, b: 0xD8 }; // #F4ECD8
const EMBER    = { r: 0xC0, g: 0x39, b: 0x2B }; // #C0392B
const BRASS    = { r: 0xB0, g: 0x85, b: 0x45 }; // #B08545

const SRC = 'c:/Users/jeonw/.antigravity/alrightgalbi/갈비이미지.jpg';
const OUT_DIR = 'c:/Users/jeonw/.antigravity/alrightgalbi/hero-out';
mkdirSync(OUT_DIR, { recursive: true });

// 16:9 hero canvas
const W = 1920;
const H = 1080;

// 1) Base background — radial-like gradient + left scrim for text legibility
const bgSvg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="g" cx="64%" cy="50%" r="82%">
      <stop offset="0%"  stop-color="#3A2A1F" stop-opacity="1"/>
      <stop offset="42%" stop-color="#241B14" stop-opacity="1"/>
      <stop offset="100%" stop-color="#0B0907" stop-opacity="1"/>
    </radialGradient>
    <linearGradient id="leftScrim" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#000" stop-opacity="0.78"/>
      <stop offset="35%" stop-color="#000" stop-opacity="0.32"/>
      <stop offset="60%" stop-color="#000" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="vignette" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#000" stop-opacity="0.35"/>
      <stop offset="50%" stop-color="#000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0.55"/>
    </linearGradient>
    <pattern id="grain" x="0" y="0" width="3" height="3" patternUnits="userSpaceOnUse">
      <rect width="3" height="3" fill="#000" fill-opacity="0"/>
      <circle cx="1" cy="1" r="0.5" fill="#F4ECD8" fill-opacity="0.04"/>
    </pattern>
    <pattern id="hanji" x="0" y="0" width="240" height="240" patternUnits="userSpaceOnUse">
      <rect width="240" height="240" fill="#F4ECD8" fill-opacity="0.012"/>
      <path d="M0 80 Q120 60 240 80 M0 160 Q120 180 240 160" stroke="#F4ECD8" stroke-opacity="0.025" stroke-width="0.7" fill="none"/>
      <circle cx="40" cy="120" r="0.6" fill="#F4ECD8" fill-opacity="0.05"/>
      <circle cx="180" cy="40" r="0.5" fill="#F4ECD8" fill-opacity="0.05"/>
      <circle cx="200" cy="200" r="0.5" fill="#F4ECD8" fill-opacity="0.05"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect width="100%" height="100%" fill="url(#hanji)"/>
  <rect width="100%" height="100%" fill="url(#vignette)"/>
  <rect width="100%" height="100%" fill="url(#grain)"/>
  <rect width="100%" height="100%" fill="url(#leftScrim)"/>
</svg>
`;

// 2) Load galbi image and prepare a softly feathered version
const meta = await sharp(SRC).metadata();
const galbiTargetH = Math.round(H * 0.92);
const galbiTargetW = Math.round((meta.width / meta.height) * galbiTargetH);

const galbi = await sharp(SRC)
  .resize(galbiTargetW, galbiTargetH, { fit: 'cover' })
  .modulate({ saturation: 1.05, brightness: 1.02 })
  .toBuffer();

// 3) Soft edge mask (rounded rect with strong feather)
const r = 80;
const featherSvg = `
<svg width="${galbiTargetW}" height="${galbiTargetH}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="f"><feGaussianBlur stdDeviation="42"/></filter>
  </defs>
  <rect x="0" y="0" width="${galbiTargetW}" height="${galbiTargetH}" rx="${r}" ry="${r}" fill="#fff" filter="url(#f)"/>
</svg>
`;

const galbiMasked = await sharp(galbi)
  .composite([{ input: Buffer.from(featherSvg), blend: 'dest-in' }])
  .png()
  .toBuffer();

// 4) Drop shadow layer for depth — slight ember glow under the meat
const glowSvg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="64%" cy="58%" r="42%">
      <stop offset="0%" stop-color="#C0392B" stop-opacity="0.14"/>
      <stop offset="55%" stop-color="#7A1F12" stop-opacity="0.04"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#glow)"/>
</svg>
`;

// Position galbi image — pushed to the right (58%~) for left text zone
const galbiX = Math.round(W * 0.46);
const galbiY = Math.round((H - galbiTargetH) / 2);

const composed = await sharp(Buffer.from(bgSvg))
  .composite([
    { input: Buffer.from(glowSvg), blend: 'screen' },
    { input: galbiMasked, left: galbiX, top: galbiY },
  ])
  .jpeg({ quality: 92, mozjpeg: true })
  .toFile(`${OUT_DIR}/hero-1920.jpg`);

// Also create a centered variant (no text room) for vertical hero/og
const W2 = 1600, H2 = 1600;
const bgSvg2 = bgSvg.replace(`width="${W}"`, `width="${W2}"`).replace(`height="${H}"`, `height="${H2}"`);
const glowSvg2 = glowSvg.replace(`width="${W}"`, `width="${W2}"`).replace(`height="${H}"`, `height="${H2}"`);
const galbi2H = Math.round(H2 * 0.82);
const galbi2W = Math.round((meta.width / meta.height) * galbi2H);
const galbi2 = await sharp(SRC)
  .resize(galbi2W, galbi2H, { fit: 'cover' })
  .modulate({ saturation: 1.05, brightness: 1.02 })
  .toBuffer();
const feather2 = `
<svg width="${galbi2W}" height="${galbi2H}" xmlns="http://www.w3.org/2000/svg">
  <defs><filter id="f"><feGaussianBlur stdDeviation="48"/></filter></defs>
  <rect x="0" y="0" width="${galbi2W}" height="${galbi2H}" rx="96" ry="96" fill="#fff" filter="url(#f)"/>
</svg>`;
const galbi2Masked = await sharp(galbi2)
  .composite([{ input: Buffer.from(feather2), blend: 'dest-in' }])
  .png()
  .toBuffer();

await sharp(Buffer.from(bgSvg2))
  .composite([
    { input: Buffer.from(glowSvg2), blend: 'screen' },
    { input: galbi2Masked, left: Math.round((W2-galbi2W)/2), top: Math.round((H2-galbi2H)/2) },
  ])
  .jpeg({ quality: 92, mozjpeg: true })
  .toFile(`${OUT_DIR}/hero-square-1600.jpg`);

console.log('OK');
console.log('-', `${OUT_DIR}/hero-1920.jpg`);
console.log('-', `${OUT_DIR}/hero-square-1600.jpg`);
