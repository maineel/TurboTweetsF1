import mongoose, {Schema} from "mongoose";

const driverSchema = new Schema({
    driverNumber:{
        type: String,
        required: true,
        unique: true,
    },
    driverName:{
        type: String,
        required: true,
        unique: true,
    },
    driverNationality:{
        type: String,
        required: true,
    },
    driverTeam:{
        type: Schema.Types.ObjectId,
        ref: 'Constructor',
    },
    driverPoints:[{
        type: Number,
        default: 0,
    }],
    driverPrice:{
        type: Number,
        default: 0,
    },
}, {timestamps: true});



export const Driver = mongoose.model('Driver', driverSchema);