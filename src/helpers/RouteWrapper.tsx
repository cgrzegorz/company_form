import React, { ComponentType } from "react";
import { Route, RouteProps } from "react-router-dom";

interface IProps extends RouteProps {
  component: ComponentType;
  layout: ComponentType;
}

const RouteWrapper = ({
  component: Component,
  layout: Layout,
  ...rest
}: IProps) => {
  return (
    <Route
      {...rest}
      render={(props: any) => (
        <Layout {...props}>
          <Component {...props} />
        </Layout>
      )}
    />
  );
};

export default RouteWrapper;
