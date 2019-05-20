/* eslint-disable max-len */
/* eslint-disable func-names */
// Middleware that enables fileUploads

import multer from 'multer';

// .diskStorage Func(Takes in Functions) enables us set filename and determine destination, callback to null means they was no error so we can set the file...
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },

  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
});

// Function To filter out filetypes as we only want jpegs/pngs
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

exports.upload = multer({ storage, limits: { fileSize: 1024 * 1024 * 0.1 }, fileFilter });
