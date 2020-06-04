import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CkeckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
// import checkoutSummary from '../../components/Order/CheckoutSummary/CkeckoutSummary'
class Checkout extends Component {
  state = {
    ingredients: {},
    price: 0,
  };
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  componentDidMount = () => {
    let fetchedIngredients = {};
    let price = 0;
    const query = new URLSearchParams(this.props.location.search);
    for (let param of query.entries()) {
      console.log(param);
      if (param[0] === "price") {
        price = param[1];
      } else {
        fetchedIngredients[param[0]] = +param[1];
      }
    }
    console.log("fetchedIngredients", fetchedIngredients);
    this.setState({
      ingredients: { ...fetchedIngredients },
      totalPrice: price,
    });
  };

  render() {
    console.log("Updated state  ", this.state.ingredients);
    console.log("path", this.props.match.url + "/contact-data");

    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={this.props.match.url + "/contact-data"}
          render={(props) => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.totalPrice}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}
export default Checkout;
