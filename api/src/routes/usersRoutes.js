const router = require('express').Router();
const userController = require('../controllers/userController');
const upload = userController.upload

// Route for creating the user
router.route('/register', )
.post(upload.single('avatar') , userController.register)

// Route for login 
router.route('/login')
.post(userController.login);

// .get(userController.getAllUsers);



module.exports = router;