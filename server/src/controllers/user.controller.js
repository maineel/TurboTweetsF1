import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Driver } from "../models/driver.model.js";
import { Constructor } from "../models/constructor.model.js";

const generatAccessAndRefreshTokens = async (user) => {
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  user.refreshToken = refreshToken;
  await user.save();
  return { accessToken, refreshToken };
};

const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password, fullName } = req.body;

  if (!userName || !email || !password || !fullName) {
    throw new ApiError(400, "All fields are required");
  }

  const userExists = await User.findOne({ $or: [{ email }, { userName }] });
  if (userExists) {
    throw new ApiError(400, "User with this email or username already exists");
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
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User with this email does not exist");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid credentials");
  }

  const { accessToken, refreshToken } = await generatAccessAndRefreshTokens(
    user
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: user,
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
        "User logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  const { user } = req.body;
  if (!user) {
    throw new ApiError(401, "User not found");
  }

  const fetchedUser = await User.findById(user._id);

  fetchedUser.refreshToken = "";
  await fetchedUser.save();
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully!!"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body?.refreshToken;
  if (!incomingRefreshToken) {
    throw new ApiError(401, "No refresh token found");
  }

  try {
    const decodedRefreshToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const user = await User.findById(decodedRefreshToken?._id);
    if (!user) {
      throw new ApiError(401, "User not found");
    }

    if (user.refreshToken !== incomingRefreshToken) {
      throw new ApiError(401, "Invalid refresh token");
    }

    const { accessToken, refreshToken } = await generatAccessAndRefreshTokens(
      user
    );
    const options = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            accessToken: accessToken,
            refreshToken: refreshToken,
          },
          "Access token refreshed successfully"
        )
      );
  } catch (error) {
    throw new ApiError(401, error.message || "Unauthorized");
  }
});

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findOne(req.userName).select(
    "-password -refreshToken"
  );
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, user, "User details fetched successfully"));
});

const driversInBudget = async (drivers) => {
  const totalBudget = drivers.reduce(
    async (total, driver) =>
      total + (await Driver.findByID(driver).driverPrice),
    0
  );
  return totalBudget > 100;
};

const constructorsInBudget = async (constructors) => {
  const totalBudget = constructors.reduce(
    async (total, constructor) =>
      total + (await Constructor.findByID(constructor).constructorPrice),
    0
  );
  return totalBudget > 50;
};

const createTeam = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiError(401, "User not found");
  }
  const { drivers, constructors, raceId } = req.body;
  if (!raceId) {
    throw new ApiError(400, "Race Id is required");
  }
  if (!user.teams.find((team) => team.raceId === raceId)) {
    throw new ApiError(300, "User already has a team for the race");
  }
  if (!drivers || drivers.length !== 5) {
    throw new ApiError(400, "5 drivers are required");
  }
  if (!constructors || constructors.length !== 2) {
    throw new ApiError(400, "2 constructors are required");
  }
  if (driversInBudget(drivers)) {
    throw new ApiError(400, "Drivers are not in budget");
  }
  if (constructorsInBudget(constructors)) {
    throw new ApiError(400, "Constructors are not in budget");
  }
  const team = {
    raceId,
    drivers,
    constructors,
  };

  const currentTeams = await User.findById(user._id).select("teams");
  currentTeams.push(team);
  user.teams = currentTeams;
  await user.save();

  return res
    .status(201)
    .json(new ApiResponse(200, team, "Team created successfully"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getUser,
  createTeam,
};
