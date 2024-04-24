import {Router} from 'express'
import {register, login, logout, getUser, findUser, sendRequest, acceptRequest, getNotifiction, myfriends} from '../controllers/user.js'
import { isAuth } from '../middleware/isAuth.js';
import { loginValidator, registerValidator, validateHandler } from '../lib/validations.js';
// import { multerUpload } from '../middleware/multer.js';
const router = Router();

router.post('/register' ,registerValidator(), validateHandler,register);
router.post('/login',loginValidator(),validateHandler, isAuth, login);
router.route('/logout').get(logout);
router.get('/get-user',isAuth,getUser)
router.post('/find-user',isAuth, findUser)
router.put('/send-request', isAuth,sendRequest)
router.put('/accept-request', isAuth, acceptRequest)
router.get('/notifications', isAuth,getNotifiction)
router.get('/friends', isAuth, myfriends)

export default router;