import express from 'express';
import {joinRoom, getRoom} from '../controllers/roomController.js';
import isAuthenticatedUser, {authorizeRoles } from '../middleware/authentication.js';

const router = express.Router();

router.post('/join/:roomId', isAuthenticatedUser, joinRoom);
router.get('/:roomId', isAuthenticatedUser, getRoom);

export default router;
