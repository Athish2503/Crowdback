const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authroutes = require("./routes/auth");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log(err));

app.get("/api", (req, res) => res.send("API is running"));

app.use("/auth", authroutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));