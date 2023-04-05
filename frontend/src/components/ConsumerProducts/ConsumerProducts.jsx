import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Card, Col, Button } from "react-bootstrap";
import "./ConsumerProduts.css";

const ConsumerProducts = ({
  _id,
  prod_name,
  image,
  price,
  avalaible_location,
  prod_size,
}) => {
  return (
    <Col sm={12} md={6} lg={4}>
      <Card className="my-3 p-3 ">
        <Card.Img className="image-c image mx-auto" src={image} variant="top" />
        <Card.Body>
          <LinkContainer to={`/consumer/${_id}`}>
            <Card.Title className="prod-title" as="div">
              {prod_name}
            </Card.Title>
          </LinkContainer>
          <Card.Text className="card-text-c" as="h5">
            Giá: {price} vnd <br />
            Khối lượng: {prod_size}
          </Card.Text>
          <Card.Text className="card-text-c" as="p">
            Tại <span style={{ fontWeight: "bold" }}>{avalaible_location}</span>
          </Card.Text>
        </Card.Body>
        <Card.Footer className="card-f2">
          <LinkContainer to={`/consumer/${_id}`}>
            <Button varient="success">Mua hàng</Button>
          </LinkContainer>
          <LinkContainer to={`/consumer/${_id}`}>
            <Button varient="success">Xem thêm</Button>
          </LinkContainer>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default ConsumerProducts;
