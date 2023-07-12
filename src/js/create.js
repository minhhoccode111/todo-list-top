import { now, today, checkExpired } from './fns.js';
import Id from './id.js';
import Prototype from './prototype';

////////// factory functions that return an object wit a specific prototype \\\\\\\\\\
export function Todo(title, detail, dueDate, hasDueDate, priority, isDone, project) {
  const id = Id.get();
  const createdDate = today();
  const lastModified = now();
  const isTimeExpired = checkExpired(dueDate);

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

export function Note(title, detail, dueDate, hasDueDate, project) {
  const id = Id.get();
  const createdDate = today();
  const lastModified = now();
  const isTimeExpired = checkExpired(dueDate);
  return Object.assign(Object.create(Prototype.note), {
    id,
    title,
    detail,
    project,
    dueDate,
    hasDueDate,
    createdDate,
    lastModified,
    isTimeExpired,
  });
}

export function Diary(day, night) {
  const createdDate = today();
  const lastModified = now();
  const isOpened = false;

  return Object.assign(Object.create(Prototype.diary), {
    day,
    night,
    isOpened,
    createdDate,
    lastModified,
  });
}

export function Project(title, detail, dueDate, hasDueDate, type) {
  const id = Id.get();
  const createdDate = today();
  const lastModified = now();
  const isTimeExpired = checkExpired(dueDate);
  return Object.assign(Object.create(Prototype.project), {
    id,
    type,
    title,
    detail,
    dueDate,
    hasDueDate,
    createdDate,
    lastModified,
    isTimeExpired,
  });
}
