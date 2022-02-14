import React from "react";
import { Route, Switch } from "react-router-dom";
import AboutPage from "../about/AboutPage";
import CoursesPage from "../courses/CoursesPage";
import ManageCoursePage from "../courses/ManageCoursePage";
import HomePage from "../home/HomePage";
import PageNotFound from "../PageNotFound";

const RouteComponent = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/courses" component={CoursesPage} />
      <Route path="/course/:slug" component={ManageCoursePage} />
      <Route path="/course" component={ManageCoursePage} />
      <Route component={PageNotFound} />
    </Switch>
  );
};

export default RouteComponent;
