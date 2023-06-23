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
      dueDate,
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
  function DueDateInput(type) {
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
      const project = Controller.getState();

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
          project
        );
      } else if (type === "note") {
        obj = Create.Note(title, detail, dueDate, hasDueDate);
      } else if (type === "project") {
        obj = Create.Project(title, detail, dueDate, hasDueDate);
      }

      //console.log obj
      console.log(obj);

      // Reset the form
      form.reset();
      document.getElementById(`of__${type}`).close();
    });

    //Close when click cancel
    document
      .querySelector(`input#cancel__of__${type}[value="Cancel"][type="button"]`)
      .addEventListener("click", () => {
        document.getElementById(`of__${type}`).close();
      });
  }
  return {
    DueDateInput,
  };
})();

// ******************** MODULE HANDLE EVENTS ********************
const Listener = (() => {
  document.addEventListener("DOMContentLoaded", function () {
    // Todo form
    FormListener.DueDateInput("todo");

    // Project form
    FormListener.DueDateInput("project");

    // Note form
    FormListener.DueDateInput("note");
  });
})();

// ******************** MODULE TO SEND NOTIFICATION AND REMINDER ********************
const Noti = (() => {
  return {};
})();
