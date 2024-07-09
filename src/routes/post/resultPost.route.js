import {createResultPost, getResultPosts, getResultPostById, updateResultPost, deleteResultPost } from '../../controllers/post/resultPost.controller.js';
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
    verifyJWT, createResultPost)

router.route("/result").get(getResultPosts)
router.route("/:id").get(getResultPostById)
router.route("/:id").patch(verifyJWT, updateResultPost)
router.route("/:id").delete(verifyJWT, deleteResultPost)

export default router;