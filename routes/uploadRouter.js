const router = require('express').Router();
const uploadImage = require('../middleware/uploadImage');
const uploadController = require('../controllers/uploadController');
const auth = require('../middleware/auth');

router.post('/upload_avatar', uploadImage, auth, uploadController.uploadAvatar);

module.exports = router;