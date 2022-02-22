const express = require('express');
const { 
    addTransaction, 
    decrementAccountBalance, 
    deleteAccount, 
    getAccounts, 
    getOneAccount, 
    incrementAccountBalance, 
    setAccounts, 
    updateAccount 
} = require('../controllers/accounts.controller');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route("/").get(protect, getAccounts).post(protect, setAccounts);
router.route("/:id").get(getOneAccount).put(protect, updateAccount).delete(protect, deleteAccount);
router.route("/:id/add/transaction").put(protect, addTransaction);
router.route("/:id/inc/balance").put(protect, incrementAccountBalance);
router.route("/:id/dec/balance").put(protect, decrementAccountBalance);

module.exports = router;