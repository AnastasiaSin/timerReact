import { ActionCreator, AnyAction } from "redux";

export const WEEK = 'WEEK';


export const ChangeWeek:ActionCreator<AnyAction> = (week)=> ({
 type: WEEK,
 week
})