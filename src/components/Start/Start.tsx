/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
import { useState } from 'react';
import styles from './Start.module.scss';
import slot_1 from '../../images/slot_1.svg';
import slot_2 from '../../images/slot_2.svg';
import slot_3 from '../../images/slot_3.svg';
import slot_4 from '../../images/slot_4.svg';
import slot_5 from '../../images/slot_5.svg';
import slot_6 from '../../images/slot_6.svg';
import slot_7 from '../../images/slot_7.svg';
import slot_8 from '../../images/slot_8.svg';
import slot_9 from '../../images/slot_9.svg';
import slot_10 from '../../images/slot_10.svg';
import slot_11 from '../../images/slot_11.svg';
import slot_12 from '../../images/slot_12.svg';
import slot_13 from '../../images/slot_13.svg';
import slot_14 from '../../images/slot_14.svg';
import slot_15 from '../../images/slot_15.svg';
import slot_16 from '../../images/slot_16.svg';
import classNames from 'classnames';

const predefinedSpins = [
  // Колонка 1
  [
    [slot_5, slot_13, slot_12],
    [slot_11, slot_16, slot_5],
    [slot_4, slot_2, slot_7],
    [slot_15, slot_1, slot_14],
  ],
  // Колонка 2
  [
    [slot_8, slot_10, slot_6],
    [slot_3, slot_14, slot_9],
    [slot_1, slot_7, slot_16],
    [slot_12, slot_11, slot_2],
  ],
  // Колонка 3
  [
    [slot_14, slot_4, slot_1],
    [slot_6, slot_13, slot_8],
    [slot_9, slot_12, slot_3],
    [slot_7, slot_5, slot_15],
  ],
];

export const Start = () => {
  const [columns, setColumns] = useState(
    predefinedSpins.map((col) => [...col[0], ...Array(9).fill(slot_5)])
  );
  const [freeSpins, setFreeSpins] = useState(3);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinIndex, setSpinIndex] = useState(0);

  const handleSpin = () => {
    if (freeSpins > 0 && !isSpinning) {
      setIsSpinning(true);
      const spinTime = 2000;
      const intervalTime = 100;
      let elapsedTime = 0;

      const interval = setInterval(() => {
        setColumns((prev) =>
          prev.map(() =>
            [...Array(12)].map(() =>
              predefinedSpins[Math.floor(Math.random() * predefinedSpins.length)][
                Math.floor(Math.random() * 4)
              ][Math.floor(Math.random() * 3)]
            )
          )
        );

        elapsedTime += intervalTime;
        if (elapsedTime >= spinTime) {
          clearInterval(interval);
          setTimeout(() => {
            setFreeSpins((prev) => prev - 1);
            const nextIndex = (spinIndex + 1) % 4;

            setSpinIndex(nextIndex);

            setColumns((prev) =>
              prev.map((_, colIndex) => [
                ...predefinedSpins[colIndex][nextIndex],
                ...Array(9).fill(slot_5),
              ])
            );

            setIsSpinning(false);
          }, 500);
        }
      }, intervalTime);
    }
  };

  return (
    <div className={styles.start}>
      <div className={styles.start__images}>
        <div className={styles['start__image-logo']}></div>
        <div className={styles['start__image-fisher']}></div>
      </div>
      <div className={styles.start__slots}></div>
      <div className={styles['start__slots-container']}>
        <div className={styles['start__slots-grid']}>
          {columns.map((column, colIndex) => (
            <div
              key={colIndex}
              className={classNames(styles.start__slot, {
                [styles["start__slot--spinning"]]: isSpinning,
              })}
            >
              {column.slice(0, 3).map((image, rowIndex) => (
                <div
                  key={`${colIndex}-${rowIndex}`}
                  className={classNames(styles.start__item, {
                    [styles['start__item--new']]: isSpinning,
                  })}
                >
                  <img
                    className={styles["start__item-image"]}
                    src={image}
                    alt={`slot-${colIndex}-${rowIndex}`}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.start__buttons}>
        <button className={styles['start__button-free']}>
          <span className={styles['start__button-textfree']}>
            FREE SPINS: {freeSpins}
          </span>
        </button>
        <button
          onClick={freeSpins > 0 ? handleSpin : undefined}
          className={classNames(styles['start__button-spin'], {
            [styles['start__button-spin--disabled']]: freeSpins === 0,
          })}
        >
          <span className={styles['start__button-text']}>SPIN</span>
        </button>
      </div>
    </div>
  );
};
