//index.js

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./Routes/store")
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json({ limit: '10mb' })); // Increase as needed, e.g., 20mb or more


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

app.use("/api/store", authRoute);

app.listen(5000, () => {
  console.log("Backend is running");
});
