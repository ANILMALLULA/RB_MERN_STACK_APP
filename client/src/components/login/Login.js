import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import "./login.css";

import Loader from "react-loader-spinner";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { isAuthenticated, login } from "../../redux/actions/userAction";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {
    isAuthenticated: auth,
    error,
    loading,
  } = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isAuthenticated());
  }, [dispatch]);

  const submitForm = (event) => {
    event.preventDefault();
    if (username.length === 0 || password.length === 0) {
      return;
    }
    const userDetails = { username, password };
    dispatch(login(userDetails));
  };

  const renderPasswordField = () => {
    return (
      <>
        <label className='input-label' htmlFor='password'>
          PASSWORD
        </label>
        <input
          type='password'
          id='password'
          className='password-input-field'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </>
    );
  };

  const renderUsernameField = () => {
    return (
      <>
        <label className='input-label' htmlFor='username'>
          USERNAME
        </label>
        <input
          type='text'
          id='username'
          className='username-input-field'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </>
    );
  };

  const renderError = () => {
    return <p className='error-message '>*{error}</p>;
  };

  return auth ? (
    <Redirect to='/' />
  ) : loading ? (
    <div style={{ textAlign: "center", margin: "auto 0" }}>
      <Loader type='TailSpin' color='#00BFFF' height={50} width={50} />
    </div>
  ) : (
    <div className='login-form-container'>
      <img
        src='https://image.freepik.com/free-vector/letter-logo-design-template_23987-87.jpg'
        className='login-image'
        alt='website login'
      />
      <form className='form-container' onSubmit={submitForm}>
        <img
          src='https://image.freepik.com/free-vector/letter-logo-design-template_23987-87.jpg'
          className='login-website-logo-desktop-image'
          alt='website logo'
        />
        <div className='input-container'>{renderUsernameField()}</div>
        <div className='input-container'>{renderPasswordField()}</div>
        <button type='submit' className='login-button'>
          Login
        </button>
        {error !== null ? renderError() : ""}
        <Link
          to='/register'
          style={{ fontSize: "12px", marginTop: "12px", textAlign: "center" }}
        >
          If you dont have an account, register here!
        </Link>
      </form>
    </div>
  );
};

export default Login;
