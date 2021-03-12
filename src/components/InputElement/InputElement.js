import styles from './InputElement.module.css';

const inputElement = (props) => (
  <div className={styles.inputSection}>
    <label htmlFor={props.name} className={styles.inputLabel}>
      {props.name}
    </label>
    <br />
    <input
      type={props.type}
      value={props.value}
      onChange={(e) =>
        props.changeAction(props.name, e.target.value, props.type)
      }
      className={styles.inputField}
    />
    {props.isValid && <div>{props.invalidMessage}</div>}
  </div>
);

export default inputElement;
