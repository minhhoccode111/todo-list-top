import * as fns from "date-fns";

const format = (date, type = "date") =>
  type === "hour"
    ? fns.format(date, "HH:mm:ss")
    : fns.format(date, "yyyy-MM-dd");

// console.log(fns.parseISO(new Date()));//invalid date
console.log(fns.parseISO("2023-06-27")); //Date object
console.log(fns.format(new Date("2023-06-27"), "yyyy-MM-dd")); //2023-06-27
console.log(fns.format(new Date(), "yyyy-MM-dd")); //2023-06-27
export const now = () => {
  return `${format(new Date(), "date")} ${format(new Date(), "hour")}`;
};

export const today = () => format(new Date(), "date");

export const inputToDate = (v) => {};
//dueDate is expected to be string
export const checkExpired = (dueDate) => {
  if (dueDate) return fns.isBefore(new Date(dueDate), new Date());
};
