import React from 'react';
import styles from './focus.css';
import { FocusedIcon } from '../../../Icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/reducer';

export function Focus() {
  const paused = useSelector<RootState, number>((s) => s.statisticData.paused);
  const workTime = useSelector<RootState, number>((s) => s.statisticData.workTime);

  const total = workTime + paused;
  const focus = workTime ? Math.round((workTime / total) * 100) : 0;


  let className = styles.focus;
  if (focus > 0) {
    className = styles.focusActive;
  }
  return (
    <div className={styles.focus}>
      <div className={styles.focusBlock}>

        <div className={styles.focusText}>
          <h3 className={styles.focusTitle}>Фокус</h3>
          <span className={styles.focusNumber}>{focus}%</span>
        </div>

        <div>
          <FocusedIcon className={styles.focusImg} />
        </div>

      </div>
    </div>
  );
}
