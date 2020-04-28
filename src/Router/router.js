import React from "react";
import { Route } from "react-router-dom";
import Home from '../Components/Home';
import DepartmentPage from "../Components/DepartmentPage";
import Post from "../Components/PostComponents";
import Register from "../Components/Register";
import SignIn from "../Components/SignIn";
import ZipSearch from "../Components/ZipSearch";
import AllDepartmentsPage from "../Components/AllDepartments";



class ReactRouter extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/signin" component={SignIn} />
        <Route  path="/post" component={Post} />
        <Route  path="/register" component={Register} />
        <Route  path="/departmentpage/:id" render ={(props) => <DepartmentPage {...props}/>} />
        <Route  path="/zipsearch" component={ZipSearch} />
        <Route  path="/alldepartments" component={AllDepartmentsPage} />
        <Route  path="/home" component={Home} />
      </React.Fragment>
    );
  }
}

export default ReactRouter;