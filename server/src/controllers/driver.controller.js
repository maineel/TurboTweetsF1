import { asyncHandler } from "../utils/asyncHandler.js";
import { Driver } from "../models/driver.model.js";
import axios from "axios";

const driverDetails = asyncHandler(async (req, res) => {
  // const currentDetails = await axios.get(
  //   "http://localhost:8000/api/v1/admin/getDriverStandings"
  // );
  // // console.log(currentDetails);

  const driver = await Driver.find().select(
    "-_id -__v -createdAt -updatedAt -driverPrice"
  );

  return res.status(200).json(driver);
});

export { driverDetails };
