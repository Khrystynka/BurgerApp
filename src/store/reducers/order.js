import * as actionTypes from "../actions/actionTypes";
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 2,
  meat: 6,
  bacon: 1.75,
  tomato: 2,
};

const initialState = {
  ingredients: {
    salad: 0,
    cheese: 0,
    meat: 1,
    bacon: 0,
    tomato: 0,
  },
  price: 4,
};
const reducer = (state = initialState, action) => {
  console.log("reducer state", state);
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        price: state.price + INGREDIENT_PRICES[action.ingredientName],
      };
    }
    case actionTypes.REMOVE_INGREDIENT: {
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        price: state.price - INGREDIENT_PRICES[action.ingredientName],
      };
    }
    default:
      return state;
  }
};

export default reducer;
