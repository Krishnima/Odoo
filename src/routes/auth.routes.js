import {Router} from 'express'
import { editProfile, loginUser, logoutUser, registerUser, uploadAvatar, userProfile } from '../controllers/auth.controller.js';
import { verifyJWT } from '../middlewares/user.Auth.js';

const router = Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').patch(verifyJWT, logoutUser)
router.route('/get-user').get(verifyJWT, userProfile)
router.route('/edit-profile').patch(verifyJWT, editProfile)
router.route('/upload-avatar').patch(verifyJWT, uploadAvatar)


export default router;