# ⚽ SmartFoot

SmartFoot is a football (soccer) player management platform built with **Next.js**, **MongoDB**, and **NextAuth**. It helps players track match performance, monitor injury risk, and discover tournaments — all from a single dashboard.

## ✨ Features

- **Authentication** — Secure sign-up/login using NextAuth with credentials-based auth and hashed passwords (bcrypt).
- **Player Profiles** — Store physical and technical attributes: height, weight, stamina, speed, strength, passing, shooting, defending, and preferred foot.
- **Match Stats Tracking** — Log per-match data such as minutes played, goals, assists, tackles, and passes.
- **Performance Dashboard** — Visualize player performance over time with interactive charts (Recharts).
- **Injury Risk Analysis** — Calculates an injury risk score/level (LOW / MEDIUM / HIGH) based on recent match load, rest days, and injury history.
- **Tournaments (Huddle)** — Browse and create tournaments with details like location, date, format (5v5, 11v11), entry fee, prize pool, and registration status.
- **Role-Based Users** — Supports `player`, `coach`, and `organizer` roles.

## 🛠️ Tech Stack

| Layer          | Technology                          |
|----------------|--------------------------------------|
| Framework      | [Next.js 16](https://nextjs.org) (App Router) |
| Language       | TypeScript                          |
| Database       | MongoDB with Mongoose               |
| Auth           | NextAuth.js (Credentials Provider)  |
| Styling        | Tailwind CSS                        |
| Charts         | Recharts                            |
| Animations     | Motion (Framer Motion)              |
| Icons          | Lucide React                        |
| Password Hashing | bcrypt                            |

## 📂 Project Structure

```
SmartFoot/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/   # NextAuth route handler
│   │   │   ├── injury/               # Injury risk calculation endpoint
│   │   │   ├── player/               # Player profile CRUD
│   │   │   ├── register/             # User registration
│   │   │   ├── stats/                # Match stats CRUD
│   │   │   ├── test-db/              # DB connection test
│   │   │   └── tournament/           # Tournament CRUD
│   │   ├── dashboard/                # Player dashboard page
│   │   ├── huddle/                   # Tournaments page
│   │   ├── login/                    # Login page
│   │   ├── register/                 # Registration page
│   │   └── page.tsx                  # Landing page
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── InjuryRisk.tsx
│   │   │   ├── PerformanceChart.tsx
│   │   │   └── PerformanceModal.tsx
│   │   └── Providers.tsx
│   ├── lib/
│   │   ├── auth.ts                   # NextAuth configuration
│   │   └── db.ts                     # MongoDB connection helper
│   ├── models/                       # Mongoose schemas
│   │   ├── InjuryRecord.ts
│   │   ├── MatchStats.ts
│   │   ├── PlayerProfile.ts
│   │   ├── Team.ts
│   │   ├── Tournament.ts
│   │   └── User.ts
│   └── types/                        # TypeScript type declarations
└── public/                           # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A MongoDB database (local instance or [MongoDB Atlas](https://www.mongodb.com/atlas))

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/SmartFoot.git
cd SmartFoot
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

> Generate a secure `NEXTAUTH_SECRET` with: `openssl rand -base64 32`

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## 📜 Available Scripts

| Command         | Description                       |
|-----------------|------------------------------------|
| `npm run dev`   | Start the development server       |
| `npm run build` | Build the app for production       |
| `npm run start` | Start the production server        |
| `npm run lint`  | Run ESLint checks                  |

## 🔌 API Overview

| Endpoint                | Method     | Description                                  |
|--------------------------|-----------|-----------------------------------------------|
| `/api/register`          | `POST`    | Register a new user                           |
| `/api/auth/[...nextauth]`| `GET/POST`| NextAuth authentication routes                |
| `/api/player`            | `GET/POST`| Fetch or create/update a player profile       |
| `/api/stats`             | `GET/POST`| Fetch or add match statistics                 |
| `/api/injury`            | `GET`     | Get computed injury risk score and level      |
| `/api/tournament`        | `GET/POST`| Fetch or create tournaments                   |
| `/api/test-db`           | `GET`     | Verify MongoDB connectivity                   |

All protected routes require an active NextAuth session.

## 🧠 Injury Risk Logic

The injury risk score is calculated from a player's recent activity:

```
riskScore = (matches in last 7 days × 15) + (total injuries × 20) − (rest days × 10)
```

- **LOW**: score ≤ 30
- **MEDIUM**: 30 < score ≤ 60
- **HIGH**: score > 60

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request with any improvements.

## 📄 License

This project is currently unlicensed. Add a `LICENSE` file to specify usage terms.