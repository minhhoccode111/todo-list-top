// // // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ index.js $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

// // //this is index.js

// // // import css
// // import "./../css/responsive.css";
// // import "./../css/animation.css";
// // import "./../css/dialogs.css";
// // import "./../css/styles.css";
// // import "./../css/header.css";
// // import "./../css/footer.css";
// // import "./../css/aside.css";
// // import "./../css/reset.css";
// // import "./../css/main.css";
// // import "animate.css";

// // //import javaScript
// // import "./fns.js";
// // import "./database.js";
// // import "./prototype.js";
// // import "./create.js";
// // import "./current.js";
// // import "./id.js";
// // import "./data.js";
// // import "./diary.js";
// // import "./display.js";
// // import "./dialogs.js";
// // import "./listener.js";
// // import "./edit.js";
// // import "./info.js";
// // import "./todoElement.js";
// // import "./noteElement.js";
// // import "./projectElement.js";
// // import "./diaryElement.js";

// // //import module
// // import * as database from "./database.js";

// // export function resetApp() {
// //   database.set(null, "diary");
// //   database.set(null, "id");
// //   database.set(null, "data");
// //   database.set(null, "current");
// //   database.set(null, "dairy"); //typos
// //   database.set(null, "date"); //typos
// // }
// // // resetApp();

// // // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ current.js $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// //this is current.js
// import * as database from "./database.js";

// let current = "all";

// export const get = () => current;

// export const set = (v) => {
//   current = v;
//   database.set(current, "current");
// };

// export const load = () => {
//   if (database.check("current")) {
//     current = database.get("current");
//   }
// };

// // // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ create.js $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//this is create.js

// import { now, today, checkExpired } from "./fns.js";
// import { get as getId } from "./id.js";
// import * as Prototype from "./prototype";

// //Todo Factory function
// export function Todo(
//   title,
//   detail,
//   dueDate,
//   hasDueDate,
//   priority,
//   isDone,
//   project
// ) {
//   const id = getId();
//   const createdDate = today();
//   const lastModified = now();
//   const isTimeExpired = checkExpired(dueDate);
//   const type = "todo";

//   return Object.assign(Object.create(Prototype.todo), {
//     id,
//     type,
//     title,
//     detail,
//     isDone,
//     project,
//     dueDate,
//     priority,
//     hasDueDate,
//     createdDate,
//     lastModified,
//     isTimeExpired,
//   });
// }

// //Note Factory function
// export function Note(title, detail, dueDate, hasDueDate) {
//   const id = getId();
//   const createdDate = today();
//   const lastModified = now();
//   const isTimeExpired = checkExpired(dueDate);
//   const type = "note";
//   return Object.assign(Object.create(Prototype.note), {
//     id,
//     type,
//     title,
//     detail,
//     dueDate,
//     hasDueDate,
//     createdDate,
//     lastModified,
//     isTimeExpired,
//   });
// }
// //Diary Factory function
// export function Diary(day, night) {
//   const createdDate = today();
//   const lastModified = now();
//   const type = "diary";
//   const isOpened = false;

//   return Object.assign(Object.create(Prototype.diary), {
//     day,
//     type,
//     night,
//     isOpened,
//     createdDate,
//     lastModified,
//   });
// }
// //Project Factory function
// export function Project(title, detail, dueDate, hasDueDate) {
//   const id = getId();
//   const createdDate = today();
//   const lastModified = now();
//   const isTimeExpired = checkExpired(dueDate);
//   const type = "project";
//   return Object.assign(Object.create(Prototype.project), {
//     id,
//     type,
//     title,
//     detail,
//     dueDate,
//     hasDueDate,
//     createdDate,
//     lastModified,
//     isTimeExpired,
//   });
// }

// // // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ database.js $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//this is database.js

// export const set = (variable, name) => {
//   if (variable === null) {
//     localStorage.removeItem(name);
//   } else {
//     try {
//       localStorage.setItem(name, JSON.stringify(variable));
//     } catch (error) {
//       // Handle localStorage quota exceeded or other errors
//       console.error("Error while storing data in localStorage:", error);
//     }
//   }
// };

// export const get = (name) => {
//   try {
//     return JSON.parse(localStorage.getItem(name));
//   } catch (error) {
//     // Handle invalid JSON or other errors
//     console.error("Error while retrieving data from localStorage:", error);
//     return null;
//   }
// };

// export const check = (name) => {
//   return localStorage.getItem(name) !== null;
// };

// // // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ data.js $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//this is data.js

// import * as database from "./database.js";
// import * as Prototype from "./prototype.js";
// import * as Create from "./create.js";
// import {
//   sub,
//   endOfWeek,
//   endOfMonth,
//   endOfYear,
//   format,
//   parseISO,
// } from "date-fns";
// import { diary } from "./diaryElement.js";

// const today = new Date();
// const thisDay = format(new Date(), "yyyy-MM-dd");
// const yesterday = format(sub(today, { days: 1 }), "yyyy-MM-dd");
// const twoDaysPast = format(sub(today, { days: 2 }), "yyyy-MM-dd");
// const thisWeek = format(endOfWeek(today), "yyyy-MM-dd");
// const thisMonth = format(endOfMonth(today), "yyyy-MM-dd");
// const thisYear = format(endOfYear(today), "yyyy-MM-dd");

// let data = {
//   all: [
//     Create.Todo(
//       "Finish Check-Mate project",
//       "Todo List project on The Odin Project.",
//       thisWeek,
//       true,
//       "med",
//       true,
//       "all"
//     ),
//     Create.Todo(
//       "Pay food bill",
//       "Of the next 10 days.",
//       thisWeek,
//       true,
//       "high",
//       true,
//       "all"
//     ),
//     Create.Todo(
//       "Buy 2 concert tickets",
//       "Buy 2 concert tickets Ca Hoi Hoang.",
//       thisWeek,
//       true,
//       "high",
//       true,
//       "all"
//     ),
//   ],
//   today: [
//     Create.Todo(
//       "dummy todo",
//       "this is a dummy Todo",
//       thisDay,
//       true,
//       "low",
//       true,
//       "today"
//     ),
//     Create.Todo(
//       "dummy todo",
//       "this is a dummy Todo",
//       thisDay,
//       true,
//       "med",
//       false,
//       "today"
//     ),
//     Create.Todo(
//       "learn 8-10 hours",
//       "learn at least 8 hours today",
//       thisDay,
//       true,
//       "high",
//       false,
//       "today"
//     ),
//     Create.Todo(
//       "finish this application ",
//       "to move on",
//       thisDay,
//       true,
//       "low",
//       true,
//       "today"
//     ),
//     Create.Todo(
//       "brush teeth",
//       "with colgate",
//       thisDay,
//       true,
//       "med",
//       true,
//       "today"
//     ),
//   ],
//   week: [
//     Create.Todo(
//       "1 extra project",
//       "1 extra project along with project on The Odin Project",
//       thisWeek,
//       true,
//       "med",
//       false,
//       "week"
//     ),
//     Create.Todo(
//       "play soccer once",
//       "play soccer once or twice a week",
//       thisWeek,
//       true,
//       "low",
//       true,
//       "week"
//     ),
//   ],
//   month: [
//     Create.Todo(
//       "buy new laptop",
//       "to code faster",
//       thisMonth,
//       true,
//       "med",
//       false,
//       "month"
//     ),
//     Create.Todo(
//       "portfolio website",
//       "to show my projects",
//       thisMonth,
//       true,
//       "low",
//       false,
//       "month"
//     ),
//     Create.Todo(
//       "vaiQuyenSach website",
//       "for my customer",
//       thisMonth,
//       true,
//       "high",
//       false,
//       "month"
//     ),
//     Create.Todo(
//       "Check-Mate application",
//       "finish it",
//       thisMonth,
//       true,
//       "med",
//       true,
//       "month"
//     ),
//     Create.Todo(
//       "finish Free Code Camp Database curriculum",
//       "database on freeCodeCamp",
//       thisYear,
//       true,
//       "med",
//       false,
//       "month"
//     ),
//   ],
//   year: [
//     Create.Todo(
//       "finish CS50x Computer Science",
//       "introduction to computer science",
//       thisYear,
//       true,
//       "med",
//       false,
//       "year"
//     ),
//     Create.Todo(
//       "finish CS50p Python",
//       "introduction to programming with python",
//       thisYear,
//       true,
//       "med",
//       false,
//       "year"
//     ),
//     Create.Todo(
//       "finish CS50w Web",
//       "introduction to web programming with python and javascript",
//       thisYear,
//       true,
//       "med",
//       false,
//       "year"
//     ),
//     Create.Todo(
//       "Data Structure and Algorithm",
//       "one Hacker rank",
//       thisYear,
//       true,
//       "low",
//       false,
//       "year"
//     ),
//     Create.Todo(
//       "Intermediate JavaScript Certificate",
//       "one Hacker rank",
//       thisYear,
//       true,
//       "high",
//       false,
//       "year"
//     ),
//     Create.Todo(
//       "Intermediate Problem Solving Certificate",
//       "one Hacker rank",
//       thisYear,
//       true,
//       "high",
//       false,
//       "year"
//     ),
//   ],
//   project: [
//     Create.Project("work", "Out work everyone!", "", false),
//     Create.Project("learn", "Don't stop learning!", "", false),
//     Create.Project("gym", "Remember: Stay hard guys!", "", false),
//     Create.Project("check-mate", "Todos of this application!", "", false),
//   ],
//   note: [
//     Create.Note(
//       "just edit note right in this square",
//       "above is title, and this is detail",
//       "",
//       false
//     ),
//     Create.Note("quite simple", "right?", "", false),
//     Create.Note(
//       "when you edit the input field",
//       "it will save the last time you modified it",
//       "",
//       false
//     ),
//     Create.Note("some dummies", "some dummies notes", "", false),
//     Create.Note(
//       "maybe I will come back and pick up this project in the future, ",
//       "because the due date kinda worthless, I should add some features to it like sort by due date, sort by priority, when the item is out of date then we display is differently",
//       "",
//       false
//     ),
//     Create.Note(
//       'div contenteditable="true" edit event',
//       'DOM event occur when we change content of it is "input"',
//       "",
//       false
//     ),
//     Create.Note(
//       "I spend 15 days on this project bruh",
//       `maybe I'm too slow`,
//       "",
//       false
//     ),
//     Create.Note(
//       "Open and close dialog element",
//       `with DOM API method show() and close(), open it by default with 'open' attribute`,
//       "",
//       false
//     ),
//     Create.Note(
//       "'blur' event",
//       `occur when a button, or link, or input stop being focus`,
//       "",
//       false
//     ),
//     Create.Note(
//       "'textContent' over 'innerHTML'",
//       `we should interact with inputs field through textContent instead of innerHTML to prevent hacker or user pass in something that cause unexpected behavior`,
//       "",
//       false
//     ),
//   ],
//   diary: [],
//   gym: [
//     Create.Todo(
//       "push up",
//       "do 100000 push up a day and stay hard",
//       thisDay,
//       true,
//       "high",
//       false,
//       "gym"
//     ),
//     Create.Todo(
//       "running",
//       "run 100km a day and stay hard",
//       thisDay,
//       true,
//       "med",
//       false,
//       "gym"
//     ),
//     Create.Todo(
//       "jumping",
//       "jump 1 billion times and stay hard",
//       "",
//       false,
//       "low",
//       true,
//       "gym"
//     ),
//   ],
//   work: [
//     Create.Todo(
//       "Trang website",
//       "a website to display book and search book my customer has so that people can see to borrow or buy it",
//       thisWeek,
//       true,
//       "high",
//       false,
//       "work"
//     ),
//     Create.Todo(
//       "check-mate project",
//       " finish check-mate project",
//       thisWeek,
//       true,
//       "med",
//       true,
//       "work"
//     ),
//   ],
//   learn: [
//     Create.Todo(
//       "ES6 and webpack",
//       "know how to use webpack and ES6 module with The Odin Project curriculum",
//       thisWeek,
//       true,
//       "low",
//       true,
//       "learn"
//     ),
//     Create.Todo(
//       "JavaScript on The Odin Project",
//       "learn it by this end of this year",
//       thisYear,
//       true,
//       "high",
//       false,
//       "learn"
//     ),
//     Create.Todo(
//       "JavaScript on Exercism",
//       "learn it by this end of this year",
//       thisYear,
//       true,
//       "med",
//       false,
//       "learn"
//     ),
//     Create.Todo(
//       "Data Structure and Algorithms",
//       "learn it by this end of this year",
//       thisYear,
//       true,
//       "low",
//       false,
//       "learn"
//     ),
//   ],
//   "check-mate": [
//     Create.Todo(
//       "This Check-Mate project is a dummies project",
//       "just click the project button above too see all custom projects and delete this project if you want.",
//       thisWeek,
//       true,
//       "low",
//       true,
//       "check-mate"
//     ),
//     Create.Todo(
//       "Diary details element",
//       "when toggle details element, save it to database too.",
//       thisWeek,
//       true,
//       "low",
//       true,
//       "check-mate"
//     ),
//     Create.Todo(
//       "put add code into full.js file",
//       "put all to it, separate in each module and going through each line of code, write comments to make sure I absolutely understand this project.",
//       thisWeek,
//       true,
//       "med",
//       true,
//       "check-mate"
//     ),
//     Create.Todo(
//       "dummies item,init data",
//       "create dummies item, init data so that user quickly understand this application .",
//       thisWeek,
//       true,
//       "low",
//       true,
//       "check-mate"
//     ),
//     Create.Todo(
//       "delete things we don't use",
//       "like html, css and javaScript comments, empty declaration.",
//       thisWeek,
//       true,
//       "low",
//       true,
//       "check-mate"
//     ),
//     Create.Todo(
//       "diary logic",
//       "double check this feature because if we want to know whether it work well, we have to wail till the next day. Kinda sad",
//       thisWeek,
//       true,
//       "low",
//       true,
//       "check-mate"
//     ),
//     Create.Todo(
//       "users",
//       "and yeah, we should have someone use this app, not just me, haha",
//       thisWeek,
//       true,
//       "low",
//       false,
//       "check-mate"
//     ),
//   ],
// };

// //Use to load data from database when app is loaded
// export const load = () => {
//   if (database.check("data")) {
//     data = Prototype.restore(database.get("data"));
//   }
// };

// // use to set data to database
// export const set = () => database.set(data, "data");

// export const get = () => data;

// export const add = (obj, project) => {
//   data[project].push(obj);
//   set();
// };

// export const del = (project, index) => {
//   data[project].splice(index, 1);
//   set();
// };

// const getAllTodoProject = () => {
//   let arr = [];
//   for (const p in data) {
//     if (p === "project" || p === "note" || p === "diary") continue;
//     arr.push(p);
//   }
//   return arr;
// };

// const addAProjectToData = (name) => {
//   if (data.hasOwnProperty(name)) {
//     return alert("That project is already existed!");
//   }
//   data[name] = [];
//   set();
// };

// const delAProjectFromData = (name) => {
//   delete data[name];
//   set();
// };

// const getProjectItems = (name) => {
//   return data[name];
// };

// const getProjectLength = (name) => {
//   if (["note", "diary", "project"].includes(name)) return data[name].length;

//   if (name === "all") {
//     return getAllTodoProject().reduce(
//       (total, current) =>
//         total +
//         data[current].reduce((t, c) => {
//           if (c.isDone) {
//             return t;
//           } else {
//             return t + 1;
//           }
//         }, 0),
//       0
//     );
//   }
//   return data[name].reduce((total, current) => {
//     if (current.isDone) {
//       return total;
//     }
//     return total + 1;
//   }, 0);
// };

// const getCustomProjects = () => data.project;

// //another module inside
// export const projects = {
//   add: addAProjectToData,
//   del: delAProjectFromData,
//   all: getAllTodoProject,
//   get: getProjectItems,
//   getL: getProjectLength,
//   custom: getCustomProjects,
// };

// export function init() {
//   //use this function to modified Diary item because it auto create
//   const diary0 = Create.Diary(
//     "diary project is used to save your diary record, daily events, daybook, just write down your thoughts, talk to yourself to be more mindfulness",
//     "it has 2 sections, your thoughts along the day and your thoughts before going to bed"
//   );
//   diary0.createdDate = twoDaysPast;
//   diary0.isOpened = true;
//   data["diary"].push(diary0);
//   const diary1 = Create.Diary(
//     "Hmmm I did dopamine detox quite well today, just learn and play soccer, not wasting time on game or social media :)",
//     "Today I did 8 pomodoros 1 hours, but still feel like I am not productive as I want, I must push harder tomorrow and become a Backend Engineer in the future :) "
//   );
//   diary1.createdDate = yesterday;
//   diary1.isOpened = true;
//   data["diary"].push(diary1);
// }

// // // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ dialogs.js $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

//this is dialogs.js

// import * as Create from "./create.js";
// import * as Current from "./current.js";
// import * as Display from "./display.js";
// import * as Data from "./data.js";

// export function listenForCreate(type) {
//   const dialog = document.getElementById(`of__${type}`);
//   const dueDateInput = document.getElementById(`dueDate__of__${type}`);
//   const inputs = document.querySelectorAll(
//     `input[name="hasDueDate__of__${type}"]`
//   );
//   inputs.forEach((input) => {
//     input.addEventListener("change", function () {
//       if (this.value === "yes") {
//         dueDateInput.disabled = false;
//         dueDateInput.setAttribute("required", "required");
//       } else {
//         dueDateInput.disabled = true;
//         dueDateInput.removeAttribute("required");
//         dueDateInput.value = "";
//       }
//     });
//   });
//   const form = document.getElementById(`form__of__${type}`);
//   form.addEventListener("submit", function (event) {
//     event.preventDefault();
//     // Retrieve form data
//     let obj;
//     const title = document.getElementById(`title__of__${type}`).value;
//     const detail = document.getElementById(`detail__of__${type}`).value;
//     const dueDate = document.getElementById(`dueDate__of__${type}`).value;
//     const hasDueDate =
//       document.querySelector(`input[name="hasDueDate__of__${type}"]:checked`)
//         .value === "yes";
//     const project = Current.get();
//     if (type === "todo") {
//       const priority = document.querySelector(
//         'input[name="priority__of__todo"]:checked'
//       ).value;
//       const isDone =
//         document.querySelector('input[name="isDone__of__todo"]:checked')
//           .value === "true";
//       obj = Create.Todo(
//         title,
//         detail,
//         dueDate,
//         hasDueDate,
//         priority,
//         isDone,
//         project
//       );
//       Data.add(obj, project); //add to Data
//     } else if (type === "note") {
//       obj = Create.Note(title, detail, dueDate, hasDueDate);
//       Data.add(obj, project); //add to Data
//     } else if (type === "project") {
//       obj = Create.Project(title, detail, dueDate, hasDueDate);
//       Data.projects.add(title); //
//       Data.add(obj, project); //add to Data
//       Display.customProjectBtns(Data.projects.get(project)); //display
//     }
//     Display.projectItems(project); //display
//     Display.updateSpan();

//     console.log(obj);
//     // Reset the form
//     dueDateInput.disabled = true; //disable again
//     form.reset();
//     dialog.close();
//   });

//   //Close when click cancel
//   document
//     .querySelector(`input#cancel__of__${type}[value="Cancel"][type="button"]`)
//     .addEventListener("click", () => {
//       dialog.close();
//       dueDateInput.disabled = true;
//       form.reset();
//     });
// }

// // // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ diaryElement.js $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//this is diaryElement.js
// import * as Data from "./data.js";

// export function diary(obj) {
//   let { isOpened, createdDate, day, night } = obj;
//   const container = document.createElement("div");
//   container.classList.add("diary__item");

//   const details = document.createElement("details");
//   details.classList.add("diary__item__details");
//   details.open = isOpened;
//   details.addEventListener("toggle", (e) => {
//     diaryToggledDetails(obj);
//   });
//   container.appendChild(details);

//   const summary = document.createElement("summary");
//   summary.classList.add("diary__item__details__summary");
//   details.appendChild(summary);

//   const date = document.createElement("em");
//   date.classList.add("diary__item__date");
//   date.textContent = createdDate;
//   summary.appendChild(date);

//   const dayParagraph = document.createElement("p");
//   dayParagraph.classList.add("diary__item__day");
//   dayParagraph.textContent = day;
//   details.appendChild(dayParagraph);

//   const nightParagraph = document.createElement("p");
//   nightParagraph.classList.add("diary__item__night");
//   nightParagraph.textContent = night;
//   details.appendChild(nightParagraph);

//   return container;
// }

// function diaryToggledDetails(o) {
//   if (o.isOpened) {
//     o.isOpened = false;
//   } else {
//     o.isOpened = true;
//   }
//   Data.set();
// }

// // // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ diary.js $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

//this is diary.js

// import { Diary } from "./create.js";
// import * as database from "./database.js";
// import * as Prototype from "./prototype.js";
// import { isYesterday, isBefore, startOfToday } from "date-fns";
// import * as Data from "./data.js";

// let obj = Diary(
//   "I am not productive, I feel sad about that",
//   "I will push harder tomorrow! Learn and do new project on The Odin Project and become a Backend Engineer. I Can do it!"
// );

// const set = () => database.set(obj, "diary");

// export const get = () => obj;

// export const load = () => {
//   if (database.check("diary")) {
//     obj = Object.assign(Object.create(Prototype.diary), database.get("diary"));
//   }
//   //is the created date of the diary is yesterday, then add it to 'diary' project in data, then update data to database, then create new Diary for today, then update that to 'diary' in database
//   const today = startOfToday();
//   if (isBefore(new Date(obj.createdDate), today)) {
//     Data.add(obj, "diary");
//     Data.set();
//     obj = Diary("write your thoughts here", "write your thoughts here");
//     set();
//   }
// };

// export const day = (v) => {
//   obj.day = v;
//   set();
// };

// export const night = (v) => {
//   obj.night = v;
//   set();
// };

// export const typeInput = (obj) => {
//   const container = document.createElement("div");
//   container.id = "section__diary__inputs__ctn";

//   const lastModified = document.createElement("em");
//   lastModified.id = "diary__last__modified";
//   lastModified.textContent = `Last modified: ${obj.lastModified}`;
//   container.appendChild(lastModified);

//   const formDay = document.createElement("div");
//   formDay.id = "diary__form__day";
//   container.appendChild(formDay);

//   const dayParagraph = document.createElement("p");
//   dayParagraph.textContent = "Your thoughts all day long.";
//   formDay.appendChild(dayParagraph);

//   const dayHr = document.createElement("hr");
//   formDay.appendChild(dayHr);

//   const dayInput = document.createElement("div");
//   dayInput.id = "diary__input__day";
//   dayInput.contentEditable = true;
//   dayInput.spellcheck = false;
//   dayInput.textContent = obj.day;
//   dayInput.addEventListener("input", (event) => {
//     obj.setLastModified();
//     day(event.target.textContent);
//   });
//   formDay.appendChild(dayInput);

//   const formNight = document.createElement("div");
//   formNight.id = "diary__form__night";
//   container.appendChild(formNight);

//   const nightParagraph = document.createElement("p");
//   nightParagraph.textContent = "Your thoughts before bed.";
//   formNight.appendChild(nightParagraph);

//   const nightHr = document.createElement("hr");
//   formNight.appendChild(nightHr);

//   const nightInput = document.createElement("div");
//   nightInput.id = "diary__input__night";
//   nightInput.contentEditable = true;
//   nightInput.spellcheck = false;
//   nightInput.textContent = obj.night;
//   nightInput.addEventListener("input", (event) => {
//     obj.setLastModified();
//     night(event.target.textContent);
//   });
//   formNight.appendChild(nightInput);

//   return container;
// };

// // // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ display.js $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

//this is display.js

// import * as Data from "./data.js";
// import { buttonPlus } from "./listener.js";
// import * as Diary from "./diary.js";
// import * as Current from "./current.js";
// import { todo } from "./todoElement.js";
// import { note } from "./noteElement.js";
// import { project } from "./projectElement.js";
// import { diary } from "./diaryElement.js";

// export const main = document.getElementById("main");
// export const nav = document.getElementById("aside__nav");
// export const custom = document.getElementById("custom__projects__ctn");

// const buttons = document.querySelectorAll(".nav__button");
// buttons.forEach((button) => {
//   button.addEventListener("click", (e) => {
//     const name = e.target.dataset.name;
//     if (Current.get() === name) return;
//     Current.set(name);
//     projectItems(name);
//     if (name === "diary") {
//       buttonPlus.classList.add("hidden");
//     } else {
//       buttonPlus.classList.remove("hidden");
//     }
//   });
// });

// export function updateSpan() {
//   const buttons = nav.querySelectorAll(".nav__button");
//   buttons.forEach((button) => {
//     const name = button.dataset.name;
//     const span = button.nextElementSibling;
//     span.textContent = Data.projects.getL(name);
//   });
// }

// export function customProjectBtns(customProjects) {
//   custom.innerHTML = "";
//   for (const item of customProjects) {
//     const name = item["title"];
//     const length = Data.projects.getL(name);
//     custom.appendChild(createCustomButtons(name, length));
//   }
// }

// function createCustomButtons(name, length) {
//   const container = document.createElement("div");
//   container.classList.add("nav__button__ctn");
//   container.classList.add("child");

//   const button = document.createElement("button");
//   button.classList.add("nav__button");
//   button.setAttribute("data-name", `${name}`); //FIXME fix this classList to be data-name because if user create a project named with space then we'll have an error with classList.add()
//   button.textContent = name;
//   button.addEventListener("click", () => {
//     if (Current.get() === name) return;
//     Current.set(name);
//     projectItems(Current.get());
//   });
//   container.appendChild(button);

//   const span = document.createElement("span");
//   span.classList.add("tinynum");
//   span.textContent = length;
//   container.appendChild(span);

//   return container;
// }

// export const projectItems = (name) => {
//   let items = Data.projects.get(name);
//   let data = Data.get();
//   main.innerHTML = "";
//   if (name === "all") {
//     for (const prop in data) {
//       if (["project", "note", "diary"].includes(prop)) continue;
//       for (let i = 0; i < data[prop].length; i++) {
//         main.appendChild(todo(data[prop][i], prop, i));
//       }
//     }
//   } else {
//     for (let i = 0; i < items.length; i++) {
//       let item = items[i];
//       if (name === "diary" && i === 0) {
//         main.appendChild(Diary.typeInput(Diary.get()));
//       }
//       if (name === "diary") {
//         main.appendChild(diary(item, i));
//       } else if (name === "note") {
//         main.appendChild(note(item, i));
//       } else if (name === "project") {
//         main.appendChild(project(item, i));
//       } else {
//         main.appendChild(todo(item, name, i));
//       }
//     }
//   }
// };

// // // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ edit.js $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

//this is edit.js
// import * as Data from "./data.js";

// //######################## Dialogs to take inputs to edit Obj in Data #########################/
// let objCurrent;

// let elementParent;

// export const setElementParent = (v) => (elementParent = v);

// export const getElementParent = () => elementParent;

// export const setObjCurrent = (o) => (objCurrent = o);

// export const getObjCurrent = () => objCurrent;

// export const dialog = document.getElementById(`of__edit`);
// const dueDateInput = document.getElementById(`dueDate__of__edit`);
// const inputs = document.querySelectorAll(`input[name="hasDueDate__of__edit"]`);
// inputs.forEach((input) => {
//   input.addEventListener("change", function () {
//     if (this.value === "yes") {
//       dueDateInput.disabled = false;
//       dueDateInput.setAttribute("required", "required");
//     } else {
//       dueDateInput.disabled = true;
//       dueDateInput.removeAttribute("required");
//       dueDateInput.value = "";
//     }
//   });
// });
// const form = document.getElementById(`form__of__edit`);
// const title = document.getElementById(`title__of__edit`);
// const detail = document.getElementById(`detail__of__edit`);
// const dueDate = document.getElementById(`dueDate__of__edit`);

// //Close when click cancel
// const cancel = document.querySelector(
//   `input#cancel__of__edit[value="Cancel"][type="button"]`
// );

// cancel.addEventListener("click", () => {
//   dialog.close();
//   form.reset();
//   dueDateInput.disabled = true;
// });

// export function fillEditInputs() {
//   title.value = objCurrent.title;
//   detail.value = objCurrent.detail;
//   dueDate.value = objCurrent.dueDate;
//   if (objCurrent.hasDueDate) {
//     document.querySelector(
//       `input[name="hasDueDate__of__edit"][value="yes"]`
//     ).checked = true;
//   } else {
//     document.querySelector(
//       `input[name="hasDueDate__of__edit"][value="no"]`
//     ).checked = true;
//   }
//   document.querySelector(
//     `input[name="priority__of__edit"][value="${objCurrent.priority}"]`
//   ).checked = true;
//   document.querySelector(
//     `input[name="isDone__of__edit"][value="${objCurrent.isDone}"]`
//   ).checked = true;
// }

// form.addEventListener("submit", function (event) {
//   event.preventDefault();
//   objCurrent.title = title.value;
//   objCurrent.detail = detail.value;
//   objCurrent.dueDate = dueDate.value;
//   objCurrent.hasDueDate =
//     document.querySelector(`input[name="hasDueDate__of__edit"]:checked`)
//       .value === "yes"
//       ? true
//       : false;
//   objCurrent.priority = document.querySelector(
//     `input[name="priority__of__edit"]:checked`
//   ).value;
//   objCurrent.isDone =
//     document.querySelector(`input[name="isDone__of__edit"]:checked`).value ===
//     "true"
//       ? true
//       : false;
//   console.dir(objCurrent);
//   objCurrent.setLastModified();
//   Data.set();

//   updateTodoItem(objCurrent, elementParent);

//   // Reset the form
//   dueDateInput.disabled = true;
//   form.reset();
//   dialog.close();
// });

// function updateTodoItem(obj, elementParent) {
//   const h3 = elementParent.querySelector(".todo__item__title");
//   const em = elementParent.querySelector(".todo__item__date");
//   const buttonDone = elementParent.querySelector(".todo__item__done");

//   // Update the necessary elements with the new values
//   h3.textContent = obj.title;
//   em.textContent = obj.dueDate;
//   buttonDone.innerHTML = obj.htmlDone();
//   elementParent.className =
//     "todo__item" + " " + obj.classDone() + " " + obj.priority;
// }

// // // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ fns.js $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//this is fns.js

// import { parseISO, format, isBefore } from "date-fns";

// // console.log(fns.parseISO("2023-06-27")); //Date object
// // console.log(fns.format(new Date(), "yyyy-MM-dd")); //2023-06-27
// // console.log(fns.isBefore(new Date("2023-06-26"), new Date("2023-06-27")));//true

// export const now = () => {
//   const date = format(new Date(), "yyyy-MM-dd");
//   const time = format(new Date(), "HH:mm:ss");
//   return `${date} ${time}`;
// };

// export const today = () => format(new Date(), "yyyy-MM-dd");

// export const checkExpired = (dueDate) => {
//   if (!dueDate) return false; // If dueDate is empty or falsy, return false
//   return isBefore(parseISO(dueDate), new Date());
// };

// // // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ id.js $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

//this is id.js

// import * as database from "./database.js";

// let id = 0;

// const set = () => database.set(id, "id");

// //Use to set id from database when app is loaded
// export const load = () => {
//   if (database.check("id")) {
//     id = database.get("id");
//   }
// };

// export const get = () => {
//   let i = id;
//   id++;
//   set();
//   return i;
// };

// // // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ info.js $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

//this is info.js

//######################## Dialogs to show info #########################/
// Selecting the wrapper element
// const wrapper = document.querySelector(".popup__info__wrapper");
// const popup = document.querySelector(".popup__info");
// popup.addEventListener("mouseover", () => {
//   popup.classList.add(`animate__animated`, `animate__pulse`);
// });
// popup.addEventListener("mouseout", () => {
//   popup.classList.remove(`animate__animated`, `animate__pulse`);
// });

// // Selecting the elements within the wrapper
// const messageH2 = wrapper.querySelector(".popup__info__message");
// const idP = wrapper.querySelector(".info__id");
// const titleP = wrapper.querySelector(".info__title");
// const detailP = wrapper.querySelector(".info__detail");
// const isDoneP = wrapper.querySelector(".info__isDone");
// const projectP = wrapper.querySelector(".info__project");
// const dueDateP = wrapper.querySelector(".info__dueDate");
// const priorityP = wrapper.querySelector(".info__priority");
// const createdDateP = wrapper.querySelector(".info__createdDate");
// const lastModifiedP = wrapper.querySelector(".info__lastModified");
// const isTimeExpiredP = wrapper.querySelector(".info__isTimeExpired");

// const removeButton = wrapper.querySelector(".popup__info__remove");
// removeButton.addEventListener("mouseover", () => {
//   removeButton.classList.add(`animate__animated`, `animate__pulse`);
// });
// removeButton.addEventListener("mouseout", () => {
//   removeButton.classList.remove(`animate__animated`, `animate__pulse`);
// });

// removeButton.addEventListener("click", () => {
//   wrapper.classList.add("hidden");
// });

// export function displayInfo(o) {
//   let {
//     id,
//     type,
//     title,
//     detail,
//     isDone,
//     project,
//     dueDate,
//     priority,
//     createdDate,
//     lastModified,
//     isTimeExpired,
//   } = o;

//   if ((type = "todo")) {
//     messageH2.textContent = "Information of Todo";
//   }
//   if ((type = "note")) {
//     messageH2.textContent = "Information of Note";
//   }
//   if ((type = "project")) {
//     messageH2.textContent = "Information of Project";
//   }

//   idP.textContent = id;
//   titleP.textContent = title;
//   isDoneP.textContent = isDone === undefined ? "" : isDone;
//   detailP.textContent = detail;
//   projectP.textContent = project;
//   dueDateP.textContent = dueDate;
//   priorityP.textContent = priority === undefined ? "" : priority;
//   createdDateP.textContent = createdDate;
//   lastModifiedP.textContent = lastModified;
//   isTimeExpiredP.textContent = isTimeExpired;

//   wrapper.classList.remove("hidden");
// }

// // // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ listener.js $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

//this is listener.js

// import * as Dialogs from "./dialogs";
// import * as Current from "./current.js";
// import * as Display from "./display.js";
// import * as Data from "./data.js";
// import * as Id from "./id.js";
// import * as Diary from "./diary.js";

// //show about section
// const ofAbout = document.getElementById("of__about");
// const aboutClose = document.getElementById("about__close");
// const aboutOpen = document.getElementById("header__about");
// aboutOpen.addEventListener("click", (e) => {
//   ofAbout.show();
// });
// aboutClose.addEventListener("click", (e) => {
//   ofAbout.close();
// });

// //Show forms base on Current
// export const buttonPlus = document.getElementById("button__plus");
// const ofTodo = document.getElementById("of__todo");
// const ofNote = document.getElementById("of__note");
// const ofProject = document.getElementById("of__project");

// buttonPlus.addEventListener("click", () => {
//   const name = Current.get();
//   if (name === "note") {
//     ofNote.show();
//   } else if (name === "project") {
//     ofProject.show();
//   } else {
//     ofTodo.show();
//   }
// });
// //DOM Loaded
// window.addEventListener("DOMContentLoaded", () => {
//   Dialogs.listenForCreate("todo");
//   Dialogs.listenForCreate("note");
//   Dialogs.listenForCreate("project");
//   //data init of the app when user open the first time
//   Data.init();
//   //load data from database
//   Id.load();
//   Data.load();
//   Diary.load();
//   Current.load();
//   //hide button plus
//   if (Current.get() === "diary") {
//     buttonPlus.classList.add("hidden");
//   }
//   //init display
//   Display.customProjectBtns(Data.projects.get("project"));
//   Display.projectItems(Current.get());
//   Display.updateSpan();
// });

// // // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ noteElement.js $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

//this is noteElement.js
// import { displayInfo } from "./info.js";
// import * as Data from "./data.js";
// import * as Display from "./display.js";

// export function note(obj) {
//   const { id, title, lastModified, detail } = obj;

//   const divNoteItem = document.createElement("div");
//   divNoteItem.className = "note__item";
//   divNoteItem.setAttribute("data-id", id);

//   const divNoteHeader = document.createElement("div");
//   divNoteHeader.className = "note__item__header";

//   const divNoteTitle = document.createElement("div");
//   divNoteTitle.className = "note__item__title";
//   divNoteTitle.contentEditable = true;
//   divNoteTitle.spellcheck = false;
//   divNoteTitle.textContent = title;
//   divNoteTitle.addEventListener("input", (e) => {
//     noteEditedInputs(obj, "title", e.target.textContent);
//   });

//   const emLastModified = document.createElement("em");
//   emLastModified.textContent = lastModified;

//   const buttonInfo = document.createElement("button");
//   buttonInfo.className = "note__item__info info";
//   buttonInfo.textContent = "?";
//   buttonInfo.addEventListener("click", () => {
//     displayInfo(obj);
//   });

//   const buttonDel = document.createElement("button");
//   buttonDel.className = "note__item__del del";
//   buttonDel.textContent = "X";
//   buttonDel.addEventListener("click", () => {
//     divNoteItem.remove();
//     noteClickedDelete(obj);
//   });

//   const divNoteDetail = document.createElement("div");
//   divNoteDetail.className = "note__item__detail";
//   divNoteDetail.contentEditable = true;
//   divNoteDetail.spellcheck = false;
//   divNoteDetail.textContent = detail;
//   divNoteDetail.addEventListener("input", (e) => {
//     noteEditedInputs(obj, "detail", e.target.textContent);
//   });

//   divNoteItem.appendChild(divNoteHeader);
//   divNoteHeader.appendChild(divNoteTitle);
//   divNoteHeader.appendChild(emLastModified);
//   divNoteHeader.appendChild(buttonInfo);
//   divNoteHeader.appendChild(buttonDel);
//   divNoteItem.appendChild(divNoteDetail);

//   return divNoteItem;
// }

// function noteEditedInputs(obj, property, value) {
//   obj[property] = value;
//   obj.setLastModified();
//   Data.set();
// }

// function noteClickedDelete(obj) {
//   const index = Data.projects.get("note").indexOf(obj);
//   Data.del("note", index);
//   Display.updateSpan();
// }

// // // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ projectElement.js $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

//this is projectElement.js
// import { displayInfo } from "./info.js";
// import * as Data from "./data.js";
// import { nav } from "./display.js";
// import * as Display from "./display.js";

// export function project(obj) {
//   let { id, title } = obj;

//   const container = document.createElement("div");
//   container.classList.add("project__item");
//   container.dataset.id = id;

//   const titleLink = document.createElement("a");
//   titleLink.classList.add("project__item__title");
//   titleLink.href = "#";
//   titleLink.textContent = title;
//   titleLink.addEventListener("click", () => {
//     projectClickedLink(title);
//   });

//   const infoButton = document.createElement("button");
//   infoButton.classList.add("project__item__info", "info");
//   infoButton.textContent = "?";
//   infoButton.addEventListener("click", () => {
//     displayInfo(obj);
//   });

//   const deleteButton = document.createElement("button");
//   deleteButton.classList.add("project__item__del", "del");
//   deleteButton.textContent = "X";
//   deleteButton.addEventListener("click", () => {
//     deleteButton.parentNode.remove();
//     projectClickedDelete(obj, title);
//   });

//   container.appendChild(titleLink);
//   container.appendChild(infoButton);
//   container.appendChild(deleteButton);

//   return container;
// }

// function projectClickedDelete(obj, name) {
//   const index = Data.projects.get("project").indexOf(obj);
//   Data.del("project", index);
//   Data.projects.del(name);
//   nav.querySelector(`button[data-name="${name}"]`).parentNode.remove();
//   Display.updateSpan();
// }

// function projectClickedLink(name) {
//   nav.querySelector(`button[data-name="${name}"]`).click();
// }

// // // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ prototype.js $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

//this is prototype.js

// import { now, checkExpired } from "./fns.js";

// // ******************** MODULE PROTOTYPE OF FACTORIES FUNCTION ********************
// const proto = {
//   get(property) {
//     return this[property] || "";
//   },
//   setLastModified() {
//     this.lastModified = now();
//   },
//   setExpired() {
//     this.isTimeExpired = checkExpired(this.dueDate);
//   },
// };

// export const todo = Object.assign(Object.create(proto), {
//   classDone() {
//     return this.isDone ? "done" : "";
//   },
//   htmlDone() {
//     return this.isDone ? "&#x2713;" : "";
//   },
// });

// export const note = Object.assign(Object.create(proto), {
//   project: "note",
// });

// export const diary = Object.assign(Object.create(proto), {
//   project: "diary",
//   htmlOpened() {
//     return this.isOpened ? "open" : "";
//   },
// });

// export const project = Object.assign(Object.create(proto), {
//   project: "project",
// });

// export const restore = (data) => {
//   for (let state in data) {
//     for (let obj of data[state]) {
//       switch (state) {
//         case "note":
//           Object.setPrototypeOf(obj, note);
//           break;
//         case "project":
//           Object.setPrototypeOf(obj, project);
//           break;
//         case "diary":
//           Object.setPrototypeOf(obj, diary);
//           break;
//         default:
//           Object.setPrototypeOf(obj, todo);
//           break;
//       }
//     }
//   }
//   return data;
// };

// // // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ todoElement.js $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

//this is todoElement.js
// import { displayInfo } from "./info.js";
// import * as Data from "./data.js";
// import * as Display from "./display.js";
// import * as Edit from "./edit.js";

// export function todo(obj, projectName) {
//   const { id, title, dueDate, priority } = obj;
//   let div = document.createElement("div");
//   div.className = "todo__item" + " " + obj.classDone() + " " + priority;
//   div.setAttribute("data-id", id);

//   let h3 = document.createElement("h3");
//   h3.className = "todo__item__title";
//   h3.textContent = title;

//   let em = document.createElement("em");
//   em.className = "todo__item__date";
//   em.textContent = dueDate;

//   let buttonDone = document.createElement("button");
//   buttonDone.className = "todo__item__done";
//   buttonDone.innerHTML = obj.htmlDone();
//   buttonDone.addEventListener("click", () => {
//     todoClickedDone(obj, buttonDone, div);
//   });

//   let buttonInfo = document.createElement("button");
//   buttonInfo.className = "todo__item__info info";
//   buttonInfo.innerHTML = "?";
//   buttonInfo.addEventListener("click", () => {
//     displayInfo(obj);
//   });

//   let buttonDel = document.createElement("button");
//   buttonDel.className = "todo__item__del del";
//   buttonDel.innerHTML = "X";
//   buttonDel.addEventListener("click", (e) => {
//     buttonDel.parentNode.remove();
//     todoClickedDelete(obj, projectName);
//   });

//   let buttonEdit = document.createElement("button");
//   buttonEdit.className = "todo__item__edit edit";
//   buttonEdit.innerHTML = "...";
//   buttonEdit.addEventListener("click", (e) => {
//     // todoClickedEdit(obj, projectName, div);
//     Edit.setObjCurrent(obj);
//     Edit.setElementParent(div);
//     Edit.fillEditInputs();
//     Edit.dialog.show();
//   });

//   div.appendChild(h3);
//   div.appendChild(em);
//   div.appendChild(buttonDone);
//   div.appendChild(buttonEdit);
//   div.appendChild(buttonInfo);
//   div.appendChild(buttonDel);
//   return div;
// }

// function todoClickedDelete(obj, projectName) {
//   const index = Data.projects.get(projectName).indexOf(obj);
//   Data.del(projectName, index);
//   Display.updateSpan();
// }

// function todoClickedDone(obj, buttonDone, div) {
//   if (obj.isDone) {
//     obj.isDone = false;
//     obj.setLastModified();
//     Data.set();
//     buttonDone.innerHTML = obj.htmlDone();
//     Display.updateSpan();
//     div.classList.remove("done");
//   } else {
//     obj.isDone = true;
//     obj.setLastModified();
//     Data.set();
//     buttonDone.innerHTML = obj.htmlDone();
//     Display.updateSpan();
//     div.classList.add("done");
//   }
// }
