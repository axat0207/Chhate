import {Router} from 'express'
import {register, login, logout, getUser} from '../controllers/user.js'
import { isAuth } from '../middleware/isAuth.js';
// import { multerUpload } from '../middleware/multer.js';
const router = Router();

router.post('/register' ,register);
router.post('/login', isAuth, login);
router.route('/logout').get(logout);
router.get('/get-user',isAuth,getUser)

export default router;