import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/Burgerbuilder/BurgerBuilder.js";
import Checkout from "./containers/Checkout/Checkout";
import { Switch, Route, withRouter } from "react-router-dom";
import Auth from "./containers/Auth/Auth";
import Orders from "./containers/Orders/Orders";
import Logout from "./containers/Auth/Logout/Logout";
// /Users/khrystyna/React_projects/burger-app/src/containers/Burgerbuilder/BurgerBuilder.js
import * as actions from "./store/actions/index";
import { connect } from "react-redux";
class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" exact component={Auth} />
        <Route path="/" component={BurgerBuilder} />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" exact component={Orders} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/" component={BurgerBuilder} />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};
//without withrouter Routing wouldnt work in the app because we wrap it with connect function
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
