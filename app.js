const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
app.use(cookieParser());
app.use(express.json());

PORT = process.env.PORT || 5000;
const path = require('path')

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/mernAuth",
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("Successfully connected to database");
  }
);

//serve tsatic assets in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build','index.html');
  })
}
//
const userRouter = require("./routes/User");
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log("Express server started on port 5000");
});
