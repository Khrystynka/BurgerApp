import React from "react";
import classes from "./Order.css";
const order = (props) => {
  console.log(props.ingredients);
  const ingredients = [];
  let ingredientsOutput = "";
  for (let item in props.ingredients) {
    ingredients.push({
      name: item,
      amount: props.ingredients[item],
    });
  }
  ingredientsOutput = ingredients.map((ig) => {
    return (
      <span
        key={ig.name}
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          border: "1px solid #ccc",
          padding: " 5px",
        }}
      >
        {ig.name}: {ig.amount}
      </span>
    );
  });
  console.log(ingredientsOutput);
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientsOutput}</p>
      <p>
        Price: <strong>USD {props.price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
