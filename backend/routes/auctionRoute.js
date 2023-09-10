import express from 'express';
import {startAuction} from '../controllers/auctionController.js';
import isAuthenticatedUser, {authorizeRoles } from '../middleware/authentication.js';
const router = express.Router();

router.get('/start/:adId', isAuthenticatedUser, startAuction);

export default router;
