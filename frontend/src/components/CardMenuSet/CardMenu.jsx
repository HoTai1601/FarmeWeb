import React from "react";
import { Container, Row, Card, CardDeck, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./CardMenuStyles.css";

const CardMenu = () => {
  return (
    <Container>
      <Row>
        <CardDeck className="card-deck">
          <Card border="primary">
            <Card.Body>
              <Card.Title className="title">Nông Dân</Card.Title>
              {/* <Card.Img src="https://cdnmedia.baotintuc.vn/Upload/DMDnZyELa7xUDTdLsa19w/files/2020/08/070820/080820/140820/180620/220820/250820/ha-tinh-300820.jpg"></Card.Img> */}
              <Card.Text className="card-text card-p">
                Nếu bạn là nông dân thì bạn đang ở một nền tảng hoàn hảo, từ đó
                bạn có thể đặt hàng tất cả các sản phẩm liên quan đến nông
                nghiệp của mình và bạn cũng có thể bán sản phẩm của mình.
              </Card.Text>
              <Link to="/farmer">
                <Button variant="success" className="btn-explore btn-md m-2">
                  Chi tiết hơn
                </Button>
              </Link>
            </Card.Body>
          </Card>
          <Card border="primary">
            <Card.Body>
              <Card.Title className="title">Nhà Cung Cấp</Card.Title>
              {/* <Card.Img src="https://api.nongthonviet.com.vn/media/2023/01/16/63c4efb7a99a944a937cbfcd_trai-cay-tet-16102023a_medium.jpg"></Card.Img> */}
              <Card.Text className="card-text card-p">
                Bán nhiều loại sản phẩm liên quan đến nông nghiệp của bạn, thông
                qua nền tảng của chúng tôi. Chúng tôi có hàng triệu nông dân kết
                nối từ mọi miền đất nước.
              </Card.Text>
              <Link to="login?redirect=supplier">
                <Button variant="success" className="btn-explore btn-md m-2">
                  Chi tiết hơn
                </Button>
              </Link>
            </Card.Body>
          </Card>
          <Card border="primary">
            <Card.Body>
              <Card.Title className="title">Khách Hàng</Card.Title>
              <Card.Text className="card-text card-p">
                Không cần phải đi ra đường hay tới các siêu thị gần nhà, Chỉ cần
                đặt hàng tại đây và nhận tất cả các loại sản phẩm được giao ngay
                trước cửa nhà bạn. Tại sao phải chờ đợi? Đi và đặt hàng.
              </Card.Text>
              <Link to="/consumer">
                <Button variant="success" className="btn-explore btn-md m-2">
                  Chi tiết hơn
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </CardDeck>
      </Row>
    </Container>
  );
};

export default CardMenu;
