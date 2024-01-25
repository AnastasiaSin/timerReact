import { ActionCreator, AnyAction } from "redux";

export const STATUS = 'STATUS';


export const Status:ActionCreator<AnyAction> = (status)=> ({
 type: STATUS,
 status
})