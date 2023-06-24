// import library
import * as fns from "date-fns";

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
  const set = (object, name) => {
    localStorage.setItem(name, JSON.stringify(object));
  };
  const get = (name) => JSON.parse(localStorage.getItem(name));

  const check = (name) => {
    JSON.parse(localStorage.getItem(name)) !== null;
  };
  const restore = (objData) => {
    for (let project in objData) {
      for (let i = 0; i < project.length; i++) {
        let obj = objData[project][i];
        if (project === "note") {
          objData[project][i] = Object.assign(
            Object.create(Prototype.note),
            obj
          );
        } else if (project === "project") {
          objData[project][i] = Object.assign(
            Object.create(Prototype.project),
            obj
          );
        } else if (project === "dairy") {
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
  let i = 0;
  //Todo Factory function
  function Todo(title, detail, dueDate, hasDueDate, priority, isDone, project) {
    const createdDate = fns.parseISO(fns.format(new Date(), "yyyy-MM-dd"));
    const isTimeExpired =
      dueDate != "" && fns.isBefore(fns.parseISO(dueDate), createdDate);
    return Object.assign(Object.create(Prototype.todo), {
      id: i++,
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
      id: i++,
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
      id: i++,
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

// ******************** MODULE TO INTERACT WITH DATA OF THE APP ********************
const Data = (() => {
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
  const setToDB = () => DB.set(data, "data");
  const loadDB = () => {
    if (DB.check("data")) {
      data = DB.restore(DB.get("data"));
    }
  };
  const get = () => data;
  const set = (obj, project) => {
    data[project].push(obj);
    setToDB();
  };

  const newProject = (title, detail, dueDate, hasDueDate) => {
    if (data.hasOwnProperty(title)) {
      alert("That project is already existed!");
      return;
    } else {
      data[title] = [];
      const project = Create.Project(title, detail, dueDate, hasDueDate);
      set(project, "project");
    }
  };
  const projects = () => {
    let arr = [];
    for (const project in data) {
      arr.push(project);
    }
    return arr;
  };

  return {
    get,
    set,
    loadDB,
    setToDB,
    projects,
    newProject,
  };
})();

// ******************** MODULE TO MODIFY CURRENT PROJECT WE ARE IN  ********************
const Current = (() => {
  let project = "all";
  const set = (v) => (project = v);
  const get = () => project;

  return {
    get,
    set,
  };
})();

// ******************** MODULE DAIRY  ********************
const Dairy = (() => {
  let obj = Create.Dairy("", "");
  const get = () => obj;
  const setDay = (str) => (obj.day = str);
  const setNight = (str) => (obj.night = str);
  const setToDB = () => DB.set(obj, "dairy");
  const loadDB = () => {
    //if 'dairy' in DB !== null
    if (DB.check("dairy")) {
      //then give back its prototype
      obj = Object.assign(Object.create(Prototype.dairy), DB.get("dairy"));
      let created = obj.createdDate;
      let today = fns.parseISO(fns.format(new Date(), "yyyy-MM-dd"));
      //if the dairy we just loaded is created before today
      if (fns.isBefore(created, today)) {
        //then push current dairy object to data's dairy project in controller
        Data.set(obj, "dairy");
        //then create a new dairy
        obj = Create.Dairy("", "");
        //then set the new created dairy to DB
        setToDB();
      }
    }
  };
  return { get, setDay, setNight, loadDB };
})();
// ******************** MODULE HANDLE EVENTS ********************
const FormListener = (() => {
  function listen(type) {
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
      Data.set(obj, Current.get()); //or today, week, month, year, gym, clean, work, or just leave 2nd argument empty

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
    listen,
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
    const project = Current.get();
    //we must hide this buttonPlus if Current.get() is 'dairy'
    if (project === "note") {
      // Note form
      FormListener.listen("note");
      ofNote.show();
    } else if (project === "project") {
      // Project form
      FormListener.listen("project");
      ofProject.show();
    } else {
      // Todo form
      FormListener.listen("todo");
      ofTodo.show();
    }
  });

  const refreshAllButtonProject = () => {
    allButtonsProject = document.querySelectorAll(
      `nav#aside__nav .nav__button`
    );
  };
  document.addEventListener("DOMContentLoaded", function () {
    Data.loadDB();
    Dairy.loadDB();
    console.dir(Data.get());
  });
})();

// ******************** MODULE TO SEND NOTIFICATION AND REMINDER ********************
const Noti = (() => {
  return {};
})();

// ******************** MODULE TO TEST IN CONSOLE ********************
const test = (() => {})();
