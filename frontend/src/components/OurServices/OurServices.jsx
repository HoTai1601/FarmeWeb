import React from "react";
import { Col, Container, Row, Image } from "react-bootstrap";
import "./ourSerices.css";

const OurServices = () => {
  return (
    <Container className="main" fluid>
      <h1 className="main-title">Chúng tôi có các dịch vụ</h1>
      <p className="description">
        Trang thương mại điện tử được thực hiện bởi công ty Sugoi Ne. Với mục
        tiêu là mang lại nhiều hàng hóa và sản phẩm nông sản sạch, tươi ngon và
        đảm bảo chất lượng, an toàn vệ sinh thực phẩm. Bên cạnh các hàng hóa đảm
        bảo, còn mang đến cho các bạn những dịch vụ tiện lợi<i className=""></i>
      </p>
      <Container className="services">
        <Row>
          <Col md={3}>
            <h5 className="sub-title">Máy móc thiết bị</h5>
            <Image className="img" src="images/services/heavy.svg" fluid />
            <p className="sub-desc">
              Ngày nay, nông nghiệp ngày càng hiện đại tại sao các Nông dân lại
              không chuyển đổi cơ cấu để gia tăng năng suất.
            </p>
          </Col>
          <Col md={3}>
            <h5 className="sub-title">Hạt giống</h5>
            <Image className="img" src="images/services/gardening.svg" fluid />
            <p className="sub-desc">
              Chúng tôi có các loại hạt giống cây trồng có sức chống chịu tốt và
              mang lại năng suất tốt, kèm theo giá thành lại rẻ.
            </p>
          </Col>
          <Col md={3}>
            <h5 className="sub-title">Thu mua nông sản</h5>
            <Image className="img" src="images/services/supplier.svg" fluid />
            <p className="sub-desc">
              Các nông dân có thể bán sản phẩm tại đây chỉ cần cung cấp các
              thông tin cần thiết.
            </p>
          </Col>
          <Col md={3}>
            <h5 className="sub-title">Các mặt hàng nông sản</h5>
            <Image className="img" src="images/services/consumer.svg" fluid />
            <p className="sub-desc">
              Tại sao các bạn lại không đặt hàng tại đây? Vì nơi đây có các mặt
              hàng tươi ngon, đảm bảo chất lượng.
            </p>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default OurServices;
