import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import OrderList from "../../components/DashBoard/OrderList/OrderList";
import Meta from "../../components/Helmet/Meta";
import SideBarComponents from "../../components/SideBar/SideBarComponents";
import { Scrollbar } from "react-scrollbars-custom";

const OrderListScreen = () => {
  return (
    <div style={{ marginTop: "110px" }}>
      <Meta title="Sugoi Ne | Admin Đơn Hàng" />
      <Container fluid>
        <Row>
          <Col md={3}>
            <h4>Đơn hàng Nông sản</h4>
          </Col>
          <Col md={9}>
            <h4 style={{ marginLeft: "30px" }}>Tổng đơn hàng</h4>
          </Col>
        </Row>
        <Scrollbar style={{ width: "100%", height: "80vh" }}>
          <Row>
            <Col md={3}>
              <SideBarComponents />
            </Col>
            <Col md={9}>
              <OrderList />
            </Col>
          </Row>
        </Scrollbar>
      </Container>
    </div>
  );
};

export default OrderListScreen;
