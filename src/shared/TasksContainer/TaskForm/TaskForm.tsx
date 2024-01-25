import React, { ChangeEvent, useEffect } from 'react';
import styles from './taskform.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer';
import { updateValue } from '../../../store/actions/actionUpdateValue';
import { AddTask } from '../../../store/actions/actionAddTasks';

function generateId (min:number, max:number) {
  return Math.floor(Math.random() * (max-min)) + min; 
}


export function TaskForm() {
  
  const value = useSelector<RootState, string>(state=> state.value)
  const tasks = useSelector<RootState, Array<object>>(state=> state.tasks)
  const dispatch = useDispatch();
  
  function handleChange(event:ChangeEvent<HTMLInputElement>) {
    dispatch(updateValue(event.target.value))
  };

  function handleSubmit(event:any) {
    event.preventDefault();
   
  
      if(value.length > 1) {
        dispatch(AddTask([...tasks,{ id: generateId(1, 100), value: value, time: 25, amountPomodoro: 1, currentPomodoro: 1, focusWork: 0 }]))
        dispatch(updateValue(''))
      }
  
  }

  return (
     <form className={styles.form} onSubmit={handleSubmit}>
      <input className={styles.input} type="text" value={value} onChange={handleChange} placeholder='Название задачи'/>
      <button className={styles.btnForm} disabled={value.length > 1 ? false : true} type='submit'>Добавить</button>
    </form>
   
  );
}


