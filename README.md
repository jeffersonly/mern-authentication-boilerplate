# Server Side
## Dependencies
- bcrypt:
- cloudinary:
- cookie-parser:
- cors:
- dotenv:
- express:
- express-fileupload:
- googleapis:
- jsonwebtoken:
- nodemailer:
- node-fetch:
- mongoose:
## Dev Dependencies
- nodemon:


# Client Side
## Dependencies
- axios:
- react-redux:
- react-router-dom:
- redux:
## Dev Dependencies


# Environment (.env) and Outside Setup
## .env 
- Create a .env file in the root directory, this will contain application secrets and info, the following items are needed in the .env file
- MONGODB_URL
    - Get the mongodb url by going to clusters in mongodb, then choose to connect to application, a link will be generated that looks something like this:
        - ```mongodb+srv://<username>:<password>@cluster0.is8bq.mongodb.net/<dbname>?retryWrites=true&w=majority``` 
        - replace < password > with the password you had set for that user
        - replace < dbname > with the database name you want 
- ACTIVATION_TOKEN_SECRET, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET
    - Token secrets used for generating the JWT for auth. It's recommended to use a seperate randomized password for each of these secrets.
    - This site is recommended: [Secure Password Generator](https://passwordsgenerator.net/)
- CLIENT_URL
    - set this to the local client you are using, mines was set to: http://localhost:3000
- MAILING_SERVICE_CLIENT_ID, MAILING_SERVICE_CLIENT_SECRET
    - Get the client id and client secret from [google cloud platform apis](https://console.cloud.google.com/apis/dashboard)
    - Add the client link to authorized javascript origins (URIs), mines was http://localhost:3000
    - For authorized redirect URIs, add https://developers.google.com/oauthplayground
- MAILING_SERVICE_REFRESH_TOKEN
    - To get this, go to [https://developers.google.com/oauthplayground/](https://developers.google.com/oauthplayground/)
    - Set the OAuth 2.0 configuration using your own OAuth credentials that you got from the google cloud platform apis for your project
    - Type in https://mail.google.com for select & authorize apis, then authorize api using your google account
        - Note: you may need to configure your OAuth consent screen and add yourself as a test user in order to get this working
    - Click exchange authorization code for tokens and take the refresh token
- SENDER_EMAIL_ADDRESS
    - Set the email address you want to use to send out emails 


## mongodb
- Create an account with mongodb/sign in using google
- Create a mongodb cluster
- allow network access from all ip addresses 