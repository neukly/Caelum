import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  dashboardLayoutRoutes,
  presentationLayoutRoutes,
  noPadDashboardLayoutRoutes,
} from "./index";

import DashboardLayout from "../layouts/Dashboard";
import NoPadDashboardLayout from "../layouts/Dashboard-noPadding";
import PresentationLayout from "../layouts/Presentation";
import AuthLayout from "../layouts/Auth";
import Page404 from "../pages/auth/Page404";

const childRoutes = (Layout, routes) =>
  routes.map(({ component: Component, guard, children, path }, index) => {
    const Guard = guard || React.Fragment;

    return children ? (
      children.map((element, index) => {
        const Guard = element.guard || React.Fragment;
        const ElementComponent = element.component || React.Fragment;

        return (
          <Route
            key={index}
            path={element.path}
            exact
            render={(props) => (
              <Layout>
                <Guard>
                  <ElementComponent {...props} />
                </Guard>
              </Layout>
            )}
          />
        );
      })
    ) : Component ? (
      <Route
        key={index}
        path={path}
        exact
        render={(props) => (
          <Layout>
            <Guard>
              <Component {...props} />
            </Guard>
          </Layout>
        )}
      />
    ) : null;
  });

const Routes = () => (
  <Router>
    <Switch>
      {childRoutes(DashboardLayout, dashboardLayoutRoutes)}
      {/* TODO this is a hack, fix better later */}
      {childRoutes(NoPadDashboardLayout, noPadDashboardLayoutRoutes)}
      {childRoutes(PresentationLayout, presentationLayoutRoutes)}
      <Route
        render={() => (
          <AuthLayout>
            <Page404 />
          </AuthLayout>
        )}
      />
    </Switch>
  </Router>
);

export default Routes;
