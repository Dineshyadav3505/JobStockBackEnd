import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { admitCardPost } from "../../models/post/admitCard.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../../utils/cloudnary.js";

const createAdmitCardPost = asyncHandler(async (req, res) => {
  const {
    postName,
    postDescription,
    lastDate,
    beginDate,
    yyyymmddDate,
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
    applyLink,
  } = req.body;


  const user = req.user;

  if (user.role !== "Admin") {
    throw new ApiError(401, "Unauthorized");
  }

  if (
    [postName, postDescription, totalPost, applyLink, lastDate, beginDate, yyyymmddDate].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  if (!req.files || !req.files.iconImage || !req.files.postImage) {
    throw new ApiError(400, "Product image is required");
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

    const AdmitCardPost = await admitCardPost.create({
      postName,
      postDescription,
      lastDate,
      beginDate,
      yyyymmddDate,
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
      applyLink,
    });

    return res.status(201).json(new ApiResponse(201, AdmitCardPost, "Post created successfully"));
  } catch (error) {
    console.log(error);
    throw new ApiError(400, "Error uploading image");
  }
});

const getAdmitCardPosts = asyncHandler(async (req, res) => {
  const { searchTerm } = req.query;

  let admitCardPosts = await admitCardPost.find();

  if (searchTerm) {
    admitCardPosts = admitCardPosts.filter((post) =>
      post.postName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  res.json(new ApiResponse(200, admitCardPosts));
});

const getAdmitCardPostById = asyncHandler(async (req, res) => {

  const AdmitCardPost = await admitCardPost.findById(req.params.id);

  if (!admitCardPost) {
    throw new ApiError(404, "Job post not found");
  }
  res.json(new ApiResponse(200, AdmitCardPost));
});

const updateAdmitCardPost = asyncHandler(async (req, res) => {
  const user = req.user;

  if (user.role !== "Admin") {
    throw new ApiError(401, "Unauthorized");
  }

  const AdmitCardPost = await admitCardPost.findByIdAndUpdate(req.params.id, req.body, { new: true });

  if (!admitCardPost) {
    throw new ApiError(404, "Job post not found");
  }
  res.json(new ApiResponse(200, AdmitCardPost));
});

const deleteAdmitCardPost = asyncHandler(async (req, res) => {
  const user = req.user;
  console.log(user.role)

  if (user.role !== "Admin") {
    throw new ApiError(401, "Unauthorized");
  }

  const AdmitCardPost = await admitCardPost.findByIdAndDelete(req.params.id);
  console.log(req.params.id);

  if (!admitCardPost) {
    throw new ApiError(404, "Job post not found");
  }
  res.json(new ApiResponse(200, AdmitCardPost));
});

export { createAdmitCardPost, getAdmitCardPosts, getAdmitCardPostById, updateAdmitCardPost, deleteAdmitCardPost};