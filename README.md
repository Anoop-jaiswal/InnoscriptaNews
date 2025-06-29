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

```text
├── public/              # Static assets like favicon, index.html, etc.
├── src/
│   ├── api/             # Axios clients and API functions
│   ├── components/      # Reusable UI components
│   ├── config/          # Global app configs (e.g. React Query client setup)
│   ├── context/         # React context providers
│   ├── hooks/           # Custom hooks (e.g. infinite scrolling)
│   ├── pages/           # Page-level components
│   ├── types/           # TypeScript interfaces and types
│   ├── App.tsx          # Main application wrapper
│   └── main.tsx         # Entry point
├── .env                 # Environment variables
├── Dockerfile           # Docker build instructions
├── vite.config.ts       # Vite configuration
└── README.md            # Project documentation
```


## 🧑‍💻 Getting Started – Local Development

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/news-app.git
cd news-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
touch .env
```

Then add your API keys:

```env
VITE_NY_API_KEY='YOUR_API_KEY'
VITE_GUARDIAN_API_KEY='YOUR_API_KEY'
VITE_NEWS_API_KEY='YOUR_API_KEY'
```

### 4. Start the Development Server

```bash
npm run dev
```

Visit the app at: [http://localhost:5173](http://localhost:5173)


## 🐳 Running the App in a Docker Container


## 📦 Docker Image

The application is published as a Docker image on Docker Hub:

👉 [Docker Hub – anoopjaiswaldocker/innoscripta_news](https://hub.docker.com/r/anoopjaiswaldocker/innoscripta_news)

---

## 🐳 Running the App in a Docker Container

Follow these steps to run the app using Docker:

### ✅ Prerequisites

- Ensure **Docker Engine** is installed and running on your system.  
  👉 [Install Docker](https://docs.docker.com/get-docker/)

---

### 🚀 Steps to Run

1. **Open Terminal / Command Prompt**

2. **Pull the Docker image from Docker Hub**

```bash
docker pull anoopjaiswaldocker/innoscripta_news:v1
```

3. **Run the Docker container with port forwarding**
```bash
docker run -p 5173:5173 anoopjaiswaldocker/innoscripta_news:v1
```
4. **Open your browser and visit:**
```bash
http://localhost:5173
```