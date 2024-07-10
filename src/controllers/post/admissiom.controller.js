import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { admissiomPost } from "../../models/post/admission.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../../utils/cloudnary.js";

const createAdmissionPost = asyncHandler(async (req, res) => {
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

    const AdmissiomPost = await admissiomPost.create({
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

    return res.status(201).json(new ApiResponse(201, AdmissiomPost, "Post created successfully"));
  } catch (error) {
    console.log(error);
    throw new ApiError(400, "Error uploading image");
  }
});

const getAdmissionPosts = asyncHandler(async (req, res) => {
  const { searchTerm } = req.query;

  let AdmissiomPost = await admissiomPost.find();

  if (searchTerm) {
    AdmissiomPost = admissiomPost.filter((post) =>
      post.postName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  res.json(new ApiResponse(200, AdmissiomPost));
});

const getAdmissionPostById = asyncHandler(async (req, res) => {

  const AdmissiomPost = await admissiomPost.findById(req.params.id);

  if (!AdmissiomPost) {
    throw new ApiError(404, "Job post not found");
  }
  res.json(new ApiResponse(200, AdmissiomPost));
});

const updateAdmissionPost = asyncHandler(async (req, res) => {
  const user = req.user;

  if (user.role !== "Admin") {
    throw new ApiError(401, "Unauthorized");
  }

  const AdmissiomPost = await admissiomPost.findByIdAndUpdate(req.params.id, req.body, { new: true });

  if (!AdmissiomPost) {
    throw new ApiError(404, "Post not found");
  }
  res.json(new ApiResponse(200, AdmissiomPost));
});

const deleteAdmissionPost = asyncHandler(async (req, res) => {
  const user = req.user;
  console.log(user.role)

  if (user.role !== "Admin") {
    throw new ApiError(401, "Unauthorized");
  }

  const AdmissiomPost = await admissiomPost.findByIdAndDelete(req.params.id);
  console.log(req.params.id);

  if (!AdmissiomPost) {
    throw new ApiError(404, "Job post not found");
  }
  res.json(new ApiResponse(200, AdmissiomPost));
});

export { 
    createAdmissionPost, 
    getAdmissionPosts, 
    getAdmissionPostById, 
    updateAdmissionPost, 
    deleteAdmissionPost
};