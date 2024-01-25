import React from 'react';
import styles from './taskmenu.css';
import { AddTime } from '../../Icons/AddTime';
import { MinusIcon } from '../../Icons/MinusIcon';
import { EditIcon } from '../../Icons/EditIcon';
import { DeleteIcon } from '../../Icons/DeleteIcon';


interface IProps {
  left?: number;
  top?: number;
  addTime?: () => void
  decrement?: () => void
  openModalDeleteTask?: () => void
  openIsEditModalTask?: () => void
  openModal?: () => void
}

export function TaskMenu({ left, top, addTime, openModalDeleteTask, decrement, openIsEditModalTask, openModal }: IProps) {

  return (
    <div className={styles.container} style={{ left: left, top: top }}>
      <svg width={16} height={8} className={styles.triangle}>
        <polyline points="0,8 8,0 16,8" />
      </svg>
      <ul className={styles.menuList}>
        <li key={1} className={styles.menuItem}>
          <button className={styles.menuBtn} onClick={addTime}>
            <AddTime />
            Увеличить
          </button>
        </li>

        <li key={2} className={styles.menuItem}>
          <button className={styles.menuBtn} onClick={decrement}>
            <MinusIcon />
            Уменьшить
          </button>
        </li>

        <li key={3} className={styles.menuItem}>
          <button className={styles.menuBtn} onClick={openIsEditModalTask}>
            <EditIcon />
            Редактировать
          </button>
        </li>

        <li key={4} className={styles.menuItem}>
          <button className={styles.menuBtn} onClick={openModalDeleteTask}>
            <DeleteIcon />
            Удалить
          </button>
        </li>
      </ul>




    </div>
  );
}
