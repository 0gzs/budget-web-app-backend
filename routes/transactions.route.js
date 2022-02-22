const express = require('express');
const { 
    deleteTransaction,
    deleteTransactions,
    getTransactions, 
    setTransactions, 
    updateTransaction
} = require('../controllers/transactions.controller');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route("/").get(protect, getTransactions).post(protect, setTransactions);
router.route("/:id").put(protect, updateTransaction).delete(protect, deleteTransaction);
router.route("/:id/multi").delete(protect, deleteTransactions);

module.exports = router;
