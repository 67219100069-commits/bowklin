/* =========================================================
   DATA
   Replace videoSrc / thumbnail paths with your own assets.
========================================================= */

const videoData = [
  {
    id: "fake-news",
    tag: "มาตรา 14",
    title: "แชร์ข่าวปลอม อันตรายกว่าที่คิด",
    desc: "การนำเข้าหรือแชร์ข้อมูลอันเป็นเท็จเข้าสู่ระบบคอมพิวเตอร์ที่อาจก่อให้เกิดความเสียหาย หรือสร้างความตื่นตระหนกแก่ประชาชน เข้าข่ายความผิดตามมาตรา 14 แห่ง พ.ร.บ.คอมพิวเตอร์",
    duration: "02:14",
    thumbnail: "",
    videoSrc: "" // <!-- INSERT MOTION GRAPHIC MP4 HERE: assets/videos/fake-news.mp4 -->
  },
  {
    id: "hacking",
    tag: "มาตรา 5 และ 7",
    title: "แฮกรหัสผ่าน = เข้าถึงระบบโดยมิชอบ",
    desc: "การเข้าถึงระบบคอมพิวเตอร์หรือข้อมูลคอมพิวเตอร์ของผู้อื่นโดยไม่ได้รับอนุญาต แม้จะไม่ได้สร้างความเสียหายใด ๆ ก็ถือว่ามีความผิดตามกฎหมาย",
    duration: "01:58",
    thumbnail: "",
    videoSrc: "" // <!-- INSERT MOTION GRAPHIC MP4 HERE: assets/videos/hacking.mp4 -->
  },
  {
    id: "photo-consent",
    tag: "มาตรา 16",
    title: "โพสต์ภาพคนอื่นโดยไม่ได้รับอนุญาต",
    desc: "การนำภาพของผู้อื่นที่เกิดจากการตัดต่อ ดัดแปลง หรือนำมาเผยแพร่โดยไม่ได้รับความยินยอม จนทำให้ผู้นั้นเสียชื่อเสียงหรือถูกดูหมิ่น ถือเป็นความผิดตามมาตรา 16",
    duration: "02:40",
    thumbnail: "",
    videoSrc: "" // <!-- INSERT MOTION GRAPHIC MP4 HERE: assets/videos/photo-consent.mp4 -->
  },
  {
    id: "malware",
    tag: "มาตรา 12",
    title: "ปล่อยไวรัส มัลแวร์ เจตนาทำลายระบบ",
    desc: "การจำหน่ายหรือเผยแพร่ชุดคำสั่งที่จัดทำขึ้นเพื่อใช้ในการกระทำความผิด เช่น ไวรัสคอมพิวเตอร์ หรือมัลแวร์ ถือเป็นความผิดที่มีบทลงโทษรุนแรง",
    duration: "03:05",
    thumbnail: "",
    videoSrc: "" // <!-- INSERT MOTION GRAPHIC MP4 HERE: assets/videos/malware.mp4 -->
  },
  {
    id: "phishing",
    tag: "มาตรา 14",
    title: "ฟิชชิ่งและการหลอกลวงทางออนไลน์",
    desc: "การปลอมแปลงเว็บไซต์หรือข้อความเพื่อหลอกเอาข้อมูลส่วนบุคคล เช่น รหัสผ่านหรือข้อมูลบัตรเครดิต เข้าข่ายนำเข้าข้อมูลอันเป็นเท็จตามมาตรา 14",
    duration: "02:22",
    thumbnail: "",
    videoSrc: "" // <!-- INSERT MOTION GRAPHIC MP4 HERE: assets/videos/phishing.mp4 -->
  },
  {
    id: "cyberbully",
    tag: "มาตรา 14(1)",
    title: "ไซเบอร์บูลลี่และข้อความหมิ่นประมาท",
    desc: "การโพสต์ข้อความคุกคาม ข่มขู่ หรือหมิ่นประมาทผู้อื่นบนโลกออนไลน์ในลักษณะที่ก่อให้เกิดความเสียหาย ถือเป็นความผิดตามกฎหมายเช่นเดียวกับการกระทำในโลกจริง",
    duration: "02:50",
    thumbnail: "",
    videoSrc: "" // <!-- INSERT MOTION GRAPHIC MP4 HERE: assets/videos/cyberbully.mp4 -->
  }
];

const scenarioData = [
  {
    id: "fake-news",
    label: "แชร์ข่าวปลอม / ข้อมูลเท็จ",
    icon: "megaphone",
    section: "มาตรา 14 (2)",
    offense: "นำเข้าข้อมูลอันเป็นเท็จสู่ระบบคอมพิวเตอร์ในลักษณะที่น่าจะก่อให้เกิดความตื่นตระหนกแก่ประชาชน",
    penalty: "จำคุกไม่เกิน 5 ปี หรือปรับไม่เกิน 100,000 บาท หรือทั้งจำทั้งปรับ",
    linkedVideoId: "fake-news"
  },
  {
    id: "hacking",
    label: "แฮกรหัสผ่าน / เข้าระบบผู้อื่น",
    icon: "lock",
    section: "มาตรา 5 และมาตรา 7",
    offense: "เข้าถึงระบบคอมพิวเตอร์หรือข้อมูลคอมพิวเตอร์ของผู้อื่นโดยไม่ได้รับอนุญาต",
    penalty: "จำคุกไม่เกิน 6 เดือน – 2 ปี หรือปรับไม่เกิน 10,000–40,000 บาท",
    linkedVideoId: "hacking"
  },
  {
    id: "photo-consent",
    label: "โพสต์ภาพผู้อื่นโดยไม่ยินยอม",
    icon: "image",
    section: "มาตรา 16",
    offense: "นำภาพผู้อื่นที่เกิดจากการตัดต่อหรือดัดแปลงเผยแพร่จนทำให้เสียชื่อเสียงหรือถูกดูหมิ่น",
    penalty: "จำคุกไม่เกิน 3 ปี หรือปรับไม่เกิน 200,000 บาท หรือทั้งจำทั้งปรับ",
    linkedVideoId: "photo-consent"
  },
  {
    id: "malware",
    label: "แจกจ่ายไวรัส / มัลแวร์",
    icon: "bug",
    section: "มาตรา 12",
    offense: "จำหน่ายหรือเผยแพร่ชุดคำสั่งที่จัดทำขึ้นเพื่อใช้กระทำความผิดเกี่ยวกับคอมพิวเตอร์",
    penalty: "จำคุกไม่เกิน 1–15 ปี ขึ้นอยู่กับความร้ายแรงของผลกระทบ",
    linkedVideoId: "malware"
  },
  {
    id: "phishing",
    label: "ปลอมเว็บไซต์ / ฟิชชิ่งหลอกข้อมูล",
    icon: "hook",
    section: "มาตรา 14 (1)",
    offense: "นำเข้าข้อมูลคอมพิวเตอร์ปลอมไม่ว่าทั้งหมดหรือบางส่วน เพื่อหลอกลวงผู้อื่น",
    penalty: "จำคุกไม่เกิน 5 ปี หรือปรับไม่เกิน 100,000 บาท หรือทั้งจำทั้งปรับ",
    linkedVideoId: "phishing"
  },
  {
    id: "cyberbully",
    label: "ข่มขู่ / หมิ่นประมาทออนไลน์",
    icon: "chat",
    section: "มาตรา 14 (1) ประกอบประมวลกฎหมายอาญา",
    offense: "โพสต์ข้อความคุกคาม ข่มขู่ หรือหมิ่นประมาทผู้อื่นผ่านระบบคอมพิวเตอร์",
    penalty: "จำคุกไม่เกิน 5 ปี หรือปรับไม่เกิน 100,000 บาท ร่วมกับโทษฐานหมิ่นประมาท",
    linkedVideoId: "cyberbully"
  }
];

const scenarioIcons = {
  megaphone: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 10v4a1 1 0 001 1h3l5 4V5l-5 4H4a1 1 0 00-1 1z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M16 9a4 4 0 010 6M19 6a8 8 0 010 12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  lock: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M8 11V7a4 4 0 018 0v4" stroke="currentColor" stroke-width="1.8"/></svg>',
  image: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" stroke-width="1.8"/><circle cx="9" cy="10" r="1.6" stroke="currentColor" stroke-width="1.8"/><path d="M21 16l-5.5-5.5-4 4L9 12l-6 6" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
  bug: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="8" y="8" width="8" height="10" rx="4" stroke="currentColor" stroke-width="1.8"/><path d="M12 8V5M9 6l-2-2M15 6l2-2M4 12h4M16 12h4M5 18l3-2M19 18l-3-2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  hook: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 4v9a3 3 0 106 0" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="4" r="1.6" stroke="currentColor" stroke-width="1.8"/></svg>',
  chat: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 5h16v11H8l-4 4V5z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>'
};

/* =========================================================
   INIT
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initHeroCanvas();
  initRevealAnimations();
  renderGallery();
  initModal();
  renderScenarios();
  initStats();
});

/* =========================================================
   NAVBAR: scroll shadow, active link, mobile toggle
========================================================= */
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  const navLinks = document.querySelectorAll("[data-nav]");

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("is-scrolled", window.scrollY > 12);
  }, { passive: true });

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  // Active link on scroll (IntersectionObserver)
  const sections = [...navLinks].map(l => document.querySelector(l.getAttribute("href"))).filter(Boolean);
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(l => l.classList.toggle("active", l.getAttribute("href") === `#${id}`));
      }
    });
  }, { rootMargin: "-40% 0px -50% 0px", threshold: 0 });

  sections.forEach(s => observer.observe(s));
}

/* =========================================================
   HERO: animated "circuit" canvas background
========================================================= */
function initHeroCanvas() {
  const canvas = document.getElementById("circuitCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let width, height, nodes;

  const NODE_COUNT = 46;
  const LINK_DIST = 150;

  function resize() {
    width = canvas.width = canvas.offsetWidth * devicePixelRatio;
    height = canvas.height = canvas.offsetHeight * devicePixelRatio;
  }

  function createNodes() {
    nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25 * devicePixelRatio,
      vy: (Math.random() - 0.5) * 0.25 * devicePixelRatio,
      r: Math.random() * 1.6 + 0.6
    }));
  }

  function step() {
    ctx.clearRect(0, 0, width, height);

    nodes.forEach(n => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;
    });

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < LINK_DIST * devicePixelRatio) {
          const alpha = 1 - dist / (LINK_DIST * devicePixelRatio);
          ctx.strokeStyle = `rgba(61, 169, 255, ${alpha * 0.22})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    nodes.forEach(n => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r * devicePixelRatio, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(61, 255, 196, 0.55)";
      ctx.fill();
    });

    requestAnimationFrame(step);
  }

  resize();
  createNodes();
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    requestAnimationFrame(step);
  }
  window.addEventListener("resize", () => { resize(); createNodes(); });
}

/* =========================================================
   REVEAL ON SCROLL
========================================================= */
function initRevealAnimations() {
  const targets = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  targets.forEach(t => observer.observe(t));
}

/* =========================================================
   CUSTOM CLIPS (added via admin.html, stored in localStorage)
   Merges owner-added clips with the built-in videoData list so
   the gallery always reflects what's been added through /admin.html.
========================================================= */
const CUSTOM_VIDEOS_KEY = "smartActCustomVideos";

function getAllVideos() {
  let custom = [];
  try {
    custom = JSON.parse(localStorage.getItem(CUSTOM_VIDEOS_KEY)) || [];
  } catch {
    custom = [];
  }
  // Owner-added clips appear first
  return [...custom, ...videoData];
}

/* =========================================================
   GALLERY
========================================================= */
function renderGallery() {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;

  const allVideos = getAllVideos();

  grid.innerHTML = allVideos.map(video => `
    <article class="gallery-card" data-video-id="${video.id}" tabindex="0" role="button" aria-label="เปิดวิดีโอ ${video.title}">
      <div class="gallery-card__thumb">
        <div class="gallery-card__thumb-pattern"></div>
        <!-- INSERT THUMBNAIL IMAGE HERE: <img src="assets/thumbs/${video.id}.jpg" alt="${video.title}"> -->
        <button class="gallery-card__play" tabindex="-1" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
        </button>
        <span class="gallery-card__duration">${video.duration}</span>
      </div>
      <div class="gallery-card__body">
        <span class="gallery-card__tag">${video.tag}</span>
        <h3 class="gallery-card__title">${video.title}</h3>
        <p class="gallery-card__desc">${video.desc}</p>
      </div>
    </article>
  `).join("");

  // Reveal animation for cards (staggered)
  const cards = grid.querySelectorAll(".gallery-card");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("is-visible"), i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  cards.forEach(c => observer.observe(c));

  cards.forEach(card => {
    card.addEventListener("click", () => openModal(card.dataset.videoId));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(card.dataset.videoId);
      }
    });
  });
}

/* =========================================================
   MODAL
========================================================= */
let lastFocusedEl = null;

function initModal() {
  document.querySelectorAll("[data-close-modal]").forEach(el => {
    el.addEventListener("click", closeModal);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

function openModal(videoId) {
  const video = getAllVideos().find(v => v.id === videoId);
  if (!video) return;

  lastFocusedEl = document.activeElement;

  const modal = document.getElementById("videoModal");
  const modalVideo = document.getElementById("modalVideo");
  const modalTag = document.getElementById("modalTag");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");

  modalTag.textContent = video.tag;
  modalTitle.textContent = video.title;
  modalDesc.textContent = video.desc;

  // Reset video source. Replace video.videoSrc above with your actual file path.
  modalVideo.pause();
  modalVideo.innerHTML = video.videoSrc
    ? `<source src="${video.videoSrc}" type="video/mp4">`
    : `<!-- INSERT MOTION GRAPHIC MP4 HERE for "${video.id}" -->`;
  modalVideo.load();

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  modal.querySelector(".modal__close").focus();
}

function closeModal() {
  const modal = document.getElementById("videoModal");
  const modalVideo = document.getElementById("modalVideo");
  if (!modal.classList.contains("is-open")) return;

  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  modalVideo.pause();

  if (lastFocusedEl) lastFocusedEl.focus();
}

/* =========================================================
   SMART CHECKER
========================================================= */
function renderScenarios() {
  const container = document.getElementById("scenarioButtons");
  if (!container) return;

  container.innerHTML = scenarioData.map(s => `
    <button class="scenario-btn" data-scenario-id="${s.id}" role="option" aria-selected="false">
      <span class="scenario-btn__icon" aria-hidden="true">${scenarioIcons[s.icon] || ""}</span>
      <span class="scenario-btn__text">${s.label}</span>
    </button>
  `).join("");

  container.querySelectorAll(".scenario-btn").forEach(btn => {
    btn.addEventListener("click", () => runSmartCheck(btn.dataset.scenarioId, btn));
  });
}

function runSmartCheck(scenarioId, btnEl) {
  const scenario = scenarioData.find(s => s.id === scenarioId);
  if (!scenario) return;

  // Update active state on buttons
  document.querySelectorAll(".scenario-btn").forEach(b => {
    b.classList.remove("is-active");
    b.setAttribute("aria-selected", "false");
  });
  btnEl.classList.add("is-active");
  btnEl.setAttribute("aria-selected", "true");

  const idle = document.getElementById("readoutIdle");
  const result = document.getElementById("readoutResult");
  const statusText = document.getElementById("resultStatusText");

  idle.hidden = true;
  result.hidden = false;
  result.classList.remove("checker__result"); // restart animation
  void result.offsetWidth; // reflow to retrigger animation
  result.classList.add("checker__result");

  statusText.textContent = "กำลังวิเคราะห์…";

  const sectionEl = document.getElementById("resultSection");
  const offenseEl = document.getElementById("resultOffense");
  const penaltyEl = document.getElementById("resultPenalty");

  sectionEl.textContent = "";
  offenseEl.textContent = "";
  penaltyEl.textContent = "";

  // Simulated "smart analysis" delay, then reveal with a typewriter effect
  setTimeout(() => {
    statusText.textContent = "วิเคราะห์เสร็จสิ้น — ตรวจพบความเสี่ยงทางกฎหมาย";
    typeText(sectionEl, scenario.section);
    typeText(offenseEl, scenario.offense, 12);
    typeText(penaltyEl, scenario.penalty, 24);
  }, 450);

  const watchBtn = document.getElementById("watchMoreBtn");
  watchBtn.onclick = () => {
    document.getElementById("gallery").scrollIntoView({ behavior: "smooth" });
    setTimeout(() => openModal(scenario.linkedVideoId), 500);
  };
}

function typeText(el, text, delay = 0) {
  el.classList.add("typewriter");
  let i = 0;
  setTimeout(() => {
    const interval = setInterval(() => {
      el.textContent = text.slice(0, i + 1);
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        el.classList.remove("typewriter");
      }
    }, 14);
  }, delay);
}

/* =========================================================
   ABOUT: animated stat counters
========================================================= */
function initStats() {
  const statVideos = document.getElementById("statVideos");
  const statScenarios = document.getElementById("statScenarios");
  if (!statVideos || !statScenarios) return;

  const targets = [
    { el: statVideos, value: getAllVideos().length },
    { el: statScenarios, value: scenarioData.length }
  ];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        targets.forEach(t => animateCount(t.el, t.value));
        observer.disconnect();
      }
    });
  }, { threshold: 0.4 });

  observer.observe(document.querySelector(".about__panel"));
}

function animateCount(el, target) {
  let current = 0;
  const duration = 900;
  const start = performance.now();

  function frame(now) {
    const progress = Math.min((now - start) / duration, 1);
    current = Math.round(progress * target);
    el.textContent = current;
    if (progress < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
