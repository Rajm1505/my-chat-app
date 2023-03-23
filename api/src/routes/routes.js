const router = require('express').Router();
const userController = require('../controllers/userController');
const friendsController = require('../controllers/friendsController');
const upload = userController.upload



// Route for creating the user
router.route('/register', )
.post(upload.single('avatar') , userController.register)

// Route for login 
router.route('/login')
.post(userController.login);

//Search in database against the query recieved
router.route('search') 
.get(friendsController.search);


// router.route('/allfriends') // List all the friends of loggedin user
// .post(friendsController.allfriends);

// router.route('/sendRequest') //Post an id of friend
// .post(friendsController.sendRequest);

// router.route('/pendingrequests') //Gets the list of all friend requests
// .get(friendsController.pendingRequests);

// router.route('/acceptfriend')   //on button click of accept. all friendid in loggedin user document
// .post(friendsController.acceptFriend);

// router.route('/removefriend') //Remove the friend from the loggedin user 
// .post(friendsController.removeFriend);







// .get(userController.getAllUsers);



module.exports = router;