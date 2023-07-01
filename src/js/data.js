//this is data.js

import * as database from "./database.js";
import * as Prototype from "./prototype.js";
import * as Create from "./create.js";
import {
  sub,
  endOfWeek,
  endOfMonth,
  endOfYear,
  format,
  parseISO,
} from "date-fns";

let data = {
  all: [],
  today: [],
  week: [],
  month: [],
  year: [],
  project: [
    Create.Project("gym", "Store my Gym todos", "", false),
    Create.Project("work", "Store my Work todos", "", false),
    Create.Project("learn", "Store my Learn todos", "", false),
  ],
  gym: [],
  work: [],
  learn: [],
  note: [],
  diary: [],
};

//Use to load data from database when app is loaded
export const load = () => {
  if (database.check("data")) {
    data = Prototype.restore(database.get("data"));
  }
};

// use to set data to database
export const set = () => database.set(data, "data");

export const get = () => data;

export const add = (obj, project) => {
  data[project].push(obj);
  set();
};

export const del = (project, index) => {
  data[project].splice(index, 1);
  set();
};

const getAllTodoProject = () => {
  let arr = [];
  for (const p in data) {
    if (p === "project" || p === "note" || p === "diary") continue;
    arr.push(p);
  }
  return arr;
};

const addAProjectToData = (name) => {
  if (data.hasOwnProperty(name)) {
    return alert("That project is already existed!");
  }
  data[name] = [];
  set();
};

const delAProjectFromData = (name) => {
  delete data[name];
  set();
};

const getProjectItems = (name) => {
  return data[name];
};

const getProjectLength = (name) => {
  if (["note", "diary", "project"].includes(name)) return data[name].length;

  if (name === "all") {
    return getAllTodoProject().reduce(
      (total, current) =>
        total +
        data[current].reduce((t, c) => {
          if (c.isDone) {
            return t;
          } else {
            return t + 1;
          }
        }, 0),
      0
    );
  }
  return data[name].reduce((total, current) => {
    if (current.isDone) {
      return total;
    }
    return total + 1;
  }, 0);
};

const getCustomProjects = () => data.project;

//another module inside
export const projects = {
  add: addAProjectToData,
  del: delAProjectFromData,
  all: getAllTodoProject,
  get: getProjectItems,
  getL: getProjectLength,
  custom: getCustomProjects,
};

export function init() {
  let all0 = Create.Todo("Pay ");
}
const today = new Date();
const yesterday = format(sub(today, { days: 1 }), "yyyy-MM-dd");

console.log(yesterday);
