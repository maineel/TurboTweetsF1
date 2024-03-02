const raceSchema = new Schema({
    raceNumber:{
        type: Number,
        required: true,
        unique: true,
    },
    userName:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    tournamentId:{
        type: Schema.Types.ObjectId,
        ref: 'Tournament'
    },
    points:{
        type: Number,
        default: 0
    }
},{timestamps: true});


export const Race = mongoose.model('Race', raceSchema);