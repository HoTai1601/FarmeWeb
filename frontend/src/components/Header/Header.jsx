import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar, NavDropdown, Image } from "react-bootstrap";
import "./Header.css";

import { logout } from "./../../actions/userActions";
import SearchForm from "./SearchForm";

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Navbar collapseOnSelect expand="lg" fixed="top">
      <LinkContainer to="/">
        <Navbar.Brand className="nav-cal">
          <Image width="100px" src="/Logo1.png" />
        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="icon-menu" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto ">
          <LinkContainer to="/">
            <Nav.Link className="nav-cal">Trang Chủ</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/farmer">
            <Nav.Link className="nav-cal">Nông Dân</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/consumer">
            <Nav.Link className="nav-cal">Sản Phẩm</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/supplier">
            <Nav.Link className="nav-cal">Đăng ký bán hàng</Nav.Link>
          </LinkContainer>
          {/* search */}
          <SearchForm />
          <LinkContainer to="/cart">
            <Nav.Link
              className={`${
                userInfo ? "remove-space" : "add-space cart nav-cal"
              } `}
            >
              <i className="fas fa-shopping-cart"></i>
              Giỏ Hàng
            </Nav.Link>
          </LinkContainer>
          {userInfo ? (
            <NavDropdown title={userInfo.name.toUpperCase()} id="username">
              {userInfo && userInfo.isAdmin && (
                <LinkContainer to="/admin/dashboard">
                  <NavDropdown.Item>Dashboard</NavDropdown.Item>
                </LinkContainer>
              )}
              <LinkContainer to="/profile">
                <NavDropdown.Item>Trang Cá Nhân</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/login">
                <NavDropdown.Item onClick={logoutHandler}>
                  Đăng Xuất
                </NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          ) : (
            <LinkContainer to="/login">
              <Nav.Link className="login nav-cal">Đăng Nhập</Nav.Link>
            </LinkContainer>
          )}
          {userInfo && userInfo.isAdmin && (
            <NavDropdown title="ADMIN" id="adminmenu">
              <LinkContainer to="/admin/userlist">
                <NavDropdown.Item>Người Dùng</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/admin/productlist">
                <NavDropdown.Item>Sản Phẩm</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/admin/orderlist">
                <NavDropdown.Item>Đơn Hàng</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
