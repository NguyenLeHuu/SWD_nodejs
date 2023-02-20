const AWS = require("aws-sdk");
const ImageService = require("../services/ImageService");

AWS.config.update({ region: "us-east-1" });
let s3 = new AWS.S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  return s3.getObject(downloadParams).createReadStream();
}

exports.getFileStream = getFileStream;

module.exports = {
  async index(req, res) {
    return res.status(200).json({
      status: 200,
      message: "Message",
      data: "data",
    });
  },
  async create({ files }, res) {
    let imageAddress = "";
    const uploadParams = {
      Bucket: "swd-upload-images",
      Key: files.file.name,
      Body: Buffer.from(files.file.data),
      ContentType: files.file.mimetype,
      ACL: "public-read",
    };

    s3.upload(uploadParams, function (err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Upload successful");
        imageAddress = data.Location.toString();
        ImageService.createImage(imageAddress);
      }
    });

    
    res.send("OK");
  },

  async delete(req, res) {
    try {
      return res.status(200).json({
        status: 200,
        message: "Message",
        data: "data",
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async update(req, res) {
    try {
      return res.status(200).json({
        status: 200,
        message: "Message",
        data: "data",
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },
};
