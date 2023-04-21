import React, { useEffect, useState } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "./../../actions/orderAction";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "./../../constants/orderConstant";
import Meta from "../../components/Helmet/Meta";

const OrderScreen = ({ match }) => {
  const orderId = match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const dispatch = useDispatch();
  let history = useHistory();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const orderPay = useSelector((state) => state.orderPay);
  const { success: successPay, loading: loadingPay } = orderPay;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { success: successDeliver, loading: loadingDeliver } = orderDeliver;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    // Add paypal script to body
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!orderId || !order || successPay || successDeliver) {
      dispatch(getOrderDetails(orderId));

      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
    } else if (
      !order.isPaid &&
      userInfo._id === order.user._id &&
      order.paymentMethod === "PayPal"
    ) {
      setTimeout(() => {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }, 1000);
    }
  }, [dispatch, orderId, successPay, order, successDeliver, history, userInfo]);

  const onSuccessPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };
  return (
    <div>
      <Meta title="Sugoi Ne | Đơn Hàng" />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Container style={{ marginTop: "120px" }}>
          <h2>Đơn hàng {order._id}</h2>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush" className="mb-3">
                <ListGroup.Item>
                  <h1>Địa chỉ giao hàng</h1>
                  <p>
                    <strong>Tên: </strong>
                    {order.user.name}
                  </p>
                  <p>
                    <strong>Gmail: </strong>
                    <a href={`mailto:${order.user.email}`}>
                      {order.user.email}
                    </a>
                  </p>
                  <p>
                    <strong>Địa chỉ : </strong>
                    {order.shippingAddress.address},{" "}
                    {order.shippingAddress.city}{" "}
                    {order.shippingAddress.postalCode},{" "}
                    {order.shippingAddress.country}
                  </p>
                  {order.isDelivered ? (
                    <Message variant="success">
                      Xác nhận địa chỉ giao hàng thành công
                    </Message>
                  ) : (
                    <Message variant="danger">
                      Xác nhận địa chỉ giao hàng thất bại
                    </Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Phương thức thanh toán</h2>
                  <p>
                    <strong>Phương thức : </strong>
                    {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <Message variant="success">
                      Thanh toán thành công {order.paidAt}
                    </Message>
                  ) : (
                    <Message variant="danger">
                      Trạng thái: Chưa thanh toán
                    </Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Tổng sản phẩm</h2>
                  {order.length === 0 ? (
                    <Message>Bạn chưa đặt hàng</Message>
                  ) : (
                    <ListGroup variant="flush">
                      {order.orderItems.map((item, index) => (
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
                              {`${item.qty} x ${item.price} = ${
                                item.qty * item.price
                              } vnd`}
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
                    <h2>Đơn hàng</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Thành tiền</Col>
                      <Col>{`${
                        order.totalPrice -
                        (order.taxPrice + order.shippingPrice).toFixed(2)
                      } vnd`}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tiền ship</Col>
                      <Col>{`${order.shippingPrice} vnd`}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Thuế</Col>
                      <Col>{`${order.taxPrice} vnd`}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tổng tiền</Col>
                      <Col>{`${order.totalPrice} vnd`}</Col>
                    </Row>
                  </ListGroup.Item>
                  {!order.isPaid && (
                    <ListGroup.Item>
                      {loadingPay && <Loader />}
                      {!sdkReady ? (
                        <Loader />
                      ) : (
                        <PayPalButton
                          amount={order.totalPrice}
                          onSuccess={onSuccessPaymentHandler}
                        />
                      )}
                    </ListGroup.Item>
                  )}
                  {loadingDeliver && <Loader />}
                  {userInfo &&
                    userInfo.isAdmin &&
                    order.isPaid &&
                    !order.isDelivered && (
                      <ListGroup.Item>
                        <Button
                          type="button"
                          className="btn btn-block"
                          onClick={deliverHandler}
                        >
                          {" "}
                          thành công{" "}
                        </Button>
                      </ListGroup.Item>
                    )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default OrderScreen;
