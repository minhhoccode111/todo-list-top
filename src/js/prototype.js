import { now, checkExpired } from "./fns.js";

// ******************** MODULE PROTOTYPE OF FACTORIES FUNCTION ********************
const proto = {
  get: function (property) {
    return this[property] || "";
  },
  setLastModified: function () {
    this.lastModified = now();
  },
  setExpired: function () {
    this.isTimeExpired = checkExpired(this.dueDate);
  },
};
export const todo = {
  constructor: "Todo",
};
export const note = {
  project: "note",
  constructor: "Note",
};
export const diary = {
  isOpened: false,
  project: "diary",
  constructor: "Diary",
};
export const project = {
  project: "project",
  constructor: "Project",
};
Object.setPrototypeOf(todo, proto);
Object.setPrototypeOf(note, proto);
Object.setPrototypeOf(diary, proto);
Object.setPrototypeOf(project, proto);
export const restore = (data) => {
  for (let state in data) {
    for (let i = 0; i < data[state].length; i++) {
      let obj = data[state][i];
      if (state === "note") {
        Object.setPrototypeOf(obj, note);
      } else if (state === "project") {
        Object.setPrototypeOf(obj, project);
      } else if (state === "diary") {
        Object.setPrototypeOf(obj, diary);
      } else {
        Object.setPrototypeOf(obj, todo);
      }
    }
  }
  return data;
};
