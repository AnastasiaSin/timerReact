import { ActionCreator, AnyAction } from "redux";

export const BREAK_STATUS = 'BREAK_STATUS';


export const BreakStatus:ActionCreator<AnyAction> = (breakStatus)=> ({
 type:BREAK_STATUS,
 breakStatus
})