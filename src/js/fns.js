import { parseISO, format, isBefore } from "date-fns";

// console.log(fns.parseISO("2023-06-27")); //Date object
// console.log(fns.format(new Date(), "yyyy-MM-dd")); //2023-06-27
// console.log(fns.isBefore(new Date("2023-06-26"), new Date("2023-06-27")));//true

export const now = () => {
  const date = format(new Date(), "yyyy-MM-dd");
  const time = format(new Date(), "HH:mm:ss");

  return date + " " + time;
};

export const today = () => format(new Date(), "yyyy-MM-dd");

export const checkExpired = (dueDate) => {
  //if dueDate empty then return false
  if (dueDate === "") return false;
  return isBefore(new Date(dueDate), new Date());
};