import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import validator from 'validator';
import Input from '../../components/UI/Input';
import { login } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
/**
 * @author
 * @function Signin
 **/

const Signin = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  //If error is recieved from server, it is stored in auth state
  //If error is present in auth state, it will be displayed using toastify
  useEffect(() => {
    if (auth.error) {
      toast.error(auth.error.message);
    }
  }, [auth]);
  const formValidation = () => {
    //Form Validation for logging in
    if (password.length < 6) {
      toast.error('Password must include at least 6 characters');
      return false;
    }

    if (!validator.isEmail(email)) {
      toast.error('Valid email required');
      return false;
    }
    return true;
  };

  const userLogin = (e) => {
    e.preventDefault();
    if (formValidation() === true) {
      const user = {
        email,
        password,
      };

      dispatch(login(user));
    } else {
      console.log('Form Validation failed');
    }
  };

  //If client is already signed in or has signed in successfully, client will be redirected to home page which is a private route i.e. can only be accessed by logged in users
  if (auth.authenticate) {
    return <Redirect to={'/'} />;
  }

  return (
    <Layout>
      <ToastContainer />
      <Container>
        <Row style={{ marginTop: '100px' }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={userLogin}>
              <Input
                label='Email'
                placeholder='Email'
                value={email}
                type='email'
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />

              <Input
                label='Password'
                placeholder='Password'
                value={password}
                type='Password'
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <Button variant='primary' type='submit'>
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Signin;
