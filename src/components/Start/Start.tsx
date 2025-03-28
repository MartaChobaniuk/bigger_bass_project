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
import { FinalPopUp } from '../FinalPopUp';

const predefinedSpins = [
  // Колонка 1
  [
    [slot_5, slot_13, slot_12, slot_4, slot_2, slot_7],
    [slot_11, slot_16, slot_5, slot_15, slot_1, slot_14],
    [slot_3, slot_2, slot_7, slot_12, slot_4, slot_2],
    [slot_15, slot_1, slot_14, slot_12, slot_4, slot_2],
  ],
  // Колонка 2
  [
    [slot_8, slot_14, slot_4, slot_3, slot_14, slot_9],
    [slot_6, slot_16, slot_13, slot_12, slot_11, slot_2],
    [slot_4, slot_2, slot_16, slot_15, slot_1, slot_8],
    [slot_7, slot_1, slot_2, slot_7, slot_12, slot_11],
  ],
  // Колонка 3
  [
    [slot_4, slot_9, slot_16, slot_6, slot_13, slot_8],
    [slot_7, slot_14, slot_10, slot_15, slot_4, slot_7],
    [slot_8, slot_15, slot_9, slot_5, slot_12, slot_6],
    [slot_10, slot_1, slot_12, slot_11, slot_5, slot_15],
  ],
];

export const Start = () => {
  const [spinCount, setSpinCount] = useState(0);
  const [freeSpins, setFreeSpins] = useState(3);
  const [isSpinning, setIsSpinning] = useState(false);
  const [columns, setColumns] = useState(
    predefinedSpins.map(col => col[0].slice(0, 3))
  );
  const [spinningColumns, setSpinningColumns] = useState([false, false, false]);
  const [highlightWinning, setHighlightWinning] = useState(false);
  const [showFinalPopUp, setShowFinalPopUp] = useState(false);

  const finishSpin = () => {
    const nextSpinIndex = spinCount + 1;

    setColumns(
      predefinedSpins.map(col => col[nextSpinIndex].slice(0, 3))
    );
    setSpinCount(nextSpinIndex);
    setIsSpinning(false);

    if (nextSpinIndex === 3) {
      setTimeout(() => {
        setHighlightWinning(true);
        setTimeout(() => setShowFinalPopUp(true), 3000);
      }, 500);
    }
  };

  const handleSpin = () => {
    if (freeSpins <= 0 || isSpinning || spinCount >= 3) {
      return;
    }

    setIsSpinning(true);
    setFreeSpins(prev => prev - 1);

    setSpinningColumns([true, false, false]);
    setTimeout(() => setSpinningColumns([true, true, false]), 300);
    setTimeout(() => setSpinningColumns([true, true, true]), 600);

    const nextSpinIndex = spinCount + 1;
    const spinInterval = 300;
    const columnDelays = [0, 300, 600];
    const stopDelays = [1600, 1900, 2200];

    const columnStates = {
      completed: [false, false, false],
      intervals: [] as NodeJS.Timeout[],
      stopTimeouts: [] as NodeJS.Timeout[]
    };

    const stopColumnSpin = (colIndex: number) => {
      clearInterval(columnStates.intervals[colIndex]);
      columnStates.completed[colIndex] = true;

      setColumns(prev => prev.map((col, i) =>
        i === colIndex ? predefinedSpins[i][nextSpinIndex].slice(0, 3) : col
      ));

      setSpinningColumns(prev => {
        const newState = [...prev];

        newState[colIndex] = false;

        return newState;
      });

      if (columnStates.completed.every(Boolean)) {
        finishSpin();
      }
    };

    const startColumnSpin = (colIndex: number) => {
      let currentStep = 0;

      columnStates.intervals[colIndex] = setInterval(() => {
        currentStep++;

        setColumns(prevColumns =>
          prevColumns.map((_, index) => {
            if (index !== colIndex) {
              return prevColumns[index];
            }

            const sequence = predefinedSpins[index][nextSpinIndex];
            const shiftIndex = currentStep % sequence.length;

            return [
              sequence[shiftIndex % sequence.length],
              sequence[(shiftIndex + 1) % sequence.length],
              sequence[(shiftIndex + 2) % sequence.length]
            ];
          })
        );
      }, spinInterval);

      columnStates.stopTimeouts[colIndex] = setTimeout(() => {
        stopColumnSpin(colIndex);
      }, stopDelays[colIndex]);
    };

    columnDelays.forEach((delay, colIndex) => {
      setTimeout(() => startColumnSpin(colIndex), delay);
    });

    return () => {
      columnStates.intervals.forEach(clearInterval);
      columnStates.stopTimeouts.forEach(clearTimeout);
      setSpinningColumns([false, false, false]);
    };
  };

  if (showFinalPopUp) {
    return <FinalPopUp />;
  }

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
            <div key={colIndex} className={styles.start__slot}>
              {column.map((image, rowIndex) => (
                <div
                  key={`${colIndex}-${rowIndex}`}
                  className={classNames(styles.start__item, {
                    [styles['start__item--spinning']]: spinningColumns[colIndex],
                    [styles['start__item--winning']]: highlightWinning && image === slot_1,
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
            [styles['start__button-spin--disabled']]: freeSpins === 0 || isSpinning,
          })}
        >
          <span className={styles['start__button-text']}>SPIN</span>
        </button>
      </div>
    </div>
  );
};

