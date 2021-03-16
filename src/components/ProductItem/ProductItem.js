import styles from './ProductsItem.module.css';
import sharedStyles from '../../container/shared/styles.module.css';
import btnStyles from '../Button/Button.module.css';

import Button from '../../components/Button/Button';

const product = ({
  name,
  image,
  amount,
  id,
  creator,
  buttonAction,
  deleteProdAction,
}) => (
  <div className={styles.productItemSection}>
    <img src={image} alt={name} className={sharedStyles.imageContent} />
    <div className={styles.productDetails}>
      <h1 className={styles.productName}>{name}</h1>
      <h4 className={styles.productAmount}>$ {amount}</h4>
      <Button class={`${btnStyles.SuccessBtn}`} clickAction={buttonAction}>
        More
      </Button>
      <br />
    </div>
  </div>
);

export default product;
