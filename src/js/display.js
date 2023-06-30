//this is display.js

import * as Data from "./data.js";
import { buttonPlus } from "./listener.js";
import * as Diary from "./diary.js";
import * as Current from "./current.js";
import * as Dialogs from "./dialogs.js";
import { listenForEdit } from "./edit.js";
import { displayInfo } from "./info.js";
import { intlFormat } from "date-fns";

export const main = document.getElementById("main");
export const nav = document.getElementById("aside__nav");

function todoClickedDone(obj, buttonDone, div) {
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

function todoClickedDelete(projectName, index) {
  Data.del(projectName, index);
}

function todoClickedEdit(obj, projectName, index) {
  listenForEdit(obj, projectName, index);
  // Data.set()
}

function noteEditedInputs(obj, property, value) {
  obj[property] = value;
  //Data.set()
}

function noteClickedDelete(index) {
  Data.del("note", index);
}

function projectClickedDelete(index, name) {
  Data.del("project", index);
  Data.projects.del(name);
  nav.querySelector(`[data-name="${name}"]`).parentNode.remove();
}

function projectClickedLink(name) {
  nav.querySelector(`[data-name="${name}"]`).click();
}

function todo(obj, projectName, index) {
  const { id, title, dueDate, priority } = obj;
  let div = document.createElement("div");
  div.className = "todo__item" + " " + obj.classDone() + " " + priority;
  div.setAttribute("data-id", id);

  let h3 = document.createElement("h3");
  h3.className = "todo__item__title";
  h3.textContent = title;

  let em = document.createElement("em");
  em.className = "todo__item__date";
  em.textContent = dueDate;

  let buttonDone = document.createElement("button");
  buttonDone.className = "todo__item__done";
  buttonDone.innerHTML = obj.htmlDone();
  buttonDone.addEventListener("click", () => {
    todoClickedDone(obj, buttonDone, div);
  });

  let buttonInfo = document.createElement("button");
  buttonInfo.className = "todo__item__info info";
  buttonInfo.innerHTML = "?";
  buttonInfo.addEventListener("click", () => {
    displayInfo(obj);
  });

  let buttonDel = document.createElement("button");
  buttonDel.className = "todo__item__del del";
  buttonDel.innerHTML = "X";
  buttonDel.addEventListener("click", (e) => {
    buttonDel.parentNode.remove();
    todoClickedDelete(projectName, index);
  });

  let buttonEdit = document.createElement("button");
  buttonEdit.className = "todo__item__edit edit";
  buttonEdit.innerHTML = "...";
  buttonEdit.addEventListener("click", (e) => {
    todoClickedEdit(obj, projectName, index);
  });

  div.appendChild(h3);
  div.appendChild(em);
  div.appendChild(buttonDone);
  div.appendChild(buttonEdit);
  div.appendChild(buttonInfo);
  div.appendChild(buttonDel);
  return div;
}
function note(obj, index) {
  const { id, title, lastModified, detail } = obj;

  const divNoteItem = document.createElement("div");
  divNoteItem.className = "note__item";
  divNoteItem.setAttribute("data-id", id);

  const divNoteHeader = document.createElement("div");
  divNoteHeader.className = "note__item__header";

  const divNoteTitle = document.createElement("div");
  divNoteTitle.className = "note__item__title";
  divNoteTitle.contentEditable = true;
  divNoteTitle.spellcheck = false;
  divNoteTitle.textContent = title;
  divNoteTitle.addEventListener("input", (e) => {
    noteEditedInputs(obj, "title", e.target.textContent);
  });

  const emLastModified = document.createElement("em");
  emLastModified.textContent = lastModified;

  const buttonInfo = document.createElement("button");
  buttonInfo.className = "note__item__info info";
  buttonInfo.textContent = "?";
  buttonInfo.addEventListener("click", () => {
    displayInfo(obj);
  });

  const buttonDel = document.createElement("button");
  buttonDel.className = "note__item__del del";
  buttonDel.textContent = "X";
  buttonDel.addEventListener("click", () => {
    divNoteItem.remove();
    noteClickedDelete(index);
  });

  const divNoteDetail = document.createElement("div");
  divNoteDetail.className = "note__item__detail";
  divNoteDetail.contentEditable = true;
  divNoteDetail.spellcheck = false;
  divNoteDetail.textContent = detail;
  divNoteDetail.addEventListener("input", (e) => {
    noteEditedInputs(obj, "detail", e.target.textContent);
  });

  divNoteItem.appendChild(divNoteHeader);
  divNoteHeader.appendChild(divNoteTitle);
  divNoteHeader.appendChild(emLastModified);
  divNoteHeader.appendChild(buttonInfo);
  divNoteHeader.appendChild(buttonDel);
  divNoteItem.appendChild(divNoteDetail);

  return divNoteItem;
}

function diary(obj) {
  let { opened, createdDate, day, night } = obj;
  const container = document.createElement("div");
  container.classList.add("diary__item");

  const details = document.createElement("details");
  details.classList.add("diary__item__details");
  details.open = opened;
  container.appendChild(details);

  const summary = document.createElement("summary");
  summary.classList.add("diary__item__details__summary");
  details.appendChild(summary);

  const date = document.createElement("em");
  date.classList.add("diary__item__date");
  date.textContent = createdDate;
  summary.appendChild(date);

  const dayParagraph = document.createElement("p");
  dayParagraph.classList.add("diary__item__day");
  dayParagraph.textContent = day;
  details.appendChild(dayParagraph);

  const nightParagraph = document.createElement("p");
  nightParagraph.classList.add("diary__item__night");
  nightParagraph.textContent = night;
  details.appendChild(nightParagraph);

  return container;
}

function project(obj, index) {
  let { id, title } = obj;

  const container = document.createElement("div");
  container.classList.add("project__item");
  container.dataset.id = id;

  const titleLink = document.createElement("a");
  titleLink.classList.add("project__item__title");
  titleLink.href = "#";
  titleLink.textContent = title;
  titleLink.addEventListener("click", () => {
    projectClickedLink(title);
  });

  const editButton = document.createElement("button");
  editButton.classList.add("project__item__edit", "edit");
  editButton.textContent = "...";

  const infoButton = document.createElement("button");
  infoButton.classList.add("project__item__info", "info");
  infoButton.textContent = "?";
  infoButton.addEventListener("click", () => {
    displayInfo(obj);
  });

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("project__item__del", "del");
  deleteButton.textContent = "X";
  deleteButton.addEventListener("click", () => {
    deleteButton.parentNode.remove();
    projectClickedDelete(index, title);
  });

  container.appendChild(titleLink);
  container.appendChild(editButton);
  container.appendChild(infoButton);
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
  button.classList.add("nav__button");
  button.setAttribute("data-name", `${name}`); //FIXME fix this classList to be data-name because if user create a project named with space then we'll have an error with classList.add()
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
