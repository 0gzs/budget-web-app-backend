import asyncHandler from 'express-async-handler';

import Category from '../models/category.model.js';
import User from '../models/user.model.js';

// @desc    Get categories
// @route   GET /api/v1/categories
// @access  Private
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({ user: req.user.id });
 
  res.status(200).json(categories);
})

// @desc    Set categories
// @route   POST /api/v1/categories
// @access  Private
export const setCategories = asyncHandler(async (req, res) => {
  const { name, icon, color } = req.body;

  if (!name && !icon && !color) {
    res.status(400);
    throw new Error("Please add all required fields");
  }

  const category = await Category.create({
    name: name,
    icon: icon,
    color: color,
    amount: 0,
    user: req.user.id
  });

  res.status(200).json(category);
})

// @desc    Update category
// @route   PUT /api/v1/categories/:id
// @access  Private
export const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(400);
    throw new Error("Category not found");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (category.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedCategory);
})

// @desc    Update category
// @route   PUT /api/v1/categories/:id/inc/amount
// @access  Private
export const incrementCategoryAmount = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(400);
    throw new Error("Category not found");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (category.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  
  category.amount += parseFloat(req.body.amount);
  await category.save();

  res.status(200).json(category);
})

// @desc    Update category
// @route   PUT /api/v1/categories/:id/dec/amount
// @access  Private
export const decrementCategoryAmount = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(400);
    throw new Error("Category not found");
  }

   const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (category.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  } 

  category.amount -= parseFloat(req.body.amount);
  await category.save();

  res.status(200).json(category);
})

// @desc    Delete category
// @route   DELETE /api/v1/categories/:id
// @access  Private
export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(400);
    throw new Error("Category not found");
  }

   const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (category.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await category.remove();

  res.status(200).json({ id: req.params.id });
})
