const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

const port = process.env.PORT || 5001;

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));   

app.use("/api/v1/accounts", require('./routes/accounts.route'));
app.use("/api/v1/users", require('./routes/users.route'));
app.use("/api/v1/categories", require('./routes/categories.route'));
app.use("/api/v1/transactions", require('./routes/transactions.route'));

app.use("*", (req, res) => res.status(400).json({ error: "not found"}));
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port: ${port}`));