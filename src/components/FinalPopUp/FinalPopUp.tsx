import { useEffect, useState } from 'react';
import styles from './FinalPopUp.module.scss';

export const FinalPopUp = () => {
  const [timeLeft, setTimeLeft] = useState(900);

  // Запуск таймера при завантаженні
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatTime = (seconds: any) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className={styles.final}>
      <div className={styles.final__background}></div>
      <div className={styles.final__logo}></div>
      <p className={styles['final__text-white']}>Well</p>
      <p className={styles['final__text-white-part']}>done!</p>
      <p className={styles.final__subtext}>you won:</p>
      <p className={styles['final__text-yellow']}>450 GPB</p>
      <p className={styles['final__text-white-bonus']}> + 250 Free spins</p>
      <div className={styles.final__block}>
        <div className={styles.final__img}></div>
        <p className={styles['final__text-white-small']}>
          Turn on <br />
          notifications <br /> and receive <br /> more special <br /> bonuses!
        </p>
      </div>
      <button
        className={styles.final__button}
        onClick={() => {
          window.location.href =
            // eslint-disable-next-line max-len
            'https://www.pragmaticplay.com/en/games/bigger-bass-splash/?gamelang=en&cur=USD';
        }}
      >
        <span className={styles['final__button-text']}>
          INSTALL <br /> THE APP
        </span>
      </button>
      <div className={styles.final__timer}>
        <span className={styles['final__timer-text']}>
          Bonus will expire in:
        </span>
        <br />
        <span className={styles['final__timer-minutes']}>
          {formatTime(timeLeft)}
        </span>
        <br />
        <span className={styles['final__timer-text']}>MINUTES SECONDS</span>
      </div>
    </div>
  );
};
