const { Schema, model } = require('mongoose');

const IncidentSchema = Schema({
    date: {
        type: Date,
        required: true
    },
    longitude: {
        type: Number, 
        required: [true, "Enter longitude of incident address."]
    },
    latitude: {
        type: Number,
        required: [true, "Enter latitude of incident address."]
    },
    severity: {
        type: String,
        enum: ["LOW, MEDIUM, HIGH"], 
        required: true
    },
    policeReport: {
        type: Boolean,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

module.exports = model("Incident", IncidentSchema)