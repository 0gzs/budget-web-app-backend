import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorMiddleware.js';
import { connectDB } from './config/db.js';
import path from 'path';
import accounts from './routes/accounts.route.js';
import users from './routes/users.route.js';
import categories from './routes/categories.route.js';
import transactions from './routes/transactions.route.js';

dotenv.config();

const port = process.env.PORT || 5001;
const __dirname = path.resolve();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));   

app.use("/api/v1/accounts", accounts);
app.use("/api/v1/users", users);
app.use("/api/v1/categories", categories);
app.use("/api/v1/transactions", transactions);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    app.get("*", (req, res) => {
        res.sendFile(
            path.resolve(__dirname, "frontend", "build", "index.html")
        );
    });
} else {
    app.get("/", (req, res) => res.send("Set to production"));
}

app.use("*", (req, res) => res.status(400).json({ error: "not found"}));
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port: ${port}`));

export default app;