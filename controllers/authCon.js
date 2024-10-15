const User = require('../modules/User');
const transporter = require('../configration/email')
const bcrypt = require('bcrypt');
const otpGenerator = require('otp-generator');
const passport = require('passport');
require('../configration/passport')(passport);

const profile = (req, res) => {
    const user = req.user;
    res.render('profile', { user: user });
}

const loginForm = (req, res) => {
    res.render('login');
};


const login = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
    })(req, res, next);
};


const signupForm = (req, res) => {
    res.render('signup');
};

const signup = async (req, res) => {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        res.render('signup', { username, email });
    } else {
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.redirect('/login');
    }
};

const logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.redirect('/');
        }
        res.redirect('/login');
    });
};

const changepasswordform = (req, res) => {
    res.render('changepassword');
}

const changepassword = async (req, res) => {
    const { cur_password, new_password, con_password } = req.body;
    const user = req.user;
    if (user) {
        const isMatch = await bcrypt.compare(cur_password, user.password);
        if (isMatch) {
            if (new_password == con_password) {
                const hashPassword = await bcrypt.hash(new_password, 10);
                const newPassword = await User.findByIdAndUpdate({ _id: req.user._id }, { password: hashPassword })
                await newPassword.save();
                res.redirect('/profile');
            } else {
                res.redirect('/changepassword')
            }
        } else {
            res.redirect('/changepassword')
        }
    } else {
        res.redirect('/login');
    }
}

const forgotpasswordform = (req, res) => {
    res.render('forgotpassword');
}

const forgotpassword = async (req, res) => {
    const { email } = req.body;
    var user = await User.findOne({ email });
    if (user) {
        const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
        const token = otpGenerator.generate(8, { upperCaseAlphabets: false, specialChars: false, digits: false });
        const url = `http://localhost:3005/newpassword/${user._id}`
        const newUser = await User.findByIdAndUpdate({ _id: user.id }, { otp: otp, token: token });
        await newUser.save();
        let mailOptions = {
            from: 'rakeshmakvana2108@gmail.com',
            to: user.email,
            subject: 'Email Verification and Change Password',
            text: `Hello, ${user.username} \nyour email verification OTP is ${otp} and your direct password change link is ${url}.`
        };
        await transporter.sendMail(mailOptions);
        res.redirect(`/verify/${user._id}`);
    } else {
        res.redirect('/signup');
    }
}

const verifyform = (req, res) => {
    const { id } = req.params;
    res.render('verify', { id });
}

const verify = async (req, res) => {
    const { otp } = req.body;
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    if (user && user.otp == otp) {
        res.redirect(`/newpassword/${id}`);
    } else {
        res.redirect(`/verify/${id}`);
    }
}

const newpasswordform = async (req, res) => {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    if (user && user.otp && user.token) {
        res.render('newpassword', { id });
    } else {
        res.redirect('/forgotpassword');
    }
}

const newpassword = async (req, res) => {
    const { new_password, con_password } = req.body;
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    if (user) {
        const validate = await User.findByIdAndUpdate({ _id: id }, { otp: null, token: null });
        await validate.save();
        if (new_password == con_password) {
            const hashPassword = await bcrypt.hash(new_password, 10);
            const newPassword = await User.findByIdAndUpdate({ _id: id }, { password: hashPassword })
            await newPassword.save();
            res.redirect('/login');
        } else {
            res.redirect(`/newpassword/${id}`);
        }
    }

}

module.exports = { signupForm, signup, loginForm, login, logout, profile, changepasswordform, changepassword, forgotpasswordform, forgotpassword, verifyform, verify, newpasswordform, newpassword };