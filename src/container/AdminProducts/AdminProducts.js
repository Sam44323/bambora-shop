import { useCallback, useEffect, useState, Fragment } from "react";

import sharedStyles from "../shared/styles.module.css";
import Loader from "react-loader-spinner";
import ProductItem from "../../components/ProductItem/ProductItem";
import Navigation from "../../components/Navigation/Navigation";
import tokenChecker from "../../components/utils/tokenChecker";
import errorMessageChecker from "../../components/utils/errorMessageChecker";
import Modal from "../../components/Modal/Modal";
import ErrorModal from "../../components/ErrorModal/ErrorModal";
import axios from "axios";

const AdminProducts = (props) => {
  const [prods, setProds] = useState([]);
  const [hasProds, setHasProds] = useState(true);
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState("");

  useEffect(() => {
    if (!tokenChecker()) {
      return props.history.replace("/auth/login");
    }
    setLoading(true);
    axios
      .get("http://localhost:5000/bambora-shop/products/get-adminProds", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((prods) => {
        setProds(prods.data.products);
        setHasProds(prods.data.products.length > 0);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(errorMessageChecker(err));
      });
  }, [props]);

  const deleteProduct = useCallback(
    (prodId) => {
      axios
        .delete(
          `http://localhost:5000/bambora-shop/products/delete-prod/${prodId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(() => {
          setProds(prods.filter((prod) => prod._id !== prodId));
        })
        .catch((err) => {
          setLoading(false);
          setError(errorMessageChecker(err));
        });
    },
    [prods]
  );

  return (
    <Fragment>
      <Navigation />
      {err && (
        <Modal>
          <ErrorModal message={err} buttonAction={() => setError("")} />
        </Modal>
      )}
      {loading && (
        <div className={sharedStyles.loadingSection}>
          <Loader type="Circles" height={80} width={80} color="black" />
        </div>
      )}
      <div className={sharedStyles.productsSection}>
        {prods.length === 0 && !hasProds ? (
          <h1 className={sharedStyles.noProductsTitle}>
            You have no products!
          </h1>
        ) : (
          prods.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              name={item.name}
              image={item.image}
              amount={item.amount}
              buttonAction={() =>
                props.history.push(`/prod-details/${item._id}`)
              }
              deleteAction={deleteProduct}
            />
          ))
        )}
      </div>
    </Fragment>
  );
};

export default AdminProducts;
