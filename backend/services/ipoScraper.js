const axios = require('axios');
const cheerio = require('cheerio');
const Ipo = require('../models/Ipo');

const scrapeIpoData = async () => {
    try {
        console.log('🕵️  Starting IPO Scraping (Universal Mode)...');
        
        const url = 'https://www.chittorgarh.com/ipo/ipo_dashboard.asp';
        const { data } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        
        const $ = cheerio.load(data);
        const ipoList = [];
        let rowsChecked = 0;

        // STRATEGY: Grab EVERY table row on the page
        $('tr').each((index, element) => {
            rowsChecked++;
            const row = $(element);
            const columns = row.find('td');

            // We only care about rows with at least 3 columns of data
            if (columns.length >= 3) {
                const col0 = columns.eq(0).text().trim(); // Name
                const col1 = columns.eq(1).text().trim(); // Dates
                const col2 = columns.eq(2).text().trim(); // Price

                // Filter: Real data usually has a Date in column 1 (e.g., "12 Dec - 15 Dec")
                // And we skip rows where the name is "Company" (Header row)
                if (col0 && col0 !== "Company" && (col1.includes('-') || col1.includes('Open'))) {
                    
                    let status = 'Closed';
                    if (col1.includes('Open')) status = 'Open';
                    else if (col1.includes('Upcoming')) status = 'Upcoming';

                    ipoList.push({
                        companyName: col0,
                        priceBand: col2,
                        status: status,
                        openDate: new Date()
                    });
                }
            }
        });

        console.log(`Checked ${rowsChecked} rows. Found ${ipoList.length} valid IPOs.`);

        if (ipoList.length > 0) {
            for (const ipo of ipoList) {
                await Ipo.findOneAndUpdate(
                    { companyName: ipo.companyName }, 
                    ipo, 
                    { upsert: true, new: true }
                );
            }
            console.log(`🎉 Success! Database Updated with ${ipoList.length} IPOs.`);
        } else {
            console.log('⚠️ Still 0 IPOs? The site might be blocking Cloud IPs or structure is very different.');
        }

    } catch (error) {
        console.error('❌ Scraping Failed:', error.message);
    }
};

module.exports = scrapeIpoData;