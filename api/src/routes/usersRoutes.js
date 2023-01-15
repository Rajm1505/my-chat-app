const router = require('express').Router();
const userController = require('../controllers/userController');

// Route for creating the user
router.route('/register')
.post(userController.register)

// Route for login 
router.route('/login')
.post(userController.login);

// .get(userController.getAllUsers);



module.exports = router;