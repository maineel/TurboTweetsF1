// const raceSchema = new Schema({
//     raceNumber:{
//         type: Number,
//         required: true,
//         unique: true,
//     },
//     userName:[{
//         type: Schema.Types.ObjectId,
//         ref: 'User'
//     }],
//     tournamentId:{
//         type: Schema.Types.ObjectId,
//         ref: 'Tournament'
//     },
//     points:{
//         type: Number,
//         default: 0
//     }
// },{timestamps: true});

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
        "Driver": {
            type: Schema.Types.ObjectId,
            ref: "Driver"
        },
        "Constructor": {
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