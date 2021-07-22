import React, { Fragment } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signout } from '../../actions';

/**
 * @author
 * @function Header
 **/

const Header = (props) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(signout());
  };

  //Links rendered when user is logged in
  const renderLoggedInLinks = () => {
    return (
      <Nav>
        <li className='nav-item'>
          <span className='nav-link' onClick={logout}>
            Signout
          </span>
        </li>
      </Nav>
    );
  };

  //links rendered when user is logged out
  const renderNonLoggedInLinks = () => {
    return (
      <Nav>
        {/* <Nav.Link href="#deets">Signin</Nav.Link> */}
        <li className='nav-item'>
          <NavLink to='signin' className='nav-link'>
            Signin
          </NavLink>
        </li>
        <li className='nav-item'>
          <NavLink to='signup' className='nav-link'>
            Signup
          </NavLink>
        </li>
      </Nav>
    );
  };

  return (
    <Navbar
      collapseOnSelect
      fixed='top'
      expand='lg'
      bg='dark'
      variant='dark'
      style={{ zIndex: 100 }}
    >
      <Container fluid>
        <Navbar.Brand as={Link} exact to='/'>
          <img
            src='https://cdn.imgbin.com/20/14/23/imgbin-daily-expense-manager-expense-management-business-business-SJ4qxfKjHp2UPp5bGrVqUAvJP.jpg'
            width='35'
            height='35'
          />
        </Navbar.Brand>
        <Link exact to='/' className='navbar-brand'>
          Expense Manager
        </Link>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto'>
            {auth.authenticate ? ( //ensures user is logged in by checking auth state in redux
              <Fragment>
                <Nav.Link as={Link} exact to='/'>
                  Dashboard
                </Nav.Link>
                <Nav.Link as={Link} to='/expenses'>
                  Expenses
                </Nav.Link>
                <Nav.Link as={Link} to='/report'>
                  Report
                </Nav.Link>
              </Fragment>
            ) : null}
          </Nav>
          {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
