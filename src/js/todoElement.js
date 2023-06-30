//this is todoElement.js
import { displayInfo } from "./info.js";
import * as Data from "./data.js";

export function todo(obj, projectName) {
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
    todoClickedDelete(obj, projectName);
  });

  let buttonEdit = document.createElement("button");
  buttonEdit.className = "todo__item__edit edit";
  buttonEdit.innerHTML = "...";
  buttonEdit.addEventListener("click", (e) => {
    todoClickedEdit(obj, projectName);
  });

  div.appendChild(h3);
  div.appendChild(em);
  div.appendChild(buttonDone);
  div.appendChild(buttonEdit);
  div.appendChild(buttonInfo);
  div.appendChild(buttonDel);
  return div;
}

function todoClickedDelete(obj, projectName) {
  const index = Data.projects.get(projectName).indexOf(obj);
  Data.del(projectName, index);
}

function todoClickedEdit(obj, projectName) {
  listenForEdit(obj, projectName);
  // Data.set()
}

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
