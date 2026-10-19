# JobTrackr — Job Application Tracker

A modern web application to organize, track, and manage your job applications in one place.

## 📌 Overview

JobTrackr helps job seekers manage their job search efficiently by keeping application details, company information, application status, and important notes organized in a single dashboard.

## ✨ Features

- 📊 Dashboard with application statistics
- 📝 Track job applications and their status
- 🏢 Manage company and job role details
- 🔎 View and organize application records
- 📈 Monitor application progress
- 🎨 Clean and responsive user interface

## 📸 Screenshots

### Login Page

![JobTrackr Login](screenshots/Login.png)

### SignUp Page

![JobTrackr Employer Dashboard](screenshots/SignUp.png)

### Job Seeker Dashboard

![JobTrackr Job Seeker Dashboard](screenshots/JobSeekerDashboard.png)

### Job Seeker Applications

![JobTrackr Job Seeker Applications](screenshots/JobSeekerApplication.png)

### Job Seeker Profile

![JobTrackr Job Seeker Profile](screenshots/JobSeekerProfile.png)

### Job Seeker Saved Job

![JobTrackr Job Seeker Saved Job](screenshots/JobSeekerSavedJob.png)

### Employer Dashboard

![JobTrackr Employer Dashboard](screenshots/EmployerDashboard.png)

### Employer Jobs

![JobTrackr Employer Jobs](screenshots/EmployerJobs.png)

### Employer Post Job

![JobTrackr Employer Post Job](screenshots/EmployerPostJob.png)

### Employer Profile

![JobTrackr Employer Profile](screenshots/EmployerProfile.png)

### Browse Job

![JobTrackr Browse Job](screenshots/BrowseJob.png)

> Replace these sample image paths with your actual screenshot filenames.

## 🛠️ Tech Stack

Update this list according to the technologies actually used in your project.

- **Frontend:** React.js
- **Styling:** Tailwind CSS
- **Build Tool:** Vite
- **Language:** JavaScript
- **Version Control:** Git & GitHub

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- Node.js (LTS version recommended)
- npm
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone YOUR_GITHUB_REPOSITORY_URL
   ```

2. Navigate to the project directory:

   ```bash
   cd JobTrackr
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL shown in your terminal, usually:

   ```text
   http://localhost:5173
   ```

## 🔐 Demo Credentials

If your project includes authentication, add your working demo credentials here.

- **Demo URL:** YOUR_DEPLOYED_APP_URL
- **Email:** YOUR_DEMO_EMAIL
- **Password:** YOUR_DEMO_PASSWORD

> Only publish dedicated demo credentials. Never share your personal password, API keys, or production secrets.

If authentication is not implemented, remove this section.

## 📁 Project Structure

```
jobtrackr/
├── public/
├── src/
│   ├── assets/              # images, logo
│   ├── components/
│   │   ├── ui/              # Button, Input, Modal, Badge, Card, Spinner, EmptyState
│   │   ├── layout/          # Navbar, Sidebar, Footer, DashboardLayout, PublicLayout
│   │   ├── jobs/            # JobCard, JobFilters, JobForm, ApplyModal
│   │   ├── seeker/          # KanbanBoard, ApplicationCard, StatsCard, ReminderList
│   │   └── employer/        # ApplicantRow, PipelineBoard, CandidateDrawer
│   ├── pages/
│   │   ├── public/          # Landing, Login, Signup, Jobs, JobDetails, NotFound
│   │   ├── seeker/          # Dashboard, Applications, Saved, Profile
│   │   └── employer/        # Dashboard, MyJobs, PostJob, Applicants, Company
│   ├── context/
│   │   ├── AuthContext.jsx  # logged-in user + role
│   │   └── DataContext.jsx  # jobs, applications, saved jobs
│   ├── services/
│   │   ├── storage.js       # localStorage get/set helper
│   │   ├── authService.js   # login, signup, logout
│   │   ├── jobService.js    # getJobs, createJob, updateJob, deleteJob
│   │   └── applicationService.js  # apply, updateStatus, addNote
│   ├── hooks/               # useAuth, useJobs, useApplications, useDebounce
│   ├── routes/
│   │   ├── AppRoutes.jsx    # saare routes ek jagah
│   │   └── ProtectedRoute.jsx
│   ├── data/
│   │   └── seed.js          # starting mock jobs & users
│   ├── utils/
│   │   ├── constants.js     # STATUS, ROLES, JOB_TYPES
│   │   └── helpers.js       # formatDate, generateId, etc.
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css            # sirf Tailwind directives
├── tailwind.config.js
├── vite.config.js
└── package.json
```

> Adjust the structure to match your actual project files.

## 🗺️ Future Improvements

- Advanced search and filtering
- Application deadlines and reminders
- Data visualization and analytics
- Export application records
- User authentication and cloud data storage

## 👩‍💻 Author

**Fijjafatema**

- GitHub: YOUR_GITHUB_PROFILE_URL
- LinkedIn: YOUR_LINKEDIN_PROFILE_URL

## 📄 License

This project is available under the MIT License, unless otherwise specified.
