import { Router } from "express";
import { isAuth } from "../middleware/isAuth.js";
import {
  newGroupChat,
  getMyChats,
  getMyGroup,
  addGroupMember,
  removeGroupmember,
  leaveGroup,
  sendAttahments,
  deleteChat,
  renameGroup,
  getChatDetails,
  getMessage,
} from "../controllers/chat.js";
import { attachmentsMulter } from "../middleware/multer.js";
// import { multerUpload } from '../middleware/multer.js';
const router = Router();
router.use(isAuth);

router.post("/new", newGroupChat);
router.get("/my", getMyChats);
router.get("/my/group", getMyGroup);
router.put("/add-member", addGroupMember);
router.delete("/remove-user", removeGroupmember);
router.delete("/leave/:id", leaveGroup);
router.post("/message", attachmentsMulter, sendAttahments);
router.route("/:id").get(getChatDetails).delete(deleteChat).put(renameGroup);
router.get("/message/:id", getMessage)
export default router;
