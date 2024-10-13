import { Diary } from './create.js';
import * as database from './database.js';
import Prototype from './prototype.js';
import { isBefore, startOfToday } from 'date-fns';
import Data from './data.js';

////////// default when first open app  \\\\\\\\\\
let obj = Diary('what is happening inside my head all day long?', 'what is happening inside my head before i go to bed?');

const set = () => database.set(obj, 'diary');

export const get = () => obj;

export const load = () => {
  if (database.check('diary')) {
    obj = Object.assign(Object.create(Prototype.diary), database.get('diary'));
  }
  //if the created date of the diary is yesterday,
  const today = startOfToday();
  if (isBefore(new Date(obj.createdDate), today)) {
    // then add it to 'diary' project in data,
    Data.items.add(obj, 'diary');
    // then update data to database,
    Data.set();
    // then create new Diary for today,
    obj = Diary('write your thoughts here', 'write your thoughts here');
    // then update that to 'diary' in database
    set();
  }
};

////////// set day and night property ob current diary object  \\\\\\\\\\
export const day = (v) => {
  obj.day = v;
  set();
};

export const night = (v) => {
  obj.night = v;
  set();
};

////////// inputs form to write diaries  \\\\\\\\\\
export const typeInput = (obj) => {
  const container = document.createElement('div');
  container.id = 'section__diary__inputs__ctn';

  const lastModified = document.createElement('em');
  lastModified.id = 'diary__last__modified';
  lastModified.textContent = `Last modified: ${obj.lastModified}`;
  container.appendChild(lastModified);

  const formDay = document.createElement('div');
  formDay.id = 'diary__form__day';
  container.appendChild(formDay);

  const dayParagraph = document.createElement('p');
  dayParagraph.textContent = 'Your thoughts all day long.';
  formDay.appendChild(dayParagraph);

  const dayHr = document.createElement('hr');
  formDay.appendChild(dayHr);

  const dayInput = document.createElement('div');
  dayInput.id = 'diary__input__day';
  dayInput.contentEditable = true;
  dayInput.spellcheck = false;
  dayInput.textContent = obj.day;
  dayInput.addEventListener('input', (event) => {
    obj.setLastModified();
    day(event.target.textContent);
  });
  formDay.appendChild(dayInput);

  const formNight = document.createElement('div');
  formNight.id = 'diary__form__night';
  container.appendChild(formNight);

  const nightParagraph = document.createElement('p');
  nightParagraph.textContent = 'Your thoughts before bed.';
  formNight.appendChild(nightParagraph);

  const nightHr = document.createElement('hr');
  formNight.appendChild(nightHr);

  const nightInput = document.createElement('div');
  nightInput.id = 'diary__input__night';
  nightInput.contentEditable = true;
  nightInput.spellcheck = false;
  nightInput.textContent = obj.night;
  nightInput.addEventListener('input', (event) => {
    obj.setLastModified();
    night(event.target.textContent);
  });
  formNight.appendChild(nightInput);

  return container;
};
