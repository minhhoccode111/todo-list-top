//this is noteElement.js
import { displayInfo } from "./info.js";
import * as Data from "./data.js";

export function note(obj) {
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
    noteClickedDelete(obj);
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

function noteEditedInputs(obj, property, value) {
  obj[property] = value;
  //Data.set()
}

function noteClickedDelete(obj) {
  const index = Data.projects.get("note").indexOf(obj);
  Data.del("note", index);
}
