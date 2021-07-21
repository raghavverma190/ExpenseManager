import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import Input from '../../components/UI/Input';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import validator from 'validator';
import { signup } from '../../actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
/**
 * @author
 * @function Signup
 **/

const Signup = (props) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const auth = useSelector((state) => state.auth);
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const formValidation = () => {
    //Form Validation for registering
    if (fullName.length < 3) {
      toast.error('Name must at least have length of 3 characters');
      return false;
    }
    if (password.length < 6) {
      toast.error('Password must include at least 6 characters');
      return false;
    }
    if (!validator.isEmail(email)) {
      toast.error('Valid email required');
      return false;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords entered do not match');
      return false;
    }
    return true;
  };

  //If error is recieved from server, it is stored in user state
  //If error is present in user state, it will be displayed using toastify
  useEffect(() => {
    if (userState.error) {
      toast.error(userState.error);
    } else if (userState.message) {
      props.history.push(`/signin`);
    }
  }, [userState]);

  const userSignup = (e) => {
    e.preventDefault();
    if (formValidation() === true) {
      const user = {
        fullName,
        email,
        password,
      };
      dispatch(signup(user));
    } else {
      console.log('Form Validation failed');
    }

    //If client is already signed in,client will be redirected to home page which is a private route i.e. only logged in clients can access it
    if (auth.authenticate) {
      return <Redirect to={'/'} />;
    }

    //If userState in redux is in loading state(request is being processed by server) paragraph with loading is displayed
    if (userState.loading) {
      return <p>Loading...</p>;
    }
  };

  return (
    <Layout>
      <ToastContainer />
      <Container>
        <Row style={{ marginTop: '100px' }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={userSignup}>
              <Input
                label='Full Name'
                placeholder='Full Name'
                value={fullName}
                type='text'
                onChange={(e) => setFullName(e.target.value)}
              />
              <Input
                label='Email'
                placeholder='Email'
                value={email}
                type='email'
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                label='Password'
                placeholder='Password'
                value={password}
                type='Password'
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input
                label='Confirm Password'
                placeholder='Confirm Password'
                value={confirmPassword}
                type='Password'
                onChange={(e) => setConfirmPassword(e.target.value)}
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

export default Signup;
