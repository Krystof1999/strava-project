import { DateTime } from "luxon";

export const getWeeksInMonth = (year: number, month: number) => {
  const weeks = [];
  const firstDayOfMonth = DateTime.fromObject({ year, month, day: 1 });
  const lastDayOfMonth = firstDayOfMonth.endOf("month");

  let currentWeekStart = firstDayOfMonth.startOf("week");
  let currentWeekEnd = currentWeekStart.endOf("week");

  while (currentWeekStart <= lastDayOfMonth) {
    weeks.push({
      start: currentWeekStart.toFormat("dd.MM.yyyy"),
      end: currentWeekEnd.toFormat("dd.MM.yyyy"),
    });

    currentWeekStart = currentWeekStart.plus({ weeks: 1 });
    currentWeekEnd = currentWeekEnd.plus({ weeks: 1 });
  }

  return weeks;
};
