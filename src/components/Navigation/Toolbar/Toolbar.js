import React from "react";
import classes from "./Toolbar.css";
import Logo from "../../Logo/Logo.js";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
const toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <DrawerToggle clicked={props.toggleHandler}></DrawerToggle>
      <div className={classes.Logo}>
        <Logo></Logo>
      </div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems isAuthenticated={props.isAuth} />
      </nav>
    </header>
  );
};
export default toolbar;
