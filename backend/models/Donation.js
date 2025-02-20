const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Donation', DonationSchema);
