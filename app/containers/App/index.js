/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import People from 'containers/Peoples';
import Person from 'containers/Person';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={People} />
      <Route path="/person/:id" component={Person} />
      <Route path="" component={NotFoundPage} />
    </Switch>
  );
}
