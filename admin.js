/* =========================================================
   ADMIN DASHBOARD
   Manages a localStorage-backed list of "custom" clips that
   the main site (app.js) merges into the gallery at render time.
========================================================= */

const CUSTOM_VIDEOS_KEY = "smartActCustomVideos";

// Mirrors the ids/titles/tags from app.js videoData, for display only.
// Edit the actual content in app.js — this list is read-only reference.
const defaultVideosReference = [
  { id: "fake-news", title: "แชร์ข่าวปลอม อันตรายกว่าที่คิด", tag: "มาตรา 14" },
  { id: "hacking", title: "แฮกรหัสผ่าน = เข้าถึงระบบโดยมิชอบ", tag: "มาตรา 5 และ 7" },
  { id: "photo-consent", title: "โพสต์ภาพคนอื่นโดยไม่ได้รับอนุญาต", tag: "มาตรา 16" },
  { id: "malware", title: "ปล่อยไวรัส มัลแวร์ เจตนาทำลายระบบ", tag: "มาตรา 12" },
  { id: "phishing", title: "ฟิชชิ่งและการหลอกลวงทางออนไลน์", tag: "มาตรา 14" },
  { id: "cyberbully", title: "ไซเบอร์บูลลี่และข้อความหมิ่นประมาท", tag: "มาตรา 14(1)" }
];

document.addEventListener("DOMContentLoaded", async () => {
  // Route guard — resolves only once we've confirmed this Firebase
  // user is the site's one admin; otherwise it redirects to login.html.
  const adminUser = await guardAdminAccess();

  const emailEl = document.getElementById("adminEmail");
  if (emailEl) emailEl.textContent = adminUser.email || "";

  document.getElementById("logoutBtn").addEventListener("click", logout);

  renderDefaultList();
  renderCustomList();

  document.getElementById("addClipForm").addEventListener("submit", handleAddClip);
});

function getCustomVideos() {
  try {
    return JSON.parse(localStorage.getItem(CUSTOM_VIDEOS_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCustomVideos(videos) {
  localStorage.setItem(CUSTOM_VIDEOS_KEY, JSON.stringify(videos));
}

function renderDefaultList() {
  const list = document.getElementById("defaultClipList");
  list.innerHTML = defaultVideosReference.map(v => `
    <li class="clip-item clip-item--locked">
      <div class="clip-item__info">
        <span class="clip-item__tag">${escapeHtml(v.tag)}</span>
        <span class="clip-item__title">${escapeHtml(v.title)}</span>
      </div>
      <span class="clip-item__lock" title="แก้ไขได้ที่ app.js เท่านั้น">🔒</span>
    </li>
  `).join("");
}

function renderCustomList() {
  const list = document.getElementById("customClipList");
  const emptyMsg = document.getElementById("customClipEmpty");
  const videos = getCustomVideos();

  emptyMsg.hidden = videos.length > 0;

  list.innerHTML = videos.map(v => `
    <li class="clip-item">
      <div class="clip-item__info">
        <span class="clip-item__tag">${escapeHtml(v.tag)}</span>
        <span class="clip-item__title">${escapeHtml(v.title)}</span>
      </div>
      <button class="clip-item__delete" data-id="${v.id}" aria-label="ลบคลิปนี้">✕</button>
    </li>
  `).join("");

  list.querySelectorAll(".clip-item__delete").forEach(btn => {
    btn.addEventListener("click", () => deleteClip(btn.dataset.id));
  });
}

function handleAddClip(e) {
  e.preventDefault();

  const title = document.getElementById("fTitle").value.trim();
  const tag = document.getElementById("fTag").value.trim();
  const duration = document.getElementById("fDuration").value.trim();
  const videoSrc = document.getElementById("fVideoSrc").value.trim();
  const thumbnail = document.getElementById("fThumb").value.trim();
  const desc = document.getElementById("fDesc").value.trim();

  if (!title || !tag || !duration || !desc) return;

  const newClip = {
    id: "custom-" + Date.now(),
    title,
    tag,
    duration,
    videoSrc,
    thumbnail,
    desc
  };

  const videos = getCustomVideos();
  videos.unshift(newClip);
  saveCustomVideos(videos);

  e.target.reset();
  renderCustomList();
  showHint("เพิ่มคลิปเรียบร้อยแล้ว ✓ ไปดูผลลัพธ์ในหน้าเว็บไซต์หลักได้เลย");
}

function deleteClip(id) {
  const videos = getCustomVideos().filter(v => v.id !== id);
  saveCustomVideos(videos);
  renderCustomList();
}

function showHint(message) {
  const hint = document.getElementById("formHint");
  hint.textContent = message;
  hint.hidden = false;
  setTimeout(() => { hint.hidden = true; }, 3200);
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
