import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "./../../../components/Message/Message";
import Loader from "./../../../components/Loader/Loader";
import FormContainer from "./../../../components/FormContainer/FormContainer";
import {
  listSeedProductsDetails,
  updateSeedProducts,
} from "./../../../actions/productSeedActions";
import { SEED_UPDATE_RESET } from "../../../constants/productConstants";
import Meta from "../../../components/Helmet/Meta";

const SeedListEdit = ({ match }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [uploading, setUploading] = useState(false);

  const productId = match.params.id;

  const dispatch = useDispatch();
  let history = useHistory();

  const prodcutSeedDetails = useSelector((state) => state.prodcutSeedDetails);
  const { loading, productSeed, error } = prodcutSeedDetails;

  const seedUpdate = useSelector((state) => state.seedUpdate);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = seedUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: SEED_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (!productSeed.name || productSeed._id !== productId) {
        dispatch(listSeedProductsDetails(productId));
      } else {
        setName(productSeed.name);
        setDescription(productSeed.description);
        setPrice(productSeed.price);
        setCategory(productSeed.category);
        setImage(productSeed.image);
        setCountInStock(productSeed.countInStock);
      }
    }
  }, [history, productSeed, dispatch, productId, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateSeedProducts({
        _id: productId,
        name,
        image,
        description,
        category,
        price,
        countInStock,
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
      <Meta title="Sugoi Ne | Admin Edit Hạt Giống" />
      <FormContainer>
        <h2 style={{ marginTop: "100px", textAlign: "center" }}>Hạt giống</h2>
        <Link to="/admin/productlist" className="btn btn-warning my-3">
          Trở lại
        </Link>
        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {successUpdate && (
          <Message variant="success">Cập nhập thông tin!</Message>
        )}
        <Form onSubmit={submitHandler}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="name">
                <Form.Label>Tên</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Nhập tên"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="image">
                <Form.Label>Hình ảnh</Form.Label>
                <Card>
                  <Card.Img src={image} variant="top" />
                </Card>
                <Form.Control
                  type="text"
                  placeholder="Nhập đường dẫn url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                ></Form.Control>
                <Form.File
                  id="image-file"
                  label="chọn ảnh"
                  custom
                  onChange={uploadFileHandler}
                ></Form.File>
                {uploading && <Loader />}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="description">
                <Form.Label>Mô tả</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  type="description"
                  placeholder="Viết mô tả"
                  style={{ resize: "none" }}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="category">
                <Form.Label>Loại</Form.Label>
                <Form.Control
                  type="category"
                  placeholder="Hàng hóa loại gì..."
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
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
              <Form.Group controlId="countInStock">
                <Form.Label>Số lượng</Form.Label>
                <Form.Control
                  type="countInStock"
                  placeholder="Nhập số lượng"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button type="submit" variant="primary">
                Cập nhật
              </Button>
            </Col>
          </Row>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default SeedListEdit;
