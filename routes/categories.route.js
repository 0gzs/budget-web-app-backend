import express from 'express';

import { 
    decrementCategoryAmount, 
    getCategories, 
    incrementCategoryAmount, 
    setCategories, 
    updateCategory,
    deleteCategory
} from '../controllers/categories.controller.js';
import { protect } from '../middleware/authMiddleWare.js';

const router = express.Router();

router.route("/").get(protect, getCategories).post(protect, setCategories);
router.route("/:id").put(protect, updateCategory).delete(protect, deleteCategory);
router.route("/:id/inc/amount").put(protect, incrementCategoryAmount);
router.route("/:id/dec/amount").put(protect, decrementCategoryAmount);

export default router;
