import {Router} from 'express'
import { approveItem, rejectItem } from '../controllers/admin.controller.js';

const router = Router()

router.route('/approve-item').post(approveItem)
router.route('/reject-item').post(rejectItem)


export default router;