import ZeplyLogger from './ZeplyLogger';

const AddZeroPrefix = (param) => {
  try {
    if (Number(param) < 10) {
      return `0${param}`;
    } else {
      return `${param}`;
    }
  } catch (e) {
    ZeplyLogger(e);
    return '';
  }
};

export default AddZeroPrefix;
