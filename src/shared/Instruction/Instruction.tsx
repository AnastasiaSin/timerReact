import React from 'react';
import styles from './instruction.css';

export function Instruction() {  
  return (
    <div className={styles.container}>
      <h1 className={styles.instructionTitle}>Ура! Теперь можно начать работать:</h1>
      <ul className={styles.instructionList}>
          <li className={styles.instructionItem}>Выберите категорию и напишите название текущей задачи</li>
          <li className={styles.instructionItem}>Запустите таймер («помидор»)</li>
          <li className={styles.instructionItem}>Работайте пока «помидор» не прозвонит</li>
          <li className={styles.instructionItem}>Сделайте короткий перерыв (3-5 минут)</li>
          <li className={styles.instructionItem}>Продолжайте работать «помидор» за «помидором», пока задача не будут выполнена. Каждые 4 «помидора» делайте длинный перерыв (15-30 минут).</li>
      </ul>
    </div>
  );
}


