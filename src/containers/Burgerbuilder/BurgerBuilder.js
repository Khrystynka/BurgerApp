import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner.js";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 2,
  meat: 6,
  bacon: 1.75,
  tomato: 2,
};

class BurgerBuilder extends Component {
  // constructor(props){
  //     super(props);
  // }
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };
  componentDidMount() {
    // axios
    //   .get("https://react-burger-dc4f9.firebaseio.com/ingredients.json")
    //   .then((response) => {
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch((error) => {
    //     this.setState({ error: true });
    //   });
  }
  updatePurchaseState(ingredients) {
    const totalCount = Object.keys(ingredients)
      .map((key) => {
        return ingredients[key];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: totalCount > 0 });
  }
  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients,
    });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount === 0) {
      return null;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceSubtraction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceSubtraction;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients,
    });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    const queryParams = [];
    for (let entry in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(entry) +
          "=" +
          encodeURIComponent(this.state.ingredients[entry])
      );
    }
    queryParams.push("price=" + this.state.totalPrice);
    const queryString = queryParams.join("&");
    this.setState({ loading: true });
    console.log(this.props.history);
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
  };
  addAllHandler = () => {
    const newIngredients = {
      ...this.state.ingredients,
    };
    const newPrice =
      this.state.totalPrice +
      Object.values(INGREDIENT_PRICES).reduce((total, el) => total + el, 0);
    Object.keys(newIngredients).forEach((el) => {
      newIngredients[el] = newIngredients[el] + 1;
    });
    this.setState({
      totalPrice: newPrice,
      ingredients: newIngredients,
    });
    this.updatePurchaseState(newIngredients);
  };

  removeAllHandler = () => {
    const newIngredients = {
      ...this.state.ingredients,
    };
    const newPrice = 4;
    Object.keys(newIngredients).forEach((el) => {
      newIngredients[el] = 0;
    });
    this.setState({
      totalPrice: newPrice,
      ingredients: newIngredients,
    });
    this.updatePurchaseState(newIngredients);
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    // let burger = <Spinner></Spinner>;
    let burger = this.state.error ? (
      <p>Ingridients cant be loaded</p>
    ) : (
      <Spinner></Spinner>
    );
    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientDeleted={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
            addAll={this.addAllHandler}
            removeAll={this.removeAllHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          cost={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);
// export default BurgerBuilder;
