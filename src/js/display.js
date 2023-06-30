//this is display.js

import * as Data from "./data.js";
import { buttonPlus } from "./listener.js";
import * as Diary from "./diary.js";
import * as Current from "./current.js";
import * as Dialogs from "./dialogs.js";
import { listenForEdit } from "./edit.js";
import { listenForInfo } from "./info.js";

export const main = document.getElementById("main");
export const nav = document.getElementById("aside__nav");

function todoItemToggleDone(obj, buttonDone, div) {
  if (obj.isDone) {
    obj.isDone = false;
    // Data.set()
    buttonDone.innerHTML = obj.htmlDone();
    div.classList.remove("done");
  } else {
    obj.isDone = true;
    // Data.set()
    buttonDone.innerHTML = obj.htmlDone();
    div.classList.add("done");
  }
}

function todoItemInfoClicked(obj) {}

function todoItemDeleteClicked(projectName, index) {
  Data.projects.get(projectName).splice(index, 1);
  // Data.set()
}

function todoItemEditClicked(obj, projectName, index) {
  listenForEdit(obj, projectName, index);
  // Data.set()
}

function noteItemInputEdited(obj, property, value) {
  obj[property] = value;
  //Data.set()
}

function noteItemDeleteClicked(index) {
  Data.projects.get("note").splice(index, 1);
  // Data.set()
}

function noteItemInfoClicked(obj) {}

function todo(obj, projectName, index) {
  const { id, title, dueDate, isDone, priority } = obj;
  let div = document.createElement("div");
  div.className = "todo__item" + " " + obj.classDone() + " " + priority;
  div.setAttribute("data-id", id);

  let h3 = document.createElement("h3");
  h3.className = "todo__item__title";
  h3.textContent = title;
  div.appendChild(h3);

  let em = document.createElement("em");
  em.className = "todo__item__date";
  em.textContent = dueDate;
  div.appendChild(em);

  let buttonDone = document.createElement("button");
  buttonDone.className = "todo__item__done";
  buttonDone.innerHTML = obj.htmlDone();
  buttonDone.addEventListener("click", () => {
    todoItemToggleDone(obj, buttonDone, div);
  });
  div.appendChild(buttonDone);

  let buttonInfo = document.createElement("button");
  buttonInfo.className = "todo__item__info info";
  buttonInfo.innerHTML = "?";
  buttonInfo.addEventListener("click", () => {
    todoItemInfoClicked(obj);
  });
  div.appendChild(buttonInfo);

  let buttonDel = document.createElement("button");
  buttonDel.className = "todo__item__del del";
  buttonDel.innerHTML = "X";
  buttonDel.addEventListener("click", (e) => {
    buttonDel.parentNode.remove();
    todoItemDeleteClicked(projectName, index);
  });
  div.appendChild(buttonDel);

  let buttonEdit = document.createElement("button");
  buttonEdit.className = "todo__item__edit edit";
  buttonEdit.innerHTML = "...";
  div.appendChild(buttonEdit);
  buttonEdit.addEventListener("click", (e) => {
    todoItemEditClicked(obj, projectName, index);
  });

  return div;
}
function note(obj, index) {
  const { id, title, lastModified, detail } = obj;

  const divNoteItem = document.createElement("div");
  divNoteItem.className = "note__item";
  divNoteItem.setAttribute("data-id", id);

  const divNoteHeader = document.createElement("div");
  divNoteHeader.className = "note__item__header";
  divNoteItem.appendChild(divNoteHeader);

  const divNoteTitle = document.createElement("div");
  divNoteTitle.className = "note__item__title";
  divNoteTitle.contentEditable = true;
  divNoteTitle.spellcheck = false;
  divNoteTitle.textContent = title;
  divNoteTitle.addEventListener("input", (e) => {
    noteItemInputEdited(obj, "title", e.target.textContent);
  });
  divNoteHeader.appendChild(divNoteTitle);

  const emLastModified = document.createElement("em");
  emLastModified.textContent = lastModified;
  divNoteHeader.appendChild(emLastModified);

  const buttonInfo = document.createElement("button");
  buttonInfo.className = "note__item__info info";
  buttonInfo.textContent = "?";
  buttonInfo.addEventListener("click", () => {
    noteItemInfoClicked(obj);
  });
  divNoteHeader.appendChild(buttonInfo);

  const buttonDel = document.createElement("button");
  buttonDel.className = "note__item__del del";
  buttonDel.textContent = "X";
  buttonDel.addEventListener("click", () => {
    divNoteItem.remove();
    noteItemDeleteClicked(index);
  });
  divNoteHeader.appendChild(buttonDel);

  const divNoteDetail = document.createElement("div");
  divNoteDetail.className = "note__item__detail";
  divNoteDetail.contentEditable = true;
  divNoteDetail.spellcheck = false;
  divNoteDetail.textContent = detail;
  divNoteDetail.addEventListener("input", (e) => {
    noteItemInputEdited(obj, "detail", e.target.textContent);
  });
  divNoteItem.appendChild(divNoteDetail);

  return divNoteItem;
}

function diary(obj) {
  const container = document.createElement("div");
  container.classList.add("diary__item");

  const details = document.createElement("details");
  details.classList.add("diary__item__details");
  details.open = obj.opened;
  container.appendChild(details);

  const summary = document.createElement("summary");
  summary.classList.add("diary__item__details__summary");
  details.appendChild(summary);

  const date = document.createElement("em");
  date.classList.add("diary__item__date");
  date.textContent = obj.createdDate;
  summary.appendChild(date);

  const dayParagraph = document.createElement("p");
  dayParagraph.classList.add("diary__item__day");
  dayParagraph.textContent = obj.day;
  details.appendChild(dayParagraph);

  const nightParagraph = document.createElement("p");
  nightParagraph.classList.add("diary__item__night");
  nightParagraph.textContent = obj.night;
  details.appendChild(nightParagraph);

  return container;
}

function project(obj) {
  const container = document.createElement("div");
  container.classList.add("project__item");
  container.dataset.id = obj.id;

  const titleLink = document.createElement("a");
  titleLink.classList.add("project__item__title");
  titleLink.href = "#";
  titleLink.textContent = obj.title;
  container.appendChild(titleLink);

  const editButton = document.createElement("button");
  editButton.classList.add("project__item__edit", "edit");
  editButton.textContent = "...";
  container.appendChild(editButton);

  const infoButton = document.createElement("button");
  infoButton.classList.add("project__item__info", "info");
  infoButton.textContent = "?";
  container.appendChild(infoButton);

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("project__item__del", "del");
  deleteButton.textContent = "X";
  container.appendChild(deleteButton);

  return container;
}

export function asideBtns(data) {
  nav.innerHTML = "";
  for (const name in data) {
    let classList =
      name === "all" ||
      name === "project" ||
      name === "note" ||
      name === "diary"
        ? "parent"
        : "child";
    if (name === "all") {
      nav.appendChild(createNavBtn(name, classList, ""));
      continue;
    }
    let l = data[name].length;
    nav.appendChild(createNavBtn(name, classList, l));
  }
}
function createNavBtn(name, attr, length) {
  const container = document.createElement("div");
  container.classList.add("nav__button__ctn");
  container.classList.add(attr);

  const button = document.createElement("button");
  button.classList.add("nav__button", `button__${name}`);
  button.textContent = name;
  button.addEventListener("click", () => {
    if (Current.get() === name) return;
    Current.set(name);
    projectItems(Current.get());
    if (Current.get() === "diary") {
      buttonPlus.classList.add("hidden");
    } else {
      buttonPlus.classList.remove("hidden");
    }
  });
  container.appendChild(button);

  const span = document.createElement("span");
  span.classList.add("tinynum");
  span.textContent = length;
  container.appendChild(span);

  return container;
}

export const projectItems = (name) => {
  let items = Data.projects.get(name);
  let data = Data.get();
  main.innerHTML = "";
  if (name === "all") {
    for (const prop in data) {
      if (["project", "note", "diary"].includes(prop)) continue;
      for (let i = 0; i < data[prop].length; i++) {
        main.appendChild(todo(data[prop][i], prop, i));
      }
    }
  } else {
    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      if (name === "diary" && i === 0) {
        main.appendChild(Diary.typeInput());
      }
      if (name === "diary") {
        main.appendChild(diary(item, i));
      } else if (name === "note") {
        main.appendChild(note(item, i));
      } else if (name === "project") {
        main.appendChild(project(item, i));
      } else {
        main.appendChild(todo(item, name, i));
      }
    }
  }
};
