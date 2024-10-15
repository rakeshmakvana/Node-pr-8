const Topic = require('../modules/Topic');

const addTopicForm = (req, res) => {
    res.render('addtopic');
};

const addTopic = async (req, res) => {
    const { title, description } = req.body;
    const newTopic = new Topic({
        title,
        description,
    });
    await newTopic.save();
    res.redirect('/alltopics');
};

module.exports = { addTopicForm, addTopic };