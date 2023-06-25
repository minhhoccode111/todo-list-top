// import library
import * as FNS from "date-fns";

// ******************** MODULE TO USE DATE-FNS ********************
const DoFns = (() => {
  const parse = (date = new Date()) => {
    if (typeof date === "string") {
      return FNS.parseISO(date);
    } else {
      return FNS.parseISO(FNS.format(date, "yyyy-MM-dd"));
    }
  };
  const isBefore = (date0, date1 = new Date()) => FNS.isBefore(date0, date1);
  return { parse, isBefore };
})();

// ******************** MODULE PROTOTYPE OF FACTORIES FUNCTION ********************
const Prototype = (() => {
  const proto = {
    get: function (property) {
      return this[property] || "";
    },
  };
  const todo = {
    constructor: "Todo",
    display: function () {
      let style = this.isDone ? "done" : "";
      let text = this.isDone ? "&#x2713;" : "";
      return `
      <div class="todo__item ${this.priority} ${style}" data-id="${this.id}">
          <h3 class="todo__item__title">${this.title}</h3>
          <em class="todo__item__date">${this.dueDate}</em>
          <button class="todo__item__done done">${text}</button>
          <button class="todo__item__edit edit" data-id=${this.id}>...</button>
          <button class="todo__item__info info" data-id=${this.id}>?</button>
          <button class="todo__item__del del" data-id=${this.id}>X</button>
        </div>
      `;
    },
  };
  const note = {
    project: "note",
    constructor: "Note",
    display: function () {
      return `<div class="note__item" data-id="${this.id}">
      <div class="note__item__header">
        <div
          class="note__item__title"
          contenteditable="true"
          spellcheck="false"
        >
          ${this.title}
        </div>
        <button class="note__item__info info" data-id=${this.id}>?</button>
        <button class="note__item__del del" data-id=${this.id}>X</button>
      </div>

      <div
        class="note__item__detail"
        contenteditable="true"
        spellcheck="false"
      >
        ${this.detail}
      </div>
    </div>`;
    },
  };
  const diary = {
    isOpened: false,
    project: "diary",
    constructor: "Diary",
    display: function () {
      return `<div class="dairy__item">
      <details class="dairy__item__details">
        <summary class="dairy__item__details__summary">
          <em class="dairy__item__date">${this.createdDate}</em>
        </summary>
        <p class="dairy__item__day">${this.day}</p>
        <hr />
        <p class="dairy__item__night">${this.night}</p>
      </details>
    </div>`;
    },
  };
  const project = {
    project: "project",
    constructor: "Project",
    display: function () {
      return `
        <div class="project__item" data-id="${this.id}">
          <a href="#" class="project__item__title">${this.title}</a>
          <button class="project__item__edit edit" data-id=${this.id}>...</button>
          <button class="project__item__info info" data-id=${this.id}>?</button>
          <button class="project__item__del del" data-id=${this.id}>X</button>
        </div>
        `;
    },
  };
  Object.setPrototypeOf(todo, proto);
  Object.setPrototypeOf(note, proto);
  Object.setPrototypeOf(diary, proto);
  Object.setPrototypeOf(project, proto);
  const restore = (data) => {
    for (let state in data) {
      for (let i = 0; i < data[state].length; i++) {
        let obj = data[state][i];
        if (state === "note") {
          Object.setPrototypeOf(obj, note);
        } else if (state === "project") {
          Object.setPrototypeOf(obj, project);
        } else if (state === "diary") {
          Object.setPrototypeOf(obj, diary);
        } else {
          Object.setPrototypeOf(obj, todo);
        }
      }
    }
    return data;
  };
  return { todo, note, diary, project, restore };
})();

// ******************** MODULE INTERACT WITH DATABASE ********************
const DB = (() => {
  const set = (object, name) => {
    localStorage.setItem(name, JSON.stringify(object));
  };
  const get = (name) => JSON.parse(localStorage.getItem(name));

  const check = (name) => JSON.parse(localStorage.getItem(name)) !== null;

  return {
    check,
    get,
    set,
  };
})();

// ******************** MODULE FACTORIES FUNCTION ********************
const UniqueId = (() => {
  let id = 0;
  const get = () => {
    let i = id;
    id++;
    DB.set(id, "id");
    return i;
  };
  const loadDB = () => {
    if (DB.check("id")) {
      id = DB.get("id");
    }
  };
  return {
    get,
    loadDB,
  };
})();

// ******************** MODULE FACTORIES FUNCTION ********************
const Create = (() => {
  //Todo Factory function
  function Todo(title, detail, dueDate, hasDueDate, priority, isDone, project) {
    const id = UniqueId.get();
    const createdDate = DoFns.parse(new Date());
    console.dir(dueDate);
    let isTimeExpired = false;
    if (dueDate != "") {
      dueDate = DoFns.parse(dueDate);
      isTimeExpired = DoFns.isBefore(dueDate, createdDate);
    }
    return Object.assign(Object.create(Prototype.todo), {
      id,
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
    const id = UniqueId.get();
    const createdDate = DoFns.parse(new Date());
    let isTimeExpired = false;
    if (dueDate != "") {
      dueDate = DoFns.parse(dueDate);
      isTimeExpired = DoFns.isBefore(dueDate, createdDate);
    }
    return Object.assign(Object.create(Prototype.note), {
      id,
      title,
      detail,
      dueDate,
      hasDueDate,
      createdDate,
      isTimeExpired,
    });
  }
  //Diary Factory function
  function Diary(day, night) {
    const createdDate = DoFns.parse(new Date());
    return Object.assign(Object.create(Prototype.diary), {
      day,
      night,
      createdDate,
    });
  }
  //Project Factory function
  function Project(title, detail, dueDate, hasDueDate) {
    const id = UniqueId.get();
    const createdDate = DoFns.parse(new Date());
    let isTimeExpired = false;
    if (dueDate != "") {
      dueDate = DoFns.parse(dueDate);
      isTimeExpired = DoFns.isBefore(dueDate, createdDate);
    }
    return Object.assign(Object.create(Prototype.project), {
      id,
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
    Diary,
    Project,
  };
})();

// ******************** MODULE TO INTERACT WITH DATA OF THE APP ********************
const Data = (() => {
  let data = {
    all: [],
    today: [],
    week: [],
    month: [],
    year: [],
    note: [],
    diary: [
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
      data = Prototype.restore(DB.get("data"));
    }
  };
  const get = () => data;
  const set = (obj, project) => {
    data[project].push(obj);
    setToDB();
  };
  const del = (id, project) => {
    let index;
    for (i = 0; i < data[project].length; i++) {
      if ((data[project][i].id = id)) index = i;
      break;
    }
    data[project].splice(index, 1);
    setToDB();
  };

  return {
    get,
    set,
    del,
    loadDB,
    setToDB,
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

// ******************** MODULE PROJECTs TO MODIFY PROJECTS IN DATA   ********************
const Projects = (() => {
  const add = (title, detail, dueDate, hasDueDate) => {
    if (Data.get().hasOwnProperty(title)) {
      alert("That project is already existed!");
      return;
    } else {
      Data.get()[title] = [];
      const project = Create.Project(title, detail, dueDate, hasDueDate);
      Data.set(project, "project");
    }
  };
  const all = () => {
    let arr = [];
    for (const project in Data.get()) {
      arr.push(project);
    }
    return arr;
  };
  const del = (project) => {
    delete Data[project];
    Data.setToDB();
  };
  return { all, add, del };
})();

// ******************** MODULE DAIRY  ********************
const Diary = (() => {
  let obj = Create.Diary("", "");
  const get = () => obj;
  const setDay = (str) => (obj.day = str);
  const setNight = (str) => (obj.night = str);
  const setToDB = () => DB.set(obj, "diary");
  const loadDB = () => {
    //if 'diary' in DB !== null
    if (DB.check("diary")) {
      //then give back its prototype
      obj = Object.assign(Object.create(Prototype.diary), DB.get("diary"));
      let created = obj.createdDate;
      let today = DoFns.parse(new Date());
      //if the diary we just loaded is created before today
      if (DoFns.isBefore(created, today)) {
        //then push current diary object to data's diary project in controller
        Data.set(obj, "diary");
        //then create a new diary
        obj = Create.Diary("", "");
        //then set the new created diary to DB
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

      //disabled dueDateInput again
      dueDateInput.disabled = true;

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
  const sectionsInMain = document.querySelectorAll("#main section");
  const hideAllSectionsBut = (type) => {
    sectionsInMain.forEach((section) => {
      if (section.id.includes(type)) {
        section.classList.remove("hidden");
        return;
      }
      section.classList.add("hidden");
    });
  };
  //button to toggle dialog to get input
  const buttonPlus = document.getElementById("button__plus");
  //specific dialog of each object we want to create
  const ofTodo = document.getElementById("of__todo");
  const ofNote = document.getElementById("of__note");
  const ofProject = document.getElementById("of__project");

  buttonPlus.addEventListener("click", () => {
    const project = Current.get();
    //we must hide this buttonPlus if Current.get() is 'diary'
    if (project === "note") {
      // Note form
      ofNote.show();
    } else if (project === "project") {
      // Project form
      ofProject.show();
    } else {
      // Todo form
      ofTodo.show();
    }
  });

  const refreshAllButtonProject = () => {
    allButtonsProject = document.querySelectorAll(
      `nav#aside__nav .nav__button`
    );
    allButtonsProject.forEach((button) => {
      button.addEventListener("click", (e) => {
        console.log(e.target.textContent);
        Current.set(e.target.textContent);
        if (1) {
        } //FIXME
      });
    });
  };
  refreshAllButtonProject();
  document.addEventListener("DOMContentLoaded", function () {
    //load data from database
    // Data.loadDB();
    // Diary.loadDB();
    // UniqueId.loadDB();
    //listen for form submit
    FormListener.listen("note");
    FormListener.listen("project");
    FormListener.listen("todo");
    //
  });
})();

// ******************** MODULE TO SEND NOTIFICATION AND REMINDER ********************
const Noti = (() => {
  return {};
})();

// ******************** MODULE TO TEST IN CONSOLE ********************
const test = (() => {
  // reset localStorage
  // DB.set(null, "data");
  // DB.set(null, "diary");
  // DB.set(null, "id");
  //init app state
})();
