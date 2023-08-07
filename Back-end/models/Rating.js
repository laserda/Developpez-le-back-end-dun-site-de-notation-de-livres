const mongoose = require('mongoose');

const ratingbookSchema = mongoose.Schema({
    userId: { type: String, required: true },
    grade: { type: Number, required: true },
});

module.exports = mongoose.model('Rating', ratingbookSchema);