import styles from './ProductsItem.module.css';

const product = ({ name, image, amount, id, creator }) => (
  <div className={styles.productItemSection}>
    <img src={image} alt={name} className={styles.imageContent} />
    <div className={styles.productDetails}>
      <h1 className={styles.productName}>{name}</h1>
      <h4 className={styles.productAmount}>$ {amount}</h4>
    </div>
  </div>
);

export default product;
