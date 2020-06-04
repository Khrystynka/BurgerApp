import * as actionTypes from "./actions";

const initialState = {
  ingredients: null,
  price: 4,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: {
      return state;
    }
    case actionTypes.REMOVE_INGREDIENT: {
      return state;
    }
  }
  return state;
};

export default reducer;
