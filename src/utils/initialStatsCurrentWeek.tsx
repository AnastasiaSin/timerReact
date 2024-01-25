import { getDayFromNow } from "./getDaysArray";

export function getInitialStatsCurrentWeek() {
   
    const initialStats = new Array(21)
    .fill(0)
    .map((_, i) => ({ date: getDayFromNow(i).getTime(), work: 0 }))
    .reverse();
    return  initialStats;
   
}

      