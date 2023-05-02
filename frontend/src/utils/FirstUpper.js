import ZeplyLogger from './ZeplyLogger';

export const FirstUpper = (word) => {
  try {
    return word.charAt(0).toUpperCase() + word.slice(1);
  } catch (e) {
    ZeplyLogger(e);
    return '';
  }
};
