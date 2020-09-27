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
export const purchaseBurger = (orderData, token) => {
  console.log("order data", orderData);
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios
      .post("/orders.json?auth=" + token, orderData)
      // .post("/orders.json", order)
      .then((response) => {
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

export const fetchDataStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchDataSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};

export const fetchDataFailed = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error,
  };
};
//async action creator using redux-thunk
export const fetchOrders = (token, userId) => {
  return (dispatch) => {
    dispatch(fetchDataStart());
    let queryparams =
      "?auth=" + token + '&orderBy="userID"&equalTo="' + userId + '"';
    axios
      //   .get("/orders.json")
      .get("/orders.json" + queryparams)

      .then((res) => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key,
          });
        }
        dispatch(fetchDataSuccess(fetchedOrders));
      })
      .catch((err) => {
        dispatch(fetchDataFailed(err));
      });
  };
};
