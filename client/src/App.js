import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Router, Switch, Route } from 'react-router-dom';

import store, { persistor } from './redux/store';

import ProtectedRoute from './util/ProtectedRoute';
import './App.less';
import LoginPage from './views/auth/LoginPage';
import SignupPage from './views/auth/SignupPage';
import MeditationPage from './views/meditation/MeditationPage';

import history from './util/history';
import PastSessions from './views/sessions/PastSessions';
import GratitudeRiver from './views/gratitudes/GratitudeRiver';

export default function App() {
  return (
    <StoreProvider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Switch>
            <ProtectedRoute exact path="/meditate" component={MeditationPage} />
            <ProtectedRoute exact path="/sessions" component={PastSessions} />
            <ProtectedRoute exact path="/gratitudes" component={GratitudeRiver} />
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/" component={LoginPage} />
            <Route component={LoginPage} />
          </Switch>
        </Router>
      </PersistGate>
    </StoreProvider>
  );
}