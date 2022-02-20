const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5500;
const mainRoutes = require("./controllers/mainRoutes");
const userRoutes = require("./controllers/userRoutes");
const apiRoutes = require("./controllers/apiRoutes");

app.use(express.static(path.join(__dirname, "/app")));
app.use("/", mainRoutes);
app.use("/user", userRoutes);
app.use("/api", apiRoutes);

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("App has started 👍");
});
