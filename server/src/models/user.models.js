import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    userName:{
        type:String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email:{
        type:String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,  
    },
    password:{
        type: String,
        required: [true, 'Password is required']
    },
    refreshToken:{
       type:String 
    },
    wallet:{
        type: Number,
        default: 0
    },
    teams:[
        {
            "Drivers": [],
            "Constructors": []
        }
    ]
}, {timestamps: true});

export const User = mongoose.model('User', userSchema);