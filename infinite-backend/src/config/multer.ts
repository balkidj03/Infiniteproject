import multer from "multer";

// Multer configuration for handling file uploads
const storage = multer.memoryStorage();
export const upload = multer({ storage: storage });

// Initialize Multer for handling file uploads
const localStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "media/profile/"); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  },
});
export const localUpload = multer({ storage: localStorage });
