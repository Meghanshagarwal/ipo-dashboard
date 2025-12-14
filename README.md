# 🚀 MERN Stack IPO Dashboard & Analyzer

A full-stack financial tool that scrapes real-time IPO data from the Indian market, tracks listing status, and provides an interactive calculator for estimating listing gains.

## 🛠️ Tech Stack
- **Frontend:** React.js, Tailwind-style CSS, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (Cloud)
- **Automation:** Cheerio (Scraping), Node-Cron (Daily Scheduling)

## ✨ Key Features
- **Live Data Pipeline:** Automated scraper runs daily at 10:00 AM to fetch new IPOs.
- **Universal Parsing:** Custom logic to handle dynamic HTML table structures.
- **Profit Calculator:** Interactive tool to estimate ROI based on Grey Market Premium (GMP).

## 🚀 How to Run Locally

### 1. Clone the Repo
\`\`\`bash
git clone https://github.com/your-username/ipo-dashboard.git
cd ipo-dashboard
\`\`\`

### 2. Setup Backend
\`\`\`bash
cd backend
npm install
# Create a .env file with: MONGO_URI=your_mongodb_url
npm run dev
\`\`\`

### 3. Setup Frontend
\`\`\`bash
cd frontend
npm install
npm start
\`\`\`