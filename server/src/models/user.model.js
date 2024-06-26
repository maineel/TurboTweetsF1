import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    userName:{
        type:String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    fullName:{
        type: String,
        required: true,
        trim: true,
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
            "raceId": {
                type: Schema.Types.ObjectId,
                ref: "Race"
            },
            "Drivers": [],
            "Constructors": []
        }
    ],
    avatar:{
        type: String,
        default: "https://res.cloudinary.com/dcthtlmm0/image/upload/v1717084604/kr9o4wuzt8l82j3avuwv.png"
    }
}, {timestamps: true});

userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            userName: this.userName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: process.env.ACCESS_TOKEN_EXPIRY}
    );
};

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            userName: this.userName,
            password: this.password,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: process.env.REFRESH_TOKEN_EXPIRY}
    );
};

export const User = mongoose.model('User', userSchema);