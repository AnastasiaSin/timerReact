import React from 'react';
import styles from './statisticspage.css';
import { CurrentDay } from './CurrentDay';
import { PomodoroAmount } from './PomodoroAmount';
import { Focus } from './Focus';
import { Paused } from './Paused';
import { Stops } from './Stops';
import { Diagram } from './Diagram';
import { DropdownByWeeks } from './DropdownByWeeks';

export function StatisticsPage() {
  return (
    <div className={styles.statisticContainer}>

      <div className={styles.statisticHeader}>
      <h2 className={styles.title}>Ваша активность</h2>
      <DropdownByWeeks />
      </div>
      
      <div className={styles.statisticContent}>
        <CurrentDay />
        <PomodoroAmount />
        <Diagram />
        <Focus />
        <Paused />
        <Stops />
      </div>
    </div>
  );
}
