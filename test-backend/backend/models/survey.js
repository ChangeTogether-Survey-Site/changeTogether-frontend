const mongoose = require('mongoose');

// schema
const surveySchema = mongoose.Schema({
    surveyName: { type: String, required: true },
    organization: { type: String, required: true },
    description: { type: String, required: true },
    questions: { type: String, required: true }
});

// model
module.exports = mongoose.model('Survey', surveySchema);
