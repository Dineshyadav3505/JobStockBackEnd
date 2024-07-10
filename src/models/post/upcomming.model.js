import mongoose, {Schema} from 'mongoose';

const upcommingSchema = new Schema({
    postName:{
        type: String,
        required: true
    },
    lastDate: String,
    yyyymmddDate: String,
    beginDate: String,
    iconImage: [{
        type: String,
        required: true
    }],

},{
    timestamps: true,
});

const upcommingPost = mongoose.model('upcommingPost', upcommingSchema);

export { upcommingPost };
