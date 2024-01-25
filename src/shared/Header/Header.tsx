import React from 'react';
import styles from './header.css';
import { Equalizer, Tomato } from '../Icons';
import { Link } from 'react-router-dom';
import { Theme } from './Theme';


export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
      <div className={styles.headerTitle}>
        <Tomato />
        <Link to="/" className={styles.pomodoroTitle}>pomodoro_box</Link> 
      </div>
      <Theme />
      <div className={styles.headerLink}>
      <Equalizer equalizerIcon={styles.equalizerIcon}/>
        <Link to="/statistics"  className={styles.statisticsLink}>Статистика</Link> 
      </div>
      </div>
    </header>
  );
}
