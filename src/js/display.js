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

export const projectItems = (name) => {
  let data = Data.get();
  main.innerHTML = "";
  if (name === "all") {
    for (const prop in data) {
      if (prop === "project" || prop === "note" || prop === "diary") continue;
      for (let i = 0; i < data[prop].length; i++) {
        let item = data[prop][i];
        main.appendChild(todo(item, prop, i));
      }
    }
  } else {
    for (let i = 0; i < data[name].length; i++) {
      let item = data[name][i];
      if (name === "diary" && i === 0) {
        main.appendChild(Diary.typeInput());
        main.appendChild(diary(item, name, i));
        continue;
      }
      if (name === "diary") {
        main.appendChild(diary(item, name, i));
      } else if (name === "note") {
        main.appendChild(note(item, name, i));
      } else if (name === "project") {
        main.appendChild(project(item, name, i));
      } else {
        main.appendChild(todo(item, name, i));
      }
    }
  }
};

function todo(obj, projectName, index) {
  let div = document.createElement("div");
  div.className = "todo__item" + " " + obj.classDone() + " " + obj.priority;
  div.setAttribute("data-id", obj.id);

  let h3 = document.createElement("h3");
  h3.className = "todo__item__title";
  h3.textContent = obj.title;

  let em = document.createElement("em");
  em.className = "todo__item__date";
  em.textContent = obj.dueDate;

  let buttonDone = document.createElement("button");
  buttonDone.className = "todo__item__done";
  buttonDone.innerHTML = obj.htmlDone();
  buttonDone.addEventListener("click", () => {
    if (obj.isDone) {
      obj.isDone = false;
      buttonDone.innerHTML = obj.htmlDone();
      div.classList.remove("done");
      // Data.set();
    } else {
      obj.isDone = true;
      buttonDone.innerHTML = obj.htmlDone();
      div.classList.add("done");
      // Data.set();
    }
  });

  let buttonInfo = document.createElement("button");
  buttonInfo.className = "todo__item__info info";
  buttonInfo.innerHTML = "?";
  buttonInfo.addEventListener("click", () => {
    listenForInfo(obj);
  });

  let buttonDel = document.createElement("button");
  buttonDel.className = "todo__item__del del";
  buttonDel.innerHTML = "X";
  buttonDel.addEventListener("click", (e) => {
    buttonDel.parentNode.remove();
    Data.get()[projectName].splice(index, 1);
  });

  let buttonEdit = document.createElement("button");
  buttonEdit.className = "todo__item__edit edit";
  buttonEdit.innerHTML = "...";
  // buttonEdit.addEventListener("click", (e) => {
  //   let hasChanged = listenForEdit(obj, projectName, index);
  //   if (hasChanged) {
  //     if (obj.isDone) {
  //       div.classList.remove("done");
  //     } else {
  //       div.classList.add("done");
  //     }
  //     buttonDone.innerHTML = obj.htmlDone();
  //     div.className = "todo__item" + " " + obj.classDone() + " " + obj.priority;
  //     console.dir(h3.textContent);
  //     console.dir(obj.title);

  //     h3.textContent = obj.title;
  //     em.textContent = obj.dueDate;
  //     // Data.set();
  //   }
  // });

  div.appendChild(h3);
  div.appendChild(em);
  div.appendChild(buttonDone);
  div.appendChild(buttonEdit);
  div.appendChild(buttonInfo);
  div.appendChild(buttonDel);

  return div;
}
function note(obj) {
  const container = document.createElement("div");
  container.classList.add("note__item");
  container.dataset.id = obj.id;

  const header = document.createElement("div");
  header.classList.add("note__item__header");
  container.appendChild(header);

  const title = document.createElement("div");
  title.classList.add("note__item__title");
  title.contentEditable = true;
  title.spellcheck = false;
  title.textContent = obj.title;
  header.appendChild(title);

  const lastModified = document.createElement("em");
  lastModified.textContent = `Last modified: ${obj.lastModified}`;
  header.appendChild(lastModified);

  const infoButton = document.createElement("button");
  infoButton.classList.add("note__item__info", "info");
  infoButton.textContent = "?";
  header.appendChild(infoButton);

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("note__item__del", "del");
  deleteButton.textContent = "X";
  header.appendChild(deleteButton);

  const detail = document.createElement("div");
  detail.classList.add("note__item__detail");
  detail.contentEditable = true;
  detail.spellcheck = false;
  detail.textContent = obj.detail;
  container.appendChild(detail);

  return container;
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
