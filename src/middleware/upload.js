import path from "path";
import multer from "multer";


// define our file storage
const storage = multer.diskStorage({
   destination: function (req, file, cb)  {
    cb(null, 'uploads/'); // Files saved in 'uploads/' directory
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)// Add timestamp to filename
  }
});

// File filter (allow images only)
const fileFilter = (req, file, cb) => {
 let allowedTypes = /jpeg|jpg|png|gif/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error(`Only images are allowed ${allowedTypes}`), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
  fileFilter: fileFilter
});



export default upload