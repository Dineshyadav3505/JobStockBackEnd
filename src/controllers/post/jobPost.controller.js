import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import  { JobPost } from "../../models/post/jobPost.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";


const createJobPost = asyncHandler(async (req, res) => {
    const { 
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
    } = req.body;

    const user = req.user;

    if (user.role !== "Admin") {
        throw new ApiError(401, "Unauthorized");
    }
    
    if ([postName, postDescription, totalPost, iconImage, postImage, applyLink].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    if (!req.files || !req.files.iconImage || !req.files.postImage){
        throw new ApiError(400, "Product image is required");
    }

    const iconImageLocalPaths = req.files.iconImage.map(file => file.path);
    const postImageLocalPaths = req.files.postImage.map(file => file.path);

    if (!iconImageLocalPaths || iconImageLocalPaths.length === 0) {
        throw new ApiError(400, "iconImage file path is required");
    }

    if (!postImageLocalPaths || postImageLocalPaths.length === 0) {
        throw new ApiError(400, "postImage file path is required");
    }

    try {
        const iconImage = await Promise.all(iconImageLocalPaths.map(async (path) => {
            const result = await uploadOnCloudinary(path);
            return result.secure_url;  // Assuming 'uploadOnCloudinary' returns an object with 'secure_url'
        }));
        const postImage = await Promise.all(postImageLocalPaths.map(async (path) => {
            const result = await uploadOnCloudinary(path);
            return result.secure_url;  // Assuming 'uploadOnCloudinary' returns an object with 'secure_url'
        }));

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

        return res
        .status(201)
        .json(new ApiResponse(
            201, 
            jobPost,
            "Post created successfully"
        ));  
    } catch (error) {
        throw new ApiError(400, "Error uploading image");
    }
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