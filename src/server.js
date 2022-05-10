const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT || 5500;
const { rateLimit } = require("express-rate-limit");
const mainRoutes = require("./routes/mainRoutes");
const userRoutes = require("./routes/userRoutes");
const apiRoutes = require("./routes/apiRoutes");
const logRouter = require("./routes/logRoutes");

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(express.static(path.join(__dirname, "/app")));
app.use(cookieParser());
app.use(express.json());
app.use("/", mainRoutes);
app.use("/user", userRoutes, limiter);
app.use("/api", apiRoutes, limiter);
app.use("/logs", logRouter, limiter);
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "/app/not_found.html"));
});
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("App has started 👍");
});
