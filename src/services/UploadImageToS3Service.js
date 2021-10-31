const { v4 } = require('uuid');
const AWS = require('aws-sdk');

class UploadImageToS3Service {
  bucketName = process.env.AWS_BUCKET_NAME;
  #s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: {
      bucketName: this.bucketName,
    },
  });

  constructor() {
    const region = process.env.AWS_BUCKET_REGION;
    const accessId = process.env.AWS_ACCESS_ID;
    const secretId = process.env.AWS_SECRET_ID;

    this.#s3.config.update({
      region,
      credentials: new AWS.Credentials({
        accessKeyId: accessId,
        secretAccessKey: secretId,
      }),
    });
  }

  /**
   * upload image
   * @param {("user"|"product")} type type of upload
   * @param {String} file base64 encoded image
   */
  async upload(type, file) {
    const name = String(v4()) + '.png';

    let path = null;

    switch (type) {
      case 'user':
        path = 'USERS/';
        break;
      case 'product':
        path = 'PRODUCTS/';
        break;
      default:
        break;
    }

    const params = {
      Bucket: this.bucketName,
      Key: path + name,
      Body: Buffer.from(file, "base64"),
      ContentEncoding: 'base64',
      ContentType: 'image/png',
    };

    try {
      const { Location } = await this.#s3.upload(params, params).promise();
      return Location;
    } catch (err) {
      return new Error(err.message);
    }
  }
}

module.exports = { UploadImageToS3Service };
