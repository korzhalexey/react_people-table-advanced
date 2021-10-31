import { FC } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import TablePage from './components/TablePage/TablePage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';

import './App.scss';

const App: FC = () => {
  return (
    <div className="App">
      <Header />

      <Switch>
        <Route
          path="/"
          exact
          component={HomePage}
        />

        <Route
          path="/table/:user?"
          component={TablePage}
        />

        <Redirect
          from="/home"
          to="/"
        />

        <NotFoundPage />
      </Switch>
    </div>
  );
};

export default App;
