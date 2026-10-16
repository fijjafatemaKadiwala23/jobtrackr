// Starting ka fake data. App pehli baar khulne par ye localStorage me chala jata hai.
// Demo login:  seeker@demo.com / 1234   |   employer@demo.com / 1234
// Reset karne ke liye browser console me:  localStorage.clear()  phir refresh

const DAY = 24 * 60 * 60 * 1000;
const iso = (n) => new Date(Date.now() + n * DAY).toISOString(); // n din aage (negative = peeche)
const day = (n) => iso(n).slice(0, 10); // sirf YYYY-MM-DD

export const seedUsers = [
  {
    id: "u_demo_seeker",
    name: "Rahul Sharma",
    email: "seeker@demo.com",
    password: "1234", // sirf demo ke liye
    role: "seeker",
    profile: { skills: ["React", "Tailwind"], experience: "Fresher", resumeLink: "" },
  },
  {
    id: "u_demo_employer",
    name: "Priya Patel",
    email: "employer@demo.com",
    password: "1234",
    role: "employer",
    profile: { companyName: "TechNova", website: "https://technova.example.com", location: "Ahmedabad", about: "TechNova web aur mobile products banati hai." },
  },
];

// ---------------- JOBS ----------------
function job(n, employerId, company, title, location, type, minL, maxL, skills, description, createdAgo, deadlineIn) {
  return {
    id: "j_seed_" + n,
    employerId,
    company,
    title,
    location,
    type,
    salaryMin: Math.round(minL * 100000),
    salaryMax: Math.round(maxL * 100000),
    skills,
    description,
    deadline: day(deadlineIn),
    status: "open",
    createdAt: iso(-createdAgo),
  };
}

const DEMO_EMP = "u_demo_employer";

export const seedJobs = [
  job(1, DEMO_EMP, "TechNova", "React Developer", "Ahmedabad", "Full-time", 4, 8, ["React", "Tailwind", "JavaScript", "REST APIs"],
    "Hum ek React developer dhundh rahe hain jo hamare dashboard products banayega.\n\nRequirements:\n- React aur hooks ki achhi samajh\n- Tailwind CSS ya koi bhi utility-first CSS\n- REST APIs ke saath kaam ka anubhav\n- Git ka basic knowledge", 4, 30),
  job(2, DEMO_EMP, "TechNova", "Frontend Intern", "Ahmedabad", "Internship", 1.8, 2.4, ["HTML", "CSS", "JavaScript"],
    "6 mahine ki paid internship. Senior developers ke saath real projects par kaam karoge.\n\nRequirements:\n- HTML, CSS, JavaScript ke basics\n- Seekhne ki lagan\n- 1-2 chhote projects GitHub par", 7, 21),
  job(3, DEMO_EMP, "TechNova", "Node.js Backend Developer", "Remote", "Remote", 6, 10, ["Node.js", "Express", "MongoDB"],
    "Remote backend role. APIs design karoge aur database queries optimize karoge.\n\nRequirements:\n- Node.js aur Express\n- MongoDB ya koi bhi database\n- Authentication ki samajh", 10, 40),
  job(4, "u_seed_e1", "Pixel Labs", "React Developer", "Ahmedabad", "Full-time", 3.5, 6, ["React", "JavaScript", "CSS"],
    "Pixel Labs ke product team me React developer ki zarurat hai.\n\nRequirements:\n- React me 1+ saal ya strong projects\n- Responsive UI banane ka anubhav\n- Team me kaam karne ki aadat", 12, 25),
  job(5, "u_seed_e2", "Cloudline Technologies", "Frontend Engineer", "Bengaluru", "Full-time", 8, 14, ["React", "TypeScript", "Testing"],
    "Cloudline ke platform team ke liye frontend engineer.\n\nRequirements:\n- React + TypeScript\n- Unit testing (Jest / RTL)\n- Performance optimization ki samajh", 3, 35),
  job(6, "u_seed_e3", "FinEdge", "UI Developer", "Mumbai", "Full-time", 5, 9, ["React", "Tailwind", "Figma"],
    "Fintech dashboards ke liye UI developer. Design aur code dono ki samajh chahiye.\n\nRequirements:\n- React aur Tailwind\n- Figma designs ko pixel-perfect code karna\n- Accessibility ki basic samajh", 6, 28),
  job(7, "u_seed_e4", "DataWave Analytics", "Dashboard Developer", "Pune", "Full-time", 6, 11, ["React", "D3", "SQL"],
    "Data visualizations aur dashboards banane wali team ka hissa bano.\n\nRequirements:\n- React aur charts libraries\n- SQL ki basic knowledge\n- Data ko saaf dikhane ka sense", 9, 20),
  job(8, "u_seed_e5", "GreenLeaf", "React Native Developer", "Remote", "Remote", 7, 12, ["React Native", "JavaScript", "Firebase"],
    "Mobile app team ke liye remote React Native developer.\n\nRequirements:\n- React Native me published app\n- Firebase ya similar backend\n- Clear communication", 2, 45),
  job(9, "u_seed_e1", "Pixel Labs", "UI/UX Design Intern", "Ahmedabad", "Internship", 1.2, 1.8, ["Figma", "UI Design", "Prototyping"],
    "Design team ke saath wireframes aur prototypes banane wali internship.\n\nRequirements:\n- Figma ka basic use\n- 2-3 design samples ka portfolio", 5, 18),
  job(10, "u_seed_e2", "Cloudline Technologies", "QA Automation Engineer", "Bengaluru", "Full-time", 5, 9, ["Cypress", "JavaScript", "CI/CD"],
    "Web apps ke liye automated tests likhne wala QA engineer.\n\nRequirements:\n- Cypress ya Playwright\n- JavaScript\n- CI pipelines ki samajh", 14, 15),
  job(11, "u_seed_e3", "FinEdge", "Full Stack Developer", "Mumbai", "Full-time", 9, 15, ["React", "Node.js", "PostgreSQL"],
    "Poore product ko end-to-end sambhalne wala full stack developer.\n\nRequirements:\n- React aur Node.js\n- PostgreSQL\n- System design ki basic samajh", 1, 50),
  job(12, "u_seed_e5", "GreenLeaf", "Part-time Web Developer", "Surat", "Part-time", 2, 3.6, ["HTML", "CSS", "WordPress"],
    "Chhote business websites banane aur maintain karne ka part-time kaam.\n\nRequirements:\n- HTML, CSS\n- WordPress ka basic\n- Roz 4 ghante available", 8, 22),
];

// ---------------- APPLICATIONS ----------------
const hist = (...pairs) => pairs.map(([status, ago]) => ({ status, at: iso(-ago) }));

function application(id, data) {
  return {
    jobId: null,
    external: null,
    coverNote: "",
    resumeLink: "",
    seekerNotes: "",
    employerNotes: "",
    interviewDate: "",
    reminderDate: "",
    ...data,
    id,
    createdAt: data.history[0].at,
  };
}

const RAHUL = { name: "Rahul Sharma", email: "seeker@demo.com", skills: ["React", "Tailwind"], experience: "Fresher", resumeLink: "" };
const person = (name, skills, experience) => ({
  name,
  email: name.toLowerCase().replace(" ", ".") + "@mail.com",
  skills,
  experience,
  resumeLink: "https://example.com/resume/" + name.toLowerCase().replace(" ", "-"),
});

export const seedApplications = [
  // Demo seeker (Rahul) ki applications
  application("a_seed_1", {
    jobId: "j_seed_4", seekerId: "u_demo_seeker", applicant: RAHUL, status: "interview",
    history: hist(["applied", 8], ["shortlisted", 6], ["interview", 3]),
    interviewDate: day(3), seekerNotes: "HR: Neha. Round 1 technical, React + JS basics.",
  }),
  application("a_seed_2", {
    jobId: "j_seed_5", seekerId: "u_demo_seeker", applicant: RAHUL, status: "applied",
    history: hist(["applied", 2]), reminderDate: day(1), seekerNotes: "Kal follow-up mail bhejna hai.",
  }),
  application("a_seed_3", {
    jobId: "j_seed_6", seekerId: "u_demo_seeker", applicant: RAHUL, status: "saved",
    history: hist(["saved", 1]),
  }),
  application("a_seed_4", {
    external: { title: "Frontend Engineer", company: "Zoho", link: "https://careers.zoho.example.com" },
    seekerId: "u_demo_seeker", applicant: RAHUL, status: "applied",
    history: hist(["applied", 5]), seekerNotes: "Company site se apply kiya.",
  }),
  application("a_seed_5", {
    jobId: "j_seed_7", seekerId: "u_demo_seeker", applicant: RAHUL, status: "rejected",
    history: hist(["applied", 14], ["rejected", 9]),
  }),
  application("a_seed_6", {
    jobId: "j_seed_1", seekerId: "u_demo_seeker", applicant: RAHUL, status: "shortlisted",
    history: hist(["applied", 3], ["shortlisted", 1]),
    coverNote: "Mujhe React aur Tailwind me kaam karna pasand hai. Mere 3 projects GitHub par hain.",
  }),

  // TechNova (demo employer) ke jobs par doosre candidates
  application("a_seed_7", {
    jobId: "j_seed_1", seekerId: "u_seed_s1", applicant: person("Aman Verma", ["React", "Redux", "JavaScript"], "1-3 years"),
    status: "applied", history: hist(["applied", 2]),
    coverNote: "2 saal ka React experience hai, dashboard projects par kaam kiya hai.",
  }),
  application("a_seed_8", {
    jobId: "j_seed_1", seekerId: "u_seed_s2", applicant: person("Sneha Iyer", ["React", "Tailwind", "TypeScript"], "1-3 years"),
    status: "interview", history: hist(["applied", 6], ["shortlisted", 4], ["interview", 2]),
    employerNotes: "Communication achhi hai. Technical round Friday ko.",
  }),
  application("a_seed_9", {
    jobId: "j_seed_1", seekerId: "u_seed_s3", applicant: person("Karan Mehta", ["JavaScript", "jQuery"], "0-1 years"),
    status: "rejected", history: hist(["applied", 7], ["rejected", 5]),
    employerNotes: "React ka experience kam hai.",
  }),
  application("a_seed_10", {
    jobId: "j_seed_2", seekerId: "u_seed_s4", applicant: person("Isha Shah", ["HTML", "CSS", "JavaScript"], "Fresher"),
    status: "applied", history: hist(["applied", 1]),
  }),
  application("a_seed_11", {
    jobId: "j_seed_2", seekerId: "u_seed_s5", applicant: person("Dev Patel", ["HTML", "CSS", "React"], "Fresher"),
    status: "offer", history: hist(["applied", 9], ["shortlisted", 7], ["interview", 5], ["offer", 1]),
    employerNotes: "Offer letter bhej diya.",
  }),
  application("a_seed_12", {
    jobId: "j_seed_3", seekerId: "u_seed_s6", applicant: person("Meera Nair", ["Node.js", "Express", "MongoDB"], "3-5 years"),
    status: "shortlisted", history: hist(["applied", 4], ["shortlisted", 2]),
  }),
];
