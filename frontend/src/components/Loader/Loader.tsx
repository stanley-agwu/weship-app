import styles from './Loader.module.scss';

const Loader = () => (
  <div className={styles.loadingContainer}>
    <div className={styles.loadingSpinner}></div>
  </div>
);

export default Loader;
