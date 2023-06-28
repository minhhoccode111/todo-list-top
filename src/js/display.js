//this is display.js

import * as Data from "./data.js";
import * as Diary from "./diary.js";
import { main } from "./listener.js";

export const projectItems = (name) => {
  let data = Data.get();
  main.innerHTML = "";
  if (name === "all") {
    for (const prop in data) {
      if (prop === "project" || prop === "note" || prop === "diary") continue;
      for (let i = 0; i < data[prop].length; i++) {
        let item = data[prop][i];
        main.appendChild(todo(item));
      }
    }
    return html;
  } else {
    for (let i = 0; i < data[name].length; i++) {
      let item = data[name][i];
      if (name === "diary" && i === 0) {
        main.appendChild(Diary.typeInput());
        main.appendChild(diary(item));
        continue;
      }
      if ((name = "diary")) {
        main.appendChild(diary(item));
      } else if ((name = "note")) {
        html += note(item);
      } else if ((name = "project")) {
        html += project(item);
      } else {
        html += todo(item);
      }
    }
    return html;
  }
};

function todo(obj) {
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
    } else {
      obj.isDone = true;
      buttonDone.innerHTML = obj.htmlDone();
      div.classList.add("done");
    }
  });

  let buttonEdit = document.createElement("button");
  buttonEdit.className = "todo__item__edit edit";
  buttonEdit.innerHTML = "...";

  let buttonInfo = document.createElement("button");
  buttonInfo.className = "todo__item__info info";
  buttonInfo.innerHTML = "?";

  let buttonDel = document.createElement("button");
  buttonDel.className = "todo__item__del del";
  buttonDel.innerHTML = "X";

  div.appendChild(h3);
  div.appendChild(em);
  div.appendChild(buttonDone);
  div.appendChild(buttonEdit);
  div.appendChild(buttonInfo);
  div.appendChild(buttonDel);

  return div;
}
function note(obj) {
  return `
          <div class="note__item" data-id="${obj.id}">
            <div class="note__item__header">
              <div class="note__item__title" contenteditable="true" spellcheck="false">
              ${obj.title}
              </div>
              <em>Last modified: ${obj.lastModified}</em>
              <button class="note__item__info info">?</button>
              <button class="note__item__del del">X</button>
            </div>
            <div class="note__item__detail" contenteditable="true" spellcheck="false">
            ${obj.detail}
            </div>
          </div>`;
}
function diary(obj) {
  return `<div class="diary__item">
            <details class="diary__item__details" ${obj.htmlOpened()}>
              <summary class="diary__item__details__summary">
                <em class="diary__item__date">${obj.createdDate}</em>
              </summary>
              <p class="diary__item__day">${obj.day}</p>
              <p class="diary__item__night">${obj.night}</p>
            </details>
          </div>`;
}
function project(obj) {
  return `<div class="project__item" data-id="${obj.id}">
            <a href="#" class="project__item__title">${obj.title}</a>
            <button class="project__item__edit edit">...</button>
            <button class="project__item__info info">?</button>
            <button class="project__item__del del">X</button>
          </div>`;
}
export function asideBtns(data) {
  let html = "";
  for (const name in data) {
    let classList =
      name === "all" ||
      name === "project" ||
      name === "note" ||
      name === "diary"
        ? "parent"
        : "child";
    if (name === "all") {
      //loop through all Todo project
      let l = Data.projects
        .all()
        .reduce((total, current) => total + data[current].length, 0);

      html += `<div class="nav__button__ctn ${classList}">
                <button class="nav__button button__${name}">${name}</button>
                <span class="tinynum">${l}</span>
              </div>`;
      continue;
    }
    html += `<div class="nav__button__ctn ${classList}">
              <button class="nav__button button__${name}">${name}</button>
              <span class="tinynum">${data[name].length}</span>
            </div>`;
  }
  return html;
}
