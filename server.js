const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

// Import routes
const authRoutes = require("./routes/auth");
const activityRoutes = require("./routes/activity");
const adminRoutes = require("./routes/admin");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Serve static files (index.html, dashboard.html, admin.html)
app.use(express.static(path.join(__dirname, "public")));

app.use("/", authRoutes);
app.use("/", activityRoutes);
app.use("/", adminRoutes);

const mongoURI =
  "mongodb+srv://egsaDB:yukinoshita@cluster0.54mlchj.mongodb.net/jurnalApp?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("MongoDB connected");
    app.get("/", (req, res) => {
      res.send("Jurnal App Backend is running");
    });
    app.listen(3000, () =>
      console.log("Server running at http://localhost:3000")
    );
  })
  .catch((err) => console.error("MongoDB connection error:", err));
