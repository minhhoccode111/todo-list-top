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
  const project = () => {};

  return {
    todo,
    note,
    dairy,
    project,
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

// ******************** MODULE FACTORY FUNCTION ********************
const Create = (() => {
  const PROTO = {};

  const Todo = () => {};
  const Note = () => {};
  const Dairy = () => {};
  const Project = () => {};

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
    todo: {
      all: [],
      week: [],
      year: [],
      today: [],
    },
    note: [],
    dairy: {
      "2023-6-17": {
        day: `Minh khong vui vi Ut khong yeu Minh`,
        night: `Today I learned very well, I'm so proud of me`,
      },
      "2023-6-18": {
        day: `Minh khong vui vi Ut khong yeu Minh`,
        night: `Today I learned very well, I'm so proud of me`,
      },
      "2023-6-19": {
        day: `Minh khong vui vi Ut khong yeu Minh`,
        night: `Today I learned very well, I'm so proud of me`,
      },
      "2023-6-20": {
        day: `Minh khong vui vi Ut khong yeu Minh`,
        night: `Today I learned very well, I'm so proud of me`,
      },
    },
    project: {
      gym: [],
      clean: [],
      work: [],
    },
  };

  const getData = () => data;

  return { getData };
})();

// ******************** MODULE HANDLE EVENTS ********************
const Handler = (() => {
  return {};
})();

// ******************** MODULE TO SEND NOTIFICATION AND REMINDER ********************
const Noti = (() => {
  return {};
})();
