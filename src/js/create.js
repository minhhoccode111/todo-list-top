//this is create.js

import { now, today, checkExpired } from "./fns.js";
import { get as getId } from "./id.js";
import * as Prototype from "./prototype";

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
  const id = getId();
  const createdDate = today();
  const lastModified = now();
  let isTimeExpired = checkExpired(dueDate);

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
  const id = getId();
  const createdDate = today();
  const lastModified = now();
  let isTimeExpired = checkExpired(dueDate);
  return Object.assign(Object.create(Prototype.note), {
    id,
    title,
    detail,
    dueDate,
    hasDueDate,
    createdDate,
    lastModified,
    isTimeExpired,
  });
}
//Diary Factory function
export function Diary(day, night) {
  const createdDate = today();
  const lastModified = now();

  return Object.assign(Object.create(Prototype.diary), {
    day,
    night,
    createdDate,
    lastModified,
  });
}
//Project Factory function
export function Project(title, detail, dueDate, hasDueDate) {
  const id = getId();
  const createdDate = today();
  const lastModified = now();
  let isTimeExpired = checkExpired(dueDate);
  return Object.assign(Object.create(Prototype.project), {
    id,
    title,
    detail,
    dueDate,
    hasDueDate,
    createdDate,
    lastModified,
    isTimeExpired,
  });
}
