import React, { useEffect, useRef } from 'react';
import styles from './taskmodaldelete.css';
import { CancelX } from '../../Icons/CancelX';
interface iProp {
  deleteTask?: () => void
  closeModal?: () => void
}

export function TaskModalDelete({ deleteTask, closeModal }: iProp) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.target instanceof Node && ref.current === e.target) {
     closeModal?.()
      }
    };


    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, [closeModal]);

  return (
    <div className={styles.deleteTaskContainer} ref={ref}>
      <div className={styles.deleteTaskBlock}>
        <button className={styles.deleteTaskX} onClick={closeModal}>
          <CancelX />
        </button>
        <span className={styles.deleteTaskQuestion}>Удалить задачу?</span>
        <button className={styles.deleteBtn} type='button' onClick={deleteTask}>Удалить</button>
        <button className={styles.deleteBtnCancel} type='button' onClick={closeModal}>Отмена</button>
      </div>
    </div>
  );
}
