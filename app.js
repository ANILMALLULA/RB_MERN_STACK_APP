const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
app.use(cookieParser());
app.use(express.json());
const path = require("path");

mongoose.connect(
  "mongodb://localhost:27017/mernAuth",
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("Successfully connected to database");
  }
);

const userRouter = require("./routes/User");
app.use("/user", userRouter);

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
