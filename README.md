<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Firebase-12-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
</p>

# 🎓 Smart Campus Gig & Task Board

> **A peer-to-peer micro-job marketplace built for the Barisal University student community.**

Smart Campus Gig & Task Board connects students who need help with students who can provide it. Whether it's tutoring, graphic design, tech support, content writing, or running errands — this platform lets you **post gigs, discover opportunities, apply with a cover letter, and manage the entire hiring flow** — all from one clean, responsive dashboard.

---

## ✨ Key Features

### 🔐 Authentication & Security
- **Google Sign-In** and **Email/Password** registration with Firebase Auth
- **Protected Dashboard Routes** — unauthenticated users are redirected to login
- **Firestore Security Rules** — role-based access control ensures only gig owners can accept/reject applicants, and only applicants can view their own submissions

### 📋 Gig Management (For Posters)
- **Create Gigs** — post tasks with title, description, budget, category, and campus
- **My Gigs Dashboard** — view all your posted gigs in one place
- **Review Applicants** — see every cover letter, then **Accept** or **Reject** candidates
- **Auto-Assignment** — when you accept an applicant, the gig status automatically transitions from `open` → `assigned`

### 🔍 Gig Discovery (For Applicants)
- **Explore Page** — browse all open gigs with real-time data
- **Search & Filter** — filter by keyword, category (Tuition, Tech/IT, Design, etc.), and campus
- **Apply with Cover Letter** — submit a personalized message to the gig owner
- **My Applications Dashboard** — track the status of every gig you applied to

### 🎨 Design & UX
- **Modern UI** — built with Tailwind CSS 4, featuring glassmorphism, smooth transitions, and micro-animations
- **Fully Responsive** — works beautifully on mobile, tablet, and desktop
- **Dark Mode Ready** — components are styled with dark mode variants
- **Lucide Icons** — clean, consistent iconography throughout

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 19 + TypeScript 5.9 |
| **Build Tool** | Vite 8 |
| **Styling** | Tailwind CSS 4 |
| **Routing** | React Router DOM 7 |
| **State / Cache** | TanStack React Query 5 |
| **Backend** | Firebase (Auth, Firestore, Storage) |
| **Icons** | Lucide React |
| **Deployment** | Vercel |

---

## 📁 Project Structure

```
src/
├── app/
│   └── router/           # AppRouter, ProtectedRoute
├── config/
│   └── firebase.ts       # Firebase initialization
├── features/
│   ├── auth/             # Auth service, context, hooks
│   ├── gigs/             # Gig types, services, hooks
│   └── applications/     # Application services, hooks, components
├── pages/
│   ├── public/           # Landing, Explore, Login, Register
│   └── dashboard/        # My Gigs, My Applications, Applicants, Profile
└── shared/
    └── components/       # Navbar, Footer, Layout
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9
- A **Firebase** project with Firestore and Authentication enabled

### 1. Clone & Install

```bash
git clone https://github.com/your-username/smart-campus-gig-board.git
cd smart-campus-gig-board
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the project root:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 3. Deploy Firebase Security Rules & Indexes

The application requires specific **Firestore Security Rules** and **Composite Indexes** to function correctly. Deploy them before first use:

```bash
# Install Firebase CLI (if not already installed)
npm install -g firebase-tools

# Login to Firebase
firebase login

# Deploy rules and indexes
firebase deploy --only firestore
```

#### Required Composite Indexes

| Collection | Fields | Query Scope |
|---|---|---|
| `gigs` | `status` ASC, `createdAt` DESC | COLLECTION |
| `gigs` | `ownerId` ASC, `createdAt` DESC | COLLECTION |
| `applications` | `applicantId` ASC, `createdAt` DESC | COLLECTION |
| `applications` | `gigId` ASC, `gigOwnerId` ASC, `createdAt` DESC | COLLECTION |

> **Note:** Indexes can take 1–5 minutes to build after deployment. Check the [Firebase Console → Firestore → Indexes](https://console.firebase.google.com) for status.

### 4. Run the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### 5. Build for Production

```bash
npm run build
```

---

## 🌐 Deployment (Vercel)

This project includes a `vercel.json` configured for:

- **SPA Rewrites** — all routes rewrite to `/index.html` for client-side routing
- **COOP Headers** — `Cross-Origin-Opener-Policy: same-origin-allow-popups` to support Firebase Google Sign-In popups

Simply connect your GitHub repository to Vercel and add the environment variables in the Vercel dashboard.

---

## 📜 Firestore Data Model

```
gigs/{gigId}
├── title: string
├── shortDescription: string
├── budgetMax: number
├── categoryName: string
├── campusName: string
├── ownerId: string
├── ownerDisplayName: string
├── status: "open" | "assigned" | "in-progress" | "completed" | "cancelled"
└── createdAt: Timestamp

applications/{applicationId}
├── gigId: string
├── gigTitle: string
├── gigOwnerId: string        ← denormalized for security rules
├── applicantId: string
├── applicantName: string
├── applicantCampus: string
├── coverLetter: string
├── status: "submitted" | "accepted" | "rejected"
└── createdAt: Timestamp
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is built for academic and community purposes for the **Barisal University** student ecosystem.

---

<p align="center">
  Built with ❤️ for the Barisal University community
</p>
