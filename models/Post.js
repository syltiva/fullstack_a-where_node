const { Schema, model, Types } = require('mongoose');

const PostSchema = Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    date: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: [true, "Address required"],
    },
    latitude: {
        type: Number,
        required: [true, "Enter latitude of incident address."]
    },
    longitude: {
        type: Number, 
        required: [true, "Enter longitude of incident address."]
    },
    severity: {
        type: String,
        enum: ["LOW", "FAIR", "HIGH"], 
        required: true
    },
    policeReport: {
        type: Boolean,
        default: false,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

module.exports = model("Post", PostSchema)