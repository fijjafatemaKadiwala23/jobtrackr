# MEMORY.md — JobTrackr

## 1. Project Overview

- **Project Name:** JobTrackr
- **Description:** Job application tracking and candidate management web application.
- **Users:** Job Seeker and Employer
- **Tech Stack:** React JS, Vite, Tailwind CSS
- **Data Storage:** localStorage with mock seed data
- **Project Status:** Completed
- **Purpose:** Portfolio and learning project

JobTrackr helps job seekers manage job applications through a Kanban board and enables employers to post jobs and manage candidates through an application pipeline.

## 2. Key Features

- Role-based login for Job Seeker and Employer
- Separate dashboards for both roles
- Job listing and job posting
- Job application tracking with Kanban board
- Candidate management and application status updates
- Search and filtering
- localStorage data persistence
- Responsive user interface
- Theme preference support
- Separate seeker and employer notes
- Protected routes based on user role

## 3. Demo Credentials

| Role       | Email             | Password |
| ---------- | ----------------- | -------- |
| Job Seeker | seeker@demo.com   | 1234     |
| Employer   | employer@demo.com | 1234     |

**Note:** These credentials are for demonstration purposes only.

## 4. Important Technical Decisions

- React Context API for shared application state.
- Service layer for organizing data operations.
- A shared application status model for seeker and employer workflows.
- Employer status `offer` is displayed as **Hired**.
- Seeker notes and employer notes remain separate.
- Role-based routes restrict access to the appropriate dashboards.

## 5. Known Limitations

- No backend or real authentication.
- Data is stored locally in the browser.
- Data does not automatically synchronize across different browsers or devices.
- Demo passwords are not securely stored.

## 6. Future Improvements

- Add a Node.js and Express backend.
- Integrate MongoDB for persistent database storage.
- Implement secure authentication and authorization.
- Add email notifications and cross-device data synchronization.

## 7. Project Summary

JobTrackr demonstrates frontend development, state management, role-based routing, reusable components, data persistence, and responsive UI design.

The project is complete as a frontend portfolio project. Backend integration and production-grade authentication are future enhancements.
