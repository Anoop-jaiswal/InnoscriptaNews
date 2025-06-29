# 📰 News App – React + TypeScript + Vite

A fully responsive, fast, and modern News Aggregator built using **React**, **Vite**, and **TypeScript**. It fetches the latest articles from The Guardian API and displays them in a clean UI using TailwindCSS and **TanStack React Query** for efficient data fetching, caching, and **infinite scrolling**.

---

## 🚀 Features

- ⚡️ Lightning-fast Vite bundler
- 📄 TypeScript for safer code
- 🎨 TailwindCSS for styling
- 🌙 Dark mode support
- 🔍 Category-wise article filtering
- 🔁 Infinite scrolling for seamless article loading
- 🧠 Smart caching & background refetching with React Query
- 📡 Centralized async state management
- 🧱 Modular and scalable folder structure
- 🐳 Dockerized for easy deployment

---

## 🛠️ Tech Stack

- **React 18**
- **Vite**
- **TypeScript**
- **TailwindCSS**
- **Axios**
- **TanStack React Query**
- **ESLint + Prettier**
- **Docker**

---

## 📁 Project Structure

<pre lang="md"> ## 📁 Project Structure ```text ├── public/ # Static assets like favicon, index.html, etc. ├── src/ │ ├── api/ # Axios clients and API functions │ ├── components/ # Reusable UI components │ ├── config/ # Global app configs (e.g. React Query client setup) │ ├── context/ # React context providers │ ├── hooks/ # Custom hooks (e.g. infinite scrolling) │ ├── pages/ # Page-level components │ ├── types/ # TypeScript interfaces and types │ ├── App.tsx # Main application wrapper │ └── main.tsx # Entry point ├── .env # Environment variables ├── Dockerfile # Docker build instructions ├── vite.config.ts # Vite configuration └── README.md # Project documentation ``` </pre>

## 🧑‍💻 Getting Started – Local Development

### 1. Clone the repository


git clone https://github.com/your-username/news-app.git

cd news-app

### 2. Install dependencies
npm install

### Configure Environment Variables

### 3.Create a .env file in the root:
touch .env

Add your Guardian API key:

VITE_NY_API_KEY='YOUR API KEY'
VITE_GUARDIAN_API_KEY="YOUR API KEY"
VITE_NEWS_API_KEY='YOUR API KEY'

### 4. Start the development server
npm run dev
Then visit: http://localhost:5173