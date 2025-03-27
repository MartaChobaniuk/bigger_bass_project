import styles from './Loader.module.scss';

export const Loader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.loader__logo}></div>
      <div className={styles.loader__fisher}></div>
      <div className={styles.loader__button}></div>
      <div className={styles.loader__load}></div>
    </div>
  );
};
