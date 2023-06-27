import { Diary } from "./create.js";
import * as database from "./database.js";
import * as Prototype from "./prototype.js";
import { isBefore } from "date-fns";
import * as data from "./data.js";

let obj = Diary("", "");

const set = () => database.set(obj, "diary");

export const get = () => obj;

export const load = () => {
  if (database.check("diary")) {
    obj = Object.assign(Object.create(Prototype.diary), database.get("diary"));
  }
  //is the created date of the diary is yesterday, then add it to 'diary' project in data, then update data to database, then create new Diary for today, then update that to 'diary' in database
  if (isBefore(new Date(obj.createdDate), new Date())) {
    data.add(obj, "diary");
    obj = Diary("", "");
    set();
  }
};

export const day = (v) => {
  obj.day = v;
  set();
};

export const night = (v) => {
  obj.day = v;
  set();
};
