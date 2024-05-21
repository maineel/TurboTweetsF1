import mongoose, {Schema} from "mongoose";

const raceSchema = new Schema({
    raceName:{
        type: String,
        required: true,
        unique: true,
    },
    raceNumber:{
        type: Number,
        required: true,
        unique: true,
    },
    raceResults:[{
        "driverId": {
            type: Schema.Types.ObjectId,
            ref: "Driver"
        },
        "constructorId": {
            type: Schema.Types.ObjectId,
            ref: "Constructor"
        },
        "position": {
            type: Number,
            required: true
        },
        "points": {
            type: Number,
            required: true
        }
    }],
    date:{
        type: Date,
        required: true,
    },
},{timestamps: true});


export const Race = mongoose.model('Race', raceSchema);