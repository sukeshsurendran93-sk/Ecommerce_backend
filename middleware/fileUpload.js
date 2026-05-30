import multer from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";

const UPLOAD_DIR = process.env.UPLOAD_DIR || "uploads/";
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
];

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    crypto.randomBytes(16, (err, raw) => {
      if (err) return cb(err);

      const uniqueSuffix = raw.toString("hex");
      const ext = path.extname(file.originalname).toLowerCase();
      cb(null, `${Date.now()}-${uniqueSuffix}${ext}`);
    });
  },
});

const fileFilter = (req, file, cb) => {
  if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    const error = new multer.MulterError("LIMIT_UNEXPECTED_FILE");
    error.message = "Only image files (JPEG, PNG, GIF, WEBP) are allowed.";
    cb(error, false);
  }
};

const fileUpload = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: 1,
  },
  fileFilter,
});

export default fileUpload;
