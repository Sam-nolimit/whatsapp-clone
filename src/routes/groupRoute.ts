import express from 'express'
import passport from 'passport'
import {join_group, get_groups, add_member} from '../controllers/groupChatController'
import { create_group } from '../controllers/groupChatController'
import { authorize } from '../middlewares/authorizationFunction'
const router = express.Router()
router.get('/', (req, res, next) => {
  try {
    res
      .status(200)
      .json({ message: 'success', details: 'This route is working' })
  } catch (err: any) {
    res.status(400).json({ message: err.message })
  }
})

//create group
router.post('/create_group', authorize, create_group)

//join group
router.get('/join', authorize, join_group)

//get all groups
router.get('/all', authorize, get_groups)

//add member to my group
router.post('/add_member', authorize, add_member)
export default router
