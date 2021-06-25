import React from "react";

const Admin = () => {
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
        This is the Admin page of our application
      </h1>
      <p
        style={{
          backgroundColor: "darkred",
          padding: "10px",
          borderRadius: "6px",
          marginBottom: "20px",
          color: "white   ",
        }}
      >
        Accessible to <strong>Admins only</strong>
      </p>
    </div>
  );
};

export default Admin;
