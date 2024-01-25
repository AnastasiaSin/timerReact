import React from 'react';
import styles from './paused.css';
import { PausedClock } from '../../../Icons/PausedClock';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/reducer';

export function Paused() {
  const paused = useSelector<RootState, number>(s => s.statisticData.paused);

  let classPaused = styles.paused;
  if (paused > 0) {
    classPaused = styles.pausedActive;
  }

  const pretty = () => {
    let time;
    if (paused > 60) {
      time = `${Math.floor(paused / 60)} часа ${paused % 60} мин`;
    }
    else {
      time = `${paused} мин`
    }
    return time
  }
  return (
    <div className={classPaused}>
      <div className={styles.pausedBlock}>

        <div className={styles.pausedText}>
          <h3 className={styles.pausedTitle}>Время на паузе</h3>
          <span className={styles.pausedNumber}>{pretty()}</span>
        </div>
        <div className={styles.pausedImg}>
          <PausedClock className={paused > 0 ? styles.svgActive : null} />
        </div>

      </div>
    </div>
  );
}
