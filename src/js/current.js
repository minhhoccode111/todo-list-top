//this is current.js
import * as database from './database.js';

// let current = "all";

// export const get = () => current;

// export const set = (v) => {
//   current = v;
//   database.set(current, "current");
// };

// export const load = () => {
//   if (database.check("current")) {
//     current = database.get("current");
//   }
// };

let state = {
  type: 'todo',
  project: 'all',
  ofClass: 'items',
};

export const get = (prop) => state[prop];

export const set = (prop, value) => {
  state[prop] = value;
  database.set('current', state);
};
