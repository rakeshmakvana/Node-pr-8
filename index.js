const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();
const flash = require('connect-flash');
const auth = require('./routes/authRoutes')
const blog = require('./routes/blogRoutes')
const topic = require('./routes/topicRouter')
const subtopic = require('./routes/subtopicRouter')
const comment = require('./routes/commentRoutes')
const db = require('./configration/dbCon');
const passport = require('passport');
const session = require('express-session');
const PORT = 3005;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'views')));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({ secret: 'secret', resave: true, saveUninitialized: true, }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

app.use('/', auth);
app.use('/', blog);
app.use('/', topic);
app.use('/', subtopic);
app.use('/', comment);

app.listen(PORT, (err) => {
    if (!err) {
        console.log(`Server running in http://localhost:${PORT}`);
    } else {
        console.log('Err', err);
    };
});