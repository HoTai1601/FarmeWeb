import React, { useEffect } from "react";
import {
  Container,
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "./../../components/CheckoutSteps/CheckoutSteps";
import Message from "../../components/Message/Message";
import { createOrder } from "./../../actions/orderAction";
import Meta from "../Helmet/Meta";

const PlaceOrder = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cartSeed);

  // Calculate Price
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = cart.cartItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2);
  cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 100;
  cart.taxPrice = addDecimals(Number(0.15 * cart.itemsPrice).toFixed(2));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, success]);

  const placeOrder = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <Container>
        <Meta title="Agroic | Order" />
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <CheckoutSteps step1 step2 step3 step4 />
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <ListGroup variant="flush" className="mb-3">
              <ListGroup.Item>
                <h1>?????a ch??? giao h??ng</h1>
                <p>
                  <strong>?????a ch??? : </strong>
                  {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                  {cart.shippingAddress.postalCode},{" "}
                  {cart.shippingAddress.country}
                </p>
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Ph????ng th???c thanh to??n</h2>
                <p>
                  <strong>Ph????ng th???c: </strong>
                  {cart.paymentMethod}
                </p>
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>S???n ph???m ?????t h??ng</h2>
                {cart.cartItems.length === 0 ? (
                  <Message>B???n kh??ng c?? s???n ph???m n??o trong gi???!</Message>
                ) : (
                  <ListGroup variant="flush">
                    {cart.cartItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>{item.name}</Col>
                          <Col md={4}>
                            {`${item.qty} x  ${item.price} =  ${
                              item.qty * item.price
                            } VND.`}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Chi ti???t ????n h??ng</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>T???ng ti???n</Col>
                    <Col>{`${cart.itemsPrice} VND`}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Ti???n ship</Col>
                    <Col>{`${cart.shippingPrice} VND`}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Thu???</Col>
                    <Col>{`${cart.taxPrice} VND`}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Th??nh ti???n</Col>
                    <Col>{`${cart.totalPrice} VND`}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  {error && (
                    <ListGroup.Item>
                      <Message variant="danger">{error}</Message>
                    </ListGroup.Item>
                  )}
                  <Button
                    type="button"
                    className="btn-block"
                    disabled={cart.cartItems === 0}
                    onClick={placeOrder}
                  >
                    X??c nh???n
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PlaceOrder;
