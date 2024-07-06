import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import  { JobPost } from "../../models/post/jobPost.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";


const createJobPost = asyncHandler(async (req, res) => {
    const user = req.user;

    if (user.role !== "Admin") {
        throw new ApiError(401, "Unauthorized");
    }

    const { postName, postDescription, date1, date2, date3, date4, date5, date6, date7, date8, date9, date10, Fee1, Fee2, Fee3, Fee4, Fee5, Fee6, Fee7, Fee8, Fee9, Fee10, age1, age2, age3, age4, age5, age6, age7, age8, age9, age10, totalPost, iconImage, postImage, applyLink } = req.body;
    
    console.log(postName, postDescription, totalPost, iconImage, postImage, applyLink);

    if ([postName, postDescription, totalPost, iconImage, postImage, applyLink].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }
    
    const jobPost = await JobPost.create({
        postName,
        postDescription,
        date1,
        date2,
        date3,
        date4,
        date5,
        date6,
        date7,
        date8,
        date9,
        date10,
        Fee1,
        Fee2,
        Fee3,
        Fee4,
        Fee5,
        Fee6,
        Fee7,
        Fee8,
        Fee9,
        Fee10,
        age1,
        age2,
        age3,
        age4,
        age5,
        age6,
        age7,
        age8,
        age9,
        age10,
        totalPost,
        iconImage,
        postImage,
        applyLink
    });
})

const getJobPosts = asyncHandler(async (req, res) => {
    const jobPosts = await JobPost.find();
    res.json(new ApiResponse(200, jobPosts));
})

const getJobPostById = asyncHandler(async (req, res) => {
    const user = req.user;

    if (user.role !== "Admin") {
        throw new ApiError(401, "Unauthorized");
    }
    
    const jobPost = await JobPost.findById(req.params.id);

    if (!jobPost) {
        throw new ApiError(404, "Job post not found");
    }
    res.json(new ApiResponse(200, jobPost));
})

const updateJobPost = asyncHandler(async (req, res) => {
    const user = req.user;

    if (user.role !== "Admin") {
        throw new ApiError(401, "Unauthorized");
    }

    const jobPost = await JobPost.findByIdAndUpdate
    (req.params.id, req.body, { new: true });

    if (!jobPost) {
        throw new ApiError(404, "Job post not found");
    }
    res.json(new ApiResponse(200, jobPost));
})

const deleteJobPost = asyncHandler(async (req, res) => {
    const user = req.user;

    if (user.role !== "Admin") {
        throw new ApiError(401, "Unauthorized");
    }

    const jobPost = await JobPost.findByIdAndDelete(req.params.id);

    if (!jobPost) {
        throw new ApiError(404, "Job post not found");
    }
    res.json(new ApiResponse(200, jobPost));
})

export { createJobPost, getJobPosts, getJobPostById, updateJobPost, deleteJobPost}
