import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import "../login/login.css";
import { isAuthenticated, registerUser } from "../../redux/actions/userAction";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Admin");
  const [errorMsg, seterrorMsg] = useState(null);
  const dispatch = useDispatch();

  const {
    isAuthenticated: auth,
    error,
    loading,
    message,
  } = useSelector((state) => state.authUser);

  useEffect(() => {
    dispatch(isAuthenticated());
  }, [dispatch]);

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

  const renderRoleField = () => {
    return (
      <>
        <label className='input-label' htmlFor='password'>
          Select Role
        </label>
        <select
          type='password'
          id='password'
          className='password-input-field'
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value='admin'>Admin</option>
          <option value='user'>Content_Writer</option>
        </select>
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
    return <p className='error-message '>*{error ? error : errorMsg}</p>;
  };

  const renderMessage = () => {
    return (
      <>
        <p
          style={{
            backgroundColor: "lightgreen",
            padding: "10px",
            marginTop: "10px",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          {message ? message : ""}
        </p>
        <Link to='/login'>Click here and Login</Link>
      </>
    );
  };

  const submitForm = (event) => {
    event.preventDefault();
    if (username === "") {
      alert("Please fill the username field");
      return;
    }
    if (password === "") {
      alert("Please enter the password");
      return;
    }
    if (username.length === 0 || password.length === 0) {
      seterrorMsg("All the fields are mandatory");
      return;
    }
    const userDetails = { username, password, role };
    dispatch(registerUser(userDetails));
    setPassword("");
    setUsername("");
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
      <form
        className='form-container'
        onSubmit={submitForm}
        style={{ backgroundColor: "lightgray" }}
      >
        <img
          src='https://image.freepik.com/free-vector/letter-logo-design-template_23987-87.jpg'
          className='login-website-logo-desktop-image'
          alt='website logo'
        />
        <div className='input-container'>{renderUsernameField()}</div>
        <div className='input-container'>{renderPasswordField()}</div>
        <div className='input-container'>{renderRoleField()}</div>

        <button type='submit' className='login-button'>
          Register Here
        </button>
        {error || errorMsg !== null ? renderError() : ""}
        {message !== null ? renderMessage() : ""}
      </form>
    </div>
  );
};

export default Register;
