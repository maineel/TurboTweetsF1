import multer from "multer";
import path from "path";
import fs from "fs";

const tempDirectory = './public/temp';

// Ensure the directory exists
fs.mkdirSync(path.resolve(tempDirectory), { recursive: true });


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
export const upload = multer({ 
    storage: storage 
})