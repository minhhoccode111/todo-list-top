//this is edit.js
import * as Data from "./data.js";

//######################## Dialogs to take inputs to edit Obj in Data #########################/
let objCurrent;

let elementParent;

export const setElementParent = (v) => (elementParent = v);

export const getElementParent = () => elementParent;

export const setObjCurrent = (o) => (objCurrent = o);

export const getObjCurrent = () => objCurrent;

export const dialog = document.getElementById(`of__edit`);
const dueDateInput = document.getElementById(`dueDate__of__edit`);
const inputs = document.querySelectorAll(`input[name="hasDueDate__of__edit"]`);
inputs.forEach((input) => {
  input.addEventListener("change", function () {
    if (this.value === "yes") {
      dueDateInput.disabled = false;
      dueDateInput.setAttribute("required", "required");
    } else {
      dueDateInput.disabled = true;
      dueDateInput.removeAttribute("required");
      dueDateInput.value = "";
    }
  });
});
const form = document.getElementById(`form__of__edit`);
const title = document.getElementById(`title__of__edit`);
const detail = document.getElementById(`detail__of__edit`);
const dueDate = document.getElementById(`dueDate__of__edit`);

//Close when click cancel
const cancel = document.querySelector(
  `input#cancel__of__edit[value="Cancel"][type="button"]`
);

cancel.addEventListener("click", () => {
  dialog.close();
  form.reset();
  dueDateInput.disabled = true;
});

export function fillEditInputs() {
  title.value = objCurrent.title;
  detail.value = objCurrent.detail;
  dueDate.value = objCurrent.dueDate;
  if (objCurrent.hasDueDate) {
    document.querySelector(
      `input[name="hasDueDate__of__edit"][value="yes"]`
    ).checked = true;
  } else {
    document.querySelector(
      `input[name="hasDueDate__of__edit"][value="no"]`
    ).checked = true;
  }
  document.querySelector(
    `input[name="priority__of__edit"][value="${objCurrent.priority}"]`
  ).checked = true;
  document.querySelector(
    `input[name="isDone__of__edit"][value="${objCurrent.isDone}"]`
  ).checked = true;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  objCurrent.title = title.value;
  objCurrent.detail = detail.value;
  objCurrent.dueDate = dueDate.value;
  objCurrent.hasDueDate =
    document.querySelector(`input[name="hasDueDate__of__edit"]:checked`)
      .value === "yes"
      ? true
      : false;
  objCurrent.priority = document.querySelector(
    `input[name="priority__of__edit"]:checked`
  ).value;
  objCurrent.isDone =
    document.querySelector(`input[name="isDone__of__edit"]:checked`).value ===
    "true"
      ? true
      : false;
  console.dir(objCurrent);
  objCurrent.setLastModified();
  Data.set();

  updateTodoItem(objCurrent, elementParent);

  // Reset the form
  dueDateInput.disabled = true;
  form.reset();
  dialog.close();
});

function updateTodoItem(obj, elementParent) {
  const h3 = elementParent.querySelector(".todo__item__title");
  const em = elementParent.querySelector(".todo__item__date");
  const buttonDone = elementParent.querySelector(".todo__item__done");

  // Update the necessary elements with the new values
  h3.textContent = obj.title;
  em.textContent = obj.dueDate;
  buttonDone.innerHTML = obj.htmlDone();
  elementParent.className =
    "todo__item" + " " + obj.classDone() + " " + obj.priority;
}
