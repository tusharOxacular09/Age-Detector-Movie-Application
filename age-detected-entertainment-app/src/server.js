const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const { DatabaseConnector } = require("./db-connection");
const server = express();
const userRouter = require("./routes/userRouter");
const movieRouter = require("./routes/movieRouter");
const paymentRouter = require("./routes/paymentRouter");

// connecting with the database
DatabaseConnector();

// Middlewares
server.use(cookieParser());
server.use(express.json());
server.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PATCH"],
    credentials: true,
  })
);
server.use(express.static("public"));
server.use(express.json());
server.use(express.raw({type: 'application/json'}));

// Routes
server.use("/api/user", userRouter);
server.use("/api/movie", movieRouter);
server.use("/api/payment", paymentRouter);


server.listen(process.env.PORT, () => {
  console.log(`My Movie Server is running on the port ${process.env.PORT}`);
});
