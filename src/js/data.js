import * as database from "./database.js";

let data = {
  all: [],
  today: [],
  week: [],
  month: [],
  year: [],
  project: [],
  note: [],
  diary: [],
};

//Use to load data from database when app is loaded
export const load = () => {
  if (database.check("data")) {
    data = database.get("data");
  }
};

//use to set data to database
const set = () => database.set(data, "data");

export const get = () => data;

export const add = (obj, project) => {
  data[project].push(obj);
  set();
};
