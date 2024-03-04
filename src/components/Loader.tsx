import loader from '../assets/images/loader.gif';
import styles from '../assets/styles/Loader.module.css';

function Loader() {
  return (
    <div className={styles.loader}>
      <img src={loader} alt="Loading..." />
    </div>
  );
}

export default Loader;
