import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "./../../components/CheckoutSteps/CheckoutSteps";
import FormContainer from "../../components/FormContainer/FormContainer";
import { saveShippingAddress } from "./../../actions/cartActions.js";
import Meta from "../../components/Helmet/Meta";

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cartSeed);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push("/payment");
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <FormContainer>
        <Meta title="Sugoi Ne | Shipping" />
        <CheckoutSteps step1 step2 />
        <h3>Địa chỉ giao hàng</h3>
        <Form onSubmit={submitHandler} style={{ marginBottom: "40px" }}>
          <Form.Group controlId="address">
            <Form.Label>
              Đường <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Đường"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="city">
            <Form.Label>
              Phường<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Phường"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="postalCode">
            <Form.Label>
              Quận<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Quận"
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="country">
            <Form.Label>
              Thành phố <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Thành phố"
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit">Tiếp theo</Button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default ShippingScreen;
