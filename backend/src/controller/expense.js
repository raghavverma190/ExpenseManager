const Expense = require('../models/expense');
const CC = require('currency-converter-lt'); //currency converter API(does not accept multiple requests at a time, hence not used)

//add expense
exports.addExpense = (req, res) => {
  req.body.data.payload.user = req.user._id;
  const expense = new Expense(req.body.data.payload);
  expense.save((error, expense) => {
    if (error) return res.status(400).json({ error });
    if (expense) {
      res.status(201).json({ expense });
    }
  });
};

//delete expense
exports.deleteExpenseById = (req, res) => {
  const { expenseId } = req.body.payload;
  if (expenseId) {
    Expense.deleteOne({ _id: expenseId }).exec((error, result) => {
      if (error) return res.status(400).json({ error });
      if (result) {
        res.status(202).json({ result });
      }
    });
  } else {
    res.status(400).json({ error: 'ID parameter required' });
  }
};

//list of expenses of current user
exports.getExpenses = (req, res) => {
  let promiseArray = [];
  var total = 0;

  //finding all expenses of user, in descending order(dateTime wise)
  //most recent expenses will be present first in array retreieved from DB
  Expense.find({ user: req.user._id })
    .sort('-createdAt')
    .exec((error, expenses) => {
      if (error) return res.status(400).json({ error });
      else if (expenses) {
        //segment of code if want to retrieve present currency rates(does not accept too many requests at a time)
        // expenses.map((expense) => {
        //   promiseArray.push(convertAmt(expense)); //currency convert function returns promise
        // });
        // //After all promises fulfilled, total will be calculated
        // Promise.all(promiseArray)
        //   .then((amounts) => {
        //     amounts.map((amount) => {
        //       total = total + amount;
        //     });
        //     total = total.toFixed(2);
        //     res.status(200).json({ expenses, total });
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //     res.status(400).json({ error });
        //   });

        //retrieving rates as of 20/07/21;converting currency to default rupee
        expenses.map((expense) => {
          total = total + convertAmt(expense);
        });

        //fixing total to two decimal places
        total = total.toFixed(2);

        res.status(200).json({ expenses, total });
      }
    });
};

//filter expenses by category,logic implemented with bootstrap table in frontend but can be done through backend as well
exports.getExpensesCategory = (req, res) => {
  Expense.find({ user: req.user._id, category: req.body.category }).exec(
    (error, expenses) => {
      if (error) return res.status(400).json({ error });
      else if (expenses) {
        res.status(200).json({ expenses });
      }
    }
  );
};

//Total amount per category basis of the current month
exports.getTotalCategory = async (req, res) => {
  try {
    //Retreiving year,month,date of present day
    const { year, month, date } = getCurrentDate();

    //Initializing startDate and endDate to put into query of db
    let startDate = `${year}-${month}-01T00:00:00.000+00:00`;
    let endDate = `${year}-${month}-${date}T23:59:59.999+00:00`;

    //Finding out expenses in current month till date
    const condition = {
      user: req.user._id,
      createdAt: {
        $gte: new Date(startDate),
        $lt: new Date(endDate),
      },
    };

    //Retrieving expenses from database
    const expenses = await Expense.find(condition).exec();

    const categories = ['Home', 'Food', 'Fuel', 'Shopping', 'Other'];
    var category_totals = new Array();

    //Filtering out total of each category of current month
    categories.forEach((category) => {
      let total = 0;
      let category_total = {};
      expenses
        .filter((expense) => {
          return expense.category === category;
        })
        .map((expense) => {
          total = total + convertAmt(expense);
        });

      category_total['Category'] = category;
      category_total['Total'] = total;
      category_totals.push(category_total);
    });

    res.status(200).json({ category_totals });
  } catch (e) {
    res.status(400).json({ error: e });
  }
};

//Total amount spent per week of current month
exports.getTotalWeek = async (req, res) => {
  //Retrieving year,month,date of present day
  const { year, month, date } = getCurrentDate();

  //Initializing startDate and endDate for db query
  let startDate = `${year}-${month}-01T00:00:00.000+00:00`;
  let endDate = `${year}-${month}-${date}T23:59:59.999+00:00`;

  //Finding out expenses in current month till date
  const condition = {
    user: req.user._id,
    createdAt: {
      $gte: new Date(startDate),
      $lt: new Date(endDate),
    },
  };

  //retrieiving expenses from database
  //sorting retrieved expenses in descending order from current date
  try {
    const expenses = await Expense.find(condition).sort('-createdAt').exec();

    //Finding out number of weeks from 1st of current month to current date
    var no_weeks = Math.ceil(date / 7);

    //Setting loop_date variable as 'date' is a constant and cannot be used with loop
    var loop_date = date;

    //Declaring array of total of each week
    var week_totals = new Array();

    //Finding out total of each week of the current month
    for (var i = 0; i < no_weeks; i++) {
      var total = 0;

      //Filtering out total of each week from current date to 1st of current month
      expenses
        .filter((expense) => {
          return (
            expense.createdAt.getDate() <= loop_date &&
            expense.createdAt.getDate() > loop_date - 7
          );
        })
        .map((expense) => {
          total = total + convertAmt(expense);
        });

      //adding total of each week with key as 'week ${number}' to array
      let week_total = {};
      week_total['week'] = `Week ${no_weeks - i}`;
      week_total['total'] = total;

      //adding week_total object to array
      week_totals.push(week_total);

      //subtracting loop_date to iterate from previous week(to get total of previous week)
      loop_date = loop_date - 7;
    }
    return res.status(200).json({ week_totals });
  } catch (e) {
    return res.status(400).json({ error: e });
  }
};

//edit expense
exports.updateExpense = async (req, res) => {
  try {
    //retrieving updated expense from frontend
    const { _id, currency, amount, description, category } =
      req.body.data.payload;
    const updateExpense = { currency, amount, description, category };

    //sending request to DB for updating
    const updatedExpense = await Expense.findOneAndUpdate(
      { _id },
      updateExpense,
      { new: true } //new:true tells DB to return updated value
    );
    return res.status(201).json({ updatedExpense });
  } catch (e) {
    res.status(400).json({ error: e });
  }
};

//function to retrieve current date
function getCurrentDate() {
  //retrieving current time stamp
  let ts = Date.now();

  //declaring date object
  let date_ob = new Date(ts);

  //Declaring current year,month,date
  var year = date_ob.getFullYear();
  var month =
    date_ob.getMonth() < 10
      ? `0${date_ob.getMonth() + 1}`
      : date_ob.getMonth() + 1;
  var date =
    date_ob.getDate() < 10 ? `0${date_ob.getDate()}` : date_ob.getDate();
  return { year: year, month: month, date: date };
}

//Function to convert currency rates as of realtime using API
//Not advised as API does not accept multiple calls at a time
// function convertAmt(expense) {
//   if (expense.currency == 'dollar') {
//     let currencyConverter = new CC({
//       from: 'USD',
//       to: 'INR',
//       amount: expense.amount,
//     });
//     return currencyConverter.convert();
//   } else if (expense.currency == 'pound') {
//     let currencyConverter = new CC({
//       from: 'GBP',
//       to: 'INR',
//       amount: expense.amount,
//     });
//     return currencyConverter.convert();
//   } else if (expense.currency == 'euro') {
//     let currencyConverter = new CC({
//       from: 'EUR',
//       to: 'INR',
//       amount: expense.amount,
//     });
//     return currencyConverter.convert();
//   } else if (expense.currency == 'rupee') {
//     return expense.amount;
//   }
// }

//Function to convert currency rates as of 20/07/21
function convertAmt(expense) {
  if (expense.currency == 'dollar') {
    return 75 * expense.amount;
  } else if (expense.currency == 'pound') {
    return 102.35 * expense.amount;
  } else if (expense.currency == 'euro') {
    return 88.24 * expense.amount;
  } else if (expense.currency == 'rupee') {
    return expense.amount;
  }
}
