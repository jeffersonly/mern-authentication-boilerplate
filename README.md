# Server Side
## Dependencies
- bcrypt: Used for specialized hashing, utilized to salt passwords and hash them for security
- cloudinary: Used for image storing 
- cookie-parser: Middleware which parses cookies attached to the client request object
- cors: Cross Origin Resource Sharing, HTTP header based mechanism that allows servers to indicate any other origins (domain, scheme, or port) than its own from which a brwoser should permit loading of resources, allows you to make requests from one website to another website in the browser
- dotenv: Loads environment variables from a .env file into process.env
- express: Framework that helps with managing everything ranging from routes to handling requests and views, helps organize web app into an MVC architecture on the server side
- express-fileupload: Access uploaded file from req.files in express server request
- googleapis: API service provided by Google, used to leverage google services such as sending emails
- jsonwebtoken: JWT, method for allowing authentication without storing information about the user on the system itself
- nodemailer: Used for email sending
- node-fetch: Used for fetching resources
- mongoose: Object Data Modeling library for MongoDB and Node.js; manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB
## Dev Dependencies
- nodemon: Tool for developing with node.js applications to automically restart the node application when file changes in the directory are detected 


# Client Side
## Dependencies
- antd: React UI library for components
- axios: Used to make http requests to external resources, retrieve data from external APIs
- gsap:
- react-facebook-login: Used for oAuth login with facebook
- react-google-login: Used for oAuth login with google
- react-lottie: Used for lottie animations (animated gifs, images, animations)
- react-redux:  Used for application state management, maintains state of the entire app
- react-router-dom: Used to handle routing for different pages
- react-toastify: Used for success and error notifications
- redux: Predictable state container, mainly used as a state management tool
- scrollmagic:
## Dev Dependencies


# Environment (.env) and Outside Setup
## .env 
- Create a .env file in the root directory, this will contain application secrets and info, the following items are needed in the .env file
- MONGODB_URL
    - Go to the official [mongodb website](https://www.mongodb.com/) and follow the steps in [mongodb](#mongodb)
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
- CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET
    - To get these, you need to create a cloudinary account (we use this to store avatar/profile images)
    - Once logged into cloudinary, go to account details which can be found on [this page](https://cloudinary.com/console/)
- GOOGLE_SECRET, FACEBOOK_SECRET
    - Token secrets used for generating the JWT for auth. It's recommended to use a seperate randomized password for each of these secrets.
    - This site is recommended: [Secure Password Generator](https://passwordsgenerator.net/)


## mongodb
- Create an account with mongodb/sign in using google
- Create a mongodb cluster
- allow network access from all ip addresses 

# Running the Application Locally
1. After setting up the .env file with the proper fields, as shown [above](#.env) go into a folder directory and clone the repo
    - This can be done by running ```git clone https://github.com/jeffersonly/mern-authentication-boilerplate.git``` through the command line within the folder in which you want to project to be placed
2. Run ```npm install``` within the base directory (after cloning, change directories into the MERN-AUTHENTICATION-BOILERPLATE, or whatever name you decide to change the project name to)
3. Run ```npm install``` within the client directory (change directories into the client folder and install the dependencies)
4. In the base directory you can run ```npm run dev``` which will the backend of the application
5. Change into the client directory and run ```npm start```, this will run the frontend of the application
