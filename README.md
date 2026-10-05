# GymFlow - Gym Management System

A clean, modern, and practical university software project for gym and fitness club management built with **Next.js**, **React**, **TypeScript**, **Tailwind CSS**, and **Mongoose/MongoDB**.

---

##  Key Features

- **Dashboard**:
  - 4 key statistic cards (Total Members, Active Members, Trainers, Upcoming Classes)
  - Quick action shortcuts
  - Upcoming class schedule overview and recent members list
- **Members Management**:
  - Clean member data table with search and status filtering (Active, Pending, Expired)
  - Full modal form to register or edit members (name, email, phone, membership type, date ranges, status)
- **Trainers Directory**:
  - Staff listing showing specialization, experience years, contact info, and status
  - Add / edit trainer modal
- **Class Schedule**:
  - Schedule and manage group classes (Yoga, Boxing, HIIT, Strength Training)
  - Assign trainer, room/studio, date/time, and track capacity/enrolled slots

---

## Tech Stack & UI Principles

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom charcoal & emerald green tokens
- **Icons**: Lucide React
- **Database**: Mongoose (MongoDB) with built-in zero-friction demo data fallback
- **Design Philosophy**: Practical, accessible, and clean — free from distracting glassmorphism, heavy animations, or gimmicky 3D effects.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with fixed Sidebar and Header
│   ├── page.tsx                # Dashboard overview
│   ├── members/page.tsx        # Member management page
│   ├── trainers/page.tsx       # Trainer directory page
│   ├── classes/page.tsx        # Class schedule page
│   └── api/
│       ├── members/route.ts    # REST endpoints (GET, POST)
│       ├── trainers/route.ts   # REST endpoints (GET, POST)
│       └── classes/route.ts    # REST endpoints (GET, POST)
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx         # Clean desktop navigation
│   │   └── Header.tsx          # Top bar with mobile navigation drawer
│   ├── ui/
│   │   ├── button.tsx          # Reusable button variants
│   │   ├── input.tsx           # Standardized input
│   │   ├── label.tsx           # Form label
│   │   ├── select.tsx          # Clean select dropdown
│   │   ├── badge.tsx           # Status badge
│   │   ├── card.tsx            # Stat & content card
│   │   ├── table.tsx           # Clean data table
│   │   └── modal.tsx           # Accessible form modal dialog
│   ├── members/                # MemberTable, MemberForm, MemberStatusBadge
│   ├── trainers/               # TrainerTable, TrainerForm
│   └── classes/                # ClassTable, ClassForm
├── lib/
│   ├── db.ts                   # Mongoose connection with caching
│   ├── initial-data.ts         # Realistic sample data seed
│   └── utils.ts                # Utility helpers (cn, formatDate)
└── models/
    ├── Member.ts               # Mongoose schema for Members
    ├── Trainer.ts              # Mongoose schema for Trainers
    └── Class.ts                # Mongoose schema for Classes
```

---

##  Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Optional MongoDB Setup
If you want to connect to a real MongoDB instance, copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Update `MONGODB_URI` with your connection string. If omitted, the application will automatically run using the realistic in-memory seed data.
