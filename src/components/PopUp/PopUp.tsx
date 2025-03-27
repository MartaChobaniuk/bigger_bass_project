import styles from './PopUp.module.scss';

type Props = {
  onStart: () => void;
};

export const PopUp: React.FC<Props> = ({ onStart }) => {
  return (
    <div className={styles.pop}>
      <div className={styles.pop__background}></div>
      <div className={styles.pop__logo}></div>
      <p className={styles['pop__text-white']}>WOW!</p>
      <p className={styles.pop__subtext}>YOU RECEIVED:</p>
      <p className={styles['pop__text-yellow']}>3 FREE</p>
      <p className={styles['pop__text-yellow-part']}>SPINS</p>
      <div className={styles.pop__block}>
        <div className={styles.pop__img}></div>
        <p className={styles['pop__text-white-small']}>
          Without <br /> registration
        </p>
      </div>
      <button className={styles.pop__button} onClick={onStart}>
        <span className={styles['pop__button-text']}>ACTIVATE</span>
      </button>
    </div>
  );
};
