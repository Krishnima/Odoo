import {Router} from 'express'
import { addItem, getItems} from '../controllers/item.controller.js';
import {upload} from '../middlewares/multer.js'

const router = Router()

router.route('/add-item').post(addItem)
router.route('/get-item').get(getItems)


export default router;