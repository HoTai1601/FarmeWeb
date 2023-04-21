import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "./../../../components/Message/Message";
import Loader from "./../../../components/Loader/Loader";
import FormContainer from "./../../../components/FormContainer/FormContainer";
import {
  listConsumerProductsDetails,
  updateConsumer,
} from "./../../../actions/consumerProductAction";
import { CONSUMER_UPDATE_RESET } from "../../../constants/productConstants";
import Meta from "../../../components/Helmet/Meta";

const ConsumerListEdit = ({ match }) => {
  const [prodName, setProdName] = useState("");
  const [image, setImage] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [price, setPrice] = useState("");
  const [prodSize, setProdSize] = useState("");
  const [quantity, setQuantity] = useState("");
  const [avalaibleLoc, setAvalaibleLoc] = useState("");
  const [uploading, setUploading] = useState(false);

  const productId = match.params.id;

  const dispatch = useDispatch();
  let history = useHistory();

  const consumerProductDetails = useSelector(
    (state) => state.consumerProductDetails
  );
  const { loading, consumerProduct, error } = consumerProductDetails;

  const consumerUpdate = useSelector((state) => state.consumerUpdate);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = consumerUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: CONSUMER_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (!consumerProduct.prod_name || consumerProduct._id !== productId) {
        dispatch(listConsumerProductsDetails(productId));
      } else {
        setProdName(consumerProduct.prod_name);
        setSellerName(consumerProduct.seller_name);
        setPrice(consumerProduct.price);
        setImage(consumerProduct.image);
        setProdSize(consumerProduct.prod_size);
        setQuantity(consumerProduct.quantity);
        setAvalaibleLoc(consumerProduct.avalaible_location);
      }
    }
  }, [history, consumerProduct, dispatch, productId, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateConsumer({
        _id: productId,
        prod_name: prodName,
        image: image,
        price: price,
        seller_name: sellerName,
        prod_size: prodSize,
        quantity: quantity,
        avalaible_location: avalaibleLoc,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  return (
    <Container style={{ marginBottom: "50px" }}>
      <Meta title="Sugoi Ne | Admin  edit Sản Phẩm" />
      <FormContainer>
        <h2 style={{ marginTop: "120px", textAlign: "center" }}>Sản phẩm</h2>
        <Link to="/admin/productlist" className="btn btn-warning my-3">
          Trở lại
        </Link>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
        {successUpdate && (
          <Message variant="success">Cập nhật thông tin!</Message>
        )}
        <Form onSubmit={submitHandler}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="prodname">
                <Form.Label>Tên</Form.Label>
                <Form.Control
                  type="prodName"
                  placeholder="Nhập tên sản phẩm"
                  value={prodName}
                  onChange={(e) => setProdName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="image">
                <Form.Label>Hình ảnh</Form.Label>
                <Card>
                  <Card.Img src={image} variant="top" />
                </Card>
                <Form.Control
                  type="text"
                  placeholder=" Đường dẫn url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                ></Form.Control>
                <Form.File
                  id="image-file"
                  label="chọn ảnh từ máy"
                  custom
                  onChange={uploadFileHandler}
                ></Form.File>
                {uploading && <Loader />}
              </Form.Group>
              <Form.Group controlId="sellerName">
                <Form.Label>Người bán</Form.Label>
                <Form.Control
                  type="sellerName"
                  placeholder="Tên người bán"
                  value={sellerName}
                  onChange={(e) => setSellerName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="price">
                <Form.Label>Giá</Form.Label>
                <Form.Control
                  type="price"
                  placeholder="Giá"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="prodSize">
                <Form.Label>khối lượng</Form.Label>
                <Form.Control
                  type="prodSize"
                  placeholder="kg/cái"
                  value={prodSize}
                  onChange={(e) => setProdSize(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="quantity">
                <Form.Label>Số lượng</Form.Label>
                <Form.Control
                  type="countInStock"
                  placeholder=""
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="avalaibleLoc">
                <Form.Label>Sản phẩm tại kho</Form.Label>
                <Form.Control
                  type="avalaibleLoc"
                  placeholder="0HP"
                  value={avalaibleLoc}
                  onChange={(e) => setAvalaibleLoc(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button type="submit" variant="primary">
                cập nhật
              </Button>
            </Col>
          </Row>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default ConsumerListEdit;
