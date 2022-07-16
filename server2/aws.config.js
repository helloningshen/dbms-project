import aws from 'aws-sdk'

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAcessKey: process.env.AWS_SECRET_ACCESS_KEY
})



const s3 = new aws.S3()


const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: 'public-read',
    Body: buffer,
    Bucket: process.env.S3_BUCKET,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`
  }


  return s3.upload(params).promise();
}


const downloadFile = (options) => {
  return s3.getObject(options).createReadStream();
}

export { uploadFile, downloadFile } 