import {Router} from 'express'
import { getMySwaps, requestSwap } from '../controllers/swap.controller';
import { verifyJWT } from '../middlewares/user.Auth.js';

const router = Router()

router.route('/request-swap').post(verifyJWT, requestSwap)
router.route('/get-my-swaps').get(verifyJWT, getMySwaps)

export default router;