import React, { useEffect, useRef, useState } from 'react';
import styles from './dropdownbyweeks.css';
import { ArrowDropdown } from '../../../Icons';
import { useDispatch } from 'react-redux';
import { ChangeWeek } from '../../../../store/actions/actionChangeWeek';

export function DropdownByWeeks() {
  const dispatch = useDispatch()
  const arr = ['Эта неделя', 'Прошедшая неделя', '2 недели назад']
  const [value, setValue] = useState(arr[0]);
  const [isActive, setIsActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null)

  const toggle = () => {
    setIsActive((active) => !active)
  }

  const changeItem = (item: string) => {
    setValue(item)
    dispatch(ChangeWeek(arr.indexOf(item)))
  }

  const close = (event: MouseEvent) => {
    if (event.target instanceof Node && !ref.current?.contains(event.target)) {
      setIsActive(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', close)
    return () => {
      document.removeEventListener('click', close)
    }
  }, []);

  const classlist = isActive ? styles.listActive : styles.list;


  return (
    <div className={styles.container} ref={ref}>
      <button className={styles.item} onClick={toggle}>
        {value}
        <ArrowDropdown btnIcon={isActive ? styles.btnIconActive : styles.btnIcon} />
      </button>

      <ul className={classlist} >
        {arr
          .filter((el) => el !== value)
          .map((item) => (
            <li key={item} className={styles.listItem}>
              <button onClick={() => changeItem(item)} className={styles.item} >
                {item}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
