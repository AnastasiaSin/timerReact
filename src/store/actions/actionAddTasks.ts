import { ActionCreator, AnyAction } from "redux";

export const ADD_TASK = 'ADD_TASK';


export const AddTask:ActionCreator<AnyAction> = (task)=> ({
 type: ADD_TASK,
 task
})