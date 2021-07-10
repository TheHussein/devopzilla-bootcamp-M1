// Imports
const express = require("express");
require("dotenv").config();

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
let db_uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/devopzilla?retryWrites=true&w=majority`;
mongoose.connect(db_uri);
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Routes Definition
const item = require("./routes/item.route");
const order = require("./routes/order.route");

// Express Server
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/item", item);
app.use("/order", order);

app.listen(process.env.PORT, () => {
  console.log("Server is up and running on port number " + process.env.PORT);
});

module.exports = app;
