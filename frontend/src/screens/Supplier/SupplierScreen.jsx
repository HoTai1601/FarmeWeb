import React from "react";
import { Container } from "react-bootstrap";
import Meta from "../../components/Helmet/Meta";
import AddSupplierProduct from "../../components/SupplierProduct/AddSupplierProduct";
import "./supplierStyles.css";

const SupplierScreen = () => {
  return (
    <Container className="supplierContainer">
      <Meta title="Sugoi Ne | Đăng Ký Bán" />
      <h1 className="title">Đăng ký bán hàng</h1>
      <h4 className="supplier-title">
        Các bác Nông dân đừng lo lắng về nông sản tồn kho hay thương lái ép giá,
        hãy điền thông tin và gửi hình ảnh vào đây. Việc còn lại các bác cứ yên
        tâm, từ giá cả hay giao hàng Sugoi Ne sẽ hỗ trợ hết mức.
      </h4>
      <br />
      <AddSupplierProduct />
    </Container>
  );
};

export default SupplierScreen;
