//this is edit.js
import * as Data from "./data.js";
import * as Display from "./display.js";
import * as Current from "./current.js";

//######################## Dialogs to take inputs to edit Obj in Data #########################/
const dialog = document.getElementById(`of__edit`);
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

export function listenForEdit(objToEdit, branch, index) {
  let changed = false;
  dialog.show();
  title.value = objToEdit.title;
  detail.value = objToEdit.detail;
  dueDate.value = objToEdit.dueDate;
  if (objToEdit.hasDueDate) {
    document.querySelector(
      `input[name="hasDueDate__of__edit"][value="yes"]`
    ).checked = true;
  } else {
    document.querySelector(
      `input[name="hasDueDate__of__edit"][value="no"]`
    ).checked = true;
  }
  document.querySelector(
    `input[name="priority__of__edit"][value="${objToEdit.priority}"]`
  ).checked = true;
  document.querySelector(
    `input[name="isDone__of__edit"][value="${objToEdit.isDone}"]`
  ).checked = true;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    objToEdit.title = title.value;
    objToEdit.detail = detail.value;
    objToEdit.dueDate = dueDate.value;
    objToEdit.hasDueDate =
      document.querySelector(`input[name="hasDueDate__of__edit"]:checked`)
        .value === "yes"
        ? true
        : false;
    objToEdit.priority = document.querySelector(
      `input[name="priority__of__edit"]:checked`
    ).value;
    objToEdit.isDone =
      document.querySelector(`input[name="isDone__of__edit"]:checked`).value ===
      "true"
        ? true
        : false;
    console.dir(objToEdit);

    updateTodoItem(objToEdit);

    //disabled dueDateInput again
    dueDateInput.disabled = true;

    // Reset the form
    form.reset();
    dialog.close();
    changed = true;
  });
  cancel.addEventListener("click", () => {
    dialog.close();
    form.reset();
    dueDateInput.disabled = true;
    form.onsubmit = null;
  });
  form.onsubmit = null;
  return changed;
}

function updateTodoItem(obj) {
  const todoItem = document.querySelector(`div[data-id="${obj.id}"]`);
  const h3 = todoItem.querySelector(".todo__item__title");
  const em = todoItem.querySelector(".todo__item__date");
  const buttonDone = todoItem.querySelector(".todo__item__done");

  // Update the necessary elements with the new values
  h3.textContent = obj.title;
  em.textContent = obj.dueDate;
  buttonDone.innerHTML = obj.htmlDone();
  todoItem.className =
    "todo__item" + " " + obj.classDone() + " " + obj.priority;
}
