const express = require("express");
const noteRoutes = require("./routes/noteRoutes");

const app = express();
const PORT = process.env.PORT || 3001;
const htmlRouter = require("./routes/html");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/", htmlRouter);
app.use("/api", noteRoutes);

app.listen(PORT, () => console.log("server runnning!", PORT));
