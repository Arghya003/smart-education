const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const bodyparser = require("body-parser");
const userRoutes = require("./routes/userRoutes.js");
const teacherRoutes = require("./routes/teacherRouter.js");

const connectMongo = require("./config/db/db.js");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 5904;
const URL = `http://localhost:${PORT}/`;

connectMongo();
app.use(cors({ origin: true, credentials: true }));

// Other middleware and configurations
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use("/api/users", userRoutes);
app.use("/api/teacher", teacherRoutes);


app.listen(PORT, () => {
  console.log(
    `*************************************************************
*                                                           *
*       App Name  : smart-education,                              *
*       Version : 1.0.0,                                    *
*       Main : app.js ,                                     *
*       Copyright (c) 2023, smart-education.                      *
*       Server Listening on ${URL}          *
*                                                           *
*************************************************************  
`
  );
});
