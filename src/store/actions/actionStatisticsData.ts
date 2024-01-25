import { ActionCreator, AnyAction } from "redux";

export const STATISTICS_DATA = 'STATISTICS_DATA';


export const StatisticsData:ActionCreator<AnyAction> = (data)=> ({
 type: STATISTICS_DATA,
 data
})