import { asyncHandler } from "../utils/asyncHandler.js";
import { Driver } from "../models/driver.model.js";

const driverDetails = asyncHandler(async (req, res) => {
  const driver = await Driver.find().select(
    "-_id -__v -createdAt -updatedAt -driverPrice"
  );
  return res.status(200).json(driver);
});

export { driverDetails };
