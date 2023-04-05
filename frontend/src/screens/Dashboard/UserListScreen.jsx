import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import UserList from "../../components/DashBoard/UserList/UserList";
import Meta from "../../components/Helmet/Meta";
import SideBarComponents from "../../components/SideBar/SideBarComponents";
import { Scrollbar } from "react-scrollbars-custom";

const UserListScreen = () => {
  return (
    <div style={{ marginTop: "110px" }}>
      <Meta title="Agroic | Admin Users" />
      <Container fluid>
        <Row>
          <Col md={3}>
            <h4>Người dùng</h4>
          </Col>
          <Col md={9}>
            <h4 style={{ marginLeft: "30px" }}>Danh sách người dùng</h4>
          </Col>
        </Row>
        <Scrollbar style={{ width: "100%", height: "80vh" }}>
          <Row>
            <Col md={3}>
              <SideBarComponents />
            </Col>
            <Col md={9}>
              <UserList />
            </Col>
          </Row>
        </Scrollbar>
      </Container>
    </div>
  );
};

export default UserListScreen;
