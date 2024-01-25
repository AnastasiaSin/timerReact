import React, { ChangeEvent, useEffect, useRef } from 'react';
import styles from './taskmodaledit.css';
import { CancelX } from '../../Icons/CancelX';
interface IProp {
change?: (e:ChangeEvent<HTMLInputElement>)=> void
submit?: (e:any)=> void
newValue?: string
closeEdit?: () => void
}

export function TaskModalEdit({change, submit, newValue, closeEdit}:IProp) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.target instanceof Node && ref.current === e.target) {
     closeEdit?.()
      }
    };
    
    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, [closeEdit]);

  return (
    <div className={styles.editTaskContainer} ref={ref}>
    <div className={styles.editTaskBlock}>
    <button className={styles.editTaskX} onClick={closeEdit}>
      <CancelX />
    </button>
      <form className={styles.editTaskForm} onSubmit={submit}>
        <span className={styles.editTaskHelp}>Введите новое название</span>
        <input className={styles.editedText} type="text" placeholder='Новое название задачи' value={newValue} onChange={change} />
        <button className={styles.editTextBtn} type='submit'>Редактировать</button>
      </form>
    </div>
  </div>
  );
}
