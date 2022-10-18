import express, { Response, Request, NextFunction } from 'express'
import { getPrivateMessages, createPrivateMessages, getGroupMessages, createGroupMessages, deletePrivateMessage, deleteGroupMessage, } from '../controllers/messageController'
import { authorize } from '../middlewares/authorizationFunction'

const router = express.Router()

//get all private messages of a logged in user
router
  .route('/p-message/')
  .get(authorize, getPrivateMessages) //gets the id of the logged in user from the req.user

  //a logged in user can create message
  router
  .route('/p-message/:receiverId')
  .post(authorize, createPrivateMessages) //gets the id of the logged in user from the req.user

// a logged in user can delete a private message
router.route('/p-message/:messageId/').put(authorize, deletePrivateMessage)

//a logged in user can create and delete any message sent to a group
router
  .route('/g-message/:groupId')
  .post(authorize, createGroupMessages)
  .get(authorize, getGroupMessages) //get all th egroup message
  

  // a logged in user can delete a group message
router
  .route('/g-message/:messageId')
  .put(authorize, deleteGroupMessage)
  
export default router
