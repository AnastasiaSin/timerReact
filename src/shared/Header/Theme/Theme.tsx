import React, { useEffect } from 'react';
import styles from './theme.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer';
import { SetCheckedTheme } from '../../../store/actions/actionCheckedTheme';
import { ThemeLight } from '../../Icons/ThemeLight';
import { ThemeDark } from '../../Icons/ThemeDark';

export function Theme() {
  const dispatch = useDispatch()
  const checkedTheme = useSelector<RootState, boolean>(s => s.checkedTheme);
  const changeTheme = () => {
    if (checkedTheme === false) {
      dispatch(SetCheckedTheme(true))
    }
    else {
      dispatch(SetCheckedTheme(false))
    }

  }
  useEffect(() => {
    if (checkedTheme === false) {
      document.documentElement.style.setProperty('--white', '#fff')
      document.documentElement.style.setProperty('--black', '#333333')
      document.documentElement.style.setProperty('--bg-header', '#fff')
      document.documentElement.style.setProperty('--bg-timer', '#F4F4F4')
      document.documentElement.style.setProperty('--bg-header-shadow', '0px 10px 63px 0px rgba(0, 0, 0, 0.07)')
      document.documentElement.style.setProperty('--greyF4', '#F4F4F4')
     
    }
    else {
      document.documentElement.style.setProperty('--white', '#423b47')
      document.documentElement.style.setProperty('--black', '#fff')
      document.documentElement.style.setProperty('--bg-header', '#2a262f')
      document.documentElement.style.setProperty('--bg-timer', '#2a262f')
      document.documentElement.style.setProperty('--bg-header-shadow', '0px 10px 63px 0px rgba(0, 0, 0, 0.30)')
      document.documentElement.style.setProperty('--greyF4', '#beb5bd')
     
    }
  }, [checkedTheme])





  return (
    <div className={styles.container}>

      <label className={styles.switch}>
        <input onChange={changeTheme} className={styles.switch__input} type="checkbox" role="switch" checked={checkedTheme} />
        <ThemeLight className={styles.switch__icon} id={styles.switch__icon__Light} />
        <ThemeDark className={styles.switch__icon} id={styles.switch__icon__dark} />
      </label>


    </div>

  );
}
