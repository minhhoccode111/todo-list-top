import Data from './data.js';

// determine the parent element of the obj we're editing
let elementParent;

// determine the current obj we're editing
let objCurrent;

////////// gets sets to change edit's state \\\\\\\\\\
export const setElementParent = (v) => (elementParent = v);

export const getElementParent = () => elementParent;

export const setObjCurrent = (o) => (objCurrent = o);

export const getObjCurrent = () => objCurrent;

////////// elements of form popup to be edited by user  \\\\\\\\\\
export const dialog = document.getElementById(`of__edit`);
const dueDateInput = document.getElementById(`dueDate__of__edit`);
const inputs = document.querySelectorAll(`input[name="hasDueDate__of__edit"]`);
inputs.forEach((input) => {
  input.addEventListener('change', function () {
    if (this.value === 'yes') {
      dueDateInput.disabled = false;
      dueDateInput.setAttribute('required', 'required');
    } else {
      dueDateInput.disabled = true;
      dueDateInput.removeAttribute('required');
      dueDateInput.value = '';
    }
  });
});
const form = document.getElementById(`form__of__edit`);
const title = document.getElementById(`title__of__edit`);
const detail = document.getElementById(`detail__of__edit`);
const dueDate = document.getElementById(`dueDate__of__edit`);

const cancel = document.querySelector(`input#cancel__of__edit[value="Cancel"][type="button"]`);

cancel.addEventListener('click', () => {
  dialog.classList.remove('animate__animated', 'animate__zoomIn');
  dialog.classList.add('animate__animated', 'animate__zoomOut');
  setTimeout(() => {
    dueDateInput.disabled = true;
    form.reset();
    dialog.close();
  }, 500);
});

////////// fill all inputs in form base on current object's value  \\\\\\\\\\
export function fillEditInputs() {
  title.value = objCurrent.title;
  detail.value = objCurrent.detail;
  dueDate.value = objCurrent.dueDate;
  if (objCurrent.hasDueDate) {
    document.querySelector(`input[name="hasDueDate__of__edit"][value="yes"]`).checked = true;
  } else {
    document.querySelector(`input[name="hasDueDate__of__edit"][value="no"]`).checked = true;
  }
  document.querySelector(`input[name="priority__of__edit"][value="${objCurrent.priority}"]`).checked = true;
  document.querySelector(`input[name="isDone__of__edit"][value="${objCurrent.isDone}"]`).checked = true;
}

////////// listen for submit to change current object's value  \\\\\\\\\\
form.addEventListener('submit', function (event) {
  event.preventDefault();
  objCurrent.title = title.value;
  objCurrent.detail = detail.value;
  objCurrent.dueDate = dueDate.value;
  objCurrent.priority = document.querySelector(`input[name="priority__of__edit"]:checked`).value;
  objCurrent.isDone = document.querySelector(`input[name="isDone__of__edit"]:checked`).value === 'true' ? true : false;
  objCurrent.hasDueDate = document.querySelector(`input[name="hasDueDate__of__edit"]:checked`).value === 'yes' ? true : false;
  console.dir(objCurrent);
  objCurrent.setLastModified();
  Data.set();

  updateTodoItem(objCurrent, elementParent);

  // Reset the form
  dialog.classList.remove('animate__animated', 'animate__zoomIn');
  dialog.classList.add('animate__animated', 'animate__zoomOut');
  setTimeout(() => {
    dueDateInput.disabled = true;
    form.reset();
    dialog.close();
  }, 500);
});

////////// update DOM element base on current object's value  \\\\\\\\\\
function updateTodoItem(obj, elementParent) {
  const h3 = elementParent.querySelector('.todo__item__title');
  const em = elementParent.querySelector('.todo__item__date');
  const buttonDone = elementParent.querySelector('.todo__item__done');

  // Update the necessary elements with the new values
  h3.textContent = obj.title;
  em.textContent = obj.dueDate;
  buttonDone.innerHTML = obj.htmlDone();
  elementParent.className = 'todo__item' + ' ' + obj.classDone() + ' ' + obj.priority;
}
