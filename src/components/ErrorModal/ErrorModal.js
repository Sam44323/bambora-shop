import styles from "./ErrorModal.module.css";
import btnStyles from "../Button/Button.module.css";

import Button from "../Button/Button";

const ErrorModal = (props) => (
  <div className={styles.errorSection}>
    <h1 className={styles.errorMessage}>{props.message}</h1>
    <Button class={`${btnStyles.SuccessBtn}`} clickAction={props.buttonAction}>
      Close
    </Button>
  </div>
);

export default ErrorModal;
