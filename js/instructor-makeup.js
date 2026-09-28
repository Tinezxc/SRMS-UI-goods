/* ============================================================
   EarlyWatch — Instructor Makeup Requests page
   Depends on: db.js, app.js, auth.js
   ============================================================ */

(function () {
  "use strict";

  /* ---------- Helpers ---------- */
  function initialsFrom(name) {
    const parts = String(name || "").trim().split(/\s+/);
    let out = "";
    for (const p of parts.slice(0, 2)) if (p) out += p[0].toUpperCase();
    return out || "??";
  }

  function timeAgo(dateStr) {
    if (!dateStr) return "";
    const then = new Date(dateStr);
    const now  = new Date();
    const days = Math.floor((now - then) / (1000 * 60 * 60 * 24));
    if (days === 0) return "today";
    if (days === 1) return "yesterday";
    if (days < 7)   return days + " days ago";
    if (days < 30)  return Math.floor(days / 7) + " weeks ago";
    return Math.floor(days / 30) + " months ago";
  }

  window.ewInitInstructorMakeupPage = function () {
    const list     = document.getElementById("requestList");
    const tabs     = document.querySelectorAll(".status-tab");
    const markBtn  = document.getElementById("markMissedBtn");
    if (!list) return;

    let activeStatus = "pending";

    /* ---------- Fetch requests across all students ---------- */
    function fetchAll() {
      const students = EW_DB.students.all();
      const out = [];
      students.forEach(function (s) {
        (s.makeupRequests || []).forEach(function (r) {
          out.push({
            ...r,
            studentId:   s.id,
            studentName: s.name,
            studentInitials: s.initials || initialsFrom(s.name),
            course:      s.course || "",
            section:     s.section || ""
          });
        });
      });
      out.sort(function (a, b) { return b.createdAt.localeCompare(a.createdAt); });
      return out;
    }

    /* ---------- Render ---------- */
    function render() {
      const all = fetchAll();

      /* Tab counts */
      const counts = {
        pending:  all.filter(r => r.status === "pending").length,
        approved: all.filter(r => r.status === "approved").length,
        declined: all.filter(r => r.status === "declined").length,
        all:      all.length
      };
      tabs.forEach(function (t) {
        const k = t.dataset.status;
        const el = t.querySelector(".count");
        if (el) el.textContent = counts[k] || "";
      });

      /* Sidebar badge — pending only */
      const sidebarBadge = document.getElementById("navMakeupCount");
      if (sidebarBadge) {
        sidebarBadge.textContent = counts.pending || "";
        sidebarBadge.setAttribute("data-zero", counts.pending === 0 ? "true" : "false");
      }

      /* Filtered list */
      const rows = activeStatus === "all"
        ? all
        : all.filter(r => r.status === activeStatus);

      if (!rows.length) {
        const msg = activeStatus === "pending"
          ? "No pending requests — you're all caught up."
          : "No " + activeStatus + " requests yet.";
        list.innerHTML = `
          <div class="empty-state">
            <h2>${msg}</h2>
            <p>Student makeup requests will appear here as they come in.</p>
          </div>`;
        return;
      }

      list.innerHTML = rows.map(renderCard).join("");

      /* Wire buttons */
      list.querySelectorAll("[data-approve]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          handleDecision(btn.dataset.approve, btn.dataset.student, "approve");
        });
      });
      list.querySelectorAll("[data-decline]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          handleDecision(btn.dataset.decline, btn.dataset.student, "decline");
        });
      });

      if (window.lucide) lucide.createIcons();
    }

    function renderCard(r) {
      const statusLabel = r.status.charAt(0).toUpperCase() + r.status.slice(1);
      const isPending = r.status === "pending";

      let actionsHTML = "";
      if (isPending) {
        actionsHTML = `
          <div class="request-actions">
            <button type="button" class="btn-action approve"
                    data-approve="${r.id}" data-student="${r.studentId}">
              <i data-lucide="check"></i> Approve
            </button>
            <button type="button" class="btn-action decline"
                    data-decline="${r.id}" data-student="${r.studentId}">
              <i data-lucide="x"></i> Decline
            </button>
          </div>`;
      } else if (r.instructorNote) {
        actionsHTML = `
          <div class="decision-note ${r.status}">
            <strong>Your ${r.status === "approved" ? "note" : "reason"}:</strong>
            ${ewEsc(r.instructorNote)}
          </div>`;
      }

      return `
        <article class="request-card status-${r.status}">
          <div class="request-head">
            <div class="request-student">
              <div class="request-avatar">${ewEsc(r.studentInitials)}</div>
              <div>
                <div class="request-student-name">${ewEsc(r.studentName)}</div>
                <div class="request-student-meta">
                  ${ewEsc(r.course || "—")} · ${ewEsc(r.section || "—")} ·
                  Requested ${timeAgo(r.createdAt)}
                </div>
              </div>
            </div>
            <span class="request-status ${r.status}">${statusLabel}</span>
          </div>

          <div class="request-body">
            <div class="request-line label">Missed activity</div>
            <div class="request-line">
              <strong>${ewEsc(r.activityName)}</strong>
              — ${ewEsc(r.activityType || "Assignment")}
              (${ewEsc(r.subjectCode)} · ${ewEsc(r.subjectName)})
              ${r.activityDate ? `on ${ewEsc(r.activityDate)}` : ""}
            </div>

            <div class="request-line label" style="margin-top:.4rem;">Student's reason</div>
            <div class="request-reason">"${ewEsc(r.studentReason)}"</div>

            ${r.proposedDate ? `
              <div class="request-line" style="margin-top:.4rem;">
                <strong>Proposed makeup date:</strong> ${ewEsc(r.proposedDate)}
              </div>` : ""}
          </div>

          ${actionsHTML}
        </article>`;
    }

    /* ---------- Approve / Decline ---------- */
    async function handleDecision(requestId, studentId, action) {
      const isApprove = action === "approve";

      const prompt = isApprove
        ? "Optional approval note (visible to the student):"
        : "Why is this being declined? (required, visible to the student):";
      const defaultText = isApprove ? "Approved. Please see me on the proposed date." : "";

      const note = window.prompt(prompt, defaultText);
      if (note === null) return;                                  // cancelled
      if (!isApprove && !note.trim()) {
        alert("A reason is required when declining.");
        return;
      }

      const result = isApprove
        ? await EW_DB.makeup.approve(studentId, requestId, note.trim())
        : await EW_DB.makeup.decline(studentId, requestId, note.trim());

      if (!result || !result.ok) {
        alert("Could not save decision. Please try again.");
        return;
      }

      render();
    }

    /* ---------- Mark Missed modal ---------- */
    if (markBtn) {
      markBtn.addEventListener("click", openMarkMissedModal);
    }

    async function openMarkMissedModal() {
      const students = EW_DB.students.all();
      if (!students.length) {
        alert("No students in the system yet.");
        return;
      }

      const studentOptions = students
        .slice()
        .sort(function (a, b) { return a.name.localeCompare(b.name); })
        .map(function (s) {
          return `<option value="${ewEsc(s.id)}">${ewEsc(s.name)} — ${ewEsc(s.section || "")}</option>`;
        }).join("");

      const bodyHTML = `
        <form id="ewMarkMissedForm" novalidate>
          <div class="ew-form-error" hidden></div>
          <div class="ew-form-grid">
            <label class="ew-field" style="grid-column:1/-1;">
              <span>Student</span>
              <select name="studentId" id="ewMMStudent">
                <option value="">— Select a student —</option>
                ${studentOptions}
              </select>
            </label>

            <label class="ew-field" style="grid-column:1/-1;">
              <span>Subject</span>
              <select name="subjectCode" id="ewMMSubject">
                <option value="">— Select a subject —</option>
              </select>
            </label>

            <label class="ew-field" style="grid-column:1/-1;">
              <span>Activity name</span>
              <input type="text" name="activityName" required
                     placeholder="e.g. Quiz 3 — Recursion">
            </label>

            <label class="ew-field">
              <span>Type</span>
              <select name="activityType">
                <option>Quiz</option>
                <option selected>Assignment</option>
                <option>Lab</option>
                <option>Project</option>
                <option>Exam</option>
              </select>
            </label>

            <label class="ew-field">
              <span>Date missed</span>
              <input type="date" name="date" value="${new Date().toISOString().slice(0,10)}">
            </label>
          </div>
        </form>`;

      const footerHTML = `
        <button type="button" class="ew-btn ew-btn-ghost" data-role="cancel">Cancel</button>
        <button type="button" class="ew-btn ew-btn-primary" data-role="save">Mark as missed</button>`;

      const ref = ewShowModal({
        title: "Mark a missed activity",
        bodyHTML: bodyHTML,
        footerHTML: footerHTML,
        width: 520
      });

      const overlay   = ref.overlay;
      const close     = ref.close;
      const form      = overlay.querySelector("#ewMarkMissedForm");
      const errBox    = overlay.querySelector(".ew-form-error");
      const saveBtn   = overlay.querySelector('[data-role="save"]');
      const studentSel = overlay.querySelector("#ewMMStudent");
      const subjectSel = overlay.querySelector("#ewMMSubject");

      /* When a student is selected, populate the subject dropdown */
      studentSel.addEventListener("change", function () {
        const s = EW_DB.students.get(studentSel.value);
        const subjects = (s && s.subjects) || [];

        subjectSel.innerHTML = `<option value="">— Select a subject —</option>` +
          subjects.map(function (sub) {
            return `<option value="${ewEsc(sub.code)}">${ewEsc(sub.code)} — ${ewEsc(sub.name)}</option>`;
          }).join("");
      });

      overlay.querySelector('[data-role="cancel"]').onclick = function () { close(null); };

      saveBtn.addEventListener("click", async function () {
        const data = Object.fromEntries(new FormData(form).entries());

        const errs = [];
        if (!data.studentId)    errs.push("Please select a student.");
        if (!data.subjectCode)  errs.push("Please select a subject.");
        if (!data.activityName || !data.activityName.trim())
          errs.push("Please enter the activity name.");

        if (errs.length) {
          errBox.textContent = errs.join(" ");
          errBox.hidden = false;
          return;
        }

        saveBtn.disabled = true;
        saveBtn.textContent = "Saving…";

        const me = ewCurrentUser();
        const result = await EW_DB.markMissed(data.studentId, {
          subjectCode:  data.subjectCode,
          activityName: data.activityName.trim(),
          activityType: data.activityType,
          date:         data.date,
          markedBy:     me ? me.name : ""
        });

        if (!result.ok) {
          errBox.textContent = (result.errors || ["Could not mark as missed."]).join(" ");
          errBox.hidden = false;
          saveBtn.disabled = false;
          saveBtn.textContent = "Mark as missed";
          return;
        }

        close(true);
      });

      if (window.lucide) lucide.createIcons();
    }

    /* ---------- Tabs ---------- */
    tabs.forEach(function (t) {
      t.addEventListener("click", function () {
        tabs.forEach(x => x.classList.remove("active"));
        t.classList.add("active");
        activeStatus = t.dataset.status || "pending";
        render();
      });
    });

    /* ---------- Boot + live updates ---------- */
    EW_DB.subscribe(render);
    render();
  };
})();