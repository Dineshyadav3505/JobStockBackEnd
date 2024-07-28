import {createUpcomminPost, getUpcomminPosts, getUpcomminPostById, updateUpcomminPost, deleteUpcomminPost} from '../../controllers/post/upcomming.controller.js';
import { Router } from "express";
import { upload } from "../../middlewares/multer.middleware.js";
import {verifyJWT} from "../../middlewares/auth.middleware.js";

const router = Router()


router.route("/create").post(
    upload.fields([
        {
            name: "iconImage",
            maxCount: 5,
            size: "10mb"
        
        },
        {
            name: "postImage",
            maxCount: 5,
            size:  "10mb "
        }
    ]),
    verifyJWT, createUpcomminPost)

router.route("/post").get(getUpcomminPosts)
router.route("/:id").get(getUpcomminPostById)
router.route("/:id").patch(verifyJWT, updateUpcomminPost)
router.route("/:id").delete(verifyJWT, deleteUpcomminPost)

export default router;