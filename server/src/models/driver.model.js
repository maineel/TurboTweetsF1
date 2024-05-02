import mongoose, {Schema} from "mongoose";

const driverSchema = new Schema({
    driverNumber:{
        type: Number,
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
        type: String,
    },
    driverCode:{
        type: String,
        required: true,
        unique: true,
    },
    driverDOB:{
        type: Date,
        required: true,
    },
    driverPoints:[{
        type: Number,
        default: 0,
    }],
    totalPoints:{
        type: Number,
        default: 0,
    },
    driverPrice:{
        type: Number,
        default: 0,
    },
    headshot: {
        type: String,
    },
    position: {
        type: Number,
    }
}, {timestamps: true});

export const Driver = mongoose.model('Driver', driverSchema);