//this is form.js

import Data from './data.js';
import Current from './current.js';
import * as Create from './create.js';
import * as Display from './display.js';

export function listenForCreate(type) {
  const dialog = document.getElementById(`of__${type}`);
  const dueDateInput = document.getElementById(`dueDate__of__${type}`);
  const inputs = document.querySelectorAll(`input[name="hasDueDate__of__${type}"]`);
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
  const form = document.getElementById(`form__of__${type}`);
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    // Retrieve form data
    let obj;
    const title = document.getElementById(`title__of__${type}`).value;
    const detail = document.getElementById(`detail__of__${type}`).value;
    const dueDate = document.getElementById(`dueDate__of__${type}`).value;
    const hasDueDate = document.querySelector(`input[name="hasDueDate__of__${type}"]:checked`).value === 'yes';

    const currentProject = Current.get('project');
    const currentType = Current.get('type');
    const currentOfClass = Current.get('ofClass');

    if (type === 'todo') {
      const priority = document.querySelector('input[name="priority__of__todo"]:checked').value;
      const isDone = document.querySelector('input[name="isDone__of__todo"]:checked').value === 'true';
      obj = Create.Todo(title, detail, dueDate, hasDueDate, priority, isDone, currentProject);
      Data.items.add(obj, 'todo');
    } else if (type === 'note') {
      obj = Create.Note(title, detail, dueDate, hasDueDate, currentProject);
      Data.items.add(obj, 'note');
    } else if (type === 'project') {
      obj = Create.Project(title, detail, dueDate, hasDueDate, currentType);
      Data.projects.add(obj, currentType);
      Display.allProjectsOfTypeBtns(currentType); //display
    }
    Display.projectItems(currentOfClass, currentType, currentProject); //display
    Display.updateSpan();

    console.log(obj);
    // Reset the form
    dueDateInput.disabled = true; //disable again
    form.reset();
    dialog.close();
  });

  //Close when click cancel
  document.querySelector(`input#cancel__of__${type}[value="Cancel"][type="button"]`).addEventListener('click', () => {
    dialog.close();
    dueDateInput.disabled = true;
    form.reset();
  });
}
