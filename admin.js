/* =========================================================
   ADMIN DASHBOARD
   Manages the "videos" collection in Firestore — this is the
   single source of truth the main site (app.js) reads from, so
   every clip the admin adds or removes here shows up (or
   disappears) for every visitor immediately.
========================================================= */

document.addEventListener("DOMContentLoaded", async () => {
  // Route guard — resolves only once we've confirmed this Firebase
  // user is the site's one admin; otherwise it redirects to login.html.
  const adminUser = await guardAdminAccess();

  const emailEl = document.getElementById("adminEmail");
  if (emailEl) emailEl.textContent = adminUser.email || "";

  document.getElementById("logoutBtn").addEventListener("click", logout);

  listenToVideos();
  document.getElementById("addClipForm").addEventListener("submit", handleAddClip);
});

/* Live-updating list — stays in sync even if a clip is added from
   another tab/session, no manual refresh needed. */
function listenToVideos() {
  db.collection("videos").orderBy("createdAt", "desc").onSnapshot(
    (snap) => {
      const videos = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      renderVideoList(videos);
    },
    (err) => {
      console.error("listenToVideos failed", err);
      showHint("โหลดรายการคลิปไม่สำเร็จ ลองรีเฟรชหน้า");
    }
  );
}

function renderVideoList(videos) {
  const list = document.getElementById("clipList");
  const emptyMsg = document.getElementById("clipListEmpty");
  if (!list) return;

  emptyMsg.hidden = videos.length > 0;

  list.innerHTML = videos.map(v => `
    <li class="clip-item">
      <div class="clip-item__info">
        <span class="clip-item__tag">${escapeHtml(v.tag || "ทั่วไป")}</span>
        <span class="clip-item__title">${escapeHtml(v.title || "")}</span>
      </div>
      <button class="clip-item__delete" data-id="${v.id}" aria-label="ลบคลิปนี้">✕</button>
    </li>
  `).join("");

  list.querySelectorAll(".clip-item__delete").forEach(btn => {
    btn.addEventListener("click", () => deleteClip(btn.dataset.id));
  });
}

async function handleAddClip(e) {
  e.preventDefault();

  const title = document.getElementById("fTitle").value.trim();
  const tag = document.getElementById("fTag").value.trim();
  const duration = document.getElementById("fDuration").value.trim();
  const videoSrc = document.getElementById("fVideoSrc").value.trim();
  const thumbnail = document.getElementById("fThumb").value.trim();
  const desc = document.getElementById("fDesc").value.trim();

  if (!title || !duration || !desc) return;

  const submitBtn = e.target.querySelector('button[type="submit"]');
  if (submitBtn) submitBtn.disabled = true;

  try {
    await db.collection("videos").add({
      title,
      tag,
      duration,
      videoSrc,
      thumbnail,
      desc,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    e.target.reset();
    showHint("เพิ่มคลิปเรียบร้อยแล้ว ✓ ไปดูผลลัพธ์ในหน้าเว็บไซต์หลักได้เลย");
  } catch (err) {
    console.error("handleAddClip failed", err);
    showHint("เพิ่มคลิปไม่สำเร็จ ลองใหม่อีกครั้ง");
  } finally {
    if (submitBtn) submitBtn.disabled = false;
  }
}

async function deleteClip(id) {
  try {
    await db.collection("videos").doc(id).delete();
  } catch (err) {
    console.error("deleteClip failed", err);
    showHint("ลบคลิปไม่สำเร็จ ลองใหม่อีกครั้ง");
  }
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
