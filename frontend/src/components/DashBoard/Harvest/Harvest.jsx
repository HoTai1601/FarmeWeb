import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Container, Image } from "react-bootstrap";
import { Scrollbar } from "react-scrollbars-custom";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "./../../../components/Message/Message";
import Loader from "./../../../components/Loader/Loader";
import { listSupplierProducts } from "./../../../actions/supplierProduct";

const Harvest = () => {
  const dispatch = useDispatch();
  let history = useHistory();

  const supplierProductList = useSelector((state) => state.supplierProductList);
  const {
    loading: loadingProducts,
    error: errorProducts,
    products,
  } = supplierProductList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo.isAdmin && !userInfo) {
      history.push("/login");
    } else {
      dispatch(listSupplierProducts());
    }
  }, [dispatch, history, userInfo]);

  return (
    <Container fluid>
      <Scrollbar style={{ width: "100%", height: 450 }}>
        {loadingProducts ? (
          <Loader />
        ) : errorProducts ? (
          <Message variant="danger">{errorProducts}</Message>
        ) : (
          <Table
            style={{ marginBottom: "50px", marginTop: "5px" }}
            striped
            bordered
            hover
            responsive
            className="table-sm"
          >
            <thead style={{ fontWeight: "bold" }}>
              <tr>
                <td>TÊN</td>
                <td>ĐỊA CHỈ</td>
                <td>HÌNH ẢNH</td>
                <td>MÔ TẢ</td>
                <td>LIÊN HỆ</td>
                <td>LOẠI</td>
                <td>THÊM</td>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.address}</td>
                  <td>
                    <Image src={product.image} rounded width="60px" />
                  </td>
                  <td>{product.description}</td>
                  {product.phonenumber ? (
                    <td>
                      <a
                        rel="noreferrer"
                        target="_blank"
                        href={`https://wa.me/${product.phonenumber}`}
                      >
                        {product.phonenumber}
                      </a>
                    </td>
                  ) : (
                    <td>RỖNG</td>
                  )}
                  <td>{product.cropSelection}</td>
                  <td>
                    {product.isReviwed ? (
                      <LinkContainer
                        to={`/supplierproducts/${product._id}/review`}
                      >
                        <Button
                          disabled
                          variant="danger"
                          className="btn-sm mr-2"
                        >
                          Nhận xét
                        </Button>
                      </LinkContainer>
                    ) : (
                      <LinkContainer
                        to={`/supplierproducts/${product._id}/review`}
                      >
                        <Button variant="primary" className="btn-sm mr-2">
                          <i className="fas fa-eye"></i> Phản hồi
                        </Button>
                      </LinkContainer>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Scrollbar>
    </Container>
  );
};

export default Harvest;
