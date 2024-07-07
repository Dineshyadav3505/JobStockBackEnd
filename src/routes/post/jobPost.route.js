import {createJobPost, getJobPosts, getJobPostById, updateJobPost, deleteJobPost} from '../../controllers/post/jobPost.controller.js';
import { Router } from "express";
import { upload } from "../../middlewares/multer.middleware.js";
import {verifyJWT} from "../../middlewares/auth.middleware.js";

const router = Router()


router.route("/create").post(
    upload.fields([
        {
            name : "iconImage",

        },
        {
            name : "postImage"
        }
    ]),
    
    verifyJWT, createJobPost)
router.route("/job").get(getJobPosts)
router.route("/:id").get(getJobPostById)
router.route("/update").patch(verifyJWT, updateJobPost)
router.route("/delete").delete(verifyJWT, deleteJobPost)

export default router;