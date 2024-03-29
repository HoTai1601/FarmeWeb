import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "./../../components/CheckoutSteps/CheckoutSteps";
import FormContainer from "../../components/FormContainer/FormContainer";
import { savePaymentMethod } from "./../../actions/cartActions.js";
import Meta from "../../components/Helmet/Meta";

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cartSeed);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("Thanh toán tại nhà");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <FormContainer>
        <Meta title="Sugoi Ne | Payment" />
        <CheckoutSteps step1 step2 step3 />
        <h3>Chọn phương thức thanh toán</h3>
        <Form onSubmit={submitHandler} style={{ marginBottom: "40px" }}>
          <Form.Group>
            <Form.Label as="legend">Chọn phương thức</Form.Label>

            <Col>
              <Form.Check
                type="radio"
                label="Paypal or Credit Card"
                id="paypal"
                name="paymentMethod"
                value="PayPal"
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
              <Form.Check
                type="radio"
                label="Thanh toán tại nhà"
                id="payAtHome"
                name="paymentMethod"
                value="Thanh toán tại nhà"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
          </Form.Group>
          <Button type="submit">Tiếp theo</Button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default PaymentScreen;
