import React from 'react';
import styles from './mainPage.css';

interface IMainPageProps {
  children?: React.ReactNode;
}

export function MainPage({children}: IMainPageProps) {
  return (
    <div className={styles.content}>{children}</div>
  );
}
