//this is diary.js

import { Diary } from "./create.js";
import * as database from "./database.js";
import * as Prototype from "./prototype.js";
import { isBefore } from "date-fns";
import * as Data from "./data.js";

let obj = Diary("", "");

const set = () => database.set(obj, "diary");

export const get = () => obj;

export const load = () => {
  if (database.check("diary")) {
    obj = Object.assign(Object.create(Prototype.diary), database.get("diary"));
  }
  //is the created date of the diary is yesterday, then add it to 'diary' project in data, then update data to database, then create new Diary for today, then update that to 'diary' in database
  if (isBefore(new Date(obj.createdDate), new Date())) {
    Data.add(obj, "diary");
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

export const typeInput = () => {
  return `<div id="section__diary__inputs__ctn">
            <em id="diary__last__modified">Last modified: ${obj.lastModified}</em>
            <div id="diary__form__day">
              <p class="">Your thoughts all day long.</p>
              <hr />
              <div id="diary__input__day" contenteditable="true" spellcheck="false">
                ${obj.day}
              </div>
            </div>
            <div id="diary__form__night">
              <p class="">Your thoughts before bed.</p>
              <hr />
              <div id="diary__input__night" contenteditable="true" spellcheck="false">
                ${obj.night}
              </div>
            </div>
          </div>`;
};
