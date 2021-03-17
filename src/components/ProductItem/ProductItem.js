import styles from './ProductsItem.module.css';
import sharedStyles from '../../container/shared/styles.module.css';
import btnStyles from '../Button/Button.module.css';

import Button from '../../components/Button/Button';

const product = (props) => (
  <div className={styles.productItemSection}>
    <img
      src={props.image}
      alt={props.name}
      className={sharedStyles.imageContent}
    />
    <div className={styles.productDetails}>
      <h1 className={styles.productName}>{props.name}</h1>
      <h4 className={styles.productAmount}>$ {props.amount}</h4>
      <Button
        class={`${btnStyles.SuccessBtn}`}
        clickAction={props.buttonAction}
      >
        More
      </Button>
      <br />
      {props.deleteAction && (
        <Button
          class={`${btnStyles.DangerBtn}`}
          clickAction={() => props.deleteAction(props.id)}
        >
          Delete
        </Button>
      )}
    </div>
  </div>
);

export default product;
