import * as database from './database.js';

let id = 0;

////////// to create a unique id for items \\\\\\\\\\
const set = () => database.set(id, 'id');

const load = () => {
  if (database.check('id')) {
    id = database.get('id');
  }
};

const get = () => {
  let i = id;
  id++;
  set();
  return i;
};

const methods = {
  get,
  load,
};

export default methods;
