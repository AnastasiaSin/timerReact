import { ActionCreator, AnyAction } from "redux";

export const CHECKED_THEME = 'CHECKED_THEME';


export const SetCheckedTheme:ActionCreator<AnyAction> = (check)=> ({
 type: CHECKED_THEME,
 check
})