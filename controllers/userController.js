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
    activateEmail: async(req, res) => {
        try {
            const { activation_token } = req.body;
            const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET);

            console.log(user);
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