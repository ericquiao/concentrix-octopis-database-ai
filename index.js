const express = require("express");

const app = express();
let port = process.env.PORT || 8080;

const mongoose = require("mongoose");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Routes
const userRoutes = require("./routes/userRoutes");
const streetRoutes = require("./routes/streetRoutes");
const cityRoutes = require("./routes/cityRoutes");
const statusRoutes = require("./routes/statusRoutes");


mongoose.connect(
  "mongodb+srv://admin:1234@cluster0.b0njd.mongodb.net/octopi?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));

db.once("open", () => {
  console.log("connected to database");
});

app.use("/api/users", userRoutes);
app.use("/api/streets", streetRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/statuses", statusRoutes);

app.listen(port, () => {
  console.log(`server listening to port ${port}`);
});
