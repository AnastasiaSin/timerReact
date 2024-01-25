import { UPDATE_VALUE } from "./actions/actionUpdateValue";
import { ADD_TASK } from './actions/actionAddTasks'
import { UPDATE_TASK } from "./actions/actionUpdateTask";
import { DELETE_TASK } from "./actions/actionDeleteTask";
import { STATUS } from "./actions/actionStatus";
import { BREAK_STATUS } from "./actions/actionBreakStatus";
import { STATISTICS_DATA } from "./actions/actionStatisticsData";
import { WEEK } from "./actions/actionChangeWeek";
import { getInitialStatsCurrentWeek } from "../utils/initialStatsCurrentWeek";
import { CHECKED_THEME } from "./actions/actionCheckedTheme";

const initialStats = getInitialStatsCurrentWeek()


export type RootState = {
  value: string;
  tasks: [];
  weeksAgo: number;
  statisticData: { currentWeek:{date: number, work: number}[], workTime:number, totalCountPomodoro:number, stops: number, paused: number }
  status: string
  breakStatus: string
  checkedTheme: boolean
}


export const initialState: RootState = {
  value: '',
  tasks: [],
  weeksAgo: 0,
  statisticData: {currentWeek: initialStats, workTime:0, totalCountPomodoro:0, stops: 0, paused: 0 },
  status: '',
  breakStatus: '',
  checkedTheme: false
}



export const rootReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_VALUE:
      return {
        ...state,
        value: action.text
      }

    case ADD_TASK:
      return {
        ...state,
        tasks: action.task
      }

    case DELETE_TASK:
      return {
        ...state,
        tasks: action.task
      }

    case UPDATE_TASK:
      return {
        ...state,
        tasks: action.task,
      }

    case STATUS:
      return {
        ...state,
        status: action.status,
      }

    case BREAK_STATUS:
      return {
        ...state,
        breakStatus: action.breakStatus,
      }

    case STATISTICS_DATA:
      return {
        ...state,
        statisticData: action.data,
      }

      case WEEK:
      return {
        ...state,
        weeksAgo: action.week,
      }

      case CHECKED_THEME:
      return {
        ...state,
        checkedTheme: action.check,
      }
      

    default: return state
  }

}