const Blog = require('../modules/Blog');
const upload = require('../configration/multerCon')

const allBlogs = async (req, res) => {
    const user = req.user;
    const blogs = await Blog.find({}).populate({ path: 'comments', populate: { path: 'user', select: 'username' } });
    res.render('index', { blogs, user });
};

const myBlogs = async (req, res) => {
    const blogs = await Blog.find({ user: req.user._id }); 
    res.render('myblogs', { blogs });
};

const addBlogForm = (req, res) => {
    res.render('addblog');
};

const addBlog = async (req, res) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            return res.redirect('/addblog');
        }
        const { title, content } = req.body;
        const newBlog = new Blog({
            title,
            content,
            image: req.file ? `${req.file.filename}` : '',
            user: req.user.id,
        });
        await newBlog.save();
        res.redirect('/myblogs');
    });
};

const editBlogForm = async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (!blog || blog.user != req.user.id) {
        return res.redirect('/myblogs');
    }
    res.render('editblog', { blog });
};

const editBlog = async (req, res) => {
    let blog = await Blog.findById(req.params.id);
    if (!blog || blog.user != req.user.id) {
        return res.redirect('/myblogs');
    }
    blog.title = req.body.title;
    blog.content = req.body.content;
    if (req.file) {
        blog.image = `${req.file.filename}`;
    }
    await blog.save();
    res.redirect('/myblogs');
};

const deleteBlog = async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (!blog || blog.user != req.user.id) {
        return res.redirect('/myblogs');
    }
    await blog.deleteOne();
    res.redirect('/myblogs');
};

module.exports = { allBlogs, myBlogs, addBlogForm, addBlog, editBlogForm, editBlog, deleteBlog };