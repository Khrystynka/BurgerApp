import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CkeckoutSummary";
// import checkoutSummary from '../../components/Order/CheckoutSummary/CkeckoutSummary'
class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 2,
      tomato: 1,
      cheese: 1,
      bacon: 3,
    },
  };
  render() {
    return (
      <div>
        <CheckoutSummary ingredients={this.state.ingredients} />
      </div>
    );
  }
}
export default Checkout;
