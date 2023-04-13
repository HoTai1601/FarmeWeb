import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Card, Col, Button } from "react-bootstrap";
import "./LendMachines.css";

const LendMachines = ({ _id, name, image, targetPlant, price }) => {
  return (
    <Col sm={12} md={6} lg={4}>
      <Card className="my-3 p-3">
        <Card.Img
          className="image card-image mx-auto"
          src={image}
          variant="top"
        />
        <Card.Body>
          <LinkContainer to={`/farmers/lendMachines/${_id}`}>
            <Card.Title className="title">
              <strong>
                {name.length >= 25 ? `${name.slice(0, 21)}...` : `${name}`}
              </strong>
            </Card.Title>
          </LinkContainer>
          <Card.Text style={{ minHeight: "100px" }}>
            <span style={{ fontWeight: "bold" }}>Sử dụng cho </span>
            <br /> {targetPlant}
          </Card.Text>
          <Card.Text>
            <h5>Giá: {price} VND</h5>
          </Card.Text>
          <Card.Footer className="card-f1">
            <LinkContainer to={`/farmers/lendMachines/${_id}`}>
              <Button varient="success">Mua hàng</Button>
            </LinkContainer>
            <LinkContainer to={`/farmers/lendMachines/${_id}`}>
              <Button varient="success">Xem thêm</Button>
            </LinkContainer>
          </Card.Footer>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default LendMachines;
