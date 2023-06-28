//this is info.js

//######################## Dialogs to show info #########################/
const dialog = document.getElementById(`of__info`);
const cancel = document.getElementById("cancel__of__info");

const title = document.getElementById("title__of__info");
const detail = document.getElementById("detail__of__info");
const isDone = document.getElementById("isDone__of__info");
const project = document.getElementById("project__of__info");
const dueDate = document.getElementById("dueDate__of__info");
const priority = document.getElementById("priority__of__info");
const hasDueDate = document.getElementById("hasDueDate__of__info");
const createdDate = document.getElementById("createdDate__of__info");
const lastModified = document.getElementById("lastModified__of__info");
const isTimeExpired = document.getElementById("isTimeExpired__of__info");
// __of__info

export function listenForInfo(o) {
  title.textContent = o.title;
  detail.textContent = o.detail;
  isDone.textContent = o.isDone;
  project.textContent = o.project;
  dueDate.textContent = o.dueDate;
  priority.textContent = o.priority;
  hasDueDate.textContent = o.hasDueDate;
  createdDate.textContent = o.createdDate;
  lastModified.textContent = o.lastModified;
  isTimeExpired.textContent = o.isTimeExpired;

  dialog.show();

  cancel.addEventListener("click", () => {
    dialog.close();
  });
}
