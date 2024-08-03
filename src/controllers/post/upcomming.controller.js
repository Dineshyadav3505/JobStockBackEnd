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

  // Ensure the post ID is provided
  const postId = req.params.id;
  if (!postId) {
    throw new ApiError(400, "Post ID is required");
  }

  // Create an update object based on the request body
  const updateFields = {};
  const {
    postName,
    postDescription,
    lastDate,
    beginDate,
    yyyymmdd,
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
  } = req.body;

  try {
    // Dynamically build the updateFields object
    if (postName) updateFields.postName = postName;
    if (postDescription) updateFields.postDescription = postDescription;
    if (lastDate) updateFields.lastDate = lastDate;
    if (beginDate) updateFields.beginDate = beginDate;
    if (yyyymmdd) updateFields.yyyymmdd = yyyymmdd;
    if (date1) updateFields.date1 = date1;
    if (date2) updateFields.date2 = date2;
    if (date3) updateFields.date3 = date3;
    if (date4) updateFields.date4 = date4;
    if (date5) updateFields.date5 = date5;
    if (date6) updateFields.date6 = date6;
    if (date7) updateFields.date7 = date7;
    if (date8) updateFields.date8 = date8;
    if (date9) updateFields.date9 = date9;
    if (date10) updateFields.date10 = date10;
    if (Fee1) updateFields.Fee1 = Fee1;
    if (Fee2) updateFields.Fee2 = Fee2;
    if (Fee3) updateFields.Fee3 = Fee3;
    if (Fee4) updateFields.Fee4 = Fee4;
    if (Fee5) updateFields.Fee5 = Fee5;
    if (Fee6) updateFields.Fee6 = Fee6;
    if (Fee7) updateFields.Fee7 = Fee7;
    if (Fee8) updateFields.Fee8 = Fee8;
    if (Fee9) updateFields.Fee9 = Fee9;
    if (Fee10) updateFields.Fee10 = Fee10;
    if (age1) updateFields.age1 = age1;
    if (age2) updateFields.age2 = age2;
    if (age3) updateFields.age3 = age3;
    if (age4) updateFields.age4 = age4;
    if (age5) updateFields.age5 = age5;
    if (age6) updateFields.age6 = age6;
    if (age7) updateFields.age7 = age7;
    if (age8) updateFields.age8 = age8;
    if (age9) updateFields.age9 = age9;
    if (age10) updateFields.age10 = age10;
    if (totalPost) updateFields.totalPost = totalPost;

    // Update the post in the database
    const post = await upcommingPost.findByIdAndUpdate(postId, 
      { $set: updateFields }, 
      { new: true, runValidators: true }
    );

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