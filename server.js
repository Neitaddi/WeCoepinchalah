//require express
const express = require("express");
//decoder les cookies et travailler avec //lire les cookies
const cookieParser = require("cookie-parser");
const cors = require("cors");
//require routes
const userRouters = require("./routes/userRoutes.js");
const postRouters = require("./routes/postRouters");
const clubRouters = require("./routes/clubRouters");

//require dotenv
require("dotenv").config({ path: "./config/.env" });

//require connectDB
const connectDB = require("./config/connectDB");

//connect DB
connectDB();
//Middleware
// const checkUser = require("./Middleware/authMiddleware");
const { checkUser, requireAuth } = require("./Middleware/authMiddleware");
//require cors

//app
const app = express();

//cors

//cors //les droits a qui de faire les requettes
const corsOptions = {
  origin: process.env.CLIENT_URL,
  optionsSuccessStatus: 200, // For legacy browser support
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));
// read by json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// jwt Middleware
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

//routers
app.use("/api/user", userRouters);
//post routers
app.use("/api/post", postRouters);
//club routers
app.use("/api/club", clubRouters);

//lanch server
app.listen(process.env.PORT, (error) =>
  error
    ? console.log(error)
    : console.log(`the server is running port ${process.env.PORT}`)
);
