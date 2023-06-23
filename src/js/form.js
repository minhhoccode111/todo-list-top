document.addEventListener("DOMContentLoaded", function () {
  function handleDueDateInput(inputId, checkboxId) {
    const dueDateInput = document.getElementById(inputId);
    dueDateInput.disabled = true;

    document.getElementById(checkboxId).addEventListener("change", function () {
      dueDateInput.disabled = this.value !== "yes";
      dueDateInput.required = this.value === "yes";
    });
  }

  function handleFormSubmit(formId, objectType, additionalProperties = {}) {
    const form = document.querySelector(formId);

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      // Retrieve form data
      const title = document.getElementById(`title__of__${objectType}`).value;
      const detail = document.getElementById(`detail__of__${objectType}`).value;
      const dueDate = document.getElementById(
        `dueDate__of__${objectType}`
      ).value;
      const hasDueDate = document.querySelector(
        `input[name="hasDueDate__of__${objectType}"]:checked`
      ).value;

      // Create a new object based on the objectType
      const obj = {
        title,
        detail,
        dueDate,
        hasDueDate: hasDueDate === "yes",
        ...additionalProperties, // Include additional properties specific to the object type
      };

      // Perform further processing with the object (e.g., store it, display it, etc.)
      console.log(obj);

      // Reset the form
      form.reset();
      document.getElementById(`of__${objectType}`).close();
    });

    document
      .querySelector(
        `input#cancel__of__${objectType}[value="Cancel"][type="button"]`
      )
      .addEventListener("click", () => {
        document.getElementById(`of__${objectType}`).close();
      });
  }

  // Todo form
  handleDueDateInput("dueDate__of__todo", "hasDueDate__of__todo");
  handleFormSubmit("#form__of__todo", "todo", {
    priority: document.querySelector('input[name="priority__of__todo"]:checked')
      .value,
    isDone:
      document.querySelector('input[name="isDone__of__todo"]:checked').value ===
      "true",
  });

  // Project form
  handleDueDateInput("dueDate__of__project", "hasDueDate__of__project");
  handleFormSubmit("#form__of__project", "project");

  // Note form
  handleDueDateInput("dueDate__of__note", "hasDueDate__of__note");
  handleFormSubmit("#form__of__note", "note");
});
