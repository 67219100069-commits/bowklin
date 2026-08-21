/* =========================================================
   DATA
   Video clips are NOT hardcoded anymore — every clip in the
   gallery is added by the admin through admin.html and lives in
   Firestore (collection "videos"). See fetchAllVideos() below.
========================================================= */

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
document.addEventListener("DOMContentLoaded", async () => {
  initNavbar();
  initHeroCanvas();
  initRevealAnimations();
  initAdminMenu();
  await fetchAllVideos();
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
   ADMIN MENU
   Shows a "แผงแอดมิน" link in the navbar, but only once we've
   confirmed (via isCurrentUserAdmin, from auth.js) that the
   signed-in user is the site's one admin. Everyone else — signed
   out visitors included — never sees this link at all.
========================================================= */
function initAdminMenu() {
  const adminLink = document.getElementById("navAdminLink");
  if (!adminLink || typeof firebase === "undefined") return;

  firebase.auth().onAuthStateChanged(async (user) => {
    const isAdmin = typeof isCurrentUserAdmin === "function"
      ? await isCurrentUserAdmin(user)
      : false;
    adminLink.hidden = !isAdmin;
  });
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
   CLIPS (added via admin.html, stored in Firestore)
   Every visitor loads the same list of clips straight from the
   "videos" collection, in the order the admin added them (newest
   first). See admin.js for how clips are added/removed.
========================================================= */
let cachedVideos = [];

async function fetchAllVideos() {
  try {
    const snap = await db.collection("videos").orderBy("createdAt", "desc").get();
    cachedVideos = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.error("fetchAllVideos failed", err);
    cachedVideos = [];
  }
  return cachedVideos;
}

function getAllVideos() {
  return cachedVideos;
}

/* =========================================================
   GALLERY
========================================================= */
// Prefer the thumbnail the admin explicitly set; if there isn't one
// and the clip is a YouTube link, fall back to YouTube's own thumbnail
// so cards don't sit blank just because the admin skipped that field.
function getThumbnailUrl(video) {
  if (video.thumbnail && video.thumbnail.trim()) return video.thumbnail.trim();
  const ytId = getYouTubeVideoId(video.videoSrc);
  if (ytId) return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
  return null;
}

function renderGallery() {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;

  const allVideos = getAllVideos();

  if (allVideos.length === 0) {
    grid.innerHTML = `<p class="gallery__empty">ยังไม่มีคลิปโมชั่นกราฟิกในระบบ — แอดมินสามารถเพิ่มคลิปได้ที่หน้าแผงแอดมิน</p>`;
    return;
  }

  grid.innerHTML = allVideos.map(video => {
    const thumbUrl = getThumbnailUrl(video);
    return `
    <article class="gallery-card" data-video-id="${video.id}" tabindex="0" role="button" aria-label="เปิดวิดีโอ ${video.title}">
      <div class="gallery-card__thumb">
        ${thumbUrl
          ? `<img src="${thumbUrl}" alt="${video.title}" loading="lazy" onerror="this.remove()">`
          : `<div class="gallery-card__thumb-pattern"></div>`}
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
  `;
  }).join("");

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

// Recognizes youtube.com/watch (any param order, incl. m.youtube.com),
// youtu.be, /embed/, /shorts/, /live/ links — and a bare 11-char video ID
// pasted on its own. YouTube IDs are always exactly 11 chars, so we match
// that exact length instead of "6 or more", which could silently fail to
// match on some real-world share-link shapes (extra params, trailing
// tracking codes, etc.) and left the modal with nothing to show.
function getYouTubeVideoId(url) {
  if (!url) return null;
  url = url.trim();

  // Someone pasted just the ID itself, with no URL around it.
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;

  const patterns = [
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/watch\?(?:[^#]*&)?v=([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/(?:embed|shorts|live)\/([a-zA-Z0-9_-]{11})/
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

// A direct, playable video file link (as opposed to a YouTube page link
// that just happens not to match any pattern above, e.g. a playlist-only
// URL). Used to decide whether the native <video> tag stands a chance.
function isDirectVideoFile(url) {
  return /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test((url || "").trim());
}

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

  const wrap = modalVideo.parentElement; // .modal__video-wrap
  let iframe = wrap.querySelector("iframe");
  const ytId = getYouTubeVideoId(video.videoSrc);

  modalVideo.pause();

  let notice = wrap.querySelector(".modal__video-notice");

  if (ytId) {
    // YouTube clip — swap in an iframe embed, hide the <video> tag.
    if (notice) notice.hidden = true;
    modalVideo.hidden = true;
    modalVideo.removeAttribute("src");
    modalVideo.innerHTML = "";

    if (!iframe) {
      iframe = document.createElement("iframe");
      iframe.className = "modal__video";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      wrap.appendChild(iframe);
    }
    iframe.hidden = false;
    iframe.src = `https://www.youtube.com/embed/${ytId}`;
  } else if (isDirectVideoFile(video.videoSrc)) {
    // Direct .mp4/.webm/etc. link — use the native <video> tag.
    if (notice) notice.hidden = true;
    if (iframe) {
      iframe.hidden = true;
      iframe.src = "";
    }
    modalVideo.hidden = false;
    modalVideo.innerHTML = `<source src="${video.videoSrc}">`;
    modalVideo.load();
  } else {
    // No video set, or a link we can't recognize as either a YouTube
    // page or a direct video file — show a visible message instead of
    // silently leaving a blank/black player (this used to happen for
    // any YouTube share-link shape the old regexes didn't catch, or
    // for links like Google Drive that can't be played directly).
    if (iframe) {
      iframe.hidden = true;
      iframe.src = "";
    }
    modalVideo.hidden = true;
    modalVideo.removeAttribute("src");
    modalVideo.innerHTML = "";

    if (!notice) {
      notice = document.createElement("div");
      notice.className = "modal__video modal__video-notice";
      wrap.appendChild(notice);
    }
    notice.hidden = false;
    notice.textContent = video.videoSrc
      ? "ลิงก์วิดีโอนี้เปิดเล่นไม่ได้ (รองรับเฉพาะลิงก์ YouTube หรือลิงก์ไฟล์ .mp4/.webm โดยตรง) — ลองแก้ลิงก์ในหน้าแอดมิน"
      : "ยังไม่ได้ใส่ลิงก์วิดีโอสำหรับคลิปนี้ — เพิ่มได้ที่หน้าแผงแอดมิน";
  }

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

  // Clearing the iframe src is what actually stops a YouTube embed
  // from continuing to play in the background.
  const iframe = modalVideo.parentElement.querySelector("iframe");
  if (iframe) iframe.src = "";

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
    // Clip ids are now Firestore-generated, so match by legal section
    // (the clip's "tag" field) instead of the old fixed slug.
    const match = getAllVideos().find(v => v.tag === scenario.section)
      || getAllVideos().find(v => v.id === scenario.linkedVideoId);
    if (match) {
      setTimeout(() => openModal(match.id), 500);
    }
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
