import React from "react";
import { Container, Row, CardDeck, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Meta from "../../components/Helmet/Meta";
import "./FarmerStyle.css";

const FarmerScreen = () => {
  return (
    <div>
      <Meta title="Agroic | Farmers" />
      <Container className="farmerContainer">
        <h1 className="title">Nông Dân</h1>
        <h4 className="farmer-title">
          Nếu bạn là nông dân thì bạn đang ở một trang web hoàn hảo.Bạn có thể
          đặt hàng tất cả các sản phẩm liên quan đến nông nghiệp của mình và bạn
          cũng có thể bán sản phẩm của mình thông qua các thao tác đơn giản.
        </h4>
        <Row className="row-one justify">
          <CardDeck>
            <Card border="primary" style={{ width: "25rem" }}>
              <Card.Body>
                <Card.Title className="card-titile">
                  Hạt giống, thuốc trừ sâu và phân bón.
                </Card.Title>
                <LinkContainer to="/farmers/purchaseSeeds">
                  <Button className="btn-explore1 btn-md ">Xem chi tiết</Button>
                </LinkContainer>
              </Card.Body>
            </Card>
            <Card border="primary" style={{ width: "25rem" }}>
              <Card.Body>
                <Card.Title className="card-titile">
                  Bầy bán các nông sản tại đây.
                </Card.Title>
                <LinkContainer to="/login?redirect=supplier">
                  <Button className="btn-explore1 btn-md ">Xem chi tiết</Button>
                </LinkContainer>
              </Card.Body>
            </Card>
            <Card border="primary" style={{ width: "25rem" }}>
              <Card.Body>
                <Card.Title className="card-titile">
                  Các máy móc và thiết bị phục vụ cho nông nghiệp.
                </Card.Title>
                <LinkContainer to="/farmers/lendMachines">
                  <Button variant="primary" className="btn-explore1 btn-md ">
                    Xem chi tiết
                  </Button>
                </LinkContainer>
              </Card.Body>
            </Card>
          </CardDeck>
        </Row>
      </Container>
    </div>
  );
};

export default FarmerScreen;
