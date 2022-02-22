const express =  require('express');

const { 
    decrementCategoryAmount, 
    getCategories, 
    incrementCategoryAmount, 
    setCategories, 
    updateCategory,
    deleteCategory
} = require('../controllers/categories.controller');
const { protect } = require('../middleware/authMiddleWare');

const router = express.Router();

router.route("/").get(protect, getCategories).post(protect, setCategories);
router.route("/:id").put(protect, updateCategory).delete(protect, deleteCategory);
router.route("/:id/inc/amount").put(protect, incrementCategoryAmount);
router.route("/:id/dec/amount").put(protect, decrementCategoryAmount);

module.exports = router;
