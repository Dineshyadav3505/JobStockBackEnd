import {createAdmitCardPost, getAdmitCardPosts, getAdmitCardPostById, updateAdmitCardPost, deleteAdmitCardPost} from '../../controllers/post/admitCardcontroller.js';
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
    verifyJWT, createAdmitCardPost)

router.route("/admitcard").get(getAdmitCardPosts)
router.route("/:id").get(getAdmitCardPostById)
router.route("/:id").patch(verifyJWT, updateAdmitCardPost)
router.route("/:id").delete(verifyJWT, deleteAdmitCardPost)

export default router;