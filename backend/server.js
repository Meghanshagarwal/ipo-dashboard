const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const cron = require('node-cron');               // <-- NEW
const scrapeIpoData = require('./services/ipoScraper'); // <-- NEW

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Run scraping immediately when server starts (so you can see it working)
scrapeIpoData();                                 // <-- NEW

// Schedule it to run every day at 10:00 AM
cron.schedule('0 10 * * *', () => {              // <-- NEW
    console.log('⏰ Running Daily IPO Scraper...');
    scrapeIpoData();
});

app.get('/', (req, res) => {
    res.send('API is running...');
});
// Route to get all IPOs
app.get('/api/ipos', async (req, res) => {
    const Ipo = require('./models/Ipo');
    const ipos = await Ipo.find({});
    res.json(ipos);
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));