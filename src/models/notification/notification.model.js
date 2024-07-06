import mongoose, {Schema} from 'mongoose';

const NotificationSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
    },
    { timestamps: true }
);

export const Notification = mongoose.model('Notification', NotificationSchema);
