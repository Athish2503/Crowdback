const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/auth");
const authoritiesRoutes = require("./routes/authorityroutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const userRoutes = require("./routes/userroutes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log(err));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get("/api", (req, res) => res.send("API is running"));

app.use("/api", authRoutes);
app.use("/api", authoritiesRoutes);
app.use('/api', feedbackRoutes);
app.use('/api', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));