import { ActionCreator, AnyAction } from "redux";

export const UPDATE_TASK = 'UPDATE_TASK';


export const updateTask:ActionCreator<AnyAction> = (task)=> ({
 type: UPDATE_TASK,
 task,

  })
