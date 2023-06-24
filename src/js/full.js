// import library
import * as fns from "date-fns";
import { cs } from "date-fns/locale";

// ******************** MODULE CREATE HTML ********************
const CreateHtml = (() => {
  const todoItem = () => {};
  const noteItem = () => {};
  const dairyItem = () => {};
  const projectItem = () => {};
  return {
    todoItem,
    noteItem,
    dairyItem,
    projectItem,
  };
})();

// ******************** MODULE DISPLAY ********************
const Display = (() => {
  const project = () => {};
  const dairy = () => {};
  const todo = () => {};
  const note = () => {};

  return {
    project,
    dairy,
    todo,
    note,
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

// ******************** MODULE INTERACT WITH DATABASE ********************
const DB = (() => {
  const set = (object, name = "data") => {
    localStorage.setItem(name, JSON.stringify(object));
  };
  const get = (name = "data") => JSON.parse(localStorage.getItem(name));

  const check = (name = "data") => {
    JSON.parse(localStorage.getItem(name)) !== null;
  };
  const restore = (objData) => {
    for (let project in objData) {
      for (let i = 0; i < project.length; i++) {
        let obj = objData[project][i];
        if (objData[project] === "note") {
          objData[project][i] = Object.assign(
            Object.create(Prototype.note),
            obj
          );
        } else if (objData[project] === "project") {
          objData[project][i] = Object.assign(
            Object.create(Prototype.project),
            obj
          );
        } else if (objData[project] === "dairy") {
          objData[project][i] = Object.assign(
            Object.create(Prototype.dairy),
            obj
          );
        } else {
          objData[project][i] = Object.assign(
            Object.create(Prototype.todo),
            obj
          );
        }
      }
    }
    return objData;
  };
  return {
    restore,
    check,
    get,
    set,
  };
})();

// ******************** MODULE FACTORIES FUNCTION ********************
const Create = (() => {
  //Todo Factory function
  function Todo(title, detail, dueDate, hasDueDate, priority, isDone, project) {
    const createdDate = fns.parseISO(fns.format(new Date(), "yyyy-MM-dd"));
    const isTimeExpired =
      dueDate != "" && fns.isBefore(fns.parseISO(dueDate), createdDate);
    return Object.assign(Object.create(Prototype.todo), {
      title,
      detail,
      isDone,
      project,
      dueDate,
      priority,
      hasDueDate,
      createdDate,
      isTimeExpired,
    });
  }

  //Note Factory function
  function Note(title, detail, dueDate, hasDueDate) {
    const createdDate = fns.parseISO(fns.format(new Date(), "yyyy-MM-dd"));
    const isTimeExpired =
      dueDate && fns.isBefore(fns.parseISO(dueDate), createdDate);
    return Object.assign(Object.create(Prototype.note), {
      title,
      detail,
      dueDate,
      hasDueDate,
      createdDate,
      isTimeExpired,
    });
  }
  //Dairy Factory function
  function Dairy(day, night) {
    const createdDate = fns.parseISO(fns.format(new Date(), "yyyy-MM-dd"));
    return Object.assign(Object.create(Prototype.dairy), {
      day,
      night,
      createdDate,
    });
  }
  //Project Factory function
  function Project(title, detail, dueDate, hasDueDate) {
    const createdDate = fns.parseISO(fns.format(new Date(), "yyyy-MM-dd"));
    const isTimeExpired =
      dueDate && fns.isBefore(fns.parseISO(dueDate), createdDate);
    return Object.assign(Object.create(Prototype.project), {
      title,
      detail,
      dueDate,
      hasDueDate,
      createdDate,
      isTimeExpired,
    });
  }
  return {
    Todo,
    Note,
    Dairy,
    Project,
  };
})();

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
        day: `Today I do ToDo List project on The Odin Project!`,
        night: `Today I learned very well, I'm so proud of me`,
        isOpened: false,
      },
      {
        createdDate: "2023-6-18",
        day: `Today I do ToDo List project on The Odin Project!`,
        night: `Today I learned very well, I'm so proud of me`,
        isOpened: false,
      },
    ],
    project: [
      {
        title: "gym",
        detail: "This is a gym project to store Todos of gym project!",
        dueDate: "",
        hasDueDate: false,
        createdDate: "2023-6-23",
        isTimeExpired: false,
      },
      {
        title: "work",
        detail: "This is a work project to store Todos of work project!",
        dueDate: "",
        hasDueDate: false,
        createdDate: "2023-6-23",
        isTimeExpired: false,
      },
      {
        title: "clean",
        detail: "This is a clean project to store Todos of clean project!",
        dueDate: "",
        hasDueDate: false,
        createdDate: "2023-6-23",
        isTimeExpired: false,
      },
    ], //this property is used to store project's info when we create a new project and set that project to one of date object's property
  };
  const getData = () => data;
  const setData = (v) => (data = v);

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
      const project = Create.Project(title, detail, dueDate, hasDueDate);
      pushToData(project, "project");
    }
  };
  const getProject = (project = currentState) => data[project];
  const getAllProjects = () => {
    let arr = [];
    for (const project in data) {
      arr.push(project);
    }
    return arr;
  };

  return {
    setData,
    getAllProjects,
    getData,
    setState,
    getState,
    pushToData,
    addNewProject,
    getProject,
  };
})();

// ******************** MODULE HANDLE EVENTS ********************
const FormListener = (() => {
  function listenFor(type) {
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
        Controller.pushToData(obj); //or today, week, month, year, gym, clean, work, or just leave 2nd argument empty
      } else if (type === "note") {
        obj = Create.Note(title, detail, dueDate, hasDueDate);
        Controller.pushToData(obj);
      } else if (type === "project") {
        obj = Create.Project(title, detail, dueDate, hasDueDate);
        Controller.pushToData(obj);
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
    listenFor,
  };
})();

// ******************** MODULE HANDLE EVENTS ********************
const Listener = (() => {
  //all buttons in #aside to display project and switch state in controller
  let allButtonsProject = document.querySelectorAll(
    `nav#aside__nav .nav__button`
  );
  //button to toggle dialog to get input
  const buttonPlus = document.getElementById("button__plus");
  //specific dialog of each object we want to create
  const ofTodo = document.getElementById("of__todo");
  const ofNote = document.getElementById("of__note");
  const ofProject = document.getElementById("of__project");

  buttonPlus.addEventListener("click", () => {
    const state = Controller.getState();
    //we must hide this buttonPlus if currentState is 'dairy'
    if (state === "note") {
      // Note form
      FormListener.listenFor("note");
      ofNote.show();
    } else if (state === "project") {
      // Project form
      FormListener.listenFor("project");
      ofProject.show();
    } else {
      // Todo form
      FormListener.listenFor("todo");
      ofTodo.show();
    }
  });

  const refreshAllButtonProject = () => {
    allButtonsProject = document.querySelectorAll(
      `nav#aside__nav .nav__button`
    );
  };
  document.addEventListener("DOMContentLoaded", function () {
    //update date object in Controller
    // if (DB.check()) {
    //   Controller.setData(DB.restore(DB.get()));
    // }
  });
})();

// ******************** MODULE TO SEND NOTIFICATION AND REMINDER ********************
const Noti = (() => {
  return {};
})();

// ******************** MODULE TO TEST IN CONSOLE ********************
const test = (() => {
  // Controller.addNewProject("tomorrow");
  // // // console.log(Controller.getAllProjects());
  // Controller.setState("tomorrow");
  // Controller.pushToData(
  //   Create.Todo(
  //     "title",
  //     "detail",
  //     "",
  //     false,
  //     "high",
  //     false,
  //     Controller.getState()
  //   )
  // );
  // DB.set(Controller.getData());
  // // console.log(Controller.getData());
  // console.dir(Controller.getData());
  // console.dir(DB.get());
  // Controller.setData(DB.get());
  // console.dir(Controller.getData());
  // Controller.setData(DB.restore(DB.get()));
  // console.dir(Controller.getData());
  // if (DB.check) {
  //   console.dir(DB.get());
  //   Controller.setData(DB.get());
  // }
  // console.dir(Controller.getData());
  console.dir(DB.get());
})();
