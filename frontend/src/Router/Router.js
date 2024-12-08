import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import { ProtectedRoute } from './ProtectedRoute';
import Dashboard from '../pages/Dashboard';

const Router = () => {
  return (
    <Routes>
      <Route path="/signup" Component={Signup} />
      <Route path="/" Component={Login} />
      <Route Component={ProtectedRoute}>
        <Route path="/dashboard" Component={Dashboard} />
      </Route>
    </Routes>
  );
};

export default Router;
