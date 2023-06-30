//this is prototype.js

import { now, checkExpired } from "./fns.js";

// ******************** MODULE PROTOTYPE OF FACTORIES FUNCTION ********************
const proto = {
  get(property) {
    return this[property] || "";
  },
  setLastModified() {
    this.lastModified = now();
  },
  setExpired() {
    this.isTimeExpired = checkExpired(this.dueDate);
  },
};

export const todo = Object.assign(Object.create(proto), {
  classDone() {
    return this.isDone ? "done" : "";
  },
  htmlDone() {
    return this.isDone ? "&#x2713;" : "";
  },
});

export const note = Object.assign(Object.create(proto), {
  project: "note",
});

export const diary = Object.assign(Object.create(proto), {
  isOpened: false,
  project: "diary",
  htmlOpened() {
    return this.isOpened ? "open" : "";
  },
});

export const project = Object.assign(Object.create(proto), {
  project: "project",
});

export const restore = (data) => {
  for (let state in data) {
    for (let obj of data[state]) {
      switch (state) {
        case "note":
          Object.setPrototypeOf(obj, note);
          break;
        case "project":
          Object.setPrototypeOf(obj, project);
          break;
        case "diary":
          Object.setPrototypeOf(obj, diary);
          break;
        default:
          Object.setPrototypeOf(obj, todo);
          break;
      }
    }
  }
};
