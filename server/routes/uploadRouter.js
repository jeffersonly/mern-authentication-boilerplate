const router = require('express').Router();
const uploadImage = require('../middleware/uploadImage');
const uploadController = require('../controllers/uploadController');
const auth = require('../middleware/auth');

// route that handles user uploading/changing their profile image
router.post('/upload_avatar', uploadImage, auth, uploadController.uploadAvatar);

module.exports = router;
