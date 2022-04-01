import React from 'react';
import {
  HashRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import Profile from './app/profile/Profile'
import DashboardLayout from './app/layouts/DashboardLayout';
import Setting from './app/setting/Setting';
import Website from "./app/landing/Website";
import Login from './app/auth/Login';
import Register from './app/auth/Register';
import { isLoggedIn } from './Helpers';
import EditProfile from './app/profile/EditProfile';


export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      true ? (
        <Component {...props} />
      ) : (
          <Redirect
            to={{
              // pathname: '/AfterLogin',
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
    }
  />
);

export const GuestRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !isLoggedIn() ? (
        <Component {...props} />
      ) : (
          <Redirect
            to={{
              pathname: '/dashboard',
              state: { from: props.location }
            }}
          />
        )
    }
  />
);

const Routes = () => (
  <HashRouter>
    <Switch>
      <Route exact path={'/'} component={Website} />
      <GuestRoute exact path={'/register'} component={Register} />
      <GuestRoute exact path={'/login'} component={Login} />
      <GuestRoute exact path={'/profile'} component={Profile} />
      <GuestRoute exact path={'/setting'} component={Setting} />
      <GuestRoute exact path={'/profile/edit'} component={EditProfile} />

      
      { <PrivateRoute strict path={'/dashboard'} component={DashboardLayout} /> }
    </Switch>
  </HashRouter>
);

export default React.memo(Routes);
