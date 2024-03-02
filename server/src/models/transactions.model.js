import mongoose, {Schema} from "mongoose";

const transactionSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    raceId:{
        type: Schema.Types.ObjectId,
        ref: 'Race',
        required: true,
    },
    tournamentId:{
        type: Schema.Types.ObjectId,
        ref: 'Tournament',
        required: true,
    },
    amountWon:{
        type: Number,
        required: true,
    },
    amountBet:{
        type: Number,
        required: true,
    },
    position:{
        type: Number,
        required: true,
    },
}, {timestamps: true});

export const Transaction = mongoose.model('Transaction', transactionSchema);