const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config();

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: process.env.AWS_REGION
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  const uploadType = req.headers.uploadtype;
  console.log('req.headers', req.headers);
  console.log('uploadType', uploadType);

  let allowedMimeTypes = [];

  if (uploadType === 'profilePicture') {
    allowedMimeTypes = ['image/jpeg', 'image/png'];
  } else {
    return cb(new Error('Invalid upload type!'), false);
  }

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type for this upload type!'), false);
  }
};

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_BUCKET_NAME,
    key: function (req, file, cb) {
      const folder = req.headers.folder;
      console.log('folder', folder);
      const uniqueName = Date.now() + '-' + file.originalname;
      const key = `${folder}/${uniqueName}`;
      req.file = key;
      cb(null, key);
    }
  }),
  fileFilter: fileFilter
});

const deleteFromS3 = (key, callback) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key
  };

  s3.deleteObject(params, (err, data) => {
    if (err) {
      console.error('Error deleting object:', err);
      callback(err);
    } else {
      console.log('Object deleted successfully');
      callback(null, data);
    }
  });
};

module.exports = { upload: upload.single('image'), deleteFromS3 };
