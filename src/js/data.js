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
import { diary } from "./diaryElement.js";

const today = new Date();
const thisDay = format(new Date(), "yyyy-MM-dd");
const yesterday = format(sub(today, { days: 1 }), "yyyy-MM-dd");
const twoDaysPast = format(sub(today, { days: 2 }), "yyyy-MM-dd");
const thisWeek = format(endOfWeek(today), "yyyy-MM-dd");
const thisMonth = format(endOfMonth(today), "yyyy-MM-dd");
const thisYear = format(endOfYear(today), "yyyy-MM-dd");

let data = {
  all: [
    Create.Todo(
      "Finish Check-Mate project",
      "Todo List project on The Odin Project.",
      thisWeek,
      true,
      "med",
      true,
      "all"
    ),
    Create.Todo(
      "Pay food bill",
      "Of the next 10 days.",
      thisWeek,
      true,
      "high",
      true,
      "all"
    ),
    Create.Todo(
      "Buy 2 concert tickets",
      "Buy 2 concert tickets Ca Hoi Hoang.",
      thisWeek,
      true,
      "high",
      true,
      "all"
    ),
  ],
  today: [
    Create.Todo(
      "dummy todo",
      "this is a dummy Todo",
      thisDay,
      true,
      "low",
      true,
      "today"
    ),
    Create.Todo(
      "dummy todo",
      "this is a dummy Todo",
      thisDay,
      true,
      "med",
      false,
      "today"
    ),
    Create.Todo(
      "learn 8-10 hours",
      "learn at least 8 hours today",
      thisDay,
      true,
      "high",
      false,
      "today"
    ),
    Create.Todo(
      "finish this application ",
      "to move on",
      thisDay,
      true,
      "low",
      true,
      "today"
    ),
    Create.Todo(
      "brush teeth",
      "with colgate",
      thisDay,
      true,
      "med",
      true,
      "today"
    ),
  ],
  week: [
    Create.Todo(
      "1 extra project",
      "1 extra project along with project on The Odin Project",
      thisWeek,
      true,
      "med",
      false,
      "week"
    ),
    Create.Todo(
      "play soccer once",
      "play soccer once or twice a week",
      thisWeek,
      true,
      "low",
      true,
      "week"
    ),
  ],
  month: [
    Create.Todo(
      "buy new laptop",
      "to code faster",
      thisMonth,
      true,
      "med",
      false,
      "month"
    ),
    Create.Todo(
      "portfolio website",
      "to show my projects",
      thisMonth,
      true,
      "low",
      false,
      "month"
    ),
    Create.Todo(
      "vaiQuyenSach website",
      "for my customer",
      thisMonth,
      true,
      "high",
      false,
      "month"
    ),
    Create.Todo(
      "Check-Mate application",
      "finish it",
      thisMonth,
      true,
      "med",
      true,
      "month"
    ),
    Create.Todo(
      "finish Free Code Camp Database curriculum",
      "database on freeCodeCamp",
      thisYear,
      true,
      "med",
      false,
      "month"
    ),
  ],
  year: [
    Create.Todo(
      "finish CS50x Computer Science",
      "introduction to computer science",
      thisYear,
      true,
      "med",
      false,
      "year"
    ),
    Create.Todo(
      "finish CS50p Python",
      "introduction to programming with python",
      thisYear,
      true,
      "med",
      false,
      "year"
    ),
    Create.Todo(
      "finish CS50w Web",
      "introduction to web programming with python and javascript",
      thisYear,
      true,
      "med",
      false,
      "year"
    ),
    Create.Todo(
      "Data Structure and Algorithm",
      "one Hacker rank",
      thisYear,
      true,
      "low",
      false,
      "year"
    ),
    Create.Todo(
      "Intermediate JavaScript Certificate",
      "one Hacker rank",
      thisYear,
      true,
      "high",
      false,
      "year"
    ),
    Create.Todo(
      "Intermediate Problem Solving Certificate",
      "one Hacker rank",
      thisYear,
      true,
      "high",
      false,
      "year"
    ),
  ],
  project: [
    Create.Project("work", "Out work everyone!", "", false),
    Create.Project("learn", "Don't stop learning!", "", false),
    Create.Project("gym", "Remember: Stay hard guys!", "", false),
    Create.Project("check-mate", "Todos of this application!", "", false),
  ],
  note: [
    Create.Note(
      "just edit note right in this square",
      "above is title, and this is detail",
      "",
      false
    ),
    Create.Note("quite simple", "right?", "", false),
    Create.Note(
      "when you edit the input field",
      "it will save the last time you modified it",
      "",
      false
    ),
    Create.Note("some dummies", "some dummies notes", "", false),
    Create.Note(
      "maybe I will come back and pick up this project in the future, ",
      "because the due date kinda worthless, I should add some features to it like sort by due date, sort by priority, when the item is out of date then we display is differently",
      "",
      false
    ),
    Create.Note(
      'div contenteditable="true" edit event',
      'DOM event occur when we change content of it is "input"',
      "",
      false
    ),
    Create.Note(
      "I spend 15 days on this project bruh",
      `maybe I'm too slow`,
      "",
      false
    ),
    Create.Note(
      "Open and close dialog element",
      `with DOM API method show() and close(), open it by default with 'open' attribute`,
      "",
      false
    ),
    Create.Note(
      "'blur' event",
      `occur when a button, or link, or input stop being focus`,
      "",
      false
    ),
    Create.Note(
      "'textContent' over 'innerHTML'",
      `we should interact with inputs field through textContent instead of innerHTML to prevent hacker or user pass in something that cause unexpected behavior`,
      "",
      false
    ),
  ],
  diary: [],
  gym: [
    Create.Todo(
      "push up",
      "do 100000 push up a day and stay hard",
      thisDay,
      true,
      "high",
      false,
      "gym"
    ),
    Create.Todo(
      "running",
      "run 100km a day and stay hard",
      thisDay,
      true,
      "med",
      false,
      "gym"
    ),
    Create.Todo(
      "jumping",
      "jump 1 billion times and stay hard",
      "",
      false,
      "low",
      true,
      "gym"
    ),
  ],
  work: [
    Create.Todo(
      "Trang website",
      "a website to display book and search book my customer has so that people can see to borrow or buy it",
      thisWeek,
      true,
      "high",
      false,
      "work"
    ),
    Create.Todo(
      "check-mate project",
      " finish check-mate project",
      thisWeek,
      true,
      "med",
      true,
      "work"
    ),
  ],
  learn: [
    Create.Todo(
      "ES6 and webpack",
      "know how to use webpack and ES6 module with The Odin Project curriculum",
      thisWeek,
      true,
      "low",
      true,
      "learn"
    ),
    Create.Todo(
      "JavaScript on The Odin Project",
      "learn it by this end of this year",
      thisYear,
      true,
      "high",
      false,
      "learn"
    ),
    Create.Todo(
      "JavaScript on Exercism",
      "learn it by this end of this year",
      thisYear,
      true,
      "med",
      false,
      "learn"
    ),
    Create.Todo(
      "Data Structure and Algorithms",
      "learn it by this end of this year",
      thisYear,
      true,
      "low",
      false,
      "learn"
    ),
  ],
  "check-mate": [
    Create.Todo(
      "This Check-Mate project is a dummies project",
      "just click the project button above too see all custom projects and delete this project if you want.",
      thisWeek,
      true,
      "low",
      true,
      "check-mate"
    ),
    Create.Todo(
      "Diary details element",
      "when toggle details element, save it to database too.",
      thisWeek,
      true,
      "low",
      true,
      "check-mate"
    ),
    Create.Todo(
      "put add code into full.js file",
      "put all to it, separate in each module and going through each line of code, write comments to make sure I absolutely understand this project.",
      thisWeek,
      true,
      "med",
      true,
      "check-mate"
    ),
    Create.Todo(
      "dummies item,init data",
      "create dummies item, init data so that user quickly understand this application .",
      thisWeek,
      true,
      "low",
      true,
      "check-mate"
    ),
    Create.Todo(
      "delete things we don't use",
      "like html, css and javaScript comments, empty declaration.",
      thisWeek,
      true,
      "low",
      true,
      "check-mate"
    ),
    Create.Todo(
      "diary logic",
      "double check this feature because if we want to know whether it work well, we have to wail till the next day. Kinda sad",
      thisWeek,
      true,
      "low",
      true,
      "check-mate"
    ),
    Create.Todo(
      "users",
      "and yeah, we should have someone use this app, not just me, haha",
      thisWeek,
      true,
      "low",
      false,
      "check-mate"
    ),
  ],
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
  //use this function to modified Diary item because it auto create
  const diary0 = Create.Diary(
    "diary project is used to save your diary record, daily events, daybook, just write down your thoughts, talk to yourself to be more mindfulness",
    "it has 2 sections, your thoughts along the day and your thoughts before going to bed"
  );
  diary0.createdDate = twoDaysPast;
  diary0.isOpened = true;
  data["diary"].push(diary0);
  const diary1 = Create.Diary(
    "Hmmm I did dopamine detox quite well today, just learn and play soccer, not wasting time on game or social media :)",
    "Today I did 8 pomodoros 1 hours, but still feel like I am not productive as I want, I must push harder tomorrow and become a Backend Engineer in the future :) "
  );
  diary1.createdDate = yesterday;
  diary1.isOpened = true;
  data["diary"].push(diary1);
}
