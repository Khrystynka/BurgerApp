import * as actionTypes from "../actions/actionTypes";
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 2,
  meat: 6,
  bacon: 1.75,
  tomato: 2,
};

const initialState = {
  ingredients: null,
  price: 4,
  error: false,
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
    case actionTypes.SET_INGREDIENTS: {
      return {
        ...state,
        ingredients: action.ingredients,
        error: false,
        price: 4,
      };
    }
    case actionTypes.FETCH_INGREDIENTS_FAILED: {
      return {
        ...state,
        error: true,
      };
    }

    default:
      return state;
  }
};

export default reducer;
