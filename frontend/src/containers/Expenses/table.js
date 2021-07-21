import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Fragment } from 'react';
import {
  deleteExpenseById,
  updateExpense,
} from '../../actions/expense.actions';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter';
import AddExpenseModal from './AddExpenseModal';
import { toast, ToastContainer } from 'react-toastify';

const ExpensesTable = (props) => {
  const dispatch = useDispatch();

  //storing _id of expense, to be used by deleteExpenseId action when ID is set(row isselected)
  const [ID, setID] = useState(null);

  //state variable to enable AddExpenseModal
  const [show, setShow] = useState(false);

  //setting expenses received in props
  const [expenses, setExpenses] = useState([]);
  useEffect(() => {
    setExpenses(props.expenses);
  }, [props.expenses]);

  const [selected, setSelected] = useState([]);

  //select options for category filter in table
  const selectOptions = {
    Home: 'Home',
    Food: 'Food',
    Fuel: 'Fuel',
    Shopping: 'Shopping',
    Other: 'Other',
  };

  //setting up columns in table
  const columns = [
    {
      dataField: 'index',
      text: '#',
      editable: false,
    },
    {
      dataField: 'amount',
      text: 'Amount',
      validator: (newValue, row, column, done) => {
        //implementing validator if updating amount, i.e amount cannot be an alphabet
        setTimeout(() => {
          if (isNaN(newValue)) {
            return done({
              valid: false,
              message: 'Amount should be numeric',
            });
          }
          return done();
        }, 2000);
        return {
          async: true,
        };
      },
    },
    {
      dataField: 'currency',
      text: 'Currency',
      editor: {
        //drop down  if updating currency
        type: Type.SELECT,
        options: [
          {
            value: 'rupee',
            label: 'rupee',
          },
          {
            value: 'dollar',
            label: 'dollar',
          },
          {
            value: 'euro',
            label: 'euro',
          },
          {
            value: 'pound',
            label: 'pound',
          },
        ],
      },
    },
    {
      dataField: 'description',
      text: 'Description',
    },
    {
      dataField: 'category',
      text: 'Category',
      editor: {
        //drop down if updating category
        type: Type.SELECT,
        options: [
          {
            value: 'Home',
            label: 'Home',
          },
          {
            value: 'Food',
            label: 'Food',
          },
          {
            value: 'Fuel',
            label: 'Fuel',
          },
          {
            value: 'Shopping',
            label: 'Shopping',
          },
          {
            value: 'Other',
            label: 'Other',
          },
        ],
      },
      formatter: (cell) => selectOptions[cell], //implementing filter in table
      filter: selectFilter({
        options: selectOptions,
      }),
    },
    {
      dataField: 'IST_DATE',
      text: 'DATE and Time',
      editable: false,
    },
  ]; //columns for table

  const options = {
    //pagination settings
    //options for page
    // pageStartIndex: 0,
    sizePerPage: 5,
    hideSizePerPage: true,
    hidePageListOnlyOnePage: true,
  };

  function beforeSaveCell(oldValue, newValue, row, column, done) {
    //function executed before saving updated value in table
    setTimeout(() => {
      if (window.confirm('Are you sure you want to change this value?')) {
        done(true);
      } else {
        done(false);
      }
    }, 0);
    return { async: true };
  }

  function afterSaveCell(oldValue, newValue, row, column, done) {
    //function executed after saving updated value in table
    setTimeout(() => {
      let _id = row._id;
      let currency = row.currency;
      let amount = row.amount;
      let description = row.description;
      let category = row.category;
      const payload = { _id, currency, amount, description, category };
      dispatch(updateExpense(payload)); //request for updating sent to server
    }, 0);
    return { async: true };
  }

  //function executed when a row is selected
  const handleOnSelect = (row, isSelect) => {
    if (isSelect) {
      setSelected([row.index]); //adding index of row to selected state
      setID(row._id); //setting ID of row to be deleted
    }
  };

  const selectRow = {
    //selection of row to delete
    mode: 'radio',
    clickToSelect: false,
    selected: selected,
    onSelect: handleOnSelect,
  };
  return (
    <Fragment>
      <ToastContainer />
      <BootstrapTable
        keyField='index'
        data={expenses}
        columns={columns}
        striped
        hover
        condensed
        cellEdit={cellEditFactory({
          mode: 'click',
          blurToSave: false,
          beforeSaveCell, //function executed before saving updated data
          afterSaveCell, //function executed after saving updated data
        })}
        pagination={paginationFactory(options)}
        selectRow={selectRow}
        filter={filterFactory()}
      />
      <Fragment>
        <Button
          variant='primary'
          onClick={() => {
            setShow(true);
          }}
        >
          Add Expense
        </Button>{' '}
        <Button
          variant='danger'
          onClick={() => {
            //If expense row not selected, error will be triggered
            if (ID === null) {
              toast.error('Please select an expense to delete');
              return false;
            }
            const payload = {
              expenseId: ID,
            };
            dispatch(deleteExpenseById(payload));
            setID(null); //clearing ID state after deletion
            setSelected([]); //clearing selection of row after deletion
          }}
        >
          Delete
        </Button>{' '}
      </Fragment>
      <AddExpenseModal
        handleClose={() => setShow(false)}
        show={show}
        setShow={setShow}
      />
    </Fragment>
  );
};

export default ExpensesTable;
