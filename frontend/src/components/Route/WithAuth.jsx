import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const withAuth = (Component) => {
  const AuthRoute = (props) => {
    const { isAuthenticated } = useSelector((state) => state.user);

    useEffect(() => {
      if (!isAuthenticated) {
        // Redirect to the login page if the user is not authenticated
        props.history.push('/login');
      }
    }, [isAuthenticated, props.history]);

    if (!isAuthenticated) {
      // Render nothing if the user is not authenticated
      return null;
    }

    // Render the component if the user is authenticated
    return <Component {...props} />;
  };

  return AuthRoute;
};

export default withAuth;
