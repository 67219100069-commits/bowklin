/* =========================================================
   AUTH — Firebase Authentication + "first registrant = admin"
   -----------------------------------------------------------
   Requires firebase-app-compat.js, firebase-auth-compat.js,
   firebase-firestore-compat.js and firebase-config.js to be
   loaded BEFORE this file (see the <script> order in
   login.html / admin.html).

   How "first person to register becomes admin" works:
   - There's a single Firestore doc: admin_config/admin
   - On registration we try to CREATE that doc, inside a
     transaction, containing the new user's uid. Firestore (and
     the security rules) only allow that create to succeed if the
     doc doesn't exist yet — so only the very first person who
     completes registration can ever "win" the admin slot.
   - Anyone who registers after that finds the doc already taken:
     their freshly-created Firebase Auth account is deleted again
     and they're told an admin already exists.
   - On every login (and on every load of admin.html), we look up
     admin_config/admin and compare its uid to the signed-in
     user's uid. Only a match is let into the admin panel.

   ⚠️ This file assumes the Firestore rules in firestore.rules are
   deployed. Without them, this "first user wins" logic can be
   bypassed from the browser console.
========================================================= */

const ADMIN_DOC_REF = () => db.collection("admin_config").doc("admin");

/* ---- shared helpers (used by login.html and admin.html) -------------- */

async function getAdminRecord() {
  const snap = await ADMIN_DOC_REF().get();
  return snap.exists ? snap.data() : null;
}

async function isCurrentUserAdmin(user) {
  if (!user) return false;
  const admin = await getAdminRecord();
  return !!admin && admin.uid === user.uid;
}

function logout() {
  firebase.auth().signOut().finally(() => {
    window.location.href = "login.html";
  });
}

/* Route guard for admin.html.
   Resolves with the admin's Firebase user once confirmed;
   redirects to login.html (and signs out) for anyone else. */
function guardAdminAccess() {
  return new Promise((resolve) => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        window.location.href = "login.html";
        return;
      }
      const ok = await isCurrentUserAdmin(user);
      if (!ok) {
        await firebase.auth().signOut();
        window.location.href = "login.html";
        return;
      }
      resolve(user);
    });
  });
}

/* =========================================================
   LOGIN / REGISTER PAGE LOGIC
   (only runs when those forms exist on the page)
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  if (!loginForm && !registerForm) return; // not on the login page

  const mascot = document.getElementById("mascot");
  const errorEl = document.getElementById("authError");
  const tabLoginBtn = document.getElementById("tabLogin");
  const tabRegisterBtn = document.getElementById("tabRegister");

  // Already signed in as the confirmed admin? Skip straight to admin.
  firebase.auth().onAuthStateChanged(async (user) => {
    if (user && (await isCurrentUserAdmin(user))) {
      window.location.href = "admin.html";
    }
  });

  // Blink animation loop for the mascot's normal eyes
  setInterval(() => {
    if (!mascot.classList.contains("mascot--success") && !mascot.classList.contains("mascot--error")) {
      mascot.classList.add("is-blinking");
      setTimeout(() => mascot.classList.remove("is-blinking"), 160);
    }
  }, 3200);

  function showTab(which) {
    const isLogin = which === "login";
    loginForm.hidden = !isLogin;
    registerForm.hidden = isLogin;
    tabLoginBtn?.classList.toggle("is-active", isLogin);
    tabRegisterBtn?.classList.toggle("is-active", !isLogin);
    errorEl.hidden = true;
    mascot.classList.remove("mascot--success", "mascot--error");
  }
  tabLoginBtn?.addEventListener("click", () => showTab("login"));
  tabRegisterBtn?.addEventListener("click", () => showTab("register"));

  // Show/hide password toggles, scoped per form
  [loginForm, registerForm].forEach((form) => {
    if (!form) return;
    form.querySelectorAll("[data-toggle-password]").forEach((toggleBtn) => {
      toggleBtn.addEventListener("click", () => {
        const input = toggleBtn.parentElement.querySelector("input");
        if (!input) return;
        input.type = input.type === "password" ? "text" : "password";
      });
    });
  });

  function setBusy(btn, label) {
    btn.disabled = true;
    if (!btn.dataset.originalText) btn.dataset.originalText = btn.textContent;
    btn.textContent = label;
  }
  function clearBusy(btn) {
    btn.disabled = false;
    if (btn.dataset.originalText) btn.textContent = btn.dataset.originalText;
  }

  function handleSuccess() {
    mascot.classList.remove("mascot--error");
    mascot.classList.add("mascot--success");
    errorEl.hidden = true;
    setTimeout(() => {
      window.location.href = "admin.html";
    }, 700);
  }

  function handleError(message) {
    mascot.classList.remove("mascot--success");
    mascot.classList.add("mascot--error", "mascot--shake");
    setTimeout(() => mascot.classList.remove("mascot--shake"), 500);

    errorEl.textContent = message;
    errorEl.hidden = false;
    setTimeout(() => mascot.classList.remove("mascot--error"), 1800);
  }

  function friendlyFirebaseError(err) {
    switch (err && err.code) {
      case "auth/invalid-email": return "อีเมลไม่ถูกต้อง";
      case "auth/user-not-found":
      case "auth/wrong-password":
      case "auth/invalid-credential": return "อีเมลหรือรหัสผ่านไม่ถูกต้อง";
      case "auth/email-already-in-use": return "อีเมลนี้ถูกใช้สมัครไปแล้ว";
      case "auth/weak-password": return "รหัสผ่านสั้นเกินไป (อย่างน้อย 6 ตัวอักษร)";
      case "auth/too-many-requests": return "ลองผิดหลายครั้งเกินไป กรุณารอสักครู่";
      default: return "เกิดข้อผิดพลาด ลองใหม่อีกครั้ง";
    }
  }

  /* ---- LOGIN ---- */
  if (loginForm) {
    const btn = document.getElementById("loginBtn");
    const btnText = document.getElementById("loginBtnText");

    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value;

      setBusy(btn, "กำลังเข้าสู่ระบบ…");
      try {
        const cred = await firebase.auth().signInWithEmailAndPassword(email, password);
        const ok = await isCurrentUserAdmin(cred.user);
        if (!ok) {
          await firebase.auth().signOut();
          handleError("บัญชีนี้ไม่ใช่แอดมิน (เว็บนี้มีแอดมินได้เพียงคนเดียว)");
          clearBusy(btn);
          return;
        }
        btnText.textContent = "สำเร็จ! กำลังพาไป…";
        handleSuccess();
      } catch (err) {
        handleError(friendlyFirebaseError(err));
        clearBusy(btn);
      }
    });
  }

  /* ---- REGISTER (only the first successful registrant becomes admin) ---- */
  if (registerForm) {
    const btn = document.getElementById("registerBtn");
    const btnText = document.getElementById("registerBtnText");

    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("registerEmail").value.trim();
      const password = document.getElementById("registerPassword").value;
      const confirm = document.getElementById("registerConfirm").value;

      if (password !== confirm) {
        handleError("รหัสผ่านทั้งสองช่องไม่ตรงกัน");
        return;
      }

      setBusy(btn, "กำลังสมัคร…");

      // Early bail-out before creating an Auth account, to avoid
      // leaving orphaned accounts behind in the common case.
      // The transaction below is what actually guards the race.
      const existing = await getAdminRecord().catch(() => null);
      if (existing) {
        handleError("มีแอดมินของเว็บนี้แล้ว ระบบรับสมัครแอดมินได้เพียงคนเดียวเท่านั้น");
        clearBusy(btn);
        return;
      }

      let cred;
      try {
        cred = await firebase.auth().createUserWithEmailAndPassword(email, password);
      } catch (err) {
        handleError(friendlyFirebaseError(err));
        clearBusy(btn);
        return;
      }

      try {
        await db.runTransaction(async (tx) => {
          const doc = await tx.get(ADMIN_DOC_REF());
          if (doc.exists) throw new Error("ADMIN_TAKEN");
          tx.set(ADMIN_DOC_REF(), {
            uid: cred.user.uid,
            email: cred.user.email,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          });
        });

        btnText.textContent = "สมัครสำเร็จ! กำลังพาไป…";
        handleSuccess();
      } catch (err) {
        // Someone else claimed the admin slot in the meantime (or the
        // security rules rejected the write) — undo the new account.
        await cred.user.delete().catch(() => {});
        await firebase.auth().signOut().catch(() => {});
        handleError("มีแอดมินของเว็บนี้แล้ว ระบบรับสมัครแอดมินได้เพียงคนเดียวเท่านั้น");
        clearBusy(btn);
      }
    });
  }
});
