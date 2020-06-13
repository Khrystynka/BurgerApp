import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";
// sync action creators
export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  };
};
export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

// async action creators
export const purchaseBurger = (orderData) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios
      .post("/orders.json", orderData)
      // .post("/orders.json", order)
      .then((response) => {
        console.log("find id here", response.data);
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
        // this.props.history.push("/");
      })
      .catch((error) => {
        dispatch(purchaseBurgerFail(error));
      });
  };
};

export const purshaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};
