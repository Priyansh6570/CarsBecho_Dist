import express from 'express';
import {addBid, listBids} from '../controllers/bidController.js';
import isAuthenticatedUser, {authorizeRoles } from '../middleware/authentication.js';

const router = express.Router();

router.post('/:adId?', isAuthenticatedUser, addBid);
router.get('/:adId?', isAuthenticatedUser, listBids);

export default router;
