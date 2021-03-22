import styles from "./Modal.module.css";

const Modal = (props) => (
  <div className={styles.modalStyle}>{props.children}</div>
);

export default Modal;
