import multer from 'multer';

// Configuration options for multer, setting file size limit to 5 MB
const multerOptions = {
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
};

// Create multer instances for different upload strategies
const upload = multer(multerOptions);
const singleAvatar = upload.single('avatar');
const attachmentsMulter = upload.array('files', 5);

export { upload, singleAvatar, attachmentsMulter };
