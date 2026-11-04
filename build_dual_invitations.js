const fs = require('fs');

// Helper to replace between two exact delimiters
function replaceBetween(content, startDelim, endDelim, replacement) {
  const startIdx = content.indexOf(startDelim);
  if (startIdx === -1) {
    throw new Error(`startDelim not found: ${startDelim.substring(0, 50)}`);
  }
  const endIdx = content.indexOf(endDelim, startIdx + startDelim.length);
  if (endIdx === -1) {
    throw new Error(`endDelim not found: ${endDelim.substring(0, 50)}`);
  }
  return content.substring(0, startIdx) + replacement + content.substring(endIdx + endDelim.length);
}

const baseHtml = fs.readFileSync('index.html', 'utf8');

// ==========================================
// 1. GENERATE NHA-TRAI.HTML
// ==========================================
let traiHtml = baseHtml;

// Title & Meta
traiHtml = traiHtml.replace(
  /<title>.*?<\/title>/,
  '<title>💍 Thiệp Mời Cưới (Nhà Trai) – Xuân Anh &amp; Thuỳ Linh</title>'
);
traiHtml = traiHtml.replace(
  /content="THIỆP MỜI CƯỚI.*?"/g,
  'content="THIỆP MỜI CƯỚI (NHÀ TRAI) – XUÂN ANH &amp; THÙY LINH"'
);
traiHtml = traiHtml.replace(
  'content="Xuân Anh &amp; Thuỳ Linh · Một tình yêu được khắc trên tim · Trân Trọng Kính Mời Quý vị &amp; Gia đình"',
  'content="Kính mời quý khách tới dự Tiệc cưới Nhà Trai vào lúc 16:00 ngày 09/12/2026 (01/11 Âm lịch) · Xuân Anh &amp; Thuỳ Linh"'
);

// Top Switcher Banner
const bannerTrai = `
  <!-- VERSION BANNER SWITCHER -->
  <div class="version-banner" style="background:#FAF7F2; border-bottom:1px solid rgba(105,1,1,0.15); padding:8px 14px; text-align:center; font-size:12px; color:#555; display:flex; align-items:center; justify-content:space-between; z-index:90; position:relative;">
    <span>🏠 <b>THIỆP MỜI NHÀ TRAI</b></span>
    <a href="nha-gai.html" style="color:var(--primary); font-weight:700; text-decoration:none; padding:4px 12px; border-radius:14px; background:rgba(105,1,1,0.08); font-size:11.5px; border:1px solid rgba(105,1,1,0.2);">
      🌸 Xem thiệp Nhà Gái ➔
    </a>
  </div>
`;

// Insert banner right after <div class="app-container">
if (!traiHtml.includes('class="version-banner"')) {
  traiHtml = traiHtml.replace(
    '<div class="app-container">',
    `<div class="app-container">\n${bannerTrai}`
  );
}

// Events Section for Nhà Trai
const eventsSectionTrai = `<section class="section-invitation-events">
    <!-- TOP HEADING -->
    <div class="inv-top-heading">
      <p class="inv-top-title">TRÂN TRỌNG KÍNH MỜI!</p>
      <div id="guest-pill-wrap" class="guest-highlight-pill">Quý vị &amp; Gia đình</div>
      <p class="inv-top-desc">
        Gia đình chúng tôi cùng hai con rất vinh dự khi được đón tiếp quý khách đến dự bữa cơm thân mật chung vui trong ngày trọng đại này.
      </p>
    </div>

    <!-- BADGE NHÀ TRAI -->
    <div style="text-align:center; margin-bottom:20px;">
      <span style="display:inline-block; padding:7px 20px; border-radius:24px; background:var(--primary); color:#fff; font-size:12.5px; font-weight:700; letter-spacing:0.06em; text-transform:uppercase; box-shadow:0 4px 12px rgba(105,1,1,0.25);">
        🏠 LỄ CƯỚI TỔ CHỨC TẠI NHÀ TRAI
      </span>
    </div>

    <!-- EVENTS CARD -->
    <div class="event-card-container">

      <!-- EVENT 1: TIỆC CƯỚI THÂN MẬT NHÀ TRAI (FEATURED) -->
      <div class="event-block featured">
        <div class="event-title-badge" style="background:var(--primary); color:#fff;">TIỆC CƯỚI THÂN MẬT (NHÀ TRAI)</div>
        <p class="event-time-line">Vào lúc: 16:00</p>
        <p class="event-day-name">Thứ Tư</p>
        <div class="event-date-triplet">
          <span>THÁNG 12</span>
          <span style="opacity:0.4; margin:0 6px;">|</span>
          <span class="big-num">09</span>
          <span style="opacity:0.4; margin:0 6px;">|</span>
          <span>2026</span>
        </div>
        <p class="event-lunar-italic">(Tức Ngày 01 Tháng 11 Năm Bính Ngọ)</p>
        <p class="event-location-text">
          Tư gia Nhà Trai: Thôn Bàn Thạch 2, Xã Sao Vàng, Tỉnh Thanh Hoá
        </p>
        <a href="https://maps.google.com/?q=Thôn+Bàn+Thạch+2,+Sao+Vàng,+Thanh+Hoá" target="_blank" class="btn-view-map">
          📍 Xem chỉ đường Google Maps
        </a>
      </div>

      <!-- EVENT 2: LỄ ĐÓN DÂU & HÔN LỄ -->
      <div class="event-block">
        <div class="event-title-badge">LỄ ĐÓN DÂU &amp; HÔN LỄ</div>
        <p class="event-time-line">Vào lúc: 10:00</p>
        <p class="event-day-name">Thứ Năm</p>
        <div class="event-date-triplet">
          <span>THÁNG 12</span>
          <span style="opacity:0.4; margin:0 6px;">|</span>
          <span class="big-num">10</span>
          <span style="opacity:0.4; margin:0 6px;">|</span>
          <span>2026</span>
        </div>
        <p class="event-lunar-italic">(Tức Ngày 02 Tháng 11 Năm Bính Ngọ)</p>
        <p class="event-location-text">
          Tư gia Nhà Trai: Thôn Bàn Thạch 2, Xã Sao Vàng, Tỉnh Thanh Hoá
        </p>
        <a href="https://maps.google.com/?q=Thôn+Bàn+Thạch+2,+Sao+Vàng,+Thanh+Hoá" target="_blank" class="btn-view-map">
          📍 Xem chỉ đường
        </a>
      </div>

      <!-- EVENT 3: LỄ NẠP TÀI (ĂN HỎI) -->
      <div class="event-block">
        <div class="event-title-badge">LỄ NẠP TÀI (ĂN HỎI)</div>
        <p class="event-time-line">Vào lúc: 14:00</p>
        <p class="event-day-name">Thứ Hai</p>
        <div class="event-date-triplet">
          <span>THÁNG 12</span>
          <span style="opacity:0.4; margin:0 6px;">|</span>
          <span class="big-num">07</span>
          <span style="opacity:0.4; margin:0 6px;">|</span>
          <span>2026</span>
        </div>
        <p class="event-lunar-italic">(Tức Ngày 29 Tháng 10 Năm Bính Ngọ)</p>
        <p class="event-location-text">
          Hôn lễ tổ chức tại tư gia – Thôn Bàn Thạch 2, Xã Sao Vàng, Tỉnh Thanh Hoá
        </p>
        <a href="https://maps.google.com/?q=Thôn+Bàn+Thạch+2,+Sao+Vàng,+Thanh+Hoá" target="_blank" class="btn-view-map">
          📍 Xem chỉ đường
        </a>
      </div>

    </div>
  </section>`;

// Replace events section using replaceBetween
traiHtml = replaceBetween(
  traiHtml,
  '<section class="section-invitation-events">',
  '</section>',
  eventsSectionTrai
);

// Calendar highlight: day 09 (Tiệc Nhà Trai) & day 10 (Lễ Hôn Lễ)
traiHtml = traiHtml.replace(
  '<div class="cal-cell">09</div>',
  '<div class="cal-cell" style="color:var(--primary); font-weight:800; background:rgba(105,1,1,0.12); border-radius:50%;" title="Tiệc cưới Nhà Trai 09/12">09</div>'
);

// Gift Modal for Nhà Trai: CHỈ CÒN CHÚ RỂ - BỎ HOÀN TOÀN CÔ DÂU
const giftModalTrai = `<div class="modal-overlay" id="gift-popup-modal">
  <div class="modal-window" style="text-align:center;">
    <button class="modal-close-x" id="close-gift-modal-btn">✕</button>
    <div class="modal-title">Mừng Cưới Chú Rể</div>
    <p style="font-size:12.5px; color:#666; font-style:italic; margin-bottom:14px;">
      Gửi gắm tình cảm và lời chúc phúc đến chú rể Xuân Anh 💕
    </p>

    <!-- ONLY GROOM QR CARD -->
    <div class="gift-card-panel active" style="display:block; margin-top:6px;">
      <div class="qr-image-wrapper">
        <img src="qr-chu-re.png" alt="Mã QR Chú Rể - Lê Xuân Anh" class="qr-img-display"/>
      </div>
      <div class="gift-bank-info">
        <p class="bank-tag-label">NGÂN HÀNG QUÂN ĐỘI (MBBANK)</p>
        <p class="bank-acc-num">1570101564007</p>
        <p class="bank-acc-name">CHỦ TK: LE XUAN ANH</p>
      </div>
      <div class="gift-action-btns">
        <button class="btn-copy-stk" onclick="copyStk('1570101564007', 'Chú rể Xuân Anh')">
          📋 Sao chép STK
        </button>
        <a href="qr-chu-re.png" download="QR-XuanAnh.png" class="btn-download-qr">
          📥 Lưu mã QR
        </a>
      </div>
    </div>
  </div>
</div>`;

traiHtml = replaceBetween(
  traiHtml,
  '<div class="modal-overlay" id="gift-popup-modal">',
  '</div>\n</div>\n\n<script>',
  giftModalTrai + '\n\n<script>'
);

// Link generator script custom for Nhà Trai
traiHtml = traiHtml.replace(
  /const genUrl = `\${base}\?ten=\${encodeURIComponent\(name\)}`;/,
  "const genUrl = `${window.location.origin}${window.location.pathname.replace(/[^/]*$/, 'nha-trai.html')}?ten=${encodeURIComponent(name)}`;"
);
traiHtml = traiHtml.replace(
  "`Trân trọng kính mời ${name} tới dự bữa cơm thân mật chung vui cùng Xuân Anh & Thuỳ Linh! 💕\\n\\n` +",
  "`Trân trọng kính mời ${name} cùng gia đình tới dự Tiệc cưới Nhà Trai chung vui cùng 2 cháu Xuân Anh & Thuỳ Linh! 💕\\n\\n` +"
);
traiHtml = traiHtml.replace(
  "`📅 10:00 Ngày 10/12/2026\\n` +",
  "`📅 Tiệc cưới Nhà Trai: 16:00 Thứ Tư ngày 09/12/2026 (01/11 Âm lịch)\\n📅 Lễ đón dâu: 10:00 Thứ Năm ngày 10/12/2026\\n` +"
);

fs.writeFileSync('nha-trai.html', traiHtml);
console.log('Successfully written nha-trai.html!');


// ==========================================
// 2. GENERATE NHA-GAI.HTML
// ==========================================
let gaiHtml = baseHtml;

// Title & Meta
gaiHtml = gaiHtml.replace(
  /<title>.*?<\/title>/,
  '<title>💍 Thiệp Mời Cưới (Nhà Gái) – Thuỳ Linh &amp; Xuân Anh</title>'
);
gaiHtml = gaiHtml.replace(
  /content="THIỆP MỜI CƯỚI.*?"/g,
  'content="THIỆP MỜI CƯỚI (NHÀ GÁI) – THÙY LINH &amp; XUÂN ANH"'
);
gaiHtml = gaiHtml.replace(
  'content="Xuân Anh &amp; Thuỳ Linh · Một tình yêu được khắc trên tim · Trân Trọng Kính Mời Quý vị &amp; Gia đình"',
  'content="Kính mời quý khách tới dự Tiệc cưới Nhà Gái vào lúc 16:00 ngày 08/12/2026 (30/10 Âm lịch) · Thuỳ Linh &amp; Xuân Anh"'
);

// Top Switcher Banner
const bannerGai = `
  <!-- VERSION BANNER SWITCHER -->
  <div class="version-banner" style="background:#FAF7F2; border-bottom:1px solid rgba(105,1,1,0.15); padding:8px 14px; text-align:center; font-size:12px; color:#555; display:flex; align-items:center; justify-content:space-between; z-index:90; position:relative;">
    <span>🌸 <b>THIỆP MỜI NHÀ GÁI</b></span>
    <a href="nha-trai.html" style="color:var(--primary); font-weight:700; text-decoration:none; padding:4px 12px; border-radius:14px; background:rgba(105,1,1,0.08); font-size:11.5px; border:1px solid rgba(105,1,1,0.2);">
      🏠 Xem thiệp Nhà Trai ➔
    </a>
  </div>
`;

if (!gaiHtml.includes('class="version-banner"')) {
  gaiHtml = gaiHtml.replace(
    '<div class="app-container">',
    `<div class="app-container">\n${bannerGai}`
  );
}

// Events Section for Nhà Gái
const eventsSectionGai = `<section class="section-invitation-events">
    <!-- TOP HEADING -->
    <div class="inv-top-heading">
      <p class="inv-top-title">TRÂN TRỌNG KÍNH MỜI!</p>
      <div id="guest-pill-wrap" class="guest-highlight-pill">Quý vị &amp; Gia đình</div>
      <p class="inv-top-desc">
        Gia đình chúng tôi cùng hai con rất vinh dự khi được đón tiếp quý khách đến dự bữa cơm thân mật chung vui trong ngày trọng đại này.
      </p>
    </div>

    <!-- BADGE NHÀ GÁI -->
    <div style="text-align:center; margin-bottom:20px;">
      <span style="display:inline-block; padding:7px 20px; border-radius:24px; background:var(--primary); color:#fff; font-size:12.5px; font-weight:700; letter-spacing:0.06em; text-transform:uppercase; box-shadow:0 4px 12px rgba(105,1,1,0.25);">
        🌸 LỄ CƯỚI TỔ CHỨC TẠI NHÀ GÁI
      </span>
    </div>

    <!-- EVENTS CARD -->
    <div class="event-card-container">

      <!-- EVENT 1: TIỆC CƯỚI THÂN MẬT NHÀ GÁI (FEATURED) -->
      <div class="event-block featured">
        <div class="event-title-badge" style="background:var(--primary); color:#fff;">TIỆC CƯỚI THÂN MẬT (NHÀ GÁI)</div>
        <p class="event-time-line">Vào lúc: 16:00</p>
        <p class="event-day-name">Thứ Ba</p>
        <div class="event-date-triplet">
          <span>THÁNG 12</span>
          <span style="opacity:0.4; margin:0 6px;">|</span>
          <span class="big-num">08</span>
          <span style="opacity:0.4; margin:0 6px;">|</span>
          <span>2026</span>
        </div>
        <p class="event-lunar-italic">(Tức Ngày 30 Tháng 10 Năm Bính Ngọ)</p>
        <p class="event-location-text">
          Tư gia Nhà Gái: Thôn Bàn Thạch 2, Xã Sao Vàng, Tỉnh Thanh Hoá
        </p>
        <a href="https://maps.google.com/?q=Thôn+Bàn+Thạch+2,+Sao+Vàng,+Thanh+Hoá" target="_blank" class="btn-view-map">
          📍 Xem chỉ đường Google Maps
        </a>
      </div>

      <!-- EVENT 2: LỄ ĐÓN DÂU & HÔN LỄ -->
      <div class="event-block">
        <div class="event-title-badge">LỄ ĐÓN DÂU &amp; HÔN LỄ</div>
        <p class="event-time-line">Vào lúc: 10:00</p>
        <p class="event-day-name">Thứ Năm</p>
        <div class="event-date-triplet">
          <span>THÁNG 12</span>
          <span style="opacity:0.4; margin:0 6px;">|</span>
          <span class="big-num">10</span>
          <span style="opacity:0.4; margin:0 6px;">|</span>
          <span>2026</span>
        </div>
        <p class="event-lunar-italic">(Tức Ngày 02 Tháng 11 Năm Bính Ngọ)</p>
        <p class="event-location-text">
          Tư gia: Thôn Bàn Thạch 2, Xã Sao Vàng, Tỉnh Thanh Hoá
        </p>
        <a href="https://maps.google.com/?q=Thôn+Bàn+Thạch+2,+Sao+Vàng,+Thanh+Hoá" target="_blank" class="btn-view-map">
          📍 Xem chỉ đường
        </a>
      </div>

      <!-- EVENT 3: LỄ NẠP TÀI (ĂN HỎI) -->
      <div class="event-block">
        <div class="event-title-badge">LỄ NẠP TÀI (ĂN HỎI)</div>
        <p class="event-time-line">Vào lúc: 14:00</p>
        <p class="event-day-name">Thứ Hai</p>
        <div class="event-date-triplet">
          <span>THÁNG 12</span>
          <span style="opacity:0.4; margin:0 6px;">|</span>
          <span class="big-num">07</span>
          <span style="opacity:0.4; margin:0 6px;">|</span>
          <span>2026</span>
        </div>
        <p class="event-lunar-italic">(Tức Ngày 29 Tháng 10 Năm Bính Ngọ)</p>
        <p class="event-location-text">
          Hôn lễ tổ chức tại tư gia – Thôn Bàn Thạch 2, Xã Sao Vàng, Tỉnh Thanh Hoá
        </p>
        <a href="https://maps.google.com/?q=Thôn+Bàn+Thạch+2,+Sao+Vàng,+Thanh+Hoá" target="_blank" class="btn-view-map">
          📍 Xem chỉ đường
        </a>
      </div>

    </div>
  </section>`;

// Replace events section using replaceBetween
gaiHtml = replaceBetween(
  gaiHtml,
  '<section class="section-invitation-events">',
  '</section>',
  eventsSectionGai
);

// Calendar highlight: day 08 (Tiệc Nhà Gái) & day 10 (Lễ Hôn Lễ)
gaiHtml = gaiHtml.replace(
  '<div class="cal-cell">08</div>',
  '<div class="cal-cell" style="color:var(--primary); font-weight:800; background:rgba(105,1,1,0.12); border-radius:50%;" title="Tiệc cưới Nhà Gái 08/12">08</div>'
);

// Gift Modal for Nhà Gái: CHỈ CÒN CÔ DÂU - BỎ HOÀN TOÀN CHÚ RỂ
const giftModalGai = `<div class="modal-overlay" id="gift-popup-modal">
  <div class="modal-window" style="text-align:center;">
    <button class="modal-close-x" id="close-gift-modal-btn">✕</button>
    <div class="modal-title">Mừng Cưới Cô Dâu</div>
    <p style="font-size:12.5px; color:#666; font-style:italic; margin-bottom:14px;">
      Gửi gắm tình cảm và lời chúc phúc đến cô dâu Thuỳ Linh 💕
    </p>

    <!-- ONLY BRIDE QR CARD -->
    <div class="gift-card-panel active" style="display:block; margin-top:6px;">
      <div class="qr-image-wrapper">
        <img src="qr-co-dau.png" alt="Mã QR Cô Dâu - Nguyễn Thị Thuỳ Linh" class="qr-img-display"/>
      </div>
      <div class="gift-bank-info">
        <p class="bank-tag-label">NGÂN HÀNG QUÂN ĐỘI (MBBANK)</p>
        <p class="bank-acc-num">038300015028</p>
        <p class="bank-acc-name">CHỦ TK: NGUYEN THI THUY LINH</p>
      </div>
      <div class="gift-action-btns">
        <button class="btn-copy-stk" onclick="copyStk('038300015028', 'Cô dâu Thuỳ Linh')">
          📋 Sao chép STK
        </button>
        <a href="qr-co-dau.png" download="QR-ThuyLinh.png" class="btn-download-qr">
          📥 Lưu mã QR
        </a>
      </div>
    </div>
  </div>
</div>`;

gaiHtml = replaceBetween(
  gaiHtml,
  '<div class="modal-overlay" id="gift-popup-modal">',
  '</div>\n</div>\n\n<script>',
  giftModalGai + '\n\n<script>'
);

// Link generator script custom for Nhà Gái
gaiHtml = gaiHtml.replace(
  /const genUrl = `\${base}\?ten=\${encodeURIComponent\(name\)}`;/,
  "const genUrl = `${window.location.origin}${window.location.pathname.replace(/[^/]*$/, 'nha-gai.html')}?ten=${encodeURIComponent(name)}`;"
);
gaiHtml = gaiHtml.replace(
  "`Trân trọng kính mời ${name} tới dự bữa cơm thân mật chung vui cùng Xuân Anh & Thuỳ Linh! 💕\\n\\n` +",
  "`Trân trọng kính mời ${name} cùng gia đình tới dự Tiệc cưới Nhà Gái chung vui cùng 2 cháu Thuỳ Linh & Xuân Anh! 💕\\n\\n` +"
);
gaiHtml = gaiHtml.replace(
  "`📅 10:00 Ngày 10/12/2026\\n` +",
  "`📅 Tiệc cưới Nhà Gái: 16:00 Thứ Ba ngày 08/12/2026 (30/10 Âm lịch)\\n📅 Lễ đón dâu: 10:00 Thứ Năm ngày 10/12/2026\\n` +"
);

fs.writeFileSync('nha-gai.html', gaiHtml);
console.log('Successfully written nha-gai.html!');


// ==========================================
// 3. UPDATE INDEX.HTML (ROUTER + SWITCHER BANNER)
// ==========================================
let indexHtml = baseHtml;

// If indexHtml does not already have routerScript
if (!indexHtml.includes('// Auto-routing if accessed with ?nha=')) {
  const routerScript = `
<script>
// Auto-routing if accessed with ?nha=gai or ?nha=trai
(function() {
  const p = new URLSearchParams(window.location.search);
  const nha = p.get('nha');
  if (nha === 'gai') {
    window.location.replace('nha-gai.html' + window.location.search);
  } else if (nha === 'trai') {
    window.location.replace('nha-trai.html' + window.location.search);
  }
})();
</script>
`;
  indexHtml = indexHtml.replace('</head>', `${routerScript}\n</head>`);
}

// Quick selector banner in index.html
const indexBanner = `
  <!-- QUICK SWITCHER BANNER -->
  <div class="version-banner" style="background:#FAF7F2; border-bottom:1px solid rgba(105,1,1,0.15); padding:8px 12px; text-align:center; font-size:12px; color:#555; display:flex; align-items:center; justify-content:center; gap:10px; z-index:90; position:relative;">
    <span style="font-weight:600;">Xem thiệp:</span>
    <a href="nha-trai.html" style="color:#fff; background:var(--primary); font-weight:700; text-decoration:none; padding:4px 12px; border-radius:14px; font-size:11.5px; box-shadow:0 2px 8px rgba(105,1,1,0.2);">
      🏠 Nhà Trai (09/12)
    </a>
    <a href="nha-gai.html" style="color:var(--primary); background:#fff; border:1px solid var(--primary); font-weight:700; text-decoration:none; padding:3px 11px; border-radius:14px; font-size:11.5px;">
      🌸 Nhà Gái (08/12)
    </a>
  </div>
`;

if (!indexHtml.includes('class="version-banner"')) {
  indexHtml = indexHtml.replace(
    '<div class="app-container">',
    `<div class="app-container">\n${indexBanner}`
  );
}

fs.writeFileSync('index.html', indexHtml);
console.log('Successfully updated index.html!');
console.log('Dual build finished with complete precision!');
