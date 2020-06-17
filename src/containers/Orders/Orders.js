import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
class Orders extends Component {
  componentDidMount = () => {
    // // axios
    // //   .get("/orders.json")
    // //   .then((res) => {
    // //     const fetchedOrders = [];
    // //     for (let key in res.data) {
    // //       fetchedOrders.push({
    // //         ...res.data[key],
    // //         id: key,
    // //       });
    // //     }
    // //     console.log(fetchedOrders);
    // //     this.setState({ loading: false, orders: fetchedOrders });
    // //   })
    //   .catch((err) => {
    //     this.setState({ loading: false });
    //   });
    this.props.onFetchOrders(this.props.token);
  };
  render() {
    let orders = <Spinner />;
    if (!this.props.loadingOrders) {
      if (this.props.error) {
        orders = <p style={{ margin: "20px" }}>Sorry! Error Loading orders!</p>;
      } else {
        orders = (
          <div>
            {this.props.orders.map((order) => (
              <Order
                key={order.id}
                ingredients={order.ingredients}
                price={order.price}
              />
            ))}
          </div>
        );
      }
    }
    return orders;
  }
}
const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loadingOrders: state.order.loading,
    error: state.order.error,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token) => dispatch(actionTypes.fetchOrders(token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
