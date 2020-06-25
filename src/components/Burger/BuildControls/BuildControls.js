import React from "react";
import classes from "./BuildControls.css";

import BuildControl from "./BuildControl/BuildControl";
const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
  { label: "Tomato", type: "tomato" },
];
const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price: <strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map((layer) => {
        return (
          <BuildControl
            key={layer.label}
            label={layer.label}
            added={() => props.ingredientAdded(layer.type)}
            deleted={() => props.ingredientDeleted(layer.type)}
            disabled={props.disabled[layer.type]}
          ></BuildControl>
        );
      })}
      <div className={classes.AddRemBtn}>
        <button onClick={props.addAll}>ADD ALL!</button>
        <button onClick={props.removeAll}>REMOVE ALL!</button>
      </div>

      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}
      >
        {props.isAuth ? "ORDER NOW" : "LOGIN TO PURCHASE"}
      </button>
    </div>
  );
};

export default buildControls;
