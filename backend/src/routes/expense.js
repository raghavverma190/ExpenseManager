const { requireSignin, userMiddleware } = require('../common-middleware');
const {
  addExpense,
  deleteExpenseById,
  getExpenses,
  updateExpense,
  getExpensesCategory,
  getTotalCategory,
  getTotalWeek,
} = require('../controller/expense');
const router = require('express').Router();

//First request goes through validation(where user._id is also extracted from the token stored in client browser), only then to the controller
router.post('/addExpense', requireSignin, userMiddleware, addExpense);
router.delete(
  '/deleteExpense',
  requireSignin,
  userMiddleware,
  deleteExpenseById
);
router.post('/getExpenses', requireSignin, userMiddleware, getExpenses);
router.post(
  '/getExpensesCategory',
  requireSignin,
  userMiddleware,
  getExpensesCategory
);
router.post(
  '/getTotalCategory',
  requireSignin,
  userMiddleware,
  getTotalCategory
);
router.post('/getTotalWeek', requireSignin, userMiddleware, getTotalWeek);
router.post('/updateExpense', requireSignin, userMiddleware, updateExpense);
module.exports = router;
