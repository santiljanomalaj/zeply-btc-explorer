import MyEnvConfig from 'configs/MyEnvConfig';
import ZeplyLogger from './ZeplyLogger';

const GenS3Link = (path) => {
  try {
    return `https://${MyEnvConfig.aws.s3Bucket}.s3.${MyEnvConfig.aws.region}.amazonaws.com/${path}`;
  } catch (e) {
    ZeplyLogger(e);
    return 'https://via.placeholder.com/518';
  }
};

export default GenS3Link;
