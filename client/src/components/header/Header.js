import React from "react";
import "./header.css";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/actions/userAction";

const Header = () => {
  const dispatch = useDispatch();

  const { role } = useSelector((state) => state.authUser.user);

  const onClickLogoutHandler = () => {
    dispatch(logoutUser());
    <Redirect to='/login' />;
  };

  return (
    <>
      <nav className='header-container'>
        <div className='logo-and-title-container'>
          <img
            alt='wave'
            className='logo'
            src='https://image.freepik.com/free-vector/letter-logo-design-template_23987-87.jpg'
          />
          <h1 className='title'>My App</h1>
        </div>
        <div>
          <Link className='route-link' to='/'>
            Home
          </Link>
          <Link className='route-link' to='/blogs'>
            Blogs
          </Link>
          {role === "admin" ? (
            <Link className='route-link' to='/admin'>
              Admin
            </Link>
          ) : null}
          <button className='btnn' onClick={() => onClickLogoutHandler()}>
            Logout
          </button>
        </div>
      </nav>
      <hr />
    </>
  );
};

export default Header;
