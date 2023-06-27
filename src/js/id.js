import * as database from "./database.js";

let id = 0;

const set = () => database.set(id, "id");

//Use to set id from database when app is loaded
export const load = () => {
  if (database.check("id")) {
    id = database.get("id");
  }
};

export const get = () => {
  let i = id;
  id++;
  set();
  return i;
};
