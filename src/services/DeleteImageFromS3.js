const AWS = require('aws-sdk');

class DeleteImageFromS3 {
  #folder = '';

  #s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: {
      bucketName: process.env.AWS_BUCKET_NAME,
    },
  });

  /**
   * path configs
   * @param {("PRODUCTS"|"USERS"|null)} folder folder name
   */
  constructor(folder) {
    this.#folder = folder;

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
   * delete object
   * @param {string} objectName name of object to delete
   * @returns {Promise<boolean>}
   */
  async execute(objectName) {
    const key = this.#folder ? `${this.#folder}/${objectName}` : objectName;
    try {
      const result = await this.#s3
        .deleteObject({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: key,
        })
        .promise();
      return true;
    } catch (err) {
      return false;
    }
  }
}

module.exports = { DeleteImageFromS3 };
