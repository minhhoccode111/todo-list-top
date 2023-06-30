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
    // Data.set()
    obj = Diary("", "");
    // set();
  }
};

export const day = (v) => {
  obj.day = v;
  // set();
};

export const night = (v) => {
  obj.day = v;
  // set();
};

export const typeInput = (obj) => {
  const container = document.createElement("div");
  container.id = "section__diary__inputs__ctn";

  const lastModified = document.createElement("em");
  lastModified.id = "diary__last__modified";
  lastModified.textContent = `Last modified: ${obj.lastModified}`;
  container.appendChild(lastModified);

  const formDay = document.createElement("div");
  formDay.id = "diary__form__day";
  container.appendChild(formDay);

  const dayParagraph = document.createElement("p");
  dayParagraph.textContent = "Your thoughts all day long.";
  formDay.appendChild(dayParagraph);

  const dayHr = document.createElement("hr");
  formDay.appendChild(dayHr);

  const dayInput = document.createElement("div");
  dayInput.id = "diary__input__day";
  dayInput.contentEditable = true;
  dayInput.spellcheck = false;
  dayInput.textContent = obj.day;
  dayInput.addEventListener("input", (event) => {
    day(event.target.textContent);
  });
  formDay.appendChild(dayInput);

  const formNight = document.createElement("div");
  formNight.id = "diary__form__night";
  container.appendChild(formNight);

  const nightParagraph = document.createElement("p");
  nightParagraph.textContent = "Your thoughts before bed.";
  formNight.appendChild(nightParagraph);

  const nightHr = document.createElement("hr");
  formNight.appendChild(nightHr);

  const nightInput = document.createElement("div");
  nightInput.id = "diary__input__night";
  nightInput.contentEditable = true;
  nightInput.spellcheck = false;
  nightInput.textContent = obj.night;
  nightInput.addEventListener("input", (event) => {
    night(event.target.textContent);
  });
  formNight.appendChild(nightInput);

  return container;
};
