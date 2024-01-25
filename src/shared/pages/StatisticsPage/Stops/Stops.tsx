import React from 'react';
import styles from './stops.css';
import { StopsClock } from '../../../Icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/reducer';

export function Stops() {
  const stops = useSelector<RootState, number>(s => s.statisticData.stops);
  let classStops = styles.stops;
  if(stops >0) {
    classStops = styles.stopsActive;
  }
  return (
    <div className={classStops}>
      <div className={styles.stopsBlock}>

        <div className={styles.stopsText}>
          <h3 className={styles.stopsTitle}>Остановки</h3>
          <span className={styles.stopsNumber}>{stops}</span>
        </div>
        <div className={styles.stopsImg}>
          <StopsClock className={stops > 0 ?styles.svgActive : null} />
        </div>

      </div>
    </div>
  );
}
