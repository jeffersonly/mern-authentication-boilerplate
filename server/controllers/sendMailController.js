const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';

const {
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    SENDER_EMAIL_ADDRESS
} = process.env;

const oauth2Client = new OAuth2(
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    OAUTH_PLAYGROUND
);

// send email
const sendEmail = (to, url, txt) => {
    oauth2Client.setCredentials({
        refresh_token: MAILING_SERVICE_REFRESH_TOKEN
    });

    const accessToken = oauth2Client.getAccessToken()
    const smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: SENDER_EMAIL_ADDRESS,
            clientId: MAILING_SERVICE_CLIENT_ID,
            clientSecret: MAILING_SERVICE_CLIENT_SECRET,
            refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
            accessToken
        }
    });

    const mailOptions = {
        from: SENDER_EMAIL_ADDRESS,
        to: to,
        subject: "MERN Auth",
        html: `
            <div style="max-width: 700px; margin:auto; border: 10px solid #4267B2; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; color: 4267B2;">Hello!</h2>
            <p>
                Thank you for signing up to use the MERN Authentication application.
                Click the button below to validate your email address and get things going!
            </p>
            
            <a href=${url} style="background: #4267B2; text-decoration: none; color: white; padding: 10px 20px; font-weight: bold; margin: 10px 0; display: inline-block;">${txt}</a>
        
            <p>If the button isn't working, click the link below:</p>
        
            <div>${url}</div>
            </div>
        `
    };

    smtpTransport.sendMail(mailOptions, (err, infor) => {
        if(err) return err;
        return infor;
    });
};

module.exports = sendEmail;