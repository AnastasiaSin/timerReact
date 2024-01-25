import { ActionCreator, AnyAction } from "redux";

export const DELETE_TASK = 'DELETE_TASK';


export const deleteTaskAction:ActionCreator<AnyAction> = (task)=> ({
 type: DELETE_TASK,
 task,

  })
