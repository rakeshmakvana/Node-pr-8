const express = require('express');
const router = express.Router();
const blogCon = require('../controllers/blogCon');
const ensureAuthenticated = require('../configration/auth');
const upload = require('../configration/multerCon');

router.get('/', ensureAuthenticated, blogCon.allBlogs);
router.get('/myblogs', ensureAuthenticated, blogCon.myBlogs);
router.get('/addblog', ensureAuthenticated, blogCon.addBlogForm);
router.post('/addblog', ensureAuthenticated, blogCon.addBlog);
router.get('/editblog/:id', ensureAuthenticated, blogCon.editBlogForm);
router.post('/editblog/:id', ensureAuthenticated, upload.single('image'), blogCon.editBlog);
router.post('/deleteblog/:id', ensureAuthenticated, blogCon.deleteBlog);

module.exports = router;
