//this is display.js

import * as Data from "./data.js";
import * as Diary from "./diary.js";

export const items = (name) => {
  let arr = Data.projects.get(name);
  return arr.reduce((total, item, index) => {
    if (name === "project") {
      return total + project(item);
    }
    if (name === "note") {
      return total + note(item);
    }
    if (name === "diary") {
      if (index === 0) {
        let inputs = Diary.typeInput();
        return total + inputs + diary(item);
      }
      return total + diary(item);
    }

    return total + todo(item);
  }, "");
};

function todo(obj) {
  return `<div class="todo__item ${obj.classDone()} ${obj.priority}" data-id="${
    obj.id
  }">
            <h3 class="todo__item__title">${obj.title}</h3>
            <em class="todo__item__date">${obj.dueDate}</em>
            <button class="todo__item__done">${obj.htmlDone()}</button>
            <button class="todo__item__edit edit">...</button>
            <button class="todo__item__info info">?</button>
            <button class="todo__item__del del">X</button>
          </div>`;
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
