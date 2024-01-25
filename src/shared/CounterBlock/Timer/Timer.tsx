import { useEffect, useState } from 'react';
import styles from './timer.css';
import React from 'react';
import { deleteTaskAction } from '../../../store/actions/actionDeleteTask';
import { ITask } from '../../TasksContainer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer';
import { Status } from '../../../store/actions/actionStatus';
import { updateTask } from '../../../store/actions/actionUpdateTask';
import { BreakStatus } from '../../../store/actions/actionBreakStatus';
import { StatisticsData } from '../../../store/actions/actionStatisticsData';
import { getDayFromNow } from '../../../utils/getDaysArray';
import { getInitialStatsCurrentWeek } from '../../../utils/initialStatsCurrentWeek';

interface TimerProp {
  time?: number
  task: ITask
}


export function Timer({ time, task }: TimerProp) {
  const dispatch = useDispatch()
  const tasks = useSelector<RootState, Array<object>>(s => s.tasks);
  const status = useSelector<RootState, String>(s => s.status);
  const breakStatus = useSelector<RootState, String>(s => s.breakStatus);

  const [[hours, minutes, seconds], setTime] = useState<Array<number>>([0, 0, 0])
  const [breakTime, setBreakTime] = useState(5)

  const statisticData = useSelector<RootState, Object>(s => s.statisticData);
  const stops = useSelector<RootState, number>(s => s.statisticData.stops);
  const paused = useSelector<RootState, number>(s => s.statisticData.paused);
  const totalCountPomodoro = useSelector<RootState, number>(s => s.statisticData.totalCountPomodoro);
  const workTime = useSelector<RootState, number>(s => s.statisticData.workTime);

  const currentDate = new Date().getDate();
  const weeksAgo = useSelector<RootState, number>(s => s.weeksAgo)
  const [from, to] = [(weeksAgo + 1) * 7, weeksAgo * 7 - 1];
  const currentWeek = useSelector<RootState, { date: number, work: number }[]>((s)=> {
    const initialStats= getInitialStatsCurrentWeek().map((item)=> {
      const indexStore = s.statisticData.currentWeek.findIndex(
        (storeItem)=>
        new Date(item.date).getDate() ===new Date(storeItem.date).getDate() &&
        new Date(item.date).getMonth() === new Date(storeItem.date).getMonth()
      );
      if(indexStore !== -1) {
        return s.statisticData.currentWeek[indexStore]
      } else {
        return item
      }
    });

    return initialStats.filter(({date})=> date > getDayFromNow(from).getTime() && date <= getDayFromNow(to).getTime())
  })

  const workDay = currentWeek.filter((d)=> new Date(d.date).getDate() === currentDate)[0].work


  const updatePomodoro = () => {
    const i = tasks.map((item: ITask) => {
      if (item.id === task.id && task.time !== 25) {

        return {
          ...task,
          currentPomodoro: item.currentPomodoro! + 1
        }
      }
      return item

    })

    dispatch(updateTask(i))
  }

  const updateStatisticsPauseTime = () => {
    dispatch(StatisticsData({ ...statisticData, paused: paused + 1 }))
  }

  const updateStatisticsWorkTime = () => {
    dispatch(StatisticsData({
      ...statisticData, workTime: workTime + 1, currentWeek: currentWeek.map((item) => {
        if (new Date(item.date).getDate() === currentDate) {
          return {
            ...item,
            work: workDay + 1
          }
        }
        return item

      })
    }))
  }


  const updateStatisticsTotalCountPomodoro = () => {
    dispatch(StatisticsData({ ...statisticData, totalCountPomodoro: totalCountPomodoro + 1 }))
  }

  const updateStatisticsStopsCount = () => {
    dispatch(StatisticsData({ ...statisticData, stops: stops + 1 }))
  }


  useEffect(() => {
    if (task) {
      setTime(([h, m, s]) => [h, m, s = 10])

      if (status === 'paused') {
        setTime(([h, m, s]) => [h, m, s])
      }

      if (minutes < 60) {
        setTime(([h, m, s]) => [h = 0, m, s])
      }

      if (breakStatus === 'break') {
        setTime(([h, m, s]) => [h, m = 0, s = 0]);

      }

    } else { setTime(([h, m, s]) => [h = 0, m = 0, s = 0]) }

  }, [task, breakStatus])

  useEffect(() => {
    if (minutes > 60) {
      setTime(([h, m, s]) => [h = Math.floor(m / 60), m = m % 60, s]);
    }

    if (status === 'start') {
      const timer = setInterval(() => {
        updateStatisticsWorkTime()

        if (seconds === 0) {
          updateStatisticsTotalCountPomodoro()
          dispatch(Status('end'))
          dispatch(BreakStatus('break'))
          return (() => clearInterval(timer));
        }

        // if (seconds === 0) {
        //   setTime(([h, m, s]) => [h, m - 1, s = 59])
        // }

        else {
          setTime(([h, m, s]) => [h, m, s - 1]);
        }

      }, 1000)

      return (() => clearInterval(timer));
    }

    if (status === 'paused') {
      const t = setTimeout(() => {
        updateStatisticsPauseTime()
      }, 1000)

      return (() => clearTimeout(t));
    }


    if (breakStatus === 'break') {

      const t = setInterval(() => {

        if (breakTime <= 0) {
          dispatch(BreakStatus('breakEnd'))

          if (task.currentPomodoro! % 4 === 0) {
            setBreakTime((s) => s = 10)
          } else {
            setBreakTime((s) => s = 5)
          }


          return (() => clearInterval(t));

        } else {
          setBreakTime((s) => s - 1)
          console.log(breakTime)
        }

      }, 1000)
      return (() => clearInterval(t));

    }

    if (breakStatus === 'breakEnd') {
      if (task.amountPomodoro === task.currentPomodoro) {
        dispatch(deleteTaskAction(tasks?.filter((item: ITask) => item.id !== task.id)))
      }
      else {
        updatePomodoro();
      }

      dispatch(BreakStatus(''))
    }



  }, [dispatch, hours, minutes, seconds, status, task, breakStatus, breakTime, paused])





  const addTime = () => {
    setTime(([h, m, s]) => [h, m + 1, s])
  }

  const startTime = () => {
    dispatch(Status('start'));
  }

  const stopTime = () => {
    dispatch(Status('stop'));
    updateStatisticsStopsCount();
  }

  const doneTask = () => {
    dispatch(Status('done'));
    dispatch(deleteTaskAction(tasks?.filter((item: ITask) => item.id !== task.id)));
  }

  const pausedTime = () => {
    dispatch(Status('paused'));
  }
  const pausedBreakTime = () => {
    dispatch(BreakStatus('pausedBreak'));
  }

  const continueBreakTime = () => {
    dispatch(BreakStatus('break'));
  }

  const doneBreak = () => {
    dispatch(BreakStatus('breakStop'));
  }



  const btn = (containerClass: string, classStart: string, classStop: string) => {

    if (status === 'start') {
      return (
        <div className={containerClass}>
          <button className={classStart} onClick={pausedTime}>Пауза</button>
          <button className={classStop} onClick={stopTime}>Стоп</button>
        </div>
      )
    } else if (status === 'paused') {
      return (
        <div className={containerClass}>
          <button className={classStart} onClick={startTime}>Продолжить</button>
          <button className={classStop} onClick={doneTask}>Сделано</button>
        </div>
      )
    }

    else if (breakStatus === 'break') {
      return (
        <div className={containerClass}>
          <button className={classStart} onClick={pausedBreakTime}>Пауза</button>
          <button className={classStop} onClick={doneBreak}>Пропустить</button>
        </div>
      )
    }

    else if (breakStatus === 'pausedBreak') {
      return (
        <div className={containerClass}>
          <button className={classStart} onClick={continueBreakTime}>Продолжить</button>
          <button className={classStop} onClick={doneBreak}>Пропустить</button>
        </div>
      )
    }

    else {
      return (
        <div className={containerClass}>
          <button className={classStart} onClick={startTime} disabled={task ? false : true}>Старт</button>
          <button className={classStop} onClick={stopTime}>Стоп</button>
        </div>
      )
    }

  }


  return { hours, minutes, seconds, btn, addTime, breakTime, breakStatus, status }
}
