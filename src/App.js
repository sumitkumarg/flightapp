import React, { useState, useEffect } from "react";
import "./App.css";
import { Switch, Route, Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, Table } from "reactstrap";
import Flight from "./Flight";
import Home from "./Home";
import Shop from "./Shop";
import Error from "./Error";

import Navigator from './Navigator';
import {NavigatorBoot} from './NavigatorBoot'
function App() {
  return (
    <div className="App">
      <Navigator />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route exact path="/flight" component={Flight} />
        <Route exact path="/aboutus" render={()=>{return <Shop name="Sumit" />}}  />
        <Route component={Error} />
      </Switch>
    </div>
  );
}

export default App;
