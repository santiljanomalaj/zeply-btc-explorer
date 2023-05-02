/**
 * @author Santiljano Malaj
 * @email ictirana18@gmail.com
 * @company zeply.com
 */
const removeInArray = (arr, val) => {
  try {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === val) {
        arr.splice(i, 1);
        break;
      }
    }
  } catch (e) {
    console.log('UTILS_removeInArray_ERROR:', e);
  }
};

export { removeInArray };
