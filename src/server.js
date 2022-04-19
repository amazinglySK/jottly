const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT || 5500;
const mainRoutes = require("./routes/mainRoutes");
const userRoutes = require("./routes/userRoutes");
const apiRoutes = require("./routes/apiRoutes");
const logRouter = require("./routes/logRoutes");

app.use(express.static(path.join(__dirname, "/app")));
app.use(cookieParser());
app.use(express.json());
app.use("/", mainRoutes);
app.use("/user", userRoutes);
app.use("/api", apiRoutes);
app.use("/logs", logRouter);

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("App has started 👍");
});
