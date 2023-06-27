import * as database from "./database.js";
import * as Prototype from "./prototype.js";
import * as Create from "./create.js";

let data = {
  all: [
    Create.Todo(
      "Todo List project on The Odin Project",
      "Finish Todo List project on The Odin Project today!!",
      "2023-06-27",
      true,
      "high",
      false,
      "all"
    ),
    Create.Todo(
      "Todo List project on The Odin Project",
      "Finish Todo List project on The Odin Project today!!",
      "2023-06-27",
      true,
      "high",
      false,
      "all"
    ),
    Create.Todo(
      "Todo List project on The Odin Project",
      "Finish Todo List project on The Odin Project today!!",
      "2023-06-27",
      true,
      "high",
      false,
      "all"
    ),
  ],
  today: [
    Create.Todo(
      "Learn 8 hours",
      "Learn to code at least 8 hours",
      "2023-06-27",
      true,
      "med",
      false,
      "today"
    ),
    Create.Todo(
      "Display section in Todo List code base",
      "Finish all display sections in Todo List project code base.",
      "2023-06-27",
      true,
      "high",
      false,
      "today"
    ),
    Create.Todo(
      "Learn 8 hours",
      "Learn to code at least 8 hours",
      "2023-06-27",
      true,
      "high",
      false,
      "today"
    ),
  ],
  week: [
    Create.Todo(
      "Test week project",
      "test week project ",
      "2023-06-27",
      true,
      "low",
      false,
      "week"
    ),
  ],
  month: [
    Create.Todo(
      "Test display month project",
      "Learn to code at least 8 hours",
      "2023-06-27",
      true,
      "high",
      false,
      "month"
    ),
  ],
  year: [
    Create.Todo(
      "Finish The Odin Project curriculum",
      "Finish that",
      "2023-12-31",
      true,
      "high",
      false,
      "year"
    ),
    Create.Todo(
      "Finish CS50x introduction to computer science curriculum",
      "Finish that",
      "2023-12-31",
      true,
      "high",
      false,
      "year"
    ),
    Create.Todo(
      "Finish CS50p introduction to programming with python curriculum",
      "Finish that",
      "2023-12-31",
      true,
      "high",
      false,
      "year"
    ),
    Create.Todo(
      "Finish CS50w introduction to web programming with python and javascript curriculum",
      "Finish that",
      "2023-12-31",
      true,
      "high",
      false,
      "year"
    ),
  ],
  project: [
    Create.Project("gym", "Store my Gym todos", "", false),
    Create.Project("work", "Store my Work todos", "", false),
    Create.Project("learn", "Store my Learn todos", "", false),
  ],
  gym: [
    Create.Todo(
      "Push up",
      "Do 10000 pushes up",
      "",
      false,
      "high",
      false,
      "gym"
    ),
  ],
  work: [
    Create.Todo(
      "Trang book store",
      "Create a website for customer named Trang",
      "",
      false,
      "high",
      false,
      "work"
    ),
  ],
  learn: [
    Create.Todo(
      "Learn Data Structures and Algorithms",
      "On hackerRank, Exercism, Leetcode",
      "",
      false,
      "high",
      false,
      "gym"
    ),
  ],
  note: [
    Create.Note(
      "27/6 note about format in date-fns library",
      "format() take a Date object and a format we want then return a time stamp or a string date format",
      "",
      false
    ),
    Create.Note(
      "27/6 another note about parseISO",
      "parseISO() take a Date string and return a Date object",
      "",
      false
    ),
    Create.Note(
      "27/6 another note about isBefore",
      "isBefore() take a Date object and a format we want then return a time stamp or a string date format",
      "",
      false
    ),
  ],
  diary: [],
};

//Use to load data from database when app is loaded
export const load = () => {
  if (database.check("data")) {
    data = Prototype.restore(database.get("data"));
  }
};

//use to set data to database
const set = () => database.set(data, "data");

export const get = () => data;

export const add = (obj, project) => {
  data[project].push(obj);
  set();
};

export const del = (project, id) => {
  for (let i = 0; i < date[project].length; i++) {
    if (data[project][i].id === id) {
      data[project].splice(i, 1);
      set();
      return;
    }
  }
};

const getAllNewProjects = () => {
  return data.project.reduce((total, current) => [...total, current.title], []);
};

const addAProjectToData = (name) => {
  if (data.hasOwnProperty(name)) {
    alert("That project is already existed!");
    return;
  }
  data[name] = [];
  set();
};

const delAProjectFromData = (name) => {
  delete data[name];
  set();
};

//another module inside
export const projects = {
  add: addAProjectToData,
  del: delAProjectFromData,
  all: getAllNewProjects,
};
