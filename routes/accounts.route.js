import express from 'express';
import { 
    addTransaction, 
    decrementAccountBalance, 
    deleteAccount, 
    getAccounts, 
    getOneAccount, 
    incrementAccountBalance, 
    setAccounts, 
    updateAccount 
} from '../controllers/accounts.controller.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route("/").get(protect, getAccounts).post(protect, setAccounts);
router.route("/:id").get(getOneAccount).put(protect, updateAccount).delete(protect, deleteAccount);
router.route("/:id/add/transaction").put(protect, addTransaction);
router.route("/:id/inc/balance").put(protect, incrementAccountBalance);
router.route("/:id/dec/balance").put(protect, decrementAccountBalance);

export default router;