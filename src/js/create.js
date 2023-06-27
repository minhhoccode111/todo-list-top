import { now, today, inputToDate } from "./fns.js";
import * as FNS from "date-fns";
import * as id from "./id.js";

//Todo Factory function
export function Todo(
  title,
  detail,
  dueDate,
  hasDueDate,
  priority,
  isDone,
  project
) {
  const id = id.get();
  const createdDate = today();
  const lastModified = now();
  dueDate = inputToDate(dueDate);
  let isTimeExpired = false;

  return Object.assign(Object.create(Prototype.todo), {
    id,
    title,
    detail,
    isDone,
    project,
    dueDate,
    priority,
    hasDueDate,
    createdDate,
    lastModified,
    isTimeExpired,
  });
}

//Note Factory function
export function Note(title, detail, dueDate, hasDueDate) {
  const id = id.get();
  const createdDate = fns.parse(new Date());
  let isTimeExpired = false;
  if (dueDate !== "") {
    dueDate = fns.parse(dueDate);
    isTimeExpired = fns.isBefore(dueDate, createdDate);
  }
  return Object.assign(Object.create(Prototype.note), {
    id,
    title,
    detail,
    dueDate,
    hasDueDate,
    createdDate,
    isTimeExpired,
  });
}
//Diary Factory function
export function Diary(day, night) {
  const createdDate = fns.parse(new Date());
  return Object.assign(Object.create(Prototype.diary), {
    day,
    night,
    createdDate,
  });
}
//Project Factory function
export function Project(title, detail, dueDate, hasDueDate) {
  const id = id.get();
  const createdDate = fns.parse(new Date());
  let isTimeExpired = false;
  if (dueDate !== "") {
    dueDate = fns.parse(dueDate);
    isTimeExpired = fns.isBefore(dueDate, createdDate);
  }
  return Object.assign(Object.create(Prototype.project), {
    id,
    title,
    detail,
    dueDate,
    hasDueDate,
    createdDate,
    isTimeExpired,
  });
}
