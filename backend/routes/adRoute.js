import Express from 'express';
import { addAd, retrieveAds, findAd, updateAd, deleteAd } from '../controllers/adController.js';
import isAuthenticatedUser, {authorizeRoles } from '../middleware/authentication.js';
const router = Express.Router();

// Protected routes with isAuthenticatedUser middleware
router.post('/auction/car/new', isAuthenticatedUser, addAd);
router.get('/auction/cars', isAuthenticatedUser, retrieveAds);
router.get('/auction/car/:id', isAuthenticatedUser, findAd);
router.put('/auction/car/:id', isAuthenticatedUser, updateAd);
router.delete('/auction/car/:id', isAuthenticatedUser, deleteAd);

export default router;
