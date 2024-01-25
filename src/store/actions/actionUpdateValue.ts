import { ActionCreator, AnyAction } from "redux";

export const UPDATE_VALUE = 'UPDATE_VALUE';


export const updateValue:ActionCreator<AnyAction> = (text)=> ({
 type: UPDATE_VALUE,
 text
})