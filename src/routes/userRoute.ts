import express, {Request, Response, NextFunction} from 'express'
import multer from '../utils/muilterImageUpload';
import { signUp, login,logout,otherUserInfo, getGroupInfo} from '../controllers/userAuthController';
import { updateUserProfile, userProfile } from '../controllers/updateUserController'
import {emailVerified}  from '../controllers/emailVerificationController'
import {forgot_password, reset_password, change_password } from '../controllers/passwordController'
import {
  getAllFriends,
  addFriend,
  getAllFavourites,
  addFavourite,
  allUser
} from '../controllers/friendsController'
// import { getAllFriends, addFriend, addFavourite, getAllFavourites} from '../controllers/friendsController'
import { isverified } from '../middlewares/modules'
import { authorize } from '../middlewares/authorizationFunction'

const router = express.Router();

// router.get('/',(req: Request, res: Response)=>{
//  res.render('index')
// })

// User registration route
router.post('/signup', multer.single("image"), signUp)

// User login route
router.post('/login', login)

// User verification route
router.get('/newuser/verify-email', emailVerified) 

//get all friends of a user with id
router.get('/friends', authorize, getAllFriends) //temporary remove the "authorize" in order to implement my front end

//add friend for a user with id
router.post('/addfriend', authorize, addFriend)

//logout
router.get('/logout',logout)

// User expired verification route
router.post('/forgot_password', forgot_password)
router.get('/reset_password/:userId/:token', reset_password)
router.post('/reset_password/:userId/:token', reset_password)
router.get("/reset_password/:userId/:token", reset_password);
router.get("/change_password", authorize, change_password);


//Get user profile route
router.get('/userprofile', authorize, isverified, userProfile)

//Update user profile route
router.put('/userprofile', authorize, updateUserProfile)

//Get other user's profile route
router.get('/otheruserinfo/:userId', authorize, otherUserInfo)

//Get group info route
router.get('/groupinfo/:groupId', authorize, getGroupInfo)

//Get all favorite friends
router.get('/getallfavoritefriends', authorize, getAllFavourites) //temporary remove the "authorize" in order to implement my front end

//Add favorite friend
router.post('/addfavoritefriend',authorize, addFavourite)


//Get group info route
router.get('/all', authorize, allUser)


export default router    
