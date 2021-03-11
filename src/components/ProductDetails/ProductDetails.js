import styles from './ProductDetails.module.css';
import sharedStyles from '../../container/shared/styles.module.css';

const prodDetails = ({ name, image, amount, desc }) => {
  return (
    <div className={styles.prodDetailSection}>
      <img src={image} alt={name} className={sharedStyles.imageContent} />
      <div className={styles.prodDetailContent}>
        <h1 className={styles.prodName}>{name}</h1>
        <p className={styles.prodDescription}>{desc}</p>
        <h4 className={styles.prodAmount}>$ {amount}</h4>
      </div>
    </div>
  );
};

export default prodDetails;
