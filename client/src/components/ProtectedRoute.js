import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { isAuthenticated } from "../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import Header from "./header/Header";

function ProtectedRoute(props) {
  const dispatch = useDispatch();

  const { isAuthenticated: auth } = useSelector((state) => state.authUser);

  useEffect(() => {
    dispatch(isAuthenticated());
  }, [dispatch]);

  if (!auth) {
    return <Redirect to='/login' />;
  }

  return (
    <>
      <Header />
      <Route {...props} />
    </>
  );
}

export default ProtectedRoute;
