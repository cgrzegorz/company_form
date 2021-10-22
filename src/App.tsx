import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import LeyoutWithContainer from "./leyouts/LeyoutwithContainer";
import CompanyList from "./components/companyList";
import RouteWrapper from "./helpers/RouteWrapper";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <RouteWrapper
          path="/companies"
          component={CompanyList}
          layout={LeyoutWithContainer}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
