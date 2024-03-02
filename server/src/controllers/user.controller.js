import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { User } from '../models/user.model.js';

const generatAccessAndRefreshTokens = async(user) => {
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save();
    return {accessToken, refreshToken};
};

const registerUser = asyncHandler(async (req, res) => {
    const { userName, email, password, fullName } = req.body;

    if(!userName || !email || !password || !fullName){
        throw new ApiError(400, 'All fields are required');
    }

    const userExists = await User.findOne({$or: [{email}, {userName}]});
    if(userExists){
        throw new ApiError(400, 'User with this email already exists');
    }

    const user = await User.create({
        userName,
        email,
        password,
        fullName,
        wallet: 0,
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        throw new ApiError(400, 'All fields are required');
    }

    const user = await User.findOne({email});
    if(!user){
        throw new ApiError(404, 'User with this email does not exist');
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if(!isPasswordCorrect){
        throw new ApiError(401, 'Invalid credentials');
    }

    const { accessToken, refreshToken } = await generatAccessAndRefreshTokens(user);
    const options = {
        httpOnly: true,
        secure: true,
    };
    return res.status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: user,
                accessToken: accessToken,
                refreshToken: refreshToken
            }, 
            "User logged in successfully"
        )
    );

});

const logoutUser = asyncHandler(async (req, res) => {
    const user = req.user;
    console.log(req);
    if(!user){
        throw new ApiError(401, "User not found");
    }

    user.refreshToken = "";
    await user.save();
    const options = {
        httpOnly: true,
        secure: true,
    };
    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(
            200, 
            {},
            "User logged out successfully!!"
        )
    )
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken;
    if(!incomingRefreshToken){
        throw new ApiError(401, "No refresh token found");
    }

    try {
        const decodedRefreshToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decodedRefreshToken?._id);
        if(!user){
            throw new ApiError(401, "User not found");
        }
    
        if(user.refreshToken !== incomingRefreshToken){
            throw new ApiError(401, "Invalid refresh token");
        }
    
        const { accessToken, refreshToken } = await generatAccessAndRefreshTokens(user);
        const options = {
            httpOnly: true,
            secure: true,
        };
        return res.status(200)
        .cookie('accessToken', accessToken, options)
        .cookie('refreshToken', refreshToken, options)
        .json(
            new ApiResponse(
                200, 
                {
                    accessToken: accessToken,
                    refreshToken: refreshToken
                }, 
                "Access token refreshed successfully"
            )
        );
    } catch (error) {
        throw new ApiError(401, error.message || "Unauthorized");
    }

});

const getUser = asyncHandler(async (req, res) => {

});

export { registerUser, loginUser, logoutUser, refreshAccessToken, getUser };
