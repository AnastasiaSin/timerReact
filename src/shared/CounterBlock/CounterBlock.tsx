import React from 'react';
import styles from './counterblock.css';
import { Counter } from './Counter/Counter';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducer';

interface ITask {

  id?: number
  time?: number
  value?: string
  amountPomodoro?: number
  currentPomodoro?: number

}

export function CounterBlock() {
  const tasks = useSelector<RootState, Array<object>>(s => s.tasks);
  const task: ITask = tasks?.[0];
  const status = useSelector<RootState, String>(s => s.status);
  const breakStatus = useSelector<RootState, String>(s => s.breakStatus);

  let styleHeader = styles.header;
  if (status === 'start') {
    styleHeader = styles.headerStart
  }

  if (breakStatus === 'break') {
    styleHeader = styles.headerBreak
  }

  return (
    <div className={styles.container}>
      <div className={styleHeader}>
        <span className={styles.task}>{task?.value ? task.value : 'Нет задач'} </span>
        <span className={styles.pomodoro}>Помидор {task?.currentPomodoro}</span>
      </div>

      <Counter time={task?.time} value={task?.value} task={task} />
    </div>

  );
}
