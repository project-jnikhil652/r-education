const S3 = require('aws-sdk/clients/s3');
const fs = require('fs');
const s3 = new S3({
    region: process.env.AWS_BUCKET_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
});

module.exports.uploads3 = (file, name, type) => {
    const filestream = fs.createReadStream(file);
    return s3.upload({
        Bucket: process.env.AWS_BUCKET_NAME,
        Body: filestream,
        Key: name,
        ContentEncoding: 'base64',
        ContentDisposition: 'inline',
        ContentType: type,
    }).promise();
}
module.exports.downloadFromS3 = async(attachmentId) => {
    return s3.getObject({ Bucket: process.env.AWS_BUCKET_NAME, Key: attachmentId }).promise()
}
module.exports.deleteFromS3 = async(attachmentId) => {
    return s3.deleteObject({ Bucket: process.env.AWS_BUCKET_NAME, Key: attachmentId }).promise()
}