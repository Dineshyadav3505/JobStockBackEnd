import {createAdmissionPost, getAdmissionPosts, getAdmissionPostById, updateAdmissionPost, deleteAdmissionPost} from '../../controllers/post/admissiom.controller.js';

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
    verifyJWT, createAdmissionPost)

router.route("/admission").get(getAdmissionPosts)
router.route("/:id").get(getAdmissionPostById)
router.route("/:id").patch(verifyJWT, updateAdmissionPost)
router.route("/:id").delete(verifyJWT, deleteAdmissionPost)

export default router;