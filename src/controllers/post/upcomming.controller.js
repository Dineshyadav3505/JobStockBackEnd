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

  } = req.body;


  const user = req.user;

  if (user.role !== "Admin") {
    throw new ApiError(401, "Unauthorized");
  }

  if (
    [postName, postDescription, totalPost, lastDate, beginDate, yyyymmddDate].some(
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

        const post = await upcommingPost.create({
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
        });

        res.status(201).json(new ApiResponse(201, post, "Post created successfully"));

    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Server Error");
    }

        
});
  

const getUpcomminPosts = asyncHandler(async (req, res) => {
  const { searchTerm } = req.query;

  let UpcommingPost = await upcommingPost.find();

  if (searchTerm) {
    UpcommingPost = UpcommingPost.filter((post) =>
      post.postName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  res.json(new ApiResponse(200, UpcommingPost));
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
  
    } = req.body;

    try {
      const post = await upcommingPost.findByIdAndUpdate(id, {
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
          postImage
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