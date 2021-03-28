const Users = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SendmailTransport = require('nodemailer/lib/sendmail-transport');
const sendMail = require('./sendMailController');

const { CLIENT_URL } = process.env;

const userController = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            // check to see if fields are empty
            if(!name || !email || !password) {
                return res.status(400).json({ msg: "Please fill in all fields" });
            }

            // validate email
            if(!validateEmail(email)) {
                return res.status(400).json({ msg: "Invalid email" });
            }

            const user = await Users.findOne({ email });

            // check to see if a user with the entered email already exists
            if(user) {
                return res.status(400).json({ msg: "This email is already in use" });
            }

            if(password.length < 6) {
                return res.status(400).json({ msg: "Password must be at least 6 characters" });
            }

            // create hashed password
            const passwordHashed = await bcrypt.hash(password, 12);
            
            const newUser = {
                name,
                email,
                password: passwordHashed
            };

            // token to activate new user
            const activation_token = createActivationToken(newUser);

            // user activation url
            const url = `${CLIENT_URL}/user/activate/${activation_token}`;

            sendMail(email, url, "Verify Email Address");

            res.json({ msg: "Registration Succeeded! An activation link has been sent to your email!" });
        } catch(err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    activateEmail: async (req, res) => {
        try {
            const { activation_token } = req.body;
            const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET);

            const { name, email, password } = user;
            const check = await Users.findOne({ email });
            if(check) {
                return res.status(400).json({ msg: "This email is already in use" });
            }

            const newUser = new Users({
                name, email, password
            });

            await newUser.save();

            res.json({ msg: "Account has been activated" });

        } catch(err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await Users.findOne({ email });
            if(!user) {
                return res.status(400).json({ msg: "This user does not exist" });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch) {
                return res.status(400).json({ msg: "Password is incorrect" });
            }

            const refresh_token = createRefreshToken({ id: user._id });
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 // 7 days
            });

            res.json({ msg: "Logged In Successfully" });
        } catch(err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getAccessToken: (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken;
            if(!rf_token) {
                return res.status(400).json({ msg: "Please log in" });
            }

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if(err) {
                    return res.status(400).json({ msg: "Please log in" });
                }

                const access_token = createAccessToken({ id: user.id });
                res.json({ access_token });
            });
        } catch(err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body;
            const user = await Users.findOne({ email });
            if(!user) {
                return res.status(400).json({ msg: "This email isn't registered" });
            }

            const access_token = createAccessToken({ id: user._id });
            const url = `${CLIENT_URL}/user/reset/${access_token}`;

            sendMail(email, url, "Reset Password");
            res.json({ msg: "To reset the password, please check your email" });
        } catch(err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    resetPassword: async (req, res) => {
        try {
            const { password } = req.body;
            const passwordHash = await bcrypt.hash(password, 12);

            await Users.findOneAndUpdate({ _id: req.user.id }, {
                password: passwordHash
            });

            res.json({ msg: "Password Successfully Changed" });
        } catch(err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getUserInfo: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('-password');
            res.json(user);
        } catch(err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getAllUsersInfo: async (req, res) => {
        try {
            const users = await Users.find().select('-password');
            res.json(users);
        } catch(err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', { path: '/users/refresh_token' });
            return res.json({ msg: "Logged Out Successfully" });
        } catch(err) {
            return res.status(500).json({ msg: err.message });
        }
    }
};

// validate email
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, { expiresIn: '10m' });
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}


module.exports = userController;