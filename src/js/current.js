//this is current.js
import * as database from './database.js';

let current = {
  type: 'todo',
  project: 'all',
  ofClass: 'items',
};

export const get = (prop) => current[prop];

export const set = (prop, value) => {
  current[prop] = value;
  database.set('current', current);
};

export const load = () => {
  if (database.check('current')) {
    current = database.get('current');
  }
};
