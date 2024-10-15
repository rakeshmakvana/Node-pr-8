const mongoose = require('mongoose');

const SubTopicSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',
        required: true,
    },
});

const SubTopic = mongoose.model('SubTopic', SubTopicSchema)

module.exports = SubTopic;