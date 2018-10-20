import * as React from "react";
import { Link, Route } from "react-router-dom";
import { PrivacyEn } from "./PrivacyEn";
import { PrivacyEs } from "./PrivacyEs";

export const Privacy = () => (
  <div>
    <Link to="/privacy/en">English</Link> <Link to="/privacy/es">Español</Link>
    <Route path="/privacy" exact={true} component={PrivacyEn} />
    <Route path="/privacy/en" exact={true} component={PrivacyEn} />
    <Route path="/privacy/es" exact={true} component={PrivacyEs} />
  </div>
);
