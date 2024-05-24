import { addMonths, endOfMonth } from "date-fns";

interface QuarterDates {
  start: Date;
  end: Date;
}

export function getQuarterDates(year: number, quarter: number): QuarterDates {
  let start: Date;
  let end: Date;

  switch (quarter) {
    case 1:
      start = new Date(year, 8, 1); // 1 сентября
      end = endOfMonth(addMonths(start, 1)); // Конец октября
      break;
    case 2:
      start = new Date(year, 10, 1); // 1 ноября
      end = endOfMonth(addMonths(start, 1)); // Конец декабря
      break;
    case 3:
      start = new Date(year, 0, 15); // 15 января
      end = endOfMonth(addMonths(start, 2)); // Конец марта
      break;
    case 4:
      start = new Date(year, 3, 1); // 1 апреля
      end = endOfMonth(addMonths(start, 1)); // Конец мая
      break;
    default:
      throw new Error("Invalid quarter number");
  }

  return { start, end };
}
