import React from 'react';
import styles from './tasksblock.css';
import {Instruction}  from '../Instruction';
import { TaskContainer } from '../TasksContainer';

export function TasksBlock() {
 
  return (
    <div className={styles.container}>
      <Instruction />
      <TaskContainer />
    </div>
  );
}
