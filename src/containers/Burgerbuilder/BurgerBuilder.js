import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner.js";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as burgerBuilderActions from "../../store/actions/index";

class BurgerBuilder extends Component {
  // constructor(props){
  //     super(props);
  // }
  state = {
    // ingredients: null,
    // purchasable: false,
    purchasing: false,
  };
  componentDidMount() {
    console.log("im mounting");
    this.props.onInitIngredients();
    // axios
    //   .get("https://react-burger-dc4f9.firebaseio.com/ingredients.json")
    //   .then((response) => {
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch((error) => {
    //     this.setState({ error: true });
    //   });
  }
  isPurchasable(ingredients) {
    const totalCount = Object.keys(ingredients)
      .map((key) => {
        return ingredients[key];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return totalCount > 0;
  }
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");
    // const queryParams = [];
    // for (let entry in this.state.ingredients) {
    //   queryParams.push(
    //     encodeURIComponent(entry) +
    //       "=" +
    //       encodeURIComponent(this.state.ingredients[entry])
    //   );
    // }
    // queryParams.push("price=" + this.state.totalPrice);
    // const queryString = queryParams.join("&");
    // this.setState({ loading: true });
    // console.log(this.props.history);
    // this.props.history.push({
    //   pathname: "/checkout",
    //   search: "?" + queryString,
    // });
  };
  // addAllHandler = () => {
  //   const newIngredients = {
  //     ...this.state.ingredients,
  //   };
  //   const newPrice =
  //     this.state.totalPrice +
  //     Object.values(INGREDIENT_PRICES).reduce((total, el) => total + el, 0);
  //   Object.keys(newIngredients).forEach((el) => {
  //     newIngredients[el] = newIngredients[el] + 1;
  //   });
  //   this.setState({
  //     totalPrice: newPrice,
  //     ingredients: newIngredients,
  //   });
  //   this.updatePurchaseState(newIngredients);
  // };

  // removeAllHandler = () => {
  //   const newIngredients = {
  //     ...this.state.ingredients,
  //   };
  //   const newPrice = 4;
  //   Object.keys(newIngredients).forEach((el) => {
  //     newIngredients[el] = 0;
  //   });
  //   this.setState({
  //     totalPrice: newPrice,
  //     ingredients: newIngredients,
  //   });
  //   this.updatePurchaseState(newIngredients);
  // };

  render() {
    const disabledInfo = {
      ...this.props.ings,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    // if (this.state.loading) {
    //   orderSummary = <Spinner />;
    // }
    // let burger = <Spinner></Spinner>;
    let burger = this.props.error ? (
      <p>Ingridients cant be loaded</p>
    ) : (
      <Spinner></Spinner>
    );
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientDeleted={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.isPurchasable(this.props.ings)}
            ordered={this.purchaseHandler}
            addAll={this.addAllHandler}
            removeAll={this.removeAllHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          cost={this.props.price}
        ></OrderSummary>
      );
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    price: state.price,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // onIngredientAdded: (ingredient) =>
    //   dispatch({
    //     type: actionTypes.ADD_INGREDIENT,
    //     ingredientName: ingredient,
    //   }),
    // onIngredientRemoved: (ingredient) =>
    //   dispatch({
    //     type: actionTypes.REMOVE_INGREDIENT,
    //     ingredientName: ingredient,
    //   }),
    onIngredientAdded: (ingredient) =>
      dispatch(burgerBuilderActions.addIngredient(ingredient)),
    onIngredientRemoved: (ingredient) =>
      dispatch(burgerBuilderActions.removeIngredient(ingredient)),
    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
// export default BurgerBuilder;
