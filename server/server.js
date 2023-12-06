const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const server = express();
const mongoose = require("mongoose");
const userRouter = require("./routes/userRouter");
const movieRouter = require("./routes/movieRouter");

// connecting with the database
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDB Database is connected.");
}
main().catch((error) => console.log(error));

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
server.use("/api/user", userRouter);
server.use("/api/movie", movieRouter);

server.listen(process.env.PORT, () => {
  console.log(`My Movie Server is running on the port ${process.env.PORT}`);
});
