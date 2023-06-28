//this is form.js

import * as Create from "./create.js";
import * as Current from "./current.js";
import { main } from "./listener.js";
import * as Display from "./display.js";
import * as Data from "./data.js";

export function listen(type) {
  const dialog = document.getElementById(`of__${type}`);
  const dueDateInput = document.getElementById(`dueDate__of__${type}`);
  const inputs = document.querySelectorAll(
    `input[name="hasDueDate__of__${type}"]`
  );

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

  // function FormSubmit(formId, objectType, additionalProperties = {}) {
  const form = document.getElementById(`form__of__${type}`);

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Retrieve form data
    let obj;
    const title = document.getElementById(`title__of__${type}`).value;
    const detail = document.getElementById(`detail__of__${type}`).value;
    const dueDate = document.getElementById(`dueDate__of__${type}`).value;
    const hasDueDate =
      document.querySelector(`input[name="hasDueDate__of__${type}"]:checked`)
        .value === "yes";

    if (type === "todo") {
      const priority = document.querySelector(
        'input[name="priority__of__todo"]:checked'
      ).value;
      const isDone =
        document.querySelector('input[name="isDone__of__todo"]:checked')
          .value === "true";

      obj = Create.Todo(
        title,
        detail,
        dueDate,
        hasDueDate,
        priority,
        isDone,
        Current.get()
      );
    } else if (type === "note") {
      obj = Create.Note(title, detail, dueDate, hasDueDate);
    } else if (type === "project") {
      obj = Create.Project(title, detail, dueDate, hasDueDate);
    }

    Data.add(obj, Current.get());

    //display
    main.innerHTML = Display.items(Current.get());

    //disabled dueDateInput again
    dueDateInput.disabled = true;

    //console.log obj
    console.log(obj);

    // Reset the form
    form.reset();
    dialog.close();
  });

  //Close when click cancel
  document
    .querySelector(`input#cancel__of__${type}[value="Cancel"][type="button"]`)
    .addEventListener("click", () => {
      dialog.close();
    });
}
