import aws from 'aws-sdk';
import Config from './index';

const s3 = new aws.S3({
  accessKeyId: Config.S3_ACCESS_KEY,
  secretAccessKey: Config.S3_SECRET_ACCESS_KEY,
  region: Config.S3_REGION,
});

export default s3;
