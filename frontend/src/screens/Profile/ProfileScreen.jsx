import React, { useState, useEffect, useRef } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Container,
  Table,
  Image,
  Overlay,
  Popover,
} from "react-bootstrap";
import { Scrollbar } from "react-scrollbars-custom";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "./../../components/Message/Message";
import Loader from "./../../components/Loader/Loader";
import { getUserDetails, updateUserProfile } from "../../actions/userActions";
import { listMyOrders } from "./../../actions/orderAction";
import { listMyProducts } from "./../../actions/supplierProduct";
import Meta from "../../components/Helmet/Meta";

const ProfileScreen = ({ history }) => {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cropSelection, setCropSelection] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, user, error } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  const supplierProdictListMy = useSelector(
    (state) => state.supplierProdictListMy
  );
  const {
    loading: loadingProducts,
    error: errorProducts,
    products,
  } = supplierProdictListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
        dispatch(listMyProducts());
      } else {
        setName(user.name);
        setEmail(user.email);
        setCropSelection(user.cropSelection);
      }
    }
  }, [userInfo, history, user, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name,
          email,
          password,
          cropSelection,
        })
      );
    }
  };

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  return (
    <Container fluid style={{ marginBottom: "50px" }}>
      <Meta title="Sugoi Ne | Profile" />
      <Row>
        <Col md={3}>
          <h3 style={{ marginTop: "110px" }}>Thông tin người dùng</h3>
          {message && <Message variant="danger">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          {success && (
            <Message variant="success">Bạn có chắc chắn cập nhật!</Message>
          )}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>
                Tên <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="name"
                placeholder="Nhập tên"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>
                Địa chỉ Gmail <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="nic"
                placeholder="Nhập địa chỉ Gmail"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="cropSelection">
              <Form.Label>Khu vực</Form.Label>
              <Form.Control
                type="cropSelection"
                placeholder=" "
                value={cropSelection}
                onChange={(e) => setCropSelection(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Mật khẩu mới</Form.Label>
              <Form.Control
                type="password"
                placeholder="Nhập mật khẩu mới"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label>Xác nhận mật khẩu</Form.Label>
              <Form.Control
                type="password"
                placeholder="xác nhận mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary">
              Cập nhật
            </Button>
          </Form>
        </Col>
        <Col md={9}>
          <Scrollbar style={{ width: "100%", height: 630 }}>
            <Container fluid>
              <Row>
                <h2 style={{ marginTop: "110px" }}>Đơn hàng</h2>
                {loadingOrders ? (
                  <Loader />
                ) : errorOrders ? (
                  <Message variant="danger">{errorOrders}</Message>
                ) : (
                  <Table striped bordered hover responsive className="table-sm">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>NGÀY ĐẶT</th>
                        <th>TỔNG TIỀN</th>
                        <th>THANH TOÁN</th>
                        <th>TÌNH TRẠNG</th>
                        <th>THÊM</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order._id}>
                          <td>{order._id}</td>
                          <td>{order.createdAt.substring(0, 10)}</td>
                          <td>{order.totalPrice}</td>
                          <td>
                            {order.isPaid ? (
                              <i
                                className="fa fa-check"
                                styles={{ color: "green" }}
                              ></i>
                            ) : (
                              <i
                                className="fas fa-times"
                                styles={{ color: "red" }}
                              ></i>
                            )}
                          </td>
                          <td>
                            {order.isDelivered ? (
                              <i
                                className="fa fa-check"
                                styles={{ color: "green" }}
                              ></i>
                            ) : (
                              <i
                                className="fas fa-times"
                                styles={{ color: "red" }}
                              ></i>
                            )}
                          </td>
                          <td>
                            <LinkContainer to={`/order/${order._id}`}>
                              <Button className="btn-sm" variant="success">
                                Chi tiết
                              </Button>
                            </LinkContainer>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </Row>
              <Row>
                <h2 style={{ marginTop: "110px" }}>Sản phảm đăng ký bán</h2>
                {loadingProducts ? (
                  <Loader />
                ) : errorProducts ? (
                  <Message variant="danger">{errorProducts}</Message>
                ) : (
                  <Table striped bordered hover responsive className="table-sm">
                    <thead>
                      <tr>
                        <th>TÊN</th>
                        <th>GMAIL</th>
                        <th>ĐỊA CHỈ</th>
                        <th>ẢNH</th>
                        <th>LOẠI</th>
                        <th>XÉT DUYỆT</th>
                        <th>CHỈNH SỬA</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product._id}>
                          <td>{product.name}</td>
                          <td>{product.email}</td>
                          <td>{product.address}</td>
                          <td>
                            <Image width={70} rounded src={product.image} />
                          </td>
                          <td>{product.cropSelection}</td>
                          <td style={{ textAlign: "center" }}>
                            {product.isReviwed ? (
                              <Button
                                className="mt-2"
                                ref={target}
                                onClick={handleClick}
                              >
                                {" "}
                                Kiểm tra
                              </Button>
                            ) : (
                              <i
                                className="fas fa-times"
                                style={{ color: "red", fontSize: "24px" }}
                              ></i>
                            )}
                            <Overlay
                              show={show}
                              target={target}
                              placement="bottom"
                              container={ref.current}
                              containerPadding={10}
                            >
                              <Popover id="popover-contained">
                                <Popover.Title as="h3">
                                  Sao: {product.rating}
                                </Popover.Title>
                                {product.reviews.map((review) => (
                                  <Popover.Content key={review._id}>
                                    <strong>Phản hồi: {review.comment}</strong>
                                  </Popover.Content>
                                ))}
                              </Popover>
                            </Overlay>
                          </td>
                          <td>
                            <LinkContainer
                              to={`/supplierproducts/${product._id}/edit`}
                            >
                              <Button variant="light" className="btn btn-sm">
                                <i className="fas fa-edit"></i>
                              </Button>
                            </LinkContainer>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </Row>
            </Container>
          </Scrollbar>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileScreen;
