import React, { useState } from 'react';
import Input from '../../components/UI/Input';
import Modal from '../../components/UI/Modal';
import { Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.min.css';
import { addExpense } from '../../actions/expense.actions';

const AddExpenseModal = (props) => {
  const dispatch = useDispatch();

  //setting up state variables for expense details
  const [amount, setAmount] = useState(null);
  const [currency, setCurrency] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  //receiving props
  const { show, setShow, handleClose } = props;

  const onSubmit = () => {
    //Validating fields before submitting to server
    if (!amount || !currency || !category) {
      toast.error('Please enter required fields');
      return false;
    }
    const payload = { amount, currency, description, category };
    //sending new expense as payload to action function
    dispatch(addExpense(payload));

    //resetting states after sending request
    setAmount(null);
    setCurrency('');
    setDescription('');
    setCategory('');
    setShow(false); //closing modal
  };
  return (
    <Modal
      modalTitle={'Add Expense'}
      show={show}
      handleClose={handleClose}
      onSubmit={onSubmit}
    >
      <ToastContainer />
      <Row>
        <Col>
          <Input
            value={amount}
            placeholder={'Amount*'}
            onChange={(e) => setAmount(e.target.value)}
            onKeyPress={(e) => {
              //only numbers will be accepted, no alphabets/characters/special characters
              if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
              }
              setAmount(e.target.value);
            }}
            className='form-control-sm'
            required
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Input
            value={currency}
            placeholder={`Currency*`}
            onChange={(e) => setCurrency(e.target.value)}
            className='form-control-sm'
            type={`select`}
            options={[
              { value: 'rupee', name: 'rupee' },
              { value: 'dollar', name: 'dollar' },
              { value: 'pound', name: 'pound' },
              { value: 'euro', name: 'euro' },
            ]}
            required
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Input
            value={description}
            placeholder={`Description-optional`}
            onChange={(e) => setDescription(e.target.value)}
            className='form-control-sm'
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Input
            value={category}
            placeholder={`Category*`}
            onChange={(e) => setCategory(e.target.value)}
            className='form-control-sm'
            type={`select`}
            options={[
              { value: 'Home', name: 'Home' },
              { value: 'Food', name: 'Food' },
              { value: 'Fuel', name: 'Fuel' },
              { value: 'Shopping', name: 'Shopping' },
              { value: 'Other', name: 'Other' },
            ]}
            required
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default AddExpenseModal;
