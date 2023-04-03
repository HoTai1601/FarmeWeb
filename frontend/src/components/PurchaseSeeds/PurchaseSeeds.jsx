import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Card, Col, Button } from "react-bootstrap";
import "./PurchaseSeeds.css";
import Rating from "../Rating/Rating";

const PurchaseSeeds = ({ _id, name, rating, image, reviews, price }) => {
  return (
    <Col sm={12} md={6} lg={4}>
      <Card className="my-3 p-3 ">
        <Card.Img
          className="image card-image mx-auto"
          src={image}
          variant="top"
        />
        <Card.Body>
          <LinkContainer to={`/farmers/purchaseSeeds/${_id}`}>
            <Card.Title className="title">
              <strong>
                {name.length >= 25 ? `${name.slice(0, 21)}...` : `${name}`}
              </strong>
            </Card.Title>
          </LinkContainer>
          <Card.Text className="f1">
            <Rating value={rating} text={`${reviews} reviews`} />
          </Card.Text>
          <Card.Text className="f1">
            <h5>Giá: {price} vnđ</h5>
          </Card.Text>
        </Card.Body>
        <Card.Footer className="card-f">
          <LinkContainer to={`/farmers/purchaseSeeds/${_id}`}>
            <Button varient="success">Mua hàng</Button>
          </LinkContainer>
          <LinkContainer to={`/farmers/purchaseSeeds/${_id}`}>
            <Button varient="success">Xem thêm</Button>
          </LinkContainer>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default PurchaseSeeds;
