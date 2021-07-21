import React from 'react';
import Header from '../Header';
import { Container, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './style.css';

/**
 * @author
 * @function Layout
 **/

//General layout that can be used for each page of web-app
const Layout = (props) => {
  return (
    <>
      <Header />
      {props.sidebar ? (
        <Container fluid>
          <Row>
            <Col md={2} className='sidebar'>
              <ul>
                <li>
                  <NavLink exact to={`/`}>
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/expenses`}>Expenses</NavLink>
                </li>
                <li>
                  <NavLink to={`/report`}>Report</NavLink>
                </li>
              </ul>
            </Col>
            <Col md={10} style={{ marginLeft: 'auto', paddingTop: '60px' }}>
              {props.children}
            </Col>
          </Row>
        </Container>
      ) : (
        props.children
      )}
    </>
  );
};

export default Layout;
