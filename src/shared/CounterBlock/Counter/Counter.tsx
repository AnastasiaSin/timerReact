import React from 'react';
import styles from './counter.css';
import { BtnAddTimeIcon } from '../../Icons';
import { Timer } from '../Timer';
import { ITask } from '../../TasksContainer';

interface IProp {
  time?: number
  value?: string
  task: ITask
}

export function Counter({ time, value, task }: IProp) {
  
  const { hours, minutes, seconds, addTime, btn, breakStatus, breakTime, status } = Timer({ time, task })

  const sec = seconds < 10 ? '0' + seconds : seconds
  const statusBreak = breakStatus === 'break' || breakStatus === 'pausedBreak';
  const breakSec = statusBreak && breakTime < 10 ? '0' + breakTime : sec;


  let styleTime = styles.time;
  if (status === 'start') {
    styleTime = styles.startTime
  }

  if (breakStatus === 'break') {
    styleTime = styles.breakTime
  }



  return (

    <div className={styles.counterBlock}>
      <div className={styles.timer}>
        <h2 className={styleTime}>{hours ? hours + ' ' + ':' : null} {minutes < 10 ? '0' + minutes : minutes} : {breakSec}</h2>
        <button className={styles.timerBtn} onClick={addTime}>
          <BtnAddTimeIcon btnIcon={styles.btnIcon} />
        </button>
      </div>

      <div className={styles.taskNameContainer}>
        <span className={styles.taskNumber}>Задача 1</span>
        <span className={styles.taskDash}> - </span>
        <span className={styles.taskName}>{value}</span>
      </div>

      {btn(styles.btnsStartStop, styles.btnStart, styles.btnStop)}

    </div>

  );

}
