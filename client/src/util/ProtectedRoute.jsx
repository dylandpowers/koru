import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export default function ProtectedRoute({ component: Component, ...rest }) {
  const auth = useSelector((state) => state.auth);
  return auth && auth.id ? (
    <Route {...rest} render={(props) => <Component {...props} />} />
  ) : (
    <Redirect to="/login" />
  )
}