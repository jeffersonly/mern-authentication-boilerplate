const router = require('express').Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

router.post('/register', userController.register);
router.post('/activation', userController.activateEmail);
router.post('/login', userController.login);
router.post('/refresh_token', userController.getAccessToken);
router.post('/forgotpassword', userController.forgotPassword);
router.post('/resetpassword', auth, userController.resetPassword);
router.get('/info', auth, userController.getUserInfo);
router.get('/all_info', auth, authAdmin, userController.getAllUsersInfo);
router.get('/logout', userController.logout);

module.exports = router;