import express from 'express';
import { 
    deleteTransaction,
    deleteTransactions,
    getTransactions, 
    setTransactions, 
    updateTransaction
} from '../controllers/transactions.controller.js';
import {protect} from '../middleware/authMiddleware.js';

const router = express.Router();

router.route("/").get(protect, getTransactions).post(protect, setTransactions);
router.route("/:id").put(protect, updateTransaction).delete(protect, deleteTransaction);
router.route("/:id/multi").delete(protect, deleteTransactions);

export default router;
