import mongoose, {Schema} from "mongoose";
const tournamentSchema = new Schema({
    tournamentName:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    creatorId:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    initialBet:{
        type: Number,
        required: true,
    },
    raceId:{
        type: Schema.Types.ObjectId,
        ref: 'Race',
    },
    participants:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
},{timestamps: true});


export const Tournament = mongoose.model('Tournament', tournamentSchema);