//this is projectElement.js
import { displayInfo } from "./info.js";
import * as Data from "./data.js";
import { nav } from "./display.js";

export function project(obj) {
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
    projectClickedDelete(obj, title);
  });

  container.appendChild(titleLink);
  container.appendChild(infoButton);
  container.appendChild(deleteButton);

  return container;
}

function projectClickedDelete(obj, name) {
  const index = Data.projects.get("project").indexOf(obj);
  Data.del("project", index);
  Data.projects.del(name);
  nav.querySelector(`button[data-name="${name}"]`).parentNode.remove();
}

function projectClickedLink(name) {
  nav.querySelector(`button[data-name="${name}"]`).click();
}
