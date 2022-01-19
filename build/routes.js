import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home/home";
import Layout from "./hoc/layout/layout";
import Login from "./components/Auth/Login/login";
import Register from "./components/Auth/Register/register";
import Company from "./components/Company/company";
import AddCompany from "./components/Dashboard/AddCompany/addCompany";
import NotFound from "./components/notFound"
import ProtectedRoute from './protectedRoute'
import Welcome from "./components/welcome/welcome";

class Routes extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/" exact component={Welcome}/>
          <Route path="/home" exact component={Home} />
          <ProtectedRoute path="/home" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <ProtectedRoute path="/add" exact component={AddCompany} />
          <ProtectedRoute path="/company/:id" exact component={Company} />
          <Route component={NotFound}/>
        </Switch>
      </Layout>
    );
  }
}

export default Routes;
