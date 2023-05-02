import { MENU_OPEN, SET_MENU, SET_FIT_FOR } from 'actions/types';

const initialState = {
  isOpen: [], // * for active default menu
  opened: false,
  fitFor: null
};

const customizationReducer = (state = initialState, action) => {
  let id;
  switch (action.type) {
    case MENU_OPEN:
      id = action.id;
      return {
        ...state,
        isOpen: [id]
      };
    case SET_MENU:
      return {
        ...state,
        opened: false
      };
    case SET_FIT_FOR:
      return {
        ...state,
        fitFor: action.payload
      };
    default:
      return state;
  }
};

export default customizationReducer;
