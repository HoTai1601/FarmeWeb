import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Button, Alert } from "react-bootstrap";
import ConsumerProducts from "./../../components/ConsumerProducts/ConsumerProducts";
import { listConsumerProducts } from "./../../actions/consumerProductAction.js";
import Message from "./../../components/Message/Message";
import Loader from "./../../components/Loader/Loader";
import "./ConsumerStyles.css";
import Meta from "../../components/Helmet/Meta";

const ConsumerScreen = () => {
  const dispatch = useDispatch();

  const consumerProductList = useSelector((state) => state.consumerProductList);
  const { loading, consumerProducts, error } = consumerProductList;

  const [numberOfItems, setNumberOfItems] = useState(3);

  useEffect(() => {
    dispatch(listConsumerProducts());
  }, [dispatch]);

  const showMore = () => {
    if (numberOfItems + 3 <= consumerProducts.length) {
      setNumberOfItems(numberOfItems + 3);
    } else {
      setNumberOfItems(consumerProducts.length);
    }
  };

  return (
    <div className="consumerProductScreen">
      <Meta title="Agroic | Consumer" />
      <Container className="consumerContainer">
        <h1 className="title">Khách hàng</h1>
        <h4 className="consumer-title">
          Không cần phải đến cánh đồng để lấy ngũ cốc!!! Chỉ cần đặt hàng tại
          đây và nhận tất cả các loại garin được giao ngay trước cửa nhà bạn.
          Tại sao phải chờ đợi? Đi và đặt hàng.
        </h4>
        <br />
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Row>
            {consumerProducts.slice(0, numberOfItems).map((consumer) => (
              <ConsumerProducts
                key={consumer._id}
                _id={consumer._id}
                prod_name={consumer.prod_name}
                seller_name={consumer.seller_name}
                image={consumer.image}
                price={consumer.price}
                prod_size={consumer.prod_size}
                avalaible_location={consumer.avalaible_location}
                quantity={consumer.quantity}
              />
            ))}
            {numberOfItems >= consumerProducts.length ? (
              <Alert
                style={{ backgroundColor: "red" }}
                className="col-md-12 text-center"
              >
                Hết Hàng
              </Alert>
            ) : (
              ""
            )}
            <Button
              className="col-md-12 text-center"
              variant="success outline-dark"
              onClick={showMore}
            >
              Xem thêm
            </Button>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default ConsumerScreen;
