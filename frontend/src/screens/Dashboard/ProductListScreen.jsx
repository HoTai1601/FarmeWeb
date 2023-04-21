import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProductListHome from "../../components/DashBoard/ProductList/ProductListHome";
import Meta from "../../components/Helmet/Meta";
import SideBarComponents from "../../components/SideBar/SideBarComponents";

const ProductListScreen = () => {
  return (
    <div style={{ marginTop: "110px" }}>
      <Meta title="Sugoi Ne | Admin Sản Phẩm" />
      <Container fluid>
        <Row>
          <Col md={3}>
            <h4>Nông sản</h4>
          </Col>
          <Col md={9}>
            <h4 style={{ marginLeft: "30px" }}>Danh sách sản phẩm</h4>
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <SideBarComponents />
          </Col>
          <Col md={9}>
            <ProductListHome />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductListScreen;
