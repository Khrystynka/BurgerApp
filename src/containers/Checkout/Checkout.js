import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CkeckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
// import checkoutSummary from '../../components/Order/CheckoutSummary/CkeckoutSummary'
class Checkout extends Component {
  // state = {
  //   ingredients: {},
  //   price: 0,
  // };
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  //  componentDidMount = () => {
  // let fetchedIngredients = {};
  // let price = 0;
  // const query = new URLSearchParams(this.props.location.search);
  // for (let param of query.entries()) {
  //   console.log(param);
  //   if (param[0] === "price") {
  //     price = param[1];
  //   } else {
  //     fetchedIngredients[param[0]] = +param[1];
  //   }
  // }
  // console.log("fetchedIngredients", fetchedIngredients);
  // this.setState({
  //   ingredients: { ...fetchedIngredients },
  //   totalPrice: price,
  // });
  // };

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ingredients) {
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ingredients}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
          />
          <Route
            path={this.props.match.url + "/contact-data"}
            // render={(props) => (
            //   <ContactData
            //     ingredients={this.props.ingredients}
            //     price={this.props.price}
            //     {...props}
            //   />
            // )}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}
const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
