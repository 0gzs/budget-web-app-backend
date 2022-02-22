import asyncHandler from 'express-async-handler';
import Account from '../models/account.model.js';
import User from '../models/user.model.js';

// @desc    Get accounts
// @route   GET /api/v1/accounts
// @access  Private
export const getAccounts = asyncHandler(async (req, res) => {
  const accounts = await Account.find({ user: req.user.id });
  
  res.status(200).json(accounts);
})

// @desc    Set account
// @route   POST /api/v1/accounts
// @access  Private
export const setAccounts = asyncHandler(async (req, res) => {
  const { name, balance, type } = req.body;

  if (!name  && !balance && !type) {
    res.status(400);
    throw new Error("Please add all required fields");
  }

  const account = await Account.create({
    name,
    balance,
    type,
    user: req.user.id
  });

  res.status(200).json(account);
})

// @desc    Get account
// @route   GET /api/v1/accounts/:id
// @access  Private
export const getOneAccount = async (req, res) => {
  const account = await Account.findById(req.params.id);

  if (!account) {
    res.status(400);
    throw new Error("Account not found");
  }
  
  res.status(200).json(account);
}

// @desc    Update account
// @route   PUT /api/v1/accounts/:id
// @access  Private
export const updateAccount = asyncHandler(async (req, res) => {
  const account = await Account.findById(req.params.id);

  if (!account) {
    res.status(400);
    throw new Error("Account not found");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (account.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedAccount = await Account.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedAccount);
})

// @desc    Add account transaction
// @route   Put /api/v1/accounts/:id/add/transaction
// @access  Private
export const addTransaction = asyncHandler(async (req, res) => {
  const account = await Account.findById(req.params.id);

  if (!account) {
    res.status(400);
    throw new Error("Account not found");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (account.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  
  await account.transactions.push(req.body.transactionId);
  await account.save();
  
  res.status(200).json(account);
})

// @desc    Update (+) account balance
// @route   PUT /api/v1/accounts/:id/inc/balance
// @access  Private
export const incrementAccountBalance = asyncHandler(async (req, res) => {
  const account = await Account.findById(req.params.id);

  if (!account) {
    res.status(400);
    throw new Error("Account not found");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (account.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  account.balance += parseFloat(req.body.amount);
  await account.save();
  
  res.status(200).json(account);
})

// @desc    Update (-) account balance
// @route   PUT /api/v1/accounts/:id/dec/balance
// @access  Private
export const decrementAccountBalance = asyncHandler(async (req, res) => {
  const account = await Account.findById(req.params.id);

  if (!account) {
    res.status(400);
    throw new Error("Account not found");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (account.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  account.balance -= parseFloat(req.body.amount);
  await account.save();
  
  res.status(200).json(account);
})

// @desc    Delete goal
// @route   DELETE /api/v1/accounts/:id
// @access  Private
export const deleteAccount = asyncHandler(async (req, res) => {
  const account = await Account.findById(req.params.id);

  if (!account) {
    res.status(400);
    throw new Error("Account not found");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (account.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await account.remove();

  res.status(200).json({ id: req.params.id });
})

