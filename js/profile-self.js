/* ============================================================
   EarlyWatch — Self Profile Page
   Shared by instructor-profile.html and student-profile.html
   Depends on: db.js, risk.js, app.js, auth.js
   ============================================================ */

(function () {
  "use strict";

  function fmtDate(str) {
    if (!str) return "—";
    const d = new Date(str);
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  }

  /* ---------- Resize an uploaded image to a data URL ---------- */
  function processImageFile(file) {
    return new Promise(function (resolve, reject) {
      if (!file.type.startsWith("image/")) {
        reject(new Error("Please select an image file."));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        reject(new Error("Image is too large. Max 5 MB."));
        return;
      }

      const reader = new FileReader();
      reader.onerror = function () { reject(new Error("Could not read the file.")); };
      reader.onload = function () {
        const img = new Image();
        img.onerror = function () { reject(new Error("Invalid image file.")); };
        img.onload = function () {
          const MAX = 400;
          let w = img.width;
          let h = img.height;
          if (w > h && w > MAX) { h = Math.round((h * MAX) / w); w = MAX; }
          else if (h > MAX)     { w = Math.round((w * MAX) / h); h = MAX; }

          const canvas = document.createElement("canvas");
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, w, h);

          try {
            resolve(canvas.toDataURL("image/jpeg", 0.85));
          } catch (err) {
            reject(new Error("Could not process the image."));
          }
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  window.ewInitSelfProfilePage = function () {
    const root = document.getElementById("profileRoot");
    if (!root) return;

    function render() {
      const user = ewCurrentUser();
      if (!user) { window.location.replace("index.html"); return; }

      const record = EW_DB.users.findByLogin(user.email);
      if (!record) {
        root.innerHTML = `<p class="text-muted">Account not found.</p>`;
        return;
      }

      const isStudent = record.role === "student";
      const student   = isStudent && record.studentId
        ? EW_DB.students.get(record.studentId)
        : null;
      const risk      = student ? EW_RISK.compute(student) : null;

      /* ---------- Avatar (photo or initials) ---------- */
      const avatarImage = EW_DB.avatars.get(record.email);
      const avatarInner = avatarImage
        ? `<img src="${avatarImage}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">`
        : ewEsc(record.initials || "??");

      /* ---------- Stats ---------- */
      let statsHTML = "";

      if (isStudent && student) {
        statsHTML = `
          <div class="profile-stat">
            <div class="profile-stat-value" style="color:${risk.level === 'critical' ? '#ff7e87' : risk.level === 'high' ? '#ffb37f' : risk.level === 'medium' ? '#e9c46a' : '#4fd1bd'};">
              ${risk.label}
            </div>
            <div class="profile-stat-label">Risk Level</div>
          </div>
          <div class="profile-stat">
            <div class="profile-stat-value">${Number(student.gpa).toFixed(2)}</div>
            <div class="profile-stat-label">GPA</div>
          </div>
          <div class="profile-stat">
            <div class="profile-stat-value">${student.attendance}%</div>
            <div class="profile-stat-label">Attendance</div>
          </div>
          <div class="profile-stat">
            <div class="profile-stat-value">${(student.subjects || []).length}</div>
            <div class="profile-stat-label">Subjects</div>
          </div>`;
      } else {
        const allStudents = EW_DB.students.all();
        const atRisk = allStudents.filter(function (s) {
          const r = EW_RISK.compute(s);
          return r.level === "critical" || r.level === "high";
        }).length;
        const openAlerts = EW_DB.alerts.unread().length;
        const interventions = EW_DB.interventions.all().length;

        statsHTML = `
          <div class="profile-stat">
            <div class="profile-stat-value">${allStudents.length}</div>
            <div class="profile-stat-label">Total Students</div>
          </div>
          <div class="profile-stat">
            <div class="profile-stat-value" style="color:#ff7e87;">${atRisk}</div>
            <div class="profile-stat-label">At-Risk</div>
          </div>
          <div class="profile-stat">
            <div class="profile-stat-value" style="color:#f4a261;">${openAlerts}</div>
            <div class="profile-stat-label">Open Alerts</div>
          </div>
          <div class="profile-stat">
            <div class="profile-stat-value">${interventions}</div>
            <div class="profile-stat-label">Interventions</div>
          </div>`;
      }

      /* ---------- Student sections ---------- */
      let extraSections = "";
      if (isStudent && student) {
        extraSections = `
          <div class="profile-panel">
            <h3><i data-lucide="graduation-cap"></i> Academic Info</h3>
            <div class="profile-info-row">
              <span class="profile-info-label"><i data-lucide="hash"></i> Student ID</span>
              <span class="profile-info-value">${ewEsc(student.id)}</span>
            </div>
            <div class="profile-info-row">
              <span class="profile-info-label"><i data-lucide="book-open"></i> Course</span>
              <span class="profile-info-value">${ewEsc(student.course || "—")}</span>
            </div>
            <div class="profile-info-row">
              <span class="profile-info-label"><i data-lucide="layers"></i> Section</span>
              <span class="profile-info-value">${ewEsc(student.section || "—")}</span>
            </div>
            <div class="profile-info-row">
              <span class="profile-info-label"><i data-lucide="map-pin"></i> Address</span>
              <span class="profile-info-value">${ewEsc(student.address || "—")}</span>
            </div>
            <div class="profile-info-row">
              <span class="profile-info-label"><i data-lucide="activity"></i> Case Status</span>
              <span class="profile-info-value">${ewEsc(student.caseStatus || "—")}</span>
            </div>
          </div>

          <div class="profile-panel">
            <h3><i data-lucide="trending-up"></i> Current Standing</h3>
            <div class="profile-info-row">
              <span class="profile-info-label"><i data-lucide="shield"></i> Risk Level</span>
              <span class="profile-info-value">
                <span class="profile-badge ${risk.level}">${risk.label} · ${risk.score}/100</span>
              </span>
            </div>
            <div class="profile-info-row">
              <span class="profile-info-label"><i data-lucide="award"></i> GPA</span>
              <span class="profile-info-value">${Number(student.gpa).toFixed(2)}</span>
            </div>
            <div class="profile-info-row">
              <span class="profile-info-label"><i data-lucide="calendar-check"></i> Attendance</span>
              <span class="profile-info-value">${student.attendance}%</span>
            </div>
            <div class="profile-info-row">
              <span class="profile-info-label"><i data-lucide="alert-circle"></i> Failed Subjects</span>
              <span class="profile-info-value">${student.failedSubjects || 0}</span>
            </div>
            <div class="profile-info-row">
              <span class="profile-info-label"><i data-lucide="clipboard-x"></i> Missed Activities</span>
              <span class="profile-info-value">${student.missed || 0}</span>
            </div>
          </div>`;
      } else {
        extraSections = `
          <div class="profile-panel">
            <h3><i data-lucide="briefcase"></i> Position</h3>
            <div class="profile-info-row">
              <span class="profile-info-label"><i data-lucide="building"></i> Department</span>
              <span class="profile-info-value">College of Computer Studies</span>
            </div>
            <div class="profile-info-row">
              <span class="profile-info-label"><i data-lucide="clock"></i> Member Since</span>
              <span class="profile-info-value">${fmtDate(record.createdAt || "2020-06-15")}</span>
            </div>
            <div class="profile-info-row">
              <span class="profile-info-label"><i data-lucide="award"></i> Role</span>
              <span class="profile-info-value">Instructor</span>
            </div>
          </div>

          <div class="profile-panel">
            <h3><i data-lucide="sparkles"></i> Quick Links</h3>
            <div class="profile-info-row">
              <span class="profile-info-label">Dashboard</span>
              <span class="profile-info-value">
                <a href="instructor-dashboard.html" style="color:#7c76ff;text-decoration:none;">Open →</a>
              </span>
            </div>
            <div class="profile-info-row">
              <span class="profile-info-label">Student Records</span>
              <span class="profile-info-value">
                <a href="instructor-student-records.html" style="color:#7c76ff;text-decoration:none;">Open →</a>
              </span>
            </div>
            <div class="profile-info-row">
              <span class="profile-info-label">Makeup Requests</span>
              <span class="profile-info-value">
                <a href="instructor-makeup.html" style="color:#7c76ff;text-decoration:none;">Open →</a>
              </span>
            </div>
            <div class="profile-info-row">
              <span class="profile-info-label">Alerts</span>
              <span class="profile-info-value">
                <a href="instructor-alerts.html" style="color:#7c76ff;text-decoration:none;">Open →</a>
              </span>
            </div>
          </div>`;
      }

      /* ---------- Render ---------- */
      root.innerHTML = `
        <header class="profile-header">
          <div class="profile-avatar-wrap">
            <div class="profile-avatar-lg" id="profileAvatar">${avatarInner}</div>
            <label class="profile-avatar-btn" title="Change photo">
              <i data-lucide="camera"></i>
              <input type="file" accept="image/*" id="avatarFileInput">
            </label>
            ${avatarImage
              ? `<button type="button" class="profile-avatar-remove" id="avatarRemoveBtn" title="Remove photo">×</button>`
              : ""}
          </div>

          <div class="profile-header-info">
            <h1>${ewEsc(record.name)}</h1>
            <div class="profile-header-meta">
              <span class="profile-role-pill">${ewEsc(record.title || record.role)}</span>
              <span class="dot">·</span>
              <span>${ewEsc(record.email)}</span>
              <span class="dot">·</span>
              <span>@${ewEsc(record.username || "no username")}</span>
            </div>
          </div>

          <div class="profile-header-actions">
            <button type="button" class="profile-btn primary" id="btnEditProfile">
              <i data-lucide="pencil"></i> Edit Profile
            </button>
            <button type="button" class="profile-btn" id="btnChangePassword">
              <i data-lucide="lock"></i> Change Password
            </button>
          </div>
        </header>

        <section class="profile-stats">
          ${statsHTML}
        </section>

        <div class="profile-grid">
          ${extraSections}

          <div class="profile-panel profile-panel-full">
            <h3><i data-lucide="user"></i> Account Details</h3>
            <div class="profile-info-row">
              <span class="profile-info-label"><i data-lucide="mail"></i> Email</span>
              <span class="profile-info-value">${ewEsc(record.email)}</span>
            </div>
            <div class="profile-info-row">
              <span class="profile-info-label"><i data-lucide="at-sign"></i> Username</span>
              <span class="profile-info-value">${ewEsc(record.username || "—")}</span>
            </div>
            <div class="profile-info-row">
              <span class="profile-info-label"><i data-lucide="shield-check"></i> Account Status</span>
              <span class="profile-info-value">
                ${record.verified === false
                  ? `<span style="color:#f4a261;">Unverified</span>`
                  : `<span style="color:#4fd1bd;">Active</span>`}
              </span>
            </div>
            <div class="profile-info-row">
              <span class="profile-info-label"><i data-lucide="key"></i> Password</span>
              <span class="profile-info-value">•••••••• (<a href="#" id="linkChangePwdInline" style="color:#7c76ff;text-decoration:none;">change</a>)</span>
            </div>
          </div>
        </div>
      `;

      if (window.lucide) lucide.createIcons();

      /* ---------- Wire avatar upload ---------- */
      const fileInput = document.getElementById("avatarFileInput");
      if (fileInput) {
        fileInput.addEventListener("change", async function (e) {
          const file = e.target.files && e.target.files[0];
          if (!file) return;
          try {
            const dataUrl = await processImageFile(file);
            EW_DB.avatars.save(record.email, dataUrl);
            ewApplyAvatar();
            render();
          } catch (err) {
            alert(err.message || "Could not upload the photo.");
          }
          fileInput.value = "";
        });
      }

      const removeBtn = document.getElementById("avatarRemoveBtn");
      if (removeBtn) {
        removeBtn.addEventListener("click", function () {
          if (!confirm("Remove your profile photo?")) return;
          EW_DB.avatars.remove(record.email);
          ewApplyAvatar();
          render();
        });
      }

      /* ---------- Other buttons ---------- */
      const editBtn = document.getElementById("btnEditProfile");
      const pwdBtn  = document.getElementById("btnChangePassword");
      const pwdLink = document.getElementById("linkChangePwdInline");

      if (editBtn) editBtn.addEventListener("click", openEditProfileModal);
      if (pwdBtn)  pwdBtn.addEventListener("click", openChangePasswordModal);
      if (pwdLink) pwdLink.addEventListener("click", function (e) {
        e.preventDefault();
        openChangePasswordModal();
      });
    }

    /* ============================================================
       Edit Profile Modal
       ============================================================ */
    function openEditProfileModal() {
      const user = ewCurrentUser();
      const record = EW_DB.users.findByLogin(user.email);
      if (!record) return;

      const bodyHTML = `
        <form id="ewEditProfileForm" novalidate>
          <div class="ew-form-error" hidden></div>
          <div class="ew-form-grid">
            <label class="ew-field" style="grid-column:1/-1;">
              <span>Display name</span>
              <input type="text" name="name" value="${ewEsc(record.name)}" required>
            </label>
            <label class="ew-field">
              <span>Email address</span>
              <input type="email" name="email" value="${ewEsc(record.email)}" required>
            </label>
            <label class="ew-field">
              <span>Username</span>
              <input type="text" name="username" value="${ewEsc(record.username || "")}">
            </label>
          </div>
        </form>`;

      const footerHTML = `
        <button type="button" class="ew-btn ew-btn-ghost" data-role="cancel">Cancel</button>
        <button type="button" class="ew-btn ew-btn-primary" data-role="save">Save changes</button>`;

      const ref = ewShowModal({
        title: "Edit Profile",
        bodyHTML: bodyHTML,
        footerHTML: footerHTML,
        width: 520
      });

      const overlay = ref.overlay;
      const close   = ref.close;
      const form    = overlay.querySelector("#ewEditProfileForm");
      const errBox  = overlay.querySelector(".ew-form-error");
      const saveBtn = overlay.querySelector('[data-role="save"]');

      overlay.querySelector('[data-role="cancel"]').onclick = function () { close(null); };

      saveBtn.addEventListener("click", function () {
        const data = Object.fromEntries(new FormData(form).entries());
        errBox.hidden = true;

        if (!data.name || !data.name.trim()) {
          errBox.textContent = "Display name is required.";
          errBox.hidden = false;
          return;
        }
        if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
          errBox.textContent = "Please enter a valid email address.";
          errBox.hidden = false;
          return;
        }

        saveBtn.disabled = true;
        saveBtn.textContent = "Saving…";

        const oldEmail = record.email;
        const newEmail = data.email.trim().toLowerCase();

        const result = EW_DB.users.updateSelf(oldEmail, {
          name:     data.name.trim(),
          email:    newEmail,
          username: data.username ? data.username.trim().toLowerCase() : ""
        });

        if (!result.ok) {
          errBox.textContent = (result.errors || ["Could not save changes."]).join(" ");
          errBox.hidden = false;
          saveBtn.disabled = false;
          saveBtn.textContent = "Save changes";
          return;
        }

        /* If email changed, migrate the avatar to the new email key */
        if (oldEmail !== newEmail) {
          const existing = EW_DB.avatars.get(oldEmail);
          if (existing) {
            EW_DB.avatars.save(newEmail, existing);
            EW_DB.avatars.remove(oldEmail);
          }
        }

        /* Refresh session */
        const fresh = EW_DB.users.findByLogin(newEmail);
        if (fresh) {
          sessionStorage.setItem("earlywatch.session", JSON.stringify({
            role:      fresh.role,
            title:     fresh.title,
            name:      fresh.name,
            initials:  fresh.initials,
            email:     fresh.email,
            studentId: fresh.studentId
          }));
        }

        close(true);
        ewPaintUser();
        ewApplyAvatar();
        render();
      });
    }

    /* ============================================================
       Change Password Modal
       ============================================================ */
    function openChangePasswordModal() {
      const user = ewCurrentUser();
      const record = EW_DB.users.findByLogin(user.email);
      if (!record) return;

      const bodyHTML = `
        <form id="ewChangePwdForm" novalidate>
          <div class="ew-form-error" hidden></div>
          <div class="ew-form-grid">
            <label class="ew-field" style="grid-column:1/-1;">
              <span>Current password</span>
              <div class="password-wrapper">
                <input type="password" name="current" autocomplete="current-password" required>
              </div>
            </label>
            <label class="ew-field" style="grid-column:1/-1;">
              <span>New password</span>
              <div class="password-wrapper">
                <input type="password" name="newPwd" placeholder="Include a symbol, e.g. MyPass!" autocomplete="new-password" required>
              </div>
            </label>
            <label class="ew-field" style="grid-column:1/-1;">
              <span>Confirm new password</span>
              <div class="password-wrapper">
                <input type="password" name="confirm" autocomplete="new-password" required>
              </div>
            </label>
          </div>
        </form>`;

      const footerHTML = `
        <button type="button" class="ew-btn ew-btn-ghost" data-role="cancel">Cancel</button>
        <button type="button" class="ew-btn ew-btn-primary" data-role="save">Update password</button>`;

      const ref = ewShowModal({
        title: "Change Password",
        bodyHTML: bodyHTML,
        footerHTML: footerHTML,
        width: 480
      });

      const overlay = ref.overlay;
      const close   = ref.close;
      const form    = overlay.querySelector("#ewChangePwdForm");
      const errBox  = overlay.querySelector(".ew-form-error");
      const saveBtn = overlay.querySelector('[data-role="save"]');

      if (window.ewWirePasswordToggles) window.ewWirePasswordToggles();

      overlay.querySelector('[data-role="cancel"]').onclick = function () { close(null); };

      saveBtn.addEventListener("click", function () {
        const data = Object.fromEntries(new FormData(form).entries());
        errBox.hidden = true;

        if (!data.current) {
          errBox.textContent = "Please enter your current password.";
          errBox.hidden = false;
          return;
        }
        if (data.newPwd !== data.confirm) {
          errBox.textContent = "New passwords do not match.";
          errBox.hidden = false;
          return;
        }

        saveBtn.disabled = true;
        saveBtn.textContent = "Updating…";

        const result = EW_DB.users.updateSelf(user.email, {
          password: data.newPwd
        }, data.current);

        if (!result.ok) {
          errBox.textContent = (result.errors || ["Could not change password."]).join(" ");
          errBox.hidden = false;
          saveBtn.disabled = false;
          saveBtn.textContent = "Update password";
          return;
        }

        close(true);
        alert("Password updated. Please use it next time you sign in.");
      });
    }

    EW_DB.subscribe(function () { render(); });
    render();
  };
})();