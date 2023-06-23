// import library
import * as fns from "date-fns";

// ******************** MODULE CREATE HTML ********************
const CreateHtml = (() => {
  const todo = () => {};
  const note = () => {};
  const dairy = () => {};
  const project = () => {};
  return {
    todo,
    note,
    dairy,
    project,
  };
})();

// ******************** MODULE DISPLAY ********************
const Display = (() => {
  const todo = () => {};
  const note = () => {};
  const dairy = () => {};

  return {
    todo,
    note,
    dairy,
  };
})();

// ******************** MODULE INTERACT WITH DATABASE ********************
const DB = (() => {
  const get = () => {};
  const set = () => {};
  return {
    get,
    set,
  };
})();

// ******************** MODULE PROTOTYPE OF FACTORIES FUNCTION ********************
const Prototype = (() => {
  const todo = {
    constructor: "Todo",
  };
  const note = {
    project: "note",
    constructor: "Note",
  };
  const dairy = {
    isOpened: false,
    project: "dairy",
    constructor: "Dairy",
  };
  const project = {
    project: "project",
    constructor: "Project",
  };
  return { todo, note, dairy, project };
})();

// ******************** MODULE FACTORIES FUNCTION ********************
const Create = (() => {
  //Todo Factory function
  function Todo(title, detail, dueDate, hasDueDate, priority, isDone, project) {
    const createdDate = fns.format(new Date(), "yyyy-MM-dd");
    return Object.assign(Object.create(Prototype.todo), {
      title,
      detail,
      isDone,
      project,
      dueDate,
      priority,
      hasDueDate,
      createdDate,
    });
  }

  //Note Factory function
  function Note(title, detail, dueDate, hasDueDate) {
    const createdDate = fns.format(new Date(), "yyyy-MM-dd");
    return Object.assign(Object.create(Prototype.note), {
      title,
      detail,
      isDone,
      dueDate,
      priority,
      hasDueDate,
      createdDate,
    });
  }
  //Dairy Factory function
  function Dairy(day, night) {
    const createdDate = fns.format(new Date(), "yyyy-MM-dd");
    return Object.assign(Object.create(Prototype.dairy), {
      day,
      night,
      createdDate,
    });
  }
  //Project Factory function
  function Project(title, detail, dueDate, hasDueDate) {
    const createdDate = fns.format(new Date(), "yyyy-MM-dd");
    return Object.assign(Object.create(Prototype.project), {
      title,
      detail,
      dueDate,
      hasDueDate,
      createdDate,
    });
  }
  return {
    Todo,
    Note,
    Dairy,
    Project,
  };
})();
console.log(
  Create.Todo("hoang", "minh", "2023-6-23", true, "high", true, "all")
);

// ******************** MODULE TO CONTROL APP STATE ********************
const Controller = (() => {
  let data = {
    today: [],
    clean: [],
    week: [],
    year: [],
    work: [],
    note: [],
    all: [],
    gym: [],
    dairy: [
      {
        createdDate: "2023-6-17",
        day: `Minh khong vui vi Ut khong yeu Minh`,
        night: `Today I learned very well, I'm so proud of me`,
        isOpened: false,
      },
      {
        createdDate: "2023-6-18",
        day: `Minh khong vui vi Ut khong yeu Minh`,
        night: `Today I learned very well, I'm so proud of me`,
        isOpened: false,
      },
    ],
    project: [
      {
        createdDate: "2023-6-23",
        title: "gym",
        detail: "This is a gym project to store Todos of gym project!",
        dueDate: "",
        hasDueDate: false,
      },
      {
        createdDate: "2023-6-23",
        title: "work",
        detail: "This is a work project to store Todos of work project!",
        dueDate: "",
        hasDueDate: false,
      },
      {
        createdDate: "2023-6-23",
        title: "clean",
        detail: "This is a clean project to store Todos of clean project!",
        dueDate: "",
        hasDueDate: false,
      },
    ], //this property is used to store project's info when we create a new project and set that project to one of date object's property
  };
  let currentState = "all";
  const setState = (v) => (currentState = v);
  const getState = () => currentState;

  //if we don't specify the 2nd argument, then we just push obj to the current project we're in.
  const pushToData = (obj, project = currentState) => {
    data[project].push(obj);
  };

  const addNewProject = (title, detail, dueDate, hasDueDate) => {
    if (data.hasOwnProperty(title)) {
      alert("That project is already existed!");
      return;
    } else {
      data[title] = [];
      const newProject = Create.Project(title, detail, dueDate, hasDueDate);
      pushToData(newProject, "project");
    }
  };

  const getData = () => data;

  return { getData, setState, getState, pushToData, addNewProject };
})();

// ******************** MODULE HANDLE EVENTS ********************
const FormListener = (() => {
  function DueDateInput(inputId, radioGroupName) {
    const dueDateInput = document.getElementById(inputId);
    const inputs = document.querySelectorAll(radioGroupName);

    inputs.forEach((input) => {
      input.addEventListener("change", function () {
        if (this.value === "yes") {
          dueDateInput.disabled = false;
          dueDateInput.setAttribute("required", "required");
        } else if (this.value === "no") {
          dueDateInput.disabled = true;
          dueDateInput.removeAttribute("required");
        }
      });
    });
  }

  function FormSubmit(formId, objectType, additionalProperties = {}) {
    const form = document.querySelector(formId);

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      // Retrieve form data
      const title = document.getElementById(`title__of__${objectType}`).value;
      const detail = document.getElementById(`detail__of__${objectType}`).value;
      const dueDate = document.getElementById(
        `dueDate__of__${objectType}`
      ).value;
      const hasDueDate =
        document.querySelector(
          `input[name="hasDueDate__of__${objectType}"]:checked`
        ).value === "yes";

      // Create a new object based on the objectType

      const obj = {
        title,
        detail,
        dueDate,
        hasDueDate,
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
  return {
    DueDateInput,
    FormSubmit,
  };
})();

// ******************** MODULE HANDLE EVENTS ********************
const Listener = (() => {
  document.addEventListener("DOMContentLoaded", function () {
    // Todo form
    FormListener.DueDateInput(
      "dueDate__of__todo",
      `input[name="hasDueDate__of__todo"]`
    );
    FormListener.FormSubmit("#form__of__todo", "todo", {
      priority: document.querySelector(
        'input[name="priority__of__todo"]:checked'
      ).value,
      isDone:
        document.querySelector('input[name="isDone__of__todo"]:checked')
          .value === "true",
    });

    // Project form
    FormListener.DueDateInput(
      "dueDate__of__project",
      `input[name="hasDueDate__of__project"]`
    );
    FormListener.FormSubmit("#form__of__project", "project");

    // Note form
    FormListener.DueDateInput(
      "dueDate__of__note",
      `input[name="hasDueDate__of__note"]`
    );
    FormListener.FormSubmit("#form__of__note", "note");
  });
})();

// ******************** MODULE TO SEND NOTIFICATION AND REMINDER ********************
const Noti = (() => {
  return {};
})();
