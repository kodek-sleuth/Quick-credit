/* eslint-disable brace-style */
/* eslint-disable max-len */
/* eslint-disable comma-dangle */
/* eslint-disable func-names */
/* eslint-disable object-shorthand */
/* eslint-disable space-infix-ops */
/* eslint-disable indent */


// Middleware that enables fileUploads
const multer = require('multer');

// .diskStorage Func enables us set filename and determine destination, callback to null means they was no error so we can set the file...
const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },

    destination: function (req, file, cb) {
        cb(null, './uploads/');
    }
});

// Function To filter out filetypes as we only want jpegs/pngs
const fileFilter = (req, file, cb) => {
    if (file.mimetype==='image/png' || file.mimetype==='image/jpeg')
    {
        cb(null, true);
    }

    else
    {
        cb(null, false);
    }
};

exports.upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 0.1 }, fileFilter: fileFilter });
