import mongoose,{Schema} from 'mongoose';

const statejobSchema = new Schema({
    postName:{
        type: String,
        required: true
    },
    postDescription:{
        type: String,
        required: true
    },
    lastDate: String,
    beginDate: String,
    yyyymmddDate: String,
    date1 : String,
    date2 : String,
    date3 : String,
    date4 : String,
    date5 : String,
    date6 : String,
    date7 : String,
    date8 : String,
    date9 : String,
    date10: String,
    Fee1  : String,
    Fee2  : String,
    Fee3  : String,
    Fee4  : String,
    Fee5  : String,
    Fee6  : String,
    Fee7  : String,
    Fee8  : String,
    Fee9  : String,
    Fee10 : String,
    age1  : String,
    age2  : String,
    age3  : String,
    age4  : String,
    age5  : String,
    age6  : String,
    age7  : String,
    age8  : String,
    age9  : String,
    age10 : String,
    totalPost: String,
    iconImage: [{
        type: String,
        required: true
    }],
    postImage: [{
        type: String,
        required: true
    }],
    applyLink: {
        type: String,
        required: true
    },
    postlink:{
        type: String,
        required: true
    }

},{timestamps:true});

const stateJob = mongoose.model('stateJob',statejobSchema);
export {stateJob};