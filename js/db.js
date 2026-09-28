/* ============================================================
   EarlyWatch — Local Data Layer (no backend)
   Persists to localStorage. Same public API as before so the
   rest of the app keeps working unchanged.
   ============================================================ */

const EW_STORAGE_KEY = "earlywatch.db.v1";

/* ---------- Seed data ---------- */
const EW_SEED = {
  students: [
    /* ---------- 1. Alex Reyes ---------- */
    {
      id: "01-COLL-24-2742",
      name: "Alex Reyes",
      initials: "AR",
      course: "BS Information Technology",
      section: "BSIT 3-A",
      adviser: "",
      address: "123 Rizal St, Barangay San Roque, Quezon City",
      gpa: 1.55,
      attendance: 58,
      missed: 11,
      failedSubjects: 3,
      caseStatus: "Open",
      subjects: [
        { code: "IT301", name: "Data Structures & Algorithms", instructor: "Prof. Jovic Lanao", grade: 72, prelim: 70, midterm: 74, attendance: 55 },
        { code: "IT302", name: "Database Management Systems",  instructor: "Prof. Maria Santos", grade: 78, prelim: 76, midterm: 80, attendance: 62 },
        { code: "IT303", name: "Web Systems & Technologies",   instructor: "Prof. James Cruz",  grade: 68, prelim: 66, midterm: 70, attendance: 54 },
        { code: "GE301", name: "Ethics",                       instructor: "Prof. Liza Tan",    grade: 85, prelim: 84, midterm: 86, attendance: 70 }
      ],
      history: [
        { term: "1st Sem 2024", risk: 42 },
        { term: "2nd Sem 2024", risk: 55 },
        { term: "1st Sem 2025", risk: 71 },
        { term: "2nd Sem 2025", risk: 78 },
        { term: "1st Sem 2026", risk: 88 }
      ],
      notes: [
        { date: "2026-09-10", author: "Prof. Jovic Lanao", text: "Met with Alex to discuss failing grades. He cited family responsibilities affecting study time." },
        { date: "2026-09-14", author: "Prof. Jovic Lanao", text: "Referred to guidance office for counseling sessions every Wednesday." }
      ],
      complianceTasks: [
        {
          id: "ct_seed001",
          title: "Attend remedial Math class",
          description: "Friday 2:00–4:00 PM, Room 210 with Prof. Santos.",
          category: "Academic",
          priority: "high",
          status: "in_progress",
          assignedBy: "Prof. Jovic Lanao",
          dueDate: "2026-10-05",
          studentNote: "Attended first session on Sept 26.",
          adminNote: "",
          completedAt: null
        },
        {
          id: "ct_seed002",
          title: "Parent-signed attendance warning",
          description: "Submit the signed attendance warning form to the registrar.",
          category: "Attendance",
          priority: "critical",
          status: "pending",
          assignedBy: "Prof. Jovic Lanao",
          dueDate: "2026-10-01",
          studentNote: "",
          adminNote: "",
          completedAt: null
        }
      ],
      makeupRequests: []
    },

    /* ---------- 2. Jomar Pantas ---------- */
    {
      id: "01-COLL-24-2743",
      name: "Jomar Pantas",
      initials: "JP",
      course: "BS Computer Science",
      section: "BSCS 3-B",
      adviser: "",
      address: "",
      gpa: 1.90,
      attendance: 66,
      missed: 7,
      failedSubjects: 2,
      caseStatus: "In-Progress",
      subjects: [
        { code: "CS301", name: "Operating Systems",       instructor: "Prof. Jovic Lanao", grade: 74, prelim: 72, midterm: 76, attendance: 64 },
        { code: "CS302", name: "Software Engineering",    instructor: "Prof. Maria Santos", grade: 79, prelim: 78, midterm: 80, attendance: 68 },
        { code: "CS303", name: "Artificial Intelligence", instructor: "Prof. James Cruz",  grade: 71, prelim: 70, midterm: 72, attendance: 66 },
        { code: "GE302", name: "Technical Writing",       instructor: "Prof. Liza Tan",    grade: 82, prelim: 81, midterm: 83, attendance: 70 }
      ],
      history: [
        { term: "1st Sem 2024", risk: 30 },
        { term: "2nd Sem 2024", risk: 38 },
        { term: "1st Sem 2025", risk: 50 },
        { term: "2nd Sem 2025", risk: 62 },
        { term: "1st Sem 2026", risk: 70 }
      ],
      notes: [
        { date: "2026-09-08", author: "Prof. Jovic Lanao", text: "Jomar is struggling with OS concepts. Set up weekly tutoring with senior students." }
      ],
      complianceTasks: [],
      makeupRequests: []
    },

    /* ---------- 3. Mika Dela Cruz ---------- */
    {
      id: "01-COLL-24-2744",
      name: "Mika Dela Cruz",
      initials: "MD",
      course: "BS Information Systems",
      section: "BSIS 3-A",
      adviser: "",
      address: "",
      gpa: 2.35,
      attendance: 78,
      missed: 4,
      failedSubjects: 1,
      caseStatus: "Monitoring",
      subjects: [
        { code: "IS301", name: "Systems Analysis & Design", instructor: "Prof. Maria Santos", grade: 80, prelim: 79, midterm: 81, attendance: 78 },
        { code: "IS302", name: "Business Process Mgmt",     instructor: "Prof. James Cruz",  grade: 77, prelim: 76, midterm: 78, attendance: 80 },
        { code: "IS303", name: "Enterprise Architecture",   instructor: "Prof. Jovic Lanao", grade: 74, prelim: 73, midterm: 75, attendance: 76 },
        { code: "GE303", name: "Philippine History",        instructor: "Prof. Liza Tan",    grade: 88, prelim: 87, midterm: 89, attendance: 82 }
      ],
      history: [
        { term: "1st Sem 2024", risk: 22 },
        { term: "2nd Sem 2024", risk: 28 },
        { term: "1st Sem 2025", risk: 34 },
        { term: "2nd Sem 2025", risk: 40 },
        { term: "1st Sem 2026", risk: 44 }
      ],
      notes: [
        { date: "2026-09-05", author: "Prof. Jovic Lanao", text: "Mika is on track but attendance dipped slightly. Monitoring continues." }
      ],
      complianceTasks: [],
      makeupRequests: []
    },

    /* ---------- 4. Renz Villanueva ---------- */
    {
      id: "01-COLL-24-2745",
      name: "Renz Villanueva",
      initials: "RV",
      course: "BS Information Technology",
      section: "BSIT 3-A",
      adviser: "",
      address: "",
      gpa: 2.85,
      attendance: 91,
      missed: 1,
      failedSubjects: 0,
      caseStatus: "Resolved",
      subjects: [
        { code: "IT301", name: "Data Structures & Algorithms", instructor: "Prof. Jovic Lanao", grade: 86, prelim: 85, midterm: 87, attendance: 92 },
        { code: "IT302", name: "Database Management Systems",  instructor: "Prof. Maria Santos", grade: 88, prelim: 87, midterm: 89, attendance: 90 },
        { code: "IT303", name: "Web Systems & Technologies",   instructor: "Prof. James Cruz",  grade: 90, prelim: 89, midterm: 91, attendance: 93 },
        { code: "GE301", name: "Ethics",                       instructor: "Prof. Liza Tan",    grade: 89, prelim: 88, midterm: 90, attendance: 91 }
      ],
      history: [
        { term: "1st Sem 2024", risk: 18 },
        { term: "2nd Sem 2024", risk: 15 },
        { term: "1st Sem 2025", risk: 12 },
        { term: "2nd Sem 2025", risk: 10 },
        { term: "1st Sem 2026", risk: 8 }
      ],
      notes: [
        { date: "2026-08-30", author: "Prof. Jovic Lanao", text: "Renz has improved significantly. Case resolved." }
      ],
      complianceTasks: [],
      makeupRequests: []
    },

    /* ---------- 5. Sofia Mendoza ---------- */
    {
      id: "01-COLL-24-2746",
      name: "Sofia Mendoza",
      initials: "SM",
      course: "BS Computer Science",
      section: "BSCS 3-B",
      adviser: "",
      address: "",
      gpa: 1.70,
      attendance: 55,
      missed: 10,
      failedSubjects: 2,
      caseStatus: "Open",
      subjects: [
        { code: "CS301", name: "Operating Systems",       instructor: "Prof. Jovic Lanao", grade: 70, prelim: 68, midterm: 72, attendance: 52 },
        { code: "CS302", name: "Software Engineering",    instructor: "Prof. Maria Santos", grade: 73, prelim: 72, midterm: 74, attendance: 56 },
        { code: "CS303", name: "Artificial Intelligence", instructor: "Prof. James Cruz",  grade: 68, prelim: 66, midterm: 70, attendance: 54 },
        { code: "GE302", name: "Technical Writing",       instructor: "Prof. Liza Tan",    grade: 80, prelim: 79, midterm: 81, attendance: 60 }
      ],
      history: [
        { term: "1st Sem 2024", risk: 45 },
        { term: "2nd Sem 2024", risk: 58 },
        { term: "1st Sem 2025", risk: 66 },
        { term: "2nd Sem 2025", risk: 75 },
        { term: "1st Sem 2026", risk: 84 }
      ],
      notes: [
        { date: "2026-09-11", author: "Prof. Jovic Lanao", text: "Sofia is at serious risk. Coordinating with parents for a conference next week." }
      ],
      complianceTasks: [],
      makeupRequests: []
    },

    /* ---------- 6. Kyla Bautista ---------- */
    {
      id: "01-COLL-24-2747",
      name: "Kyla Bautista",
      initials: "KB",
      course: "BS Information Systems",
      section: "BSIS 3-A",
      adviser: "",
      address: "",
      gpa: 2.10,
      attendance: 82,
      missed: 3,
      failedSubjects: 0,
      caseStatus: "Monitoring",
      subjects: [
        { code: "IS301", name: "Systems Analysis & Design", instructor: "Prof. Maria Santos", grade: 82, prelim: 81, midterm: 83, attendance: 82 },
        { code: "IS302", name: "Business Process Mgmt",     instructor: "Prof. James Cruz",  grade: 80, prelim: 79, midterm: 81, attendance: 84 },
        { code: "IS303", name: "Enterprise Architecture",   instructor: "Prof. Jovic Lanao", grade: 79, prelim: 78, midterm: 80, attendance: 80 },
        { code: "GE303", name: "Philippine History",        instructor: "Prof. Liza Tan",    grade: 90, prelim: 89, midterm: 91, attendance: 85 }
      ],
      history: [
        { term: "1st Sem 2024", risk: 25 },
        { term: "2nd Sem 2024", risk: 30 },
        { term: "1st Sem 2025", risk: 32 },
        { term: "2nd Sem 2025", risk: 35 },
        { term: "1st Sem 2026", risk: 34 }
      ],
      notes: [
        { date: "2026-09-06", author: "Prof. Jovic Lanao", text: "Kyla is stable. Continue regular check-ins." }
      ],
      complianceTasks: [],
      makeupRequests: []
    },

    /* ---------- 7. Marco Aquino ---------- */
    {
      id: "01-COLL-24-2748",
      name: "Marco Aquino",
      initials: "MA",
      course: "BS Information Technology",
      section: "BSIT 3-B",
      adviser: "",
      address: "",
      gpa: 2.60,
      attendance: 88,
      missed: 2,
      failedSubjects: 0,
      caseStatus: "Resolved",
      subjects: [
        { code: "IT301", name: "Data Structures & Algorithms", instructor: "Prof. Jovic Lanao", grade: 84, prelim: 83, midterm: 85, attendance: 88 },
        { code: "IT302", name: "Database Management Systems",  instructor: "Prof. Maria Santos", grade: 85, prelim: 84, midterm: 86, attendance: 90 },
        { code: "IT303", name: "Web Systems & Technologies",   instructor: "Prof. James Cruz",  grade: 86, prelim: 85, midterm: 87, attendance: 89 },
        { code: "GE301", name: "Ethics",                       instructor: "Prof. Liza Tan",    grade: 88, prelim: 87, midterm: 89, attendance: 87 }
      ],
      history: [
        { term: "1st Sem 2024", risk: 20 },
        { term: "2nd Sem 2024", risk: 18 },
        { term: "1st Sem 2025", risk: 15 },
        { term: "2nd Sem 2025", risk: 12 },
        { term: "1st Sem 2026", risk: 11 }
      ],
      notes: [],
      complianceTasks: [],
      makeupRequests: []
    },

    /* ---------- 8. Liza Fernandez ---------- */
    {
      id: "01-COLL-24-2749",
      name: "Liza Fernandez",
      initials: "LF",
      course: "BS Computer Science",
      section: "BSCS 3-A",
      adviser: "",
      address: "",
      gpa: 1.85,
      attendance: 72,
      missed: 5,
      failedSubjects: 1,
      caseStatus: "In-Progress",
      subjects: [
        { code: "CS301", name: "Operating Systems",       instructor: "Prof. Jovic Lanao", grade: 76, prelim: 75, midterm: 77, attendance: 72 },
        { code: "CS302", name: "Software Engineering",    instructor: "Prof. Maria Santos", grade: 78, prelim: 77, midterm: 79, attendance: 74 },
        { code: "CS303", name: "Artificial Intelligence", instructor: "Prof. James Cruz",  grade: 73, prelim: 72, midterm: 74, attendance: 70 },
        { code: "GE302", name: "Technical Writing",       instructor: "Prof. Liza Tan",    grade: 82, prelim: 81, midterm: 83, attendance: 75 }
      ],
      history: [
        { term: "1st Sem 2024", risk: 32 },
        { term: "2nd Sem 2024", risk: 42 },
        { term: "1st Sem 2025", risk: 50 },
        { term: "2nd Sem 2025", risk: 55 },
        { term: "1st Sem 2026", risk: 58 }
      ],
      notes: [
        { date: "2026-09-09", author: "Prof. Jovic Lanao", text: "Liza is improving. Attendance plan in place." }
      ],
      complianceTasks: [],
      makeupRequests: []
    }
  ],

  alerts: [
    { id: "a_001", studentId: "01-COLL-24-2742", severity: "critical", kind: "Attendance", message: "Attendance dropped to 58% — below the 60% threshold.", date: "2026-09-15", acknowledged: false },
    { id: "a_002", studentId: "01-COLL-24-2742", severity: "critical", kind: "Grades",     message: "3 failed subjects this term. Immediate intervention required.", date: "2026-09-14", acknowledged: false },
    { id: "a_003", studentId: "01-COLL-24-2746", severity: "critical", kind: "GPA",        message: "GPA fell to 1.70 — below the 1.75 minimum.", date: "2026-09-14", acknowledged: false },
    { id: "a_004", studentId: "01-COLL-24-2746", severity: "high",     kind: "Attendance", message: "Attendance is 55% — 10 missed activities so far.", date: "2026-09-13", acknowledged: false },
    { id: "a_005", studentId: "01-COLL-24-2743", severity: "high",     kind: "Grades",     message: "2 failed subjects detected in midterm evaluation.", date: "2026-09-12", acknowledged: false },
    { id: "a_006", studentId: "01-COLL-24-2749", severity: "high",     kind: "Attendance", message: "Attendance at 72% — approaching critical threshold.", date: "2026-09-12", acknowledged: false },
    { id: "a_007", studentId: "01-COLL-24-2744", severity: "medium",   kind: "Grades",     message: "Grade in IS303 dropped below 75.", date: "2026-09-11", acknowledged: false },
    { id: "a_008", studentId: "01-COLL-24-2747", severity: "medium",   kind: "Attendance", message: "Attendance slipped to 82% this month.", date: "2026-09-10", acknowledged: true  },
    { id: "a_009", studentId: "01-COLL-24-2745", severity: "low",      kind: "Note",       message: "Case resolved. Continue positive reinforcement.", date: "2026-09-08", acknowledged: true  }
  ],

  interventions: [
    { id: "i_001", studentId: "01-COLL-24-2742", type: "Counseling",        status: "pending",   assigned: "Prof. Jovic Lanao",   action: "Weekly counseling sessions every Wednesday at 2PM to address family-related stress.", date: "2026-09-14", deadline: "2026-10-15", address: "" },
    { id: "i_002", studentId: "01-COLL-24-2742", type: "Academic Coaching", status: "pending",   assigned: "Prof. Jovic Lanao",   action: "One-on-one tutoring for IT301 and IT303 twice a week.", date: "2026-09-12", deadline: "2026-10-01", address: "" },
    { id: "i_003", studentId: "01-COLL-24-2743", type: "Tutoring",          status: "pending",   assigned: "Prof. Maria Santos",  action: "Senior-peer tutoring for Operating Systems every Friday.", date: "2026-09-08", deadline: "2026-10-10", address: "" },
    { id: "i_004", studentId: "01-COLL-24-2746", type: "Parent Conference", status: "pending",   assigned: "Prof. James Cruz",    action: "Parent-teacher conference to discuss attendance and grades.", date: "2026-09-15", deadline: "2026-09-25", address: "" },
    { id: "i_005", studentId: "01-COLL-24-2749", type: "Academic Coaching", status: "effective", assigned: "Prof. James Cruz",    action: "Bi-weekly check-ins. Attendance improved from 65% to 72%.", date: "2026-08-20", deadline: "2026-09-20", address: "" },
    { id: "i_006", studentId: "01-COLL-24-2745", type: "Mentoring",         status: "effective", assigned: "Prof. Liza Tan",      action: "Mentoring sessions concluded. Student is now thriving.", date: "2026-07-15", deadline: "2026-08-30", address: "" }
  ],

  users: [
    { role: "admin",      title: "Administrator", name: "System Administrator", initials: "SA",
      email: "admin@cmdi.edu.ph",       username: "admin",  password: "admin123",      studentId: null },
    { role: "instructor", title: "Instructor",    name: "Prof. Jovic Lanao",    initials: "PJ",
      email: "jovic.lanao@cmdi.edu.ph", username: "jlanao", password: "instructor123", studentId: null },
    { role: "student",    title: "Student",       name: "Alex Reyes",           initials: "AR",
      email: "alex.reyes@cmdi.edu.ph",  username: "areyes", password: "student123",    studentId: "01-COLL-24-2742" }
  ]
};

/* ---------- Seed normalizer ----------
   Fills realistic quiz scores and missed activities into every
   subject so the dashboard tabs always have content. */
(function normalizeSeed() {
  const MISSED_BY_STUDENT = {
    "01-COLL-24-2742": {
      IT301: [
        { name: "Assignment 2 — Recursion", type: "Assignment", date: "2026-08-22" },
        { name: "Lab Exercise 4",           type: "Lab",        date: "2026-09-05" },
        { name: "Quiz 3 makeup",            type: "Quiz",       date: "2026-09-12" }
      ],
      IT302: [
        { name: "Assignment 3 — Normalization", type: "Assignment", date: "2026-09-03" }
      ],
      IT303: [
        { name: "Project Milestone 1", type: "Project",    date: "2026-09-01" },
        { name: "Quiz 2 makeup",       type: "Quiz",       date: "2026-09-06" },
        { name: "Assignment 4",        type: "Assignment", date: "2026-09-10" }
      ],
      GE301: [
        { name: "Reflection Paper", type: "Assignment", date: "2026-09-08" }
      ]
    },
    "01-COLL-24-2746": {
      CS301: [
        { name: "Quiz 1",         type: "Quiz",       date: "2026-08-18" },
        { name: "Lab Exercise 2", type: "Lab",        date: "2026-08-25" },
        { name: "Assignment 1",   type: "Assignment", date: "2026-09-02" }
      ],
      CS302: [
        { name: "Quiz 2",                type: "Quiz",    date: "2026-09-04" },
        { name: "Group Project Meeting", type: "Project", date: "2026-09-09" }
      ],
      CS303: [
        { name: "Midterm Exam makeup", type: "Exam",       date: "2026-09-07" },
        { name: "Assignment 3",        type: "Assignment", date: "2026-09-11" }
      ],
      GE302: [
        { name: "Essay Submission", type: "Assignment", date: "2026-09-06" }
      ]
    },
    "01-COLL-24-2743": {
      CS301: [
        { name: "Quiz 2",         type: "Quiz", date: "2026-08-27" },
        { name: "Lab Exercise 3", type: "Lab",  date: "2026-09-05" }
      ],
      CS302: [
        { name: "Assignment 1", type: "Assignment", date: "2026-08-20" }
      ],
      CS303: [
        { name: "Quiz 1",       type: "Quiz",       date: "2026-08-15" },
        { name: "Assignment 2", type: "Assignment", date: "2026-09-03" }
      ],
      GE302: [
        { name: "Reading Response", type: "Assignment", date: "2026-09-08" }
      ]
    },
    "01-COLL-24-2749": {
      CS301: [
        { name: "Quiz 1",         type: "Quiz", date: "2026-08-15" },
        { name: "Lab Exercise 1", type: "Lab",  date: "2026-08-22" }
      ],
      CS303: [
        { name: "Assignment 2", type: "Assignment", date: "2026-09-05" }
      ],
      GE302: [
        { name: "Essay Submission", type: "Assignment", date: "2026-09-09" }
      ]
    },
    "01-COLL-24-2744": {
      IS301: [
        { name: "Quiz 2", type: "Quiz", date: "2026-08-29" }
      ],
      IS302: [
        { name: "Assignment 2", type: "Assignment", date: "2026-09-04" }
      ],
      IS303: [
        { name: "Lab Exercise 1", type: "Lab", date: "2026-09-10" }
      ]
    },
    "01-COLL-24-2747": {
      IS301: [
        { name: "Quiz 3", type: "Quiz", date: "2026-09-12" }
      ],
      IS302: [
        { name: "Assignment 3", type: "Assignment", date: "2026-09-08" }
      ]
    },
    "01-COLL-24-2745": {
      IT301: [
        { name: "Quiz 1 makeup", type: "Quiz", date: "2026-08-20" }
      ]
    },
    "01-COLL-24-2748": {
      IT302: [
        { name: "Assignment 1", type: "Assignment", date: "2026-08-25" }
      ],
      IT303: [
        { name: "Lab Exercise 2", type: "Lab", date: "2026-09-07" }
      ]
    }
  };

  const QUIZZES_BY_STUDENT = {
    "01-COLL-24-2742": {
      IT301: [
        { name: "Quiz 1", score: 12, total: 20, date: "2026-08-14" },
        { name: "Quiz 2", score: 14, total: 20, date: "2026-08-28" },
        { name: "Quiz 3", score: 10, total: 20, date: "2026-09-11" }
      ],
      IT302: [
        { name: "Quiz 1", score: 16, total: 20, date: "2026-08-15" },
        { name: "Quiz 2", score: 15, total: 20, date: "2026-08-29" }
      ],
      IT303: [
        { name: "Quiz 1", score: 11, total: 20, date: "2026-08-16" },
        { name: "Quiz 2", score:  9, total: 20, date: "2026-08-30" },
        { name: "Quiz 3", score: 12, total: 20, date: "2026-09-13" }
      ],
      GE301: [
        { name: "Quiz 1", score: 18, total: 20, date: "2026-08-18" }
      ]
    },
    "01-COLL-24-2746": {
      CS301: [
        { name: "Quiz 1", score: 10, total: 20, date: "2026-08-12" },
        { name: "Quiz 2", score: 12, total: 20, date: "2026-08-26" }
      ],
      CS302: [
        { name: "Quiz 1", score: 14, total: 20, date: "2026-08-14" },
        { name: "Quiz 2", score: 13, total: 20, date: "2026-08-28" }
      ],
      CS303: [
        { name: "Quiz 1", score: 11, total: 20, date: "2026-08-15" }
      ],
      GE302: [
        { name: "Quiz 1", score: 17, total: 20, date: "2026-08-19" }
      ]
    },
    "01-COLL-24-2743": {
      CS301: [
        { name: "Quiz 1", score: 13, total: 20, date: "2026-08-13" },
        { name: "Quiz 2", score: 15, total: 20, date: "2026-08-27" }
      ],
      CS302: [
        { name: "Quiz 1", score: 16, total: 20, date: "2026-08-16" },
        { name: "Quiz 2", score: 17, total: 20, date: "2026-08-30" }
      ],
      CS303: [
        { name: "Quiz 1", score: 12, total: 20, date: "2026-08-17" }
      ],
      GE302: [
        { name: "Quiz 1", score: 18, total: 20, date: "2026-08-20" }
      ]
    },
    "01-COLL-24-2749": {
      CS301: [
        { name: "Quiz 1", score: 14, total: 20, date: "2026-08-13" },
        { name: "Quiz 2", score: 16, total: 20, date: "2026-08-27" }
      ],
      CS302: [
        { name: "Quiz 1", score: 16, total: 20, date: "2026-08-15" }
      ],
      CS303: [
        { name: "Quiz 1", score: 13, total: 20, date: "2026-08-18" }
      ],
      GE302: [
        { name: "Quiz 1", score: 17, total: 20, date: "2026-08-21" }
      ]
    },
    "01-COLL-24-2744": {
      IS301: [
        { name: "Quiz 1", score: 17, total: 20, date: "2026-08-14" },
        { name: "Quiz 2", score: 16, total: 20, date: "2026-08-28" }
      ],
      IS302: [
        { name: "Quiz 1", score: 15, total: 20, date: "2026-08-16" }
      ],
      IS303: [
        { name: "Quiz 1", score: 14, total: 20, date: "2026-08-19" }
      ],
      GE303: [
        { name: "Quiz 1", score: 18, total: 20, date: "2026-08-22" }
      ]
    },
    "01-COLL-24-2747": {
      IS301: [
        { name: "Quiz 1", score: 17, total: 20, date: "2026-08-13" },
        { name: "Quiz 2", score: 18, total: 20, date: "2026-08-27" }
      ],
      IS302: [
        { name: "Quiz 1", score: 16, total: 20, date: "2026-08-15" }
      ],
      IS303: [
        { name: "Quiz 1", score: 15, total: 20, date: "2026-08-18" }
      ],
      GE303: [
        { name: "Quiz 1", score: 19, total: 20, date: "2026-08-21" }
      ]
    },
    "01-COLL-24-2745": {
      IT301: [
        { name: "Quiz 1", score: 18, total: 20, date: "2026-08-12" },
        { name: "Quiz 2", score: 17, total: 20, date: "2026-08-26" }
      ],
      IT302: [
        { name: "Quiz 1", score: 19, total: 20, date: "2026-08-14" }
      ],
      IT303: [
        { name: "Quiz 1", score: 18, total: 20, date: "2026-08-17" }
      ],
      GE301: [
        { name: "Quiz 1", score: 19, total: 20, date: "2026-08-20" }
      ]
    },
    "01-COLL-24-2748": {
      IT301: [
        { name: "Quiz 1", score: 17, total: 20, date: "2026-08-13" }
      ],
      IT302: [
        { name: "Quiz 1", score: 18, total: 20, date: "2026-08-15" }
      ],
      IT303: [
        { name: "Quiz 1", score: 17, total: 20, date: "2026-08-18" }
      ],
      GE301: [
        { name: "Quiz 1", score: 18, total: 20, date: "2026-08-21" }
      ]
    }
  };

  (EW_SEED.students || []).forEach(function (s) {
    s.address         = s.address || "";
    s.complianceTasks = Array.isArray(s.complianceTasks) ? s.complianceTasks : [];
    s.makeupRequests  = Array.isArray(s.makeupRequests)  ? s.makeupRequests  : [];

    const missed  = MISSED_BY_STUDENT[s.id]  || {};
    const quizzes = QUIZZES_BY_STUDENT[s.id] || {};

    (s.subjects || []).forEach(function (sub) {
      sub.quizzes          = sub.quizzes          || quizzes[sub.code] || [];
      sub.missedActivities = sub.missedActivities || missed[sub.code]  || [];
    });
  });
})();

/* ---------- Storage helpers ---------- */
function ewLoadStore() {
  try {
    const raw = localStorage.getItem(EW_STORAGE_KEY);
    if (!raw) return JSON.parse(JSON.stringify(EW_SEED));

    const parsed = JSON.parse(raw);

    /* 1) Merge missing top-level keys from seed */
    for (const key of Object.keys(EW_SEED)) {
      if (!parsed[key]) parsed[key] = JSON.parse(JSON.stringify(EW_SEED[key]));
    }

    /* 2) Ensure every seed user exists (by email) */
    if (Array.isArray(parsed.users)) {
      const existingEmails = new Set(
        parsed.users.map(function (u) { return String(u.email || "").toLowerCase(); })
      );
      EW_SEED.users.forEach(function (seedUser) {
        const email = String(seedUser.email || "").toLowerCase();
        if (!existingEmails.has(email)) {
          parsed.users.push(JSON.parse(JSON.stringify(seedUser)));
        }
      });
    }

    /* 3) Migration — ensure every student has the newer arrays */
    if (Array.isArray(parsed.students)) {
      parsed.students.forEach(function (s) {
        s.address         = s.address || "";
        s.complianceTasks = Array.isArray(s.complianceTasks) ? s.complianceTasks : [];
        s.makeupRequests  = Array.isArray(s.makeupRequests)  ? s.makeupRequests  : [];

        const seedStudent = (EW_SEED.students || []).find(function (x) { return x.id === s.id; });

        (s.subjects || []).forEach(function (sub, idx) {
          const seedSub = seedStudent && seedStudent.subjects
            ? (seedStudent.subjects.find(function (x) { return x.code === sub.code; }) || seedStudent.subjects[idx])
            : null;

          if (!Array.isArray(sub.quizzes) || sub.quizzes.length === 0) {
            sub.quizzes = (seedSub && seedSub.quizzes) ? seedSub.quizzes : [];
          }
          if (!Array.isArray(sub.missedActivities) || sub.missedActivities.length === 0) {
            sub.missedActivities = (seedSub && seedSub.missedActivities) ? seedSub.missedActivities : [];
          }
        });
      });
    }

    return parsed;
  } catch (err) {
    console.warn("[EW_DB] Failed to read localStorage, using seed.", err);
    return JSON.parse(JSON.stringify(EW_SEED));
  }
}

function ewSaveStore(store) {
  try {
    localStorage.setItem(EW_STORAGE_KEY, JSON.stringify(store));
  } catch (err) {
    console.warn("[EW_DB] Failed to write localStorage.", err);
  }
}

/* ---------- Public API ---------- */
const EW_DB = (function () {
  let store = ewLoadStore();
  const listeners = new Set();

  function persist() {
    ewSaveStore(store);
    emit();
  }

  function emit() {
    listeners.forEach(function (fn) {
      try { fn(store); } catch (e) { console.error(e); }
    });
  }

  function riskOf(student) {
    if (typeof EW_RISK !== "undefined" && EW_RISK && typeof EW_RISK.compute === "function") {
      return EW_RISK.compute(student);
    }
    const score = Math.round(
      (100 - Number(student.attendance || 0)) * 0.35 +
      (3 - Number(student.gpa || 3)) * 15 +
      Number(student.failedSubjects || 0) * 10 +
      Number(student.missed || 0) * 1.5
    );
    const clamped = Math.max(0, Math.min(100, score));
    const level = clamped >= 80 ? "critical" : clamped >= 50 ? "high" : clamped >= 30 ? "medium" : "low";
    const label = { critical: "Critical", high: "High", medium: "Medium", low: "Low" }[level];
    return { score: clamped, level, label, overrides: [], breakdown: [] };
  }

  return {
    ready: Promise.resolve(store),

    refresh() {
      store = ewLoadStore();
      emit();
      return Promise.resolve(store);
    },

    subscribe(fn) {
      listeners.add(fn);
      return function () { listeners.delete(fn); };
    },

    resetAll() {
      store = JSON.parse(JSON.stringify(EW_SEED));
      persist();
    },

    /* ---------- Students ---------- */
    students: {
      all:   function () { return store.students.slice(); },
      get:   function (id) { return store.students.find(function (s) { return s.id === id; }) || null; },
      count: function () { return store.students.length; }
    },

    /* ---------- Alerts ---------- */
    alerts: {
      all:    function () { return store.alerts.slice(); },
      for:    function (id) { return store.alerts.filter(function (a) { return a.studentId === id; }); },
      unread: function () { return store.alerts.filter(function (a) { return !a.acknowledged; }); },

      async acknowledge(id) {
        const a = store.alerts.find(function (x) { return x.id === id; });
        if (a) { a.acknowledged = true; persist(); }
      },
      async acknowledgeAll() {
        store.alerts.forEach(function (a) { a.acknowledged = true; });
        persist();
      },
      async add(data) {
        const item = {
          id: "a_" + Math.random().toString(36).slice(2, 9),
          studentId: data.studentId,
          severity: data.severity || "medium",
          kind: data.kind || "Note",
          message: data.message || "",
          date: data.date || new Date().toISOString().slice(0, 10),
          acknowledged: false
        };
        store.alerts.unshift(item);
        persist();
        return item;
      }
    },

    /* ---------- Interventions ---------- */
    interventions: {
      all: function () { return store.interventions.slice(); },
      for: function (id) { return store.interventions.filter(function (i) { return i.studentId === id; }); },
      async add(data) {
        const item = {
          id: "i_" + Math.random().toString(36).slice(2, 9),
          studentId: data.studentId,
          type: data.type || "Counseling",
          status: data.status || "pending",
          assigned: data.assigned || "",
          action: data.action || "",
          address: data.address || "",
          date: data.date || new Date().toISOString().slice(0, 10),
          deadline: data.deadline || null
        };
        store.interventions.unshift(item);
        persist();
        return item;
      }
    },

    /* ---------- Student compliance tasks ---------- */
    compliance: {
      for: function (studentId) {
        const s = store.students.find(function (x) { return x.id === studentId; });
        return s && Array.isArray(s.complianceTasks) ? s.complianceTasks.slice() : [];
      },

      all: function () {
        return store.students.flatMap(function (s) {
          return (s.complianceTasks || []).map(function (t) {
            return Object.assign({}, t, { studentId: s.id, studentName: s.name });
          });
        });
      },

      pendingCount: function (studentId) {
        return this.for(studentId).filter(function (t) {
          return t.status === "pending" || t.status === "in_progress";
        }).length;
      },

      add: async function (studentId, data) {
        const s = store.students.find(function (x) { return x.id === studentId; });
        if (!s) return { ok: false, errors: ["Student not found."] };
        if (!s.complianceTasks) s.complianceTasks = [];

        const task = {
          id:          "ct_" + Math.random().toString(36).slice(2, 9),
          title:       (data.title || "Untitled task").trim(),
          description: data.description || "",
          linkedAlert: data.linkedAlert || null,
          category:    data.category || "Academic",
          priority:    data.priority || "medium",
          status:      "pending",
          assignedBy:  data.assignedBy || "",
          dueDate:     data.dueDate || null,
          createdAt:   new Date().toISOString().slice(0, 10),
          studentNote: "",
          adminNote:   "",
          completedAt: null
        };
        s.complianceTasks.unshift(task);
        persist();
        return { ok: true, task: task };
      },

      updateStatus: async function (studentId, taskId, newStatus, studentNote) {
        const s = store.students.find(function (x) { return x.id === studentId; });
        if (!s) return { ok: false, errors: ["Student not found."] };
        const t = (s.complianceTasks || []).find(function (x) { return x.id === taskId; });
        if (!t) return { ok: false, errors: ["Task not found."] };

        const allowed = ["pending", "in_progress", "complied", "cleared"];
        if (allowed.indexOf(newStatus) === -1) {
          return { ok: false, errors: ["Invalid status."] };
        }

        t.status = newStatus;
        if (typeof studentNote === "string") t.studentNote = studentNote;
        if (newStatus === "complied" || newStatus === "cleared") {
          t.completedAt = new Date().toISOString().slice(0, 10);
        } else {
          t.completedAt = null;
        }
        persist();
        return { ok: true, task: t };
      },

      approve: async function (studentId, taskId, adminNote) {
        const s = store.students.find(function (x) { return x.id === studentId; });
        if (!s) return { ok: false, errors: ["Student not found."] };
        const t = (s.complianceTasks || []).find(function (x) { return x.id === taskId; });
        if (!t) return { ok: false, errors: ["Task not found."] };

        t.status      = "cleared";
        t.adminNote   = adminNote || "";
        t.completedAt = new Date().toISOString().slice(0, 10);
        persist();
        return { ok: true, task: t };
      },

      reject: async function (studentId, taskId, adminNote) {
        const s = store.students.find(function (x) { return x.id === studentId; });
        if (!s) return { ok: false, errors: ["Student not found."] };
        const t = (s.complianceTasks || []).find(function (x) { return x.id === taskId; });
        if (!t) return { ok: false, errors: ["Task not found."] };

        t.status      = "in_progress";
        t.adminNote   = adminNote || "";
        t.completedAt = null;
        persist();
        return { ok: true, task: t };
      },

      remove: async function (studentId, taskId) {
        const s = store.students.find(function (x) { return x.id === studentId; });
        if (!s) return { ok: false, errors: ["Student not found."] };
        s.complianceTasks = (s.complianceTasks || []).filter(function (t) { return t.id !== taskId; });
        persist();
        return { ok: true };
      }
    },

    /* ---------- Makeup Requests ---------- */
    makeup: {
      for: function (studentId) {
        const s = store.students.find(function (x) { return x.id === studentId; });
        return s && Array.isArray(s.makeupRequests) ? s.makeupRequests.slice() : [];
      },

      pending: function () {
        return store.students.flatMap(function (s) {
          return (s.makeupRequests || [])
            .filter(function (r) { return r.status === "pending"; })
            .map(function (r) {
              return Object.assign({}, r, {
                studentId:   s.id,
                studentName: s.name,
                course:      s.course,
                section:     s.section
              });
            });
        });
      },

      all: function () {
        return store.students.flatMap(function (s) {
          return (s.makeupRequests || []).map(function (r) {
            return Object.assign({}, r, { studentId: s.id, studentName: s.name });
          });
        });
      },

      request: async function (studentId, data) {
        const s = store.students.find(function (x) { return x.id === studentId; });
        if (!s) return { ok: false, errors: ["Student not found."] };
        if (!s.makeupRequests) s.makeupRequests = [];

        const req = {
          id:             "mr_" + Math.random().toString(36).slice(2, 9),
          subjectCode:    data.subjectCode || "",
          subjectName:    data.subjectName || "",
          activityName:   data.activityName || "",
          activityType:   data.activityType || "Assignment",
          activityDate:   data.activityDate || "",
          studentReason:  data.studentReason || "",
          proposedDate:   data.proposedDate || "",
          status:         "pending",
          instructorNote: "",
          createdAt:      new Date().toISOString().slice(0, 10),
          decidedAt:      null
        };
        s.makeupRequests.unshift(req);
        persist();
        return { ok: true, request: req };
      },

      approve: async function (studentId, requestId, instructorNote) {
        const s = store.students.find(function (x) { return x.id === studentId; });
        if (!s) return { ok: false, errors: ["Student not found."] };
        const r = (s.makeupRequests || []).find(function (x) { return x.id === requestId; });
        if (!r) return { ok: false, errors: ["Request not found."] };

        r.status         = "approved";
        r.instructorNote = instructorNote || "";
        r.decidedAt      = new Date().toISOString().slice(0, 10);
        persist();
        return { ok: true, request: r };
      },

      decline: async function (studentId, requestId, instructorNote) {
        const s = store.students.find(function (x) { return x.id === studentId; });
        if (!s) return { ok: false, errors: ["Student not found."] };
        const r = (s.makeupRequests || []).find(function (x) { return x.id === requestId; });
        if (!r) return { ok: false, errors: ["Request not found."] };

        r.status         = "declined";
        r.instructorNote = instructorNote || "";
        r.decidedAt      = new Date().toISOString().slice(0, 10);
        persist();
        return { ok: true, request: r };
      }
    },

    /* ---------- Mark Missed (instructor action) ---------- */
    markMissed: async function (studentId, data) {
      const s = store.students.find(function (x) { return x.id === studentId; });
      if (!s) return { ok: false, errors: ["Student not found."] };

      const subjectCode = data.subjectCode;
      const subject = (s.subjects || []).find(function (x) { return x.code === subjectCode; });
      if (!subject) return { ok: false, errors: ["Subject not found for this student."] };
      if (!Array.isArray(subject.missedActivities)) subject.missedActivities = [];

      const entry = {
        name:     data.activityName || "Untitled activity",
        type:     data.activityType || "Assignment",
        date:     data.date || new Date().toISOString().slice(0, 10),
        markedBy: data.markedBy || "",
        markedAt: new Date().toISOString().slice(0, 10)
      };

      subject.missedActivities.unshift(entry);
      s.missed = (s.missed || 0) + 1;

      store.alerts.unshift({
        id:           "a_" + Math.random().toString(36).slice(2, 9),
        studentId:    s.id,
        severity:     "medium",
        kind:         "Attendance",
        message:      "Missed " + entry.type + ": " + entry.name + " in " + subjectCode + ".",
        date:         entry.date,
        acknowledged: false
      });

      persist();
      return { ok: true, entry: entry };
    },

    /* ---------- Users ---------- */
    users: {
      all: function () { return store.users.slice(); },

      find: function (email) {
        return store.users.find(function (u) {
          return u.email.toLowerCase() === String(email).toLowerCase();
        }) || null;
      },

            /* Self-service profile update with current-password verification */
      updateSelf: function (currentEmail, patch, currentPassword) {
        const u = store.users.find(function (x) {
          return x.email.toLowerCase() === String(currentEmail).toLowerCase();
        });
        if (!u) return { ok: false, errors: ["Account not found."] };

        /* If a new password is provided, verify the old one */
        if (patch.password) {
          if (!currentPassword || currentPassword !== u.password) {
            return { ok: false, errors: ["Current password is incorrect."] };
          }
          if (typeof ewValidatePassword === "function") {
            const check = ewValidatePassword(patch.password);
            if (!check.ok) return { ok: false, errors: check.errors };
          }
        }

        /* Uniqueness checks */
        if (patch.email && patch.email.toLowerCase() !== u.email.toLowerCase()) {
          if (store.users.some(function (x) {
            return x !== u && x.email.toLowerCase() === patch.email.toLowerCase();
          })) {
            return { ok: false, errors: ["That email is already in use."] };
          }
        }
        if (patch.username && patch.username.toLowerCase() !== String(u.username || "").toLowerCase()) {
          if (store.users.some(function (x) {
            return x !== u && String(x.username || "").toLowerCase() === patch.username.toLowerCase();
          })) {
            return { ok: false, errors: ["That username is already taken."] };
          }
        }

        /* Apply */
        if (patch.name) {
          u.name = patch.name.trim();
          u.initials = initialsFrom(u.name);
        }
        if (patch.email)    u.email    = patch.email.trim().toLowerCase();
        if (patch.username) u.username = patch.username.trim().toLowerCase();
        if (patch.phone)    u.phone    = patch.phone.trim();
        if (patch.office)   u.office   = patch.office.trim();
        if (patch.password) u.password = patch.password;

        persist();
        return { ok: true, user: u };
      },

      findByLogin: function (identifier) {
        const id = String(identifier || "").toLowerCase().trim();
        return store.users.find(function (u) {
          const email = String(u.email || "").toLowerCase();
          const uname = String(u.username || "").toLowerCase();
          return email === id || uname === id;
        }) || null;
      },

      findByUsername: function (username) {
        const uname = String(username || "").toLowerCase().trim();
        return store.users.find(function (u) {
          return String(u.username || "").toLowerCase() === uname;
        }) || null;
      },

      add: function (user) {
        if (store.users.some(function (u) { return u.email.toLowerCase() === user.email.toLowerCase(); })) {
          return { ok: false, errors: ["An account with that email already exists."] };
        }
        if (user.username && store.users.some(function (u) {
          return String(u.username || "").toLowerCase() === String(user.username).toLowerCase();
        })) {
          return { ok: false, errors: ["That username is already taken."] };
        }
        user.verified = false;
        store.users.push(user);
        persist();
        return { ok: true, user: user };
      },

      addByAdmin: function (user) {
        if (!user.email || !user.username || !user.password) {
          return { ok: false, errors: ["Email, username, and password are required."] };
        }
        if (store.users.some(function (u) { return u.email.toLowerCase() === user.email.toLowerCase(); })) {
          return { ok: false, errors: ["An account with that email already exists."] };
        }
        if (store.users.some(function (u) {
          return String(u.username || "").toLowerCase() === String(user.username).toLowerCase();
        })) {
          return { ok: false, errors: ["That username is already taken."] };
        }

        const record = Object.assign({ role: "student", title: "Student", verified: true }, user);
        store.users.push(record);
        persist();
        return { ok: true, user: record };
      },

      updateAccount: function (email, patch) {
        const u = store.users.find(function (x) {
          return x.email.toLowerCase() === String(email).toLowerCase();
        });
        if (!u) return { ok: false, errors: ["Account not found."] };

        if (patch.email && patch.email.toLowerCase() !== u.email.toLowerCase()) {
          if (store.users.some(function (x) {
            return x !== u && x.email.toLowerCase() === patch.email.toLowerCase();
          })) {
            return { ok: false, errors: ["That email is already in use."] };
          }
        }
        if (patch.username && patch.username.toLowerCase() !== String(u.username || "").toLowerCase()) {
          if (store.users.some(function (x) {
            return x !== u && String(x.username || "").toLowerCase() === patch.username.toLowerCase();
          })) {
            return { ok: false, errors: ["That username is already taken."] };
          }
        }

        Object.assign(u, patch);
        persist();
        return { ok: true, user: u };
      },

      markVerified: function (email) {
        const u = store.users.find(function (x) {
          return x.email.toLowerCase() === String(email).toLowerCase();
        });
        if (!u) return { ok: false, errors: ["User not found."] };
        u.verified = true;
        persist();
        return { ok: true, user: u };
      },

      updatePassword: function (email, newPassword) {
        if (typeof ewValidatePassword === "function") {
          const check = ewValidatePassword(newPassword);
          if (!check.ok) return { ok: false, errors: check.errors };
        } else if (!newPassword) {
          return { ok: false, errors: ["Password is required."] };
        }
        const u = store.users.find(function (x) {
          return x.email.toLowerCase() === String(email).toLowerCase();
        });
        if (!u) return { ok: false, errors: ["No account found for that email."] };
        u.password = newPassword;
        persist();
        return { ok: true, user: u };
      }
    },

    /* ---------- Adviser Profile (legacy; unused) ---------- */
    adviserProfile: {
      STORAGE_KEY: "earlywatch.adviserProfile",

      defaults: function (user) {
        return {
          name:           (user && user.name)     || "Dr. Carl Domenic Reyes",
          initials:       (user && user.initials) || "DM",
          email:          (user && user.email)    || "carl.reyes@cmdi.edu.ph",
          title:          (user && user.title)    || "Adviser",
          department:     "College of Computer Studies",
          position:       "Academic Adviser",
          employeeId:     "EMP-2020-0142",
          phone:          "+63 917 555 0142",
          office:         "Room 305, CCS Building",
          officeHours:    "Mon–Fri · 8:00 AM – 5:00 PM",
          specialization: "Academic Advising, Student Retention",
          education:      "Ph.D. in Computer Science",
          joinedDate:     "2020-06-15",
          bio:            "Passionate about student success and early intervention.",
          avatarImage:    null
        };
      },

      get: function (user) {
        try {
          const raw = localStorage.getItem(this.STORAGE_KEY);
          const saved = raw ? JSON.parse(raw) : {};
          return Object.assign({}, this.defaults(user), saved);
        } catch (e) {
          console.warn("[EW_DB] Failed to read adviser profile:", e);
          return this.defaults(user);
        }
      },

      save: function (patch) {
        try {
          const current = this.get();
          const merged = Object.assign({}, current, patch);
          localStorage.setItem(this.STORAGE_KEY, JSON.stringify(merged));
          emit();
          return { ok: true, profile: merged };
        } catch (e) {
          console.warn("[EW_DB] Failed to save adviser profile:", e);
          return { ok: false, errors: ["Could not save profile."] };
        }
      },

      saveAvatar:   function (dataUrl) { return this.save({ avatarImage: dataUrl }); },
      removeAvatar: function ()        { return this.save({ avatarImage: null }); },
      reset: function () {
        try {
          localStorage.removeItem(this.STORAGE_KEY);
          emit();
          return { ok: true };
        } catch (e) {
          return { ok: false, errors: ["Could not reset profile."] };
        }
      }
    },

    /* ---------- Admin ---------- */
    admin: {
      totals: function () {
        const students = store.students;
        const alerts = store.alerts;
        const interventions = store.interventions;

        const levels = { critical: 0, high: 0, medium: 0, low: 0 };
        let openCases = 0, resolvedCases = 0, monitoringCases = 0;

        students.forEach(function (s) {
          const lvl = riskOf(s).level;
          levels[lvl] = (levels[lvl] || 0) + 1;
          if (s.caseStatus === "Open") openCases++;
          else if (s.caseStatus === "Resolved") resolvedCases++;
          else if (s.caseStatus === "Monitoring") monitoringCases++;
        });

        const inProgressCases = Math.max(0, students.length - openCases - resolvedCases - monitoringCases);

        const interventionsByStatus = { pending: 0, effective: 0 };
        interventions.forEach(function (i) {
          if (interventionsByStatus[i.status] !== undefined) interventionsByStatus[i.status]++;
        });

        const alertsBySeverity = { critical: 0, high: 0, medium: 0, low: 0 };
        let unread = 0;
        alerts.forEach(function (a) {
          alertsBySeverity[a.severity] = (alertsBySeverity[a.severity] || 0) + 1;
          if (!a.acknowledged) unread++;
        });

        const avgGpa = students.length
          ? students.reduce(function (sum, s) { return sum + Number(s.gpa || 0); }, 0) / students.length
          : 0;
        const avgAttendance = students.length
          ? students.reduce(function (sum, s) { return sum + Number(s.attendance || 0); }, 0) / students.length
          : 0;

        return {
          students: students.length,
          levels: levels,
          openCases: openCases,
          inProgressCases: inProgressCases,
          monitoringCases: monitoringCases,
          resolvedCases: resolvedCases,
          totalAlerts: alerts.length,
          unreadAlerts: unread,
          alertsBySeverity: alertsBySeverity,
          totalInterventions: interventions.length,
          interventionsByStatus: interventionsByStatus,
          avgGpa: avgGpa,
          avgAttendance: avgAttendance
        };
      },

      byCourse: function () {
        const map = new Map();
        store.students.forEach(function (s) {
          const key = s.course || "Unassigned";
          if (!map.has(key)) {
            map.set(key, { course: key, count: 0, gpaSum: 0, attSum: 0, critical: 0, high: 0, medium: 0, low: 0 });
          }
          const row = map.get(key);
          row.count++;
          row.gpaSum += Number(s.gpa || 0);
          row.attSum += Number(s.attendance || 0);
          const lvl = riskOf(s).level;
          row[lvl] = (row[lvl] || 0) + 1;
        });
        return Array.from(map.values()).map(function (r) {
          return {
            course: r.course,
            count: r.count,
            avgGpa: r.count ? r.gpaSum / r.count : 0,
            avgAttendance: r.count ? r.attSum / r.count : 0,
            critical: r.critical || 0,
            high: r.high || 0,
            medium: r.medium || 0,
            low: r.low || 0
          };
        }).sort(function (a, b) { return b.count - a.count; });
      },

      bySection: function () {
        const map = new Map();
        store.students.forEach(function (s) {
          const key = s.section || "Unassigned";
          if (!map.has(key)) {
            map.set(key, { section: key, course: s.course || "", count: 0, riskSum: 0, atRisk: 0 });
          }
          const row = map.get(key);
          row.count++;
          const r = riskOf(s);
          row.riskSum += r.score;
          if (r.level === "critical" || r.level === "high") row.atRisk++;
        });
        return Array.from(map.values()).map(function (r) {
          return {
            section: r.section,
            course: r.course,
            count: r.count,
            avgRisk: r.count ? r.riskSum / r.count : 0,
            atRisk: r.atRisk
          };
        }).sort(function (a, b) { return b.avgRisk - a.avgRisk; });
      },

      studentDetail: function (id) {
        const student = store.students.find(function (s) { return s.id === id; });
        if (!student) return null;
        return {
          student: student,
          risk: riskOf(student),
          alerts: store.alerts.filter(function (a) { return a.studentId === id; }),
          interventions: store.interventions.filter(function (i) { return i.studentId === id; })
        };
      },

      recentActivity: function (limit) {
        limit = limit || 8;
        const feed = [];
        store.alerts.forEach(function (a) {
          const s = store.students.find(function (x) { return x.id === a.studentId; });
          feed.push({
            icon: "bell",
            text: a.severity + " alert for " + (s ? s.name : "(deleted student)") + ": " + a.kind,
            date: a.date
          });
        });
        store.interventions.forEach(function (i) {
          const s = store.students.find(function (x) { return x.id === i.studentId; });
          feed.push({
            icon: "clipboard-list",
            text: i.type + " for " + (s ? s.name : "(deleted student)") + " — " + i.status,
            date: i.date
          });
        });
        feed.sort(function (a, b) { return b.date.localeCompare(a.date); });
        return feed.slice(0, limit);
      }
    },

    /* ---------- Student mutations ---------- */
    addStudent: async function (data) {
      if (store.students.some(function (s) { return s.id === data.id; })) {
        return { ok: false, errors: ["A student with that ID already exists."] };
      }
      const student = {
        id: data.id,
        name: data.name,
        initials: initialsFrom(data.name),
        course: data.course || "",
        section: data.section || "",
        adviser: data.adviser || "",
        address: data.address || "",
        gpa: Number(data.gpa != null ? data.gpa : 2.0),
        attendance: Number(data.attendance != null ? data.attendance : 100),
        missed: Number(data.missed != null ? data.missed : 0),
        failedSubjects: Number(data.failedSubjects != null ? data.failedSubjects : 0),
        caseStatus: data.caseStatus || "Monitoring",
        subjects: (data.subjects || []).map(function (sub) {
          return Object.assign({}, sub, {
            quizzes: sub.quizzes || [],
            missedActivities: sub.missedActivities || []
          });
        }),
        history: data.history || [],
        notes: data.notes || [],
        complianceTasks: data.complianceTasks || [],
        makeupRequests: data.makeupRequests || []
      };
      store.students.push(student);
      persist();
      return { ok: true, student: student };
    },

    updateStudent: async function (id, patch) {
      const s = store.students.find(function (x) { return x.id === id; });
      if (!s) return { ok: false, errors: ["Student not found."] };

      const fields = ["name", "course", "section", "adviser", "gpa",
                      "attendance", "missed", "failedSubjects", "caseStatus"];
      fields.forEach(function (k) {
        if (patch[k] !== undefined) s[k] = patch[k];
      });
      if (patch.name) s.initials = initialsFrom(patch.name);
      if (patch.gpa !== undefined) s.gpa = Number(patch.gpa);
      if (patch.attendance !== undefined) s.attendance = Number(patch.attendance);
      if (patch.missed !== undefined) s.missed = Number(patch.missed);
      if (patch.failedSubjects !== undefined) s.failedSubjects = Number(patch.failedSubjects);

      persist();
      return { ok: true, student: s };
    },

        deleteStudent: async function (id) {
      const before = store.students.length;
      store.students = store.students.filter(function (s) { return s.id !== id; });
      store.alerts = store.alerts.filter(function (a) { return a.studentId !== id; });
      store.interventions = store.interventions.filter(function (i) { return i.studentId !== id; });
      store.users = store.users.filter(function (u) { return u.studentId !== id; });
      persist();
      return { ok: store.students.length < before };
    },

    /* ---------- Per-user avatar (instructor + student + admin) ---------- */
    avatars: {
      STORAGE_KEY: "earlywatch.avatars",

      _read: function () {
        try {
          const raw = localStorage.getItem(this.STORAGE_KEY);
          return raw ? JSON.parse(raw) : {};
        } catch (e) {
          return {};
        }
      },

      _write: function (map) {
        try {
          localStorage.setItem(this.STORAGE_KEY, JSON.stringify(map));
        } catch (e) {
          console.warn("[EW_DB] Could not save avatar:", e);
        }
      },

      get: function (email) {
        const key = String(email || "").toLowerCase();
        const map = this._read();
        return map[key] || null;
      },

      save: function (email, dataUrl) {
        const key = String(email || "").toLowerCase();
        if (!key) return { ok: false, errors: ["No email provided."] };

        const map = this._read();
        if (dataUrl) {
          map[key] = dataUrl;
        } else {
          delete map[key];
        }
        this._write(map);
        emit();
        return { ok: true };
      },

      remove: function (email) {
        return this.save(email, null);
      }
    }
  };
})();

function initialsFrom(name) {
  const parts = String(name).trim().split(/\s+/);
  let out = "";
  for (const p of parts.slice(0, 2)) if (p) out += p[0].toUpperCase();
  return out || "??";
}

const EW_STORE = {
  student:          function (id) { return EW_DB.students.get(id); },
  alertsFor:        function (id) { return EW_DB.alerts.for(id); },
  interventionsFor: function (id) { return EW_DB.interventions.for(id); },
  unacknowledged:   function ()   { return EW_DB.alerts.unread(); }
};

