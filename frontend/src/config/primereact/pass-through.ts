import type { PrimeReactPTOptions } from "primereact/api";
import type { CalendarPassThroughOptions } from "primereact/calendar";

const calendarConfig: CalendarPassThroughOptions = {
  panel: {
    className: "text-sm",
  },
  title: {
    className: "flex gap-2",
  },
  day: {
    className: "p-1",
  },
  dayLabel: {
    className: "text-sm",
  },
  tableHeader: {
    className: "text-sm",
  },
  buttonbar: {
    className: "p-2",
  },
};

export const PassThrough: PrimeReactPTOptions = {
  calendar: calendarConfig,
};
