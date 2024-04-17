import multer from "multer";

export const multerUpload = {
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
};

export {multerUpload}; 