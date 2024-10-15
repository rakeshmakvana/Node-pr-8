const Blog = require("../modules/Blog");
const Comment = require("../modules/Comment");

const addComment = async (req, res) => {
    const { content } = req.body;
    const blogId = req.params.id;
    const comment = new Comment({
        user: req.user._id,
        blog: blogId,
        content
    });
    await comment.save();
    await Blog.findByIdAndUpdate(blogId, { $push: { comments: comment._id } });
    res.redirect('/');
};

module.exports = { addComment }