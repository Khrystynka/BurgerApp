import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/Burgerbuilder/BurgerBuilder.js";
// /Users/khrystyna/React_projects/burger-app/src/containers/Burgerbuilder/BurgerBuilder.js
class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <BurgerBuilder />
        </Layout>
      </div>
    );
  }
}

export default App;
