import { asyncHandler } from "../utils/asyncHandler.js";
import { Constructor } from "../models/constructor.model.js";
import axios from "axios";

const constructorDetails = asyncHandler(async (req, res) => {
  const constructor = await Constructor.find().select(
    "-_id -__v -createdAt -updatedAt -constructorPrice -constructorDrivers -constructorPoints"
  );

  return res.status(200).json(constructor);
});

export { constructorDetails };
