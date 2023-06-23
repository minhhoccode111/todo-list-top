console.log('Hello, World! From "./full.js"');

// #################### GENERATED CODE OF CHATGPT ####################
document.addEventListener("DOMContentLoaded", function () {
  let dueDateInput = document.getElementById("dueDate__of__todo");
  dueDateInput.disabled = true;

  document
    .getElementById("hasDueDate__of__todo")
    .addEventListener("change", function () {
      dueDateInput.disabled = this.value !== "yes";
      dueDateInput.required = this.value === "yes";
    });
});

document
  .querySelector(
    // `input#create__of__todo[value="Create Todo"][type="button"]`
    `#form__of__todo`
  )
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Retrieve form data
    let title = document.getElementById("title__of__todo").value;
    let detail = document.getElementById("detail__of__todo").value;
    let dueDate = document.getElementById("dueDate__of__todo").value;
    let hasDueDate = document.querySelector(
      'input[name="hasDueDate__of__todo"]:checked'
    ).value;
    let priority = document.querySelector(
      'input[name="priority__of__todo"]:checked'
    ).value;
    let isDone = document.querySelector(
      'input[name="isDone__of__todo"]:checked'
    ).value;

    // Create a new Todo object
    let todo = {
      title: title,
      detail: detail,
      dueDate: dueDate,
      hasDueDate: hasDueDate === "yes",
      priority: priority,
      isDone: isDone === "true",
    };

    // Perform further processing with the Todo object (e.g., store it, display it, etc.)
    console.log(todo);

    // Reset the form
    document.getElementById("form__of__todo").reset();
    document.getElementById("of__todo").close();
  });
document
  .querySelector(`input#cancel__of__todo[value="Cancel"][type="button"]`)
  .addEventListener("click", () => {
    document.getElementById("of__todo").close();
  });
//End of Todo input form section
document.addEventListener("DOMContentLoaded", function () {
  let dueDateInput = document.getElementById("dueDate__of__project");
  dueDateInput.disabled = true;

  document
    .getElementById("hasDueDate__of__project")
    .addEventListener("change", function () {
      dueDateInput.disabled = this.value !== "yes";
      dueDateInput.required = this.value === "yes";
    });
});

document
  .querySelector("#form__of__project")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Retrieve form data
    let title = document.getElementById("title__of__project").value;
    let detail = document.getElementById("detail__of__project").value;
    let dueDate = document.getElementById("dueDate__of__project").value;
    let hasDueDate = document.querySelector(
      'input[name="hasDueDate__of__project"]:checked'
    ).value;

    // Create a new Project object
    let project = {
      title: title,
      detail: detail,
      dueDate: dueDate,
      hasDueDate: hasDueDate === "yes",
    };

    // Perform further processing with the Project object (e.g., store it, display it, etc.)
    console.log(project);

    // Reset the form
    document.getElementById("form__of__project").reset();
    document.getElementById("of__project").close();
  });

document
  .querySelector(`input#cancel__of__project[value="Cancel"][type="button"]`)
  .addEventListener("click", () => {
    document.getElementById("of__project").close();
  });
//End of add project form actions
document.addEventListener("DOMContentLoaded", function () {
  let dueDateInput = document.getElementById("dueDate__of__note");
  dueDateInput.disabled = true;

  document
    .getElementById("hasDueDate__of__note")
    .addEventListener("change", function () {
      dueDateInput.disabled = this.value !== "yes";
      dueDateInput.required = this.value === "yes";
    });
});

document
  .querySelector("#form__of__note")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Retrieve form data
    let title = document.getElementById("title__of__note").value;
    let detail = document.getElementById("detail__of__note").value;
    let dueDate = document.getElementById("dueDate__of__note").value;
    let hasDueDate = document.querySelector(
      'input[name="hasDueDate__of__note"]:checked'
    ).value;

    // Create a new Note object
    let note = {
      title: title,
      detail: detail,
      dueDate: dueDate,
      hasDueDate: hasDueDate === "yes",
    };

    // Perform further processing with the Note object (e.g., store it, display it, etc.)
    console.log(note);

    // Reset the form
    document.getElementById("form__of__note").reset();
    document.getElementById("of__note").close();
  });

document
  .querySelector(`input#cancel__of__note[value="Cancel"][type="button"]`)
  .addEventListener("click", () => {
    document.getElementById("of__note").close();
  });

//End of add project form actions
