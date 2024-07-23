import {createStateJob, getStateJob, getStateJobById, updateStateJob, deleteStateJob} from '../../controllers/post/statejob.controller.js';

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
    verifyJWT, createStateJob)

router.route("/admission").get(getStateJob)
router.route("/:id").get(getStateJobById)
router.route("/:id").patch(verifyJWT, updateStateJob)
router.route("/:id").delete(verifyJWT, deleteStateJob)

export default router;