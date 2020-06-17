import React from "react";
import classes from "./Input.css";

const input = (props) => {
  let inputElement = null;
  const elementClasses = [classes.InputElement];
  if (props.touched && props.invalid && props.shouldValidate) {
    elementClasses.push(classes.Invalid);
  }
  switch (props.elementType) {
    case "select":
      inputElement = (
        <select
          className={elementClasses.join(" ")}
          onChange={props.changed}
          value={props.value}
        >
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    case "input":
      inputElement = (
        <input
          className={elementClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={elementClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    default:
      inputElement = (
        <input
          className={elementClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};
export default input;
