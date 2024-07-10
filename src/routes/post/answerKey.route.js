import { createAnswerKeyPost, getAnswerKeyPosts, getAnswerKeyPostById, updateAnswerKeyPost, deleteAnswerKeyPost } from '../../controllers/post/answerKey.controller.js';   
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
    verifyJWT, createAnswerKeyPost)

router.route("/answerKey").get(getAnswerKeyPosts)
router.route("/:id").get(getAnswerKeyPostById)
router.route("/:id").patch(verifyJWT, updateAnswerKeyPost)
router.route("/:id").delete(verifyJWT, deleteAnswerKeyPost)

export default router;