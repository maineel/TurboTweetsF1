import { User } from "./user.models";

const tournamentSchema = new Schema({
    tournamentName:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    initialBet:{
        type: Number,
        required: true,
    }
},{timestamps: true});


export const Race = mongoose.model('Race', raceSchema);