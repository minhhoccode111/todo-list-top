//this is info.js

//######################## Dialogs to show info #########################/
// Selecting the wrapper element
const wrapper = document.querySelector(".popup__info__wrapper");
const popup = document.querySelector(".popup__info");
popup.addEventListener("mouseover", () => {
  popup.classList.add(`animate__animated`, `animate__pulse`);
});
popup.addEventListener("mouseout", () => {
  popup.classList.remove(`animate__animated`, `animate__pulse`);
});

// Selecting the elements within the wrapper
const messageH2 = wrapper.querySelector(".popup__info__message");
const idP = wrapper.querySelector(".info__id");
const titleP = wrapper.querySelector(".info__title");
const detailP = wrapper.querySelector(".info__detail");
const isDoneP = wrapper.querySelector(".info__isDone");
const projectP = wrapper.querySelector(".info__project");
const dueDateP = wrapper.querySelector(".info__dueDate");
const priorityP = wrapper.querySelector(".info__priority");
const createdDateP = wrapper.querySelector(".info__createdDate");
const lastModifiedP = wrapper.querySelector(".info__lastModified");
const isTimeExpiredP = wrapper.querySelector(".info__isTimeExpired");

const removeButton = wrapper.querySelector(".popup__info__remove");
removeButton.addEventListener("mouseover", () => {
  removeButton.classList.add(`animate__animated`, `animate__pulse`);
});
removeButton.addEventListener("mouseout", () => {
  removeButton.classList.remove(`animate__animated`, `animate__pulse`);
});

removeButton.addEventListener("click", () => {
  wrapper.classList.add("hidden");
});

export function displayInfo(o) {
  let {
    id,
    type,
    title,
    detail,
    isDone,
    project,
    dueDate,
    priority,
    createdDate,
    lastModified,
    isTimeExpired,
  } = o;

  if ((type = "todo")) {
    messageH2.textContent = "Information of Todo";
  }
  if ((type = "note")) {
    messageH2.textContent = "Information of Note";
  }
  if ((type = "project")) {
    messageH2.textContent = "Information of Project";
  }

  idP.textContent = id;
  titleP.textContent = title;
  isDoneP.textContent = isDone === undefined ? "" : isDone;
  detailP.textContent = detail;
  projectP.textContent = project;
  dueDateP.textContent = dueDate;
  priorityP.textContent = priority === undefined ? "" : priority;
  createdDateP.textContent = createdDate;
  lastModifiedP.textContent = lastModified;
  isTimeExpiredP.textContent = isTimeExpired;

  wrapper.classList.remove("hidden");
}
