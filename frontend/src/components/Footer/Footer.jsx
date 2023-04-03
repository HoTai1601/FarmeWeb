import React from "react";
import { Link, BrowserRouter } from "react-router-dom";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { Form, Button } from "react-bootstrap";

import "./Footer.css";

const Footer = () => {
  return (
    <BrowserRouter>
      <MDBFooter
        color="blue-grey"
        className="page-footer font-small lighten-5 pt-0"
      >
        {/* <div style={{ backgroundColor: "red" }}>
          <MDBContainer>
            <MDBRow className="py-1 d-flex align-items-center">
              <MDBCol
                md="6"
                lg="5"
                className="text-center text-md-left mb-4 mb-md-0"
              >
                <h6 className="mb-0 " style={{ color: "white" }}>
                  {" "}
                  Get connected with us on social networks!
                </h6>
              </MDBCol>
              <MDBCol md="6" lg="7" className="text-center text-md-right">
                <Link to="/" className="fb-ic ml-0">
                  <i className="fab fa-facebook-f white-text mr-lg-4"> </i>
                </Link>
                <Link to="/" className="tw-ic">
                  <i className="fab fa-twitter white-text mr-lg-4"> </i>
                </Link>
                <Link to="/" className="gplus-ic">
                  <i className="fab fa-google-plus-g white-text mr-lg-4"> </i>
                </Link>
                <Link to="/" className="li-ic">
                  <i className="fab fa-linkedin-in white-text mr-lg-4"> </i>
                </Link>
                <Link to="/" className="ins-ic">
                  <i className="fab fa-instagram white-text mr-lg-4"> </i>
                </Link>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div> */}
        <MDBContainer className="mt-0 text-center text-md-left">
          <MDBRow className="">
            <MDBCol md="3" lg="3" xl="3" className=" dark-grey-text">
              <h6 className="text-uppercase font-weight-bold title-f">
                <strong>Thông tin</strong>
              </h6>
              <hr
                className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
                style={{ width: "60px" }}
              />
              <p>
                Công ty chúng tôi là một trong những đơn vị lớn nhất Việt Nam
                trong lĩnh vực xuất nhập khẩu nông sản với các mặt hàng. Hằng
                năm, Su Goine xuất khẩu các hàng hóa đạt tiêu chuẩn chất lượng
                cao sang thị trường các nước Châu Mỹ, Châu Âu, Châu Phi, Trung
                Đông và các nước châu Á khác. Ngoài mặt hàng chủ đạo thì còn mở
                rộng thêm các mặt hàng khác như máy móc, thiết bị và hạt giống.
              </p>
            </MDBCol>
            <MDBCol md="2" lg="2" xl="2" className=" dark-grey-text">
              <h6 className="text-uppercase font-weight-bold title-f">
                <strong>Links</strong>
              </h6>
              <hr
                className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
                style={{ width: "60px" }}
              />
              <p>
                <Link to="/farmer" className="dark-grey-text">
                  Nông Dân
                </Link>
              </p>
              <p>
                <Link to="/consumer" className="dark-grey-text">
                  Sản Phẩm{" "}
                </Link>
              </p>
              <p>
                <Link to="/supplier" className="dark-grey-text">
                  Đăng ký bán hàng
                </Link>
              </p>
              <p>
                <Link to="/cart" className="dark-grey-text">
                  Giỏ Hàng
                </Link>
              </p>
            </MDBCol>
            <MDBCol md="3" lg="3" xl="4" className="dark-grey-text">
              <h6 className="text-uppercase font-weight-bold title-f">
                <strong>Liên Hệ</strong>
              </h6>
              <hr
                className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
                style={{ width: "60px" }}
              />
              <p>
                <i className="fa fa-home mr-3" /> Hồ Ngọc T
              </p>
              <p>
                <i className="fa fa-envelope mr-3" /> SugoiNeJapan@gmail.com
              </p>
              <p>
                <i className="fa fa-phone mr-3" /> + 86xxxxxxx
              </p>
              <p>
                <i className="fa fa-print mr-3" /> + 12xxxxxxx
              </p>
            </MDBCol>
            <MDBCol md="3" lg="4" xl="3" className=" dark-grey-text">
              <h6 className="text-uppercase font-weight-bold title-f">
                <strong>Phản hồi</strong>
              </h6>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Gmail</Form.Label>
                  <Form.Control type="email" placeholder="Gmail" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Nhận xét</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    type="text"
                    placeholder="Bạn có ý kiến gì"
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Phản hồi
                </Button>
              </Form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        {/* <div className="footer-copyright text-center">
          <MDBContainer fluid>
            &copy; {new Date().getFullYear()} Copyright: Sanjula De Alwis
          </MDBContainer>
        </div> */}
      </MDBFooter>
    </BrowserRouter>
  );
};

export default Footer;
