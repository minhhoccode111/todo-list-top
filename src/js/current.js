//this is current.js
import * as database from './database.js';

let current = {
  type: 'todo',
  project: 'all',
  ofClass: 'items',
};

const get = (prop) => current[prop];

const set = (prop, value) => {
  current[prop] = value;
  database.set('current', current);
};

const load = () => {
  if (database.check('current')) {
    current = database.get('current');
  }
};

const methods = {
  get,
  set,
  load,
};

export default methods;
