require("dotenv").config();

const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const User = require("./models/User");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Authentication API is running",
    });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log("MySQL connected successfully");

        await sequelize.sync({ alter: true });
        console.log("Database tables synchronized");

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("MySQL connection failed:", error);
    }
};

startServer();