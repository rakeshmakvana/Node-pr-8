const SubTopic = require('../modules/SubTopic');
const Topic = require('../modules/Topic');

const addSubTopicForm = async (req, res) => {
    const topics = await Topic.find({});
    res.render('addsubtopic', { topics });
};

const addSubTopic = async (req, res) => {
    const { title, topic } = req.body;
    const newSubTopic = new SubTopic({
        title,
        topic
    });
    await newSubTopic.save();
    res.redirect('/alltopics');
};

const allTopics = async (req, res) => {
    const topics = await Topic.find({});
    const subtopics = await SubTopic.find().populate('topic');
    res.render('alltopics', { topics, subtopics });
}

module.exports = { addSubTopicForm, addSubTopic, allTopics };