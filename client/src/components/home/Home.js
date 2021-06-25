import React from "react";
import "./home.css";

const Home = () => {
  return (
    <div
      style={{
        margin: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "15px",
      }}
    >
      <h1 style={{ marginBottom: "30px" }}>
        This is the Home page of our application
      </h1>
      <p
        style={{
          backgroundColor: "grey",
          padding: "10px",
          borderRadius: "6px",
          color: "white   ",
        }}
      >
        Accessible to both Content_writers and Admins
      </p>
      <h5>Application is built based on below technologies:</h5>
      <ul style={{ margin: "10px" }}>
        <li>React.Js as front-end UI library</li>
        <li>NodeJs and ExpressJs as backend and Web API framework </li>
        <li>
          MongoDb server and Mongoose as ODM library for MongoDB / JWT token
          mechanism
        </li>
        <li>Redux for state management</li>
        <li>
          React-router-dom and few other packages with react library to acheive
          the required functionalities
        </li>
      </ul>
    </div>
  );
};

export default Home;
