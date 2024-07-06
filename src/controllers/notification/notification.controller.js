import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import  {Notification } from "../../models/notification/notification.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const option = {
  httpOnly: true,
  secure: true
};

const createNotification = asyncHandler(async (req, res) => {
    const user = req.user;

    if (user.role !== "Admin") {
        throw new ApiError(401, "Unauthorized");
    }

    const { title, message } = req.body;
    
    console.log(title, message)

    if ([title, message].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }
    
    const notification = await Notification.create({
        title,
        message,
    });
    
    if (!notification) {
        throw new ApiError(500, "Notification not created");
    }
    
    return res
        .status(201)
        .json(
        new ApiResponse(201,
            {
            notification,
            },
            "Notification created successfully"
        )
        );
    }
);  

const getNotifications = asyncHandler(async (req, res) => {
    const notifications = await Notification.find();
    
    return res
        .status(200)
        .json(
        new ApiResponse(200, {
            notifications,
        })
        );
    }
);

const deleteNotification = asyncHandler(async (req, res) => {
    const user = req.user;

    if (user.role !== "Admin") {
        throw new ApiError(401, "Unauthorized");
    }

    const { notificationId } = req.params;
    
    const notification = await Notification.findByIdAndDelete(notificationId);
    
    if (!notification) {
        throw new ApiError(404, "Notification not found");
    }
    
    return res
        .status(200)
        .json(
        new ApiResponse(200, {
            notification,
        })
        );
    }
);

const updateNotification = asyncHandler(async (req, res) => {
    const user = req.user;

    if (user.role !== "Admin") {
        throw new ApiError(401, "Unauthorized");
    }
    
    const { notificationId } = req.params;
    const { title, message } = req.body;
    
    const notification =    await Notification.findByIdAndUpdate(
        notificationId,
        {
        title,
        message,
        },
        { new: true }
    );

    if (!notification) {
        throw new ApiError(404, "Notification not found");
    }

    return res
        .status(200)
        .json(
        new ApiResponse(200, {
            notification,
        })
        );
    }
);

export { createNotification, getNotifications, deleteNotification, updateNotification};
