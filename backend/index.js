//index.js

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./Routes/store")
const cors = require("cors");


const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

const PORT = 8800;
app.use("/api/store", authRoute);

mongoose
  .connect("mongodb://localhost:27017/yourDatabaseName", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
