import {createJobPost, getJobPosts, getJobPostById, updateJobPost, deleteJobPost} from '../../controllers/post/jobPost.controller.js';
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
    verifyJWT, createJobPost)

router.route("/job").get(getJobPosts)
router.route("/:id").get(getJobPostById)
router.route("/:id").patch(verifyJWT, updateJobPost)
router.route("/:id").delete(verifyJWT, deleteJobPost)

export default router;