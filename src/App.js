import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
} from '@apollo/client';

import './scss/style.scss';

const client = new ApolloClient({
  uri: 'http://172.27.205.178:4000/graphql',
  cache: new InMemoryCache()
});

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const TheLayout = React.lazy(() => import('./containers/TheLayout'));


export default function WordpressAdmin() {

  return (
    <Router>
      <React.Suspense fallback={loading}>
        <ApolloProvider client={client}>
          <Switch>
            <Route path="/" name="Home" render={props => <TheLayout {...props} />} />
          </Switch>
        </ApolloProvider>
      </React.Suspense>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.
