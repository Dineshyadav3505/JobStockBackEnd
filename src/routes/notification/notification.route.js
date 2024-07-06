import { Router } from "express";
import { createNotification,getNotifications, deleteNotification, updateNotification } from "../../controllers/notification/notification.controller.js";
import {verifyJWT} from "../../middlewares/auth.middleware.js";
const router = Router()


router.route("/create").post(verifyJWT, createNotification)
router.route("/notificition").get(getNotifications)
router.route("/:notificationId").patch(verifyJWT, updateNotification)
router.route("/:notificationId").delete(verifyJWT, deleteNotification)

export default router;
