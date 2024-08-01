import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { upcommingPost } from "../../models/post/upcomming.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../../utils/cloudnary.js";

const createUpcomminPost = asyncHandler(async (req, res) => {
  const {
    postName,
    postDescription,
    lastDate,
    beginDate,
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
  } = req.body;

  const user = req.user;

  if (user.role !== "Admin") {
    throw new ApiError(401, "Unauthorized");
  }

  if (
    [postName, postDescription, lastDate, beginDate].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  if (!req.files.postImage) {
    throw new ApiError(400, "postImage image is required");
  }
  if (!req.files.iconImage) {
    throw new ApiError(400, "iconImage image is required");
  }


  const iconImageLocalPaths = req.files.iconImage.map((file) => file.path);
  const postImageLocalPaths = req.files.postImage.map((file) => file.path);

  if (!iconImageLocalPaths || iconImageLocalPaths.length === 0) {
    throw new ApiError(400, "iconImage file path is required");
  }

  if (!postImageLocalPaths || postImageLocalPaths.length === 0) {
    throw new ApiError(400, "postImage file path is required");
  }

  try {
    const iconImage = await Promise.all(iconImageLocalPaths.map(async (path) => {
        const result = await uploadOnCloudinary(path);
        return result.secure_url;
      })
    );
    const postImage = await Promise.all(postImageLocalPaths.map(async (path) => {
        const result = await uploadOnCloudinary(path);
        return result.secure_url;
      })
    );

    const createdPosts = await upcommingPost.create({
      postName,
      postDescription,
      lastDate,
      beginDate,
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
    });

    return res.status(201).json(new ApiResponse(201, createdPosts, "Post created successfully"));
  } catch (error) {
    console.log(error);
    throw new ApiError(400, "Error uploading image");
  }
});

const getUpcomminPosts = asyncHandler(async (req, res) => {
  const { searchTerm } = req.query;

  let upcommingPosts = await upcommingPost.find();

  if (searchTerm) {
    jobPosts = jobPosts.filter((post) =>
      post.postName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  res.json(new ApiResponse(200, upcommingPosts));
});

const getUpcomminPostById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log(id);

  const upcomming = await upcommingPost.findById(req.params.id);

  if (!upcomming){
    throw new ApiError(404, "Job post not found");
  }
  res.json(new ApiResponse(200, upcomming));
});

const updateUpcomminPost = asyncHandler(async (req, res) => {
  const user = req.user;

  // Check if the user is an Admin
  if (user.role !== "Admin") {
    throw new ApiError(401, "Unauthorized");
  }

  // Destructure the request body
  const {
    postName,
    postDescription,
    lastDate,
    beginDate,
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
  } = req.body;

  // Ensure the post ID is provided
  const postId = req.params.id;
  if (!postId) {
    throw new ApiError(400, "Post ID is required");
  }


  try {
    // Update the post in the database
    const post = await upcommingPost.findByIdAndUpdate(postId, 
      { $set:{
          postName,
          postDescription,
          lastDate,
          beginDate,
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
      }
      }, { new: true });

    // Check if the post was found and updated
    if (!post) {
      throw new ApiError(404, "Job post not found");
    }

    // Send the updated post in the response
    res.json(new ApiResponse(200, post));
  } catch (error) {
    console.error("Error updating post:", error);
    throw new ApiError(500, "Internal Server Error");
  }
});

const deleteUpcomminPost = asyncHandler(async (req, res) => {
  const user = req.user;
  console.log(user.role)

  if (user.role !== "Admin") {
    throw new ApiError(401, "Unauthorized");
  }

  const Post = await upcommingPost.findByIdAndDelete(req.params.id);

  if (!Post) {
    throw new ApiError(404, "Job post not found");
  }
  res.json(new ApiResponse(200, Post));
});

export { createUpcomminPost, getUpcomminPosts, getUpcomminPostById, updateUpcomminPost, deleteUpcomminPost };