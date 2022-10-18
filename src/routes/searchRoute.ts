import express, { Router } from 'express'
import _ from "lodash";
import {  search_friend, search_favourite, search_groups, searchMessage } from '../controllers/searchController';
import { authorize } from '../middlewares/authorizationFunction';
const router = Router();


router.get("/search_friend/:query", authorize, search_friend);

router.get('/search_favourite/:query', authorize, search_favourite)

router.get('/search_groups/:query', authorize, search_groups)

//Search Message Route

router.post('/search-message/:receiverId',authorize, searchMessage)

export default router   