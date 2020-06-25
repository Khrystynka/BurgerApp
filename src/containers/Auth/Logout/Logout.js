import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
class Logout extends Component {
  componentWillMount() {
    this.props.onSetAuthRedirectPath("/");
    console.log("LOGOUTCOMPONENT", this.props.authRedirectPath);

    this.props.onLogout();
  }
  render() {
    console.log("render section of logout", this.props.authRedirectPath);

    return <Redirect to={this.props.authRedirectPath} />;
  }
}
const mapStateToProps = (state, action) => {
  return {
    authRedirectPath: state.auth.authRedirectPath,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirect(path)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
