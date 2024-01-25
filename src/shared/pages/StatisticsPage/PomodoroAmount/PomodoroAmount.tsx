import React from 'react';
import styles from './pomodoroamount.css';
import { TomatoSmile } from '../../../Icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/reducer';

export function PomodoroAmount() {
  const totalCountPomodoro = useSelector<RootState, number>(s => s.statisticData.totalCountPomodoro);
  

  const prettyText = ()=> {
    if (totalCountPomodoro > 4) {
      return 'помидоров'
    }
    
    else if(totalCountPomodoro > 1) {
      return 'помидора';
    }
    else {
      return 'помидор'
    }
  }
  

  return (
    <div className={styles.pomodoro}>
      <div className={styles.pomodoroContainer}>
        <div className={styles.pomodoroAmount}>
        <TomatoSmile />
        <span className={styles.amount}>{totalCountPomodoro > 0 ? 'x' + '' + totalCountPomodoro : null}</span>
        </div>
       
        {totalCountPomodoro > 0 ? (
          <div className={styles.textBlock}>
            <span className={styles.text}>{totalCountPomodoro} {prettyText()}</span>
          </div>
        ) : null}
      </div>

    </div>
  );
}
