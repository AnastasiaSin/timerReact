import React from 'react';
import styles from './currentday.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/reducer';

export function CurrentDay() {
  const arr = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  const week = useSelector<RootState, { date: number, work: number }[]>(s => s.statisticData.currentWeek);
  const currDay = week.filter((item) => new Date(item.date).getDate() === new Date().getDate())[0];

  const day = arr.map((i, index) => {
    if (new Date(currDay?.date).getDay() === index) {
      return i
    }
  });


  return (
    <div className={styles.currentDay}>
      <h3 className={styles.day}>{day}</h3>
      {currDay?.work > 0 ?
        (<span className={styles.data}>Вы работали над задачами в течение <span className={styles.work}>{currDay?.work} минут</span>
        </span>)
        : <span className={styles.data}>Нет данных</span>
      }


    </div>
  );
}
