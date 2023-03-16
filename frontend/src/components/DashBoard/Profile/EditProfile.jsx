import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "./../../../components/Message/Message";
import Loader from "./../../../components/Loader/Loader";
import {
  getUserDetails,
  updateUserProfile,
} from "./../../../actions/userActions";
import { listMyOrders } from "./../../../actions/orderAction";

const EditProfile = ({ history }) => {
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

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
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

  return (
    <Container style={{ marginBottom: "50px", marginTop: "20px" }}>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {success && <Message variant="success">Bạn chắc chắn cập nhật!</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Row>
          <Col md={5}>
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
                type="email"
                placeholder="Nhập Gmail"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="cropSelection">
              <Form.Label>VAI TRÒ</Form.Label>
              <Form.Control
                type="cropSelection"
                placeholder="....."
                value={cropSelection}
                onChange={(e) => setCropSelection(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col md={5}>
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
                placeholder="Xác nhận mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Button type="submit" variant="primary">
          Cập nhật
        </Button>
      </Form>
    </Container>
  );
};

export default EditProfile;
