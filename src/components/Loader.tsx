import loader from '../assets/images/loader.gif';
import styles from '../assets/styles/Loader.module.css';

interface LoaderProps {
  propsMessage: string;
}

function Loader({ propsMessage }: LoaderProps) {
  console.log(`${propsMessage} Loader`);

  return (
    <div className={styles.loader}>
      <img src={loader} alt="Loading..." />
    </div>
  );
}

export default Loader;
