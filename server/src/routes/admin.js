import { Router } from "express";
import { adminLogin, adminLogout, allChats, allMessage, allUsers, getAdminData, stats } from "../controllers/admin.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = Router();

router.post("/verify",adminLogin);
router.get("/logout",adminLogout);
// Only Admin can use
router.use(isAdmin)
router.get("/",getAdminData);
router.get("/users",allUsers);
router.get("/chats", allChats);
router.get("/message",allMessage);
router.get("/stats",stats);
export default router;
