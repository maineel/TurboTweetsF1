import mongoose, {Schema} from "mongoose";

const constructorSchema = new Schema({
    constructorName:{
        type: String,
        required: true,
        unique: true,
    },
    constructorNationality:{
        type: String,
        required: true,
    },
    constructorDrivers:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Driver',
        }
    ],
    constructorPoints:[{
        type: Number,
        default: 0,
    }],
    constructorPrice:{
        type: Number,
        default: 0,
    },
}, {timestamps: true});

export const Constructor = mongoose.model('Constructor', constructorSchema);