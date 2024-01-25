import React, { useEffect, useState } from 'react';
import styles from './taskContainer.css';
import { TaskForm } from './TaskForm';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducer';
import { Task } from './Task/Task';


export interface ITask {
  id?: number
  time?: number
  value?: string
  amountPomodoro?: number
  currentPomodoro?: number
  focusWork?: number
}

export function TaskContainer() {
  const tasks = useSelector<RootState, Array<object>>(s => s.tasks);

  let classList;
  if (tasks?.[0]) {
    classList = styles.taskList;
  }

  const [[hour, minutes], setTime] = useState([0, 0])
  const totalTime = tasks?.reduce((acc, item: ITask) => acc = acc + (item?.time ? item.time : 0), 0)

  const hourWorld = () => {
    if (hour === 1) return 'час';
    else if (hour > 4) return 'часов';
    else if (hour === 0) return ''
    else { return 'часа' }
  }

  useEffect(() => {
    if (totalTime) {
      setTime(([h, m]) => [h, m = totalTime])
      if (minutes < 60) {
        setTime(([h, m]) => [h ? h - 1 : 0, m])
      }
    }
  }, [totalTime])

  useEffect(() => {
    if (minutes > 60) {
      setTime(([h, m]) => [h = Math.floor(m / 60), m = m % 60])
    }

  }, [hour, minutes])


  return (
    <div className={styles.taskContainer}>
      <TaskForm />

      <ul className={classList}>
        {tasks?.map((task: ITask) => {
          return (
            <Task task={task} key={task?.id} />
          )
        })}
      </ul>

      {totalTime ? (<span className={styles.totalTime}>{totalTime ? (hour > 0 ? hour + ' ' + hourWorld() : '') + ' ' + minutes + ' ' + 'минут' : totalTime}</span>) : null}

    </div>


  );
}
