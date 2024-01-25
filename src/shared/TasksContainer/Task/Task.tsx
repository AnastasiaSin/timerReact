import React, { ChangeEvent, useState } from 'react';
import styles from './task.css';
import { MenuIcon } from '../../Icons/MenuIcon';
import { TaskMenu } from '../TaskMenu/TaskMenu';
import { useDispatch, useSelector } from 'react-redux';
import { updateTask } from '../../../store/actions/actionUpdateTask';
import { deleteTaskAction } from '../../../store/actions/actionDeleteTask';
import { RootState } from '../../../store/reducer';
import { ITask } from '../TaskContainer';
import { TaskModalEdit } from '../TaskModalEdit';
import { TaskModalDelete } from '../TaskModalDelete';
import ReactDOM from 'react-dom';

interface IT {
  task: {
    id?: number
    time?: number
    value?: string
    amountPomodoro?: number
    currentPomodoro?: number
  }
}

interface IPos {
  left?: number;
  top?: number;
}

export function Task(task: IT) {
  const tasks = useSelector<RootState, Array<object>>(s => s.tasks);
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<IPos>({})

  const [isEdit, setIsEdit] = useState(false)
  const [newValue, setNewValue] = useState('')
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)

  const addTime = () => {
    const i = tasks.map((item: ITask) => {
      if (item.id === task.task.id) {
        return {
          ...task.task,
          time: item?.time! + 25,
          amountPomodoro: item.amountPomodoro! + 1
        }
      }
      return item

    })

    dispatch(updateTask(i))
  }

  const decrement = () => {
    const i = tasks.map((item: ITask) => {
      if (item.id === task.task.id && task.task.time !== 25) {

        return {
          ...task.task,
          time: item?.time! - 25,
          amountPomodoro: item.amountPomodoro! - 1
        }
      }
      return item

    })

    dispatch(updateTask(i))
  }

  const openIsEditModalTask = () => {
    setIsEdit(true)
    setIsOpen(!isOpen)
  }

  function editHandleChange(event: ChangeEvent<HTMLInputElement>) {
    setNewValue(event.target.value)
  };

  function editHandleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const i = tasks.map((item: ITask) => {
      if (item.id === task.task.id) {

        return {
          ...task.task,
          value: newValue
        }
      }
      return item

    })

    dispatch(updateTask(i))

    setNewValue('')
    setIsEdit(!isEdit)

  }

  const openModalDeleteTask = () => {
    setIsOpenDeleteModal(true)
    setIsOpen(!isOpen)
  }

  const deleteTask = () => {
    dispatch(deleteTaskAction(tasks?.filter((item: ITask) => item.id !== task.task.id)))
  }

  const handleOpen = (e: any) => {
    setIsOpen(!isOpen)
    setPosition({ left: e.pageX - 78, top: e.pageY + 20 })
  }

  const node = document.querySelector('#dropdown_root');
  if (!node) return null

  return (
    <li className={styles.taskItem}>
      <span className={styles.amountPomodoro}>{task?.task?.amountPomodoro}</span>
      <span className={styles.taskName}>{task.task?.value}</span>
      <span className={styles.taskMenu}>
        <button className={styles.menuBtn} onClick={handleOpen}>
          <MenuIcon />
        </button>
      </span>

      {isOpen && (
        ReactDOM.createPortal(
          <TaskMenu
            left={position.left}
            top={position.top}
            addTime={addTime}
            openModalDeleteTask={openModalDeleteTask}
            decrement={decrement}
            openIsEditModalTask={openIsEditModalTask}
            openModal={() => setIsOpen(false)}
          />
          , node)

      )}

      {isEdit && (
        <TaskModalEdit
          change={(e: ChangeEvent<HTMLInputElement>) => editHandleChange(e)}
          submit={(e: any) => editHandleSubmit(e)}
          newValue={newValue}
          closeEdit={() => setIsEdit(!isEdit)}
        />
      )}

      {isOpenDeleteModal && (
        <TaskModalDelete deleteTask={deleteTask} closeModal={() => setIsOpenDeleteModal(!isOpenDeleteModal)} />
      )}

    </li>
  );
}
