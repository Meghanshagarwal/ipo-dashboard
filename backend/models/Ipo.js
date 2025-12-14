const mongoose = require('mongoose');

const ipoSchema = mongoose.Schema({
    companyName: { type: String, required: true },
    priceBand: { type: String },
    openDate: { type: Date },
    closeDate: { type: Date },
    status: { type: String, default: 'Upcoming' }, // Upcoming, Open, Closed
}, { timestamps: true });

module.exports = mongoose.model('Ipo', ipoSchema);