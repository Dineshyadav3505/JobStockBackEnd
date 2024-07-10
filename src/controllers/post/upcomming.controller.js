import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { upcommingPost } from "../../models/post/upcomming.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../../utils/cloudnary.js";

const createUpcomminPost = asyncHandler(async (req, res) => {
    const { postName, lastDate, beginDate, iconImage, yyyymmddDate } = req.body;

    const user = req.user;

    if (user.role!== "Admin") {
      throw new ApiError(401, "Unauthorized");
    }

    if ([postName, lastDate, beginDate, yyyymmddDate].some((field) => field?.trim() === "")) {
      throw new ApiError(400, "All fields are required");
    }

    const iconImageLocalPaths = req.files.iconImage.map((file) => file.path);
    if (!iconImageLocalPaths || iconImageLocalPaths.length === 0) {
        throw new ApiError(400, "iconImage file path is required");
    }

    try {
        const iconImage = await Promise.all(iconImageLocalPaths.map(async (path) => {
            const result = await uploadOnCloudinary(path);
            return result.secure_url;
        })
        );
        const post = await upcommingPost.create({
            postName,
            lastDate,
            beginDate,
            yyyymmddDate,
            iconImage,
        });

        res.status(201).json(new ApiResponse(201, post, "Post created successfully"));

    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Server Error");
    }

        
});
  

const getUpcomminPosts = asyncHandler(async (req, res) => {
    try {
      const posts = await upcommingPost.find({});
      return res.json(new ApiResponse(200, posts, "Posts fetched successfully"));
    } catch (error) {
      console.log(error);
      throw new ApiError(500, "Server Error");
    }
});

const getUpcomminPostById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
      const post = await upcommingPost.findById(id);

      if (!post) {
        throw new ApiError(404, "Post not found");
      }

      return res.json(new ApiResponse(200, post, "Post fetched successfully"));
    } catch (error) {
      console.log(error);
      throw new ApiError(500, "Server Error");
    }
});

const updateUpcomminPost = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { postName, lastDate, beginDate, yyyymmddDate} = req.body;

    try {
      const post = await upcommingPost.findByIdAndUpdate(id, {
        postName,
        lastDate,
        beginDate,
        yyyymmddDate,
      }, { new: true });

      if (!post) {
        throw new ApiError(404, "Post not found");
      }

      return res.json(new ApiResponse(200, post, "Post updated successfully"));
    } catch (error) {
      console.log(error);
      throw new ApiError(500, "Server Error");
    }
});

const deleteUpcomminPost = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
      const post = await upcommingPost.findByIdAndDelete(id);

      if (!post) {
        throw new ApiError(404, "Post not found");
      }

      return res.json(new ApiResponse(200, post, "Post deleted successfully"));
    } catch (error) {
      console.log(error);
      throw new ApiError(500, "Server Error");
    }
});

export { createUpcomminPost, getUpcomminPosts, getUpcomminPostById, updateUpcomminPost, deleteUpcomminPost };