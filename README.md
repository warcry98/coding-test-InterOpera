# InterOpera Coding Test

![Python Version](https://img.shields.io/badge/Python-3.10%2B-blue)
![Node Version](https://img.shields.io/badge/Node-18%2B-blue)

This is a full-stack project with a **FastAPI** backend and a **Next.js (Page Router)** frontend. It showcases sales data using mock data on the backend and a clean UI on the frontend.

---

## 📁 Project Structure

```
.
├─ backend/          # FastAPI backend
│  ├─ api/
│  │  ├─ ai_v1/
│  │  │  ├─ __init__.py
│  │  │  └─ post.py
│  │  ├─ data_v1/
│  │  │  ├─ __init__.py
│  │  │  ├─ get.py
│  │  │  └─ post.py
│  │  └─ __init__.py
│  ├─ utils/
│  │  └─ summary.py
│  ├─ .env.example -> Rename to `.env`
│  ├─ .gitignore
│  ├─ dummyData.json
│  ├─ env_load.py
│  ├─ main.py
│  └─ requirements.txt
├─ frontend/          # Next.js frontend
│  ├─ components/
│  │  ├─ chat/
│  │  │  ├─ chat-button.js
│  │  │  ├─ chat-dialog.js
│  │  │  ├─ chat-message.js
│  │  │  └─ suggested-prompts.js
│  │  ├─ ui/
│  │  │  ├─ badge.js
│  │  │  ├─ button.js
│  │  │  ├─ card.js
│  │  │  ├─ dropdown-menu.js
│  │  │  ├─ input.js
│  │  │  ├─ progress.js
│  │  │  ├─ scroll-area.js
│  │  │  ├─ skeleton.js
│  │  │  ├─ tabs.js
│  │  │  └─ tooltip.js
│  │  ├─ dashboard-header.js
│  │  ├─ dashboard-stats.js
│  │  ├─ dashboard.js
│  │  ├─ filter-bar.js
│  │  ├─ sales-chart.js
│  │  ├─ sales-rep-cars.js
│  │  ├─ sales-rep-details-skeleton.js
│  │  ├─ sales-rep-details.js
│  │  ├─ search-bar.js
│  │  ├─ sort-options.js
│  │  ├─ theme-provider.js
│  │  └─ theme-toggle.js
│  ├─ hooks/
│  │  └─ useDebounce.js
│  ├─ lib/
│  │  ├─ data.js
│  │  └─ utils.js
│  ├─ pages/
│  │  ├─ [id]
│  │  │  └─ index.js
│  │  ├─ _app.js
│  │  ├─ index.js
│  │  └─ not-found.js
│  ├─ styles/
│  │  └─ globals.css
│  ├─ .env.local.example -> Rename to `.env.local`
│  ├─ .gitignore
│  ├─ jsonfig.json
│  ├─ next.config.js
│  ├─ package.json
│  ├─ postcss.config.mjs
│  └─ tailwind.config.js
├─ .pre-commit-config.yaml
└─ README.md
```

---

## 🚀 Getting Started

### ⚙️ Prerequisites

- Python 3.10+
- Node.js 18+
- `pnpm` (recommended) → `npm install -g pnpm`

---

### 🔧 Setup Instructions

#### 1. Clone the repository

```bash
git clone https://github.com/warcry98/coding-test-InterOpera.git
cd coding-test-InterOpera
```

---

### 🔙 Run the Backend (FastAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn main:app --reload
```

> API runs on: `http://localhost:8000`

#### 🔐 Backend Environment Variables

`.env` contains the Gemini API KEY:

```env
API_KEY=AIzaSyBC_Ehla5pPlijJAYbx8zE3bYIeQi46_TQ
```

Gemini API_KEY used for testing and free trial

---

### 🖥️ Run the Frontend (Next.js)

```bash
cd frontend
pnpm install
cp .env.local.example .env.local
pnpm dev
```

> App runs on: `http://localhost:3000`

#### 🔐 Frontend Environment Variables

`.env.local` contains the backend API URL:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Used by the frontend to fetch data from the FastAPI server.

## 📌 Features

- ⚡ FastAPI REST endpoint serving mock data
- ✨ Next.js frontend with:
  - Tailwind CSS for styling
  - Radix UI for accessible components
  - Sorting, filtering
- 🔄 Clean and reusable component structure
- 📦 Environment-specific config using `.env` and `.env.local` files

---

## 📐 Design Choices

- **FastAPI** for clean, asynchronous backend APIs
- **Next.js (Page Router, no SSR)** for a modern frontend experience
- **Tailwind CSS** for utility-first, scalable styling
- **Radix UI + Lucide Icons** for accessible and customizable UI
- **JavaScript only** frontend for simplicity and rapid development

---

## 🛠 Potential Improvements

- ✅ Add tests using `pytest` (backend) and `React Testing Library` (frontend)
- 🧱 Use **Zustand** or another state manager to scale UI state cleanly
- 📦 Move mock data to a real database (e.g., PostgreSQL)
- 🔍 Improve filter UI with multi-select or fuzzy search
- 🌀 Add support for **server-side pagination, sorting, and search** for better performance on large datasets
- ⚙️ Add CI/CD pipeline (e.g., GitHub Actions)
- 🧩 Modularize backend routes and logic for extensibility

---