import Express from "express";
const router = Express.Router();
import {postInsuranceRequest} from '../controllers/insuranceController.js';
import isAuthenticatedUser from '../middleware/authentication.js';

router.route('/insurance/token').post(isAuthenticatedUser, postInsuranceRequest);

export default router;

