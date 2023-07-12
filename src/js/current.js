import * as database from './database.js';

////////// specify current state of the app \\\\\\\\\\
let current = {
  type: 'todo',
  project: 'all',
  ofClass: 'items',
};

////////// get and set (set will also save to database) \\\\\\\\\\
const get = (prop) => current[prop];

const set = (ofClass, type, project) => {
  current.type = type;
  current.project = project;
  current.ofClass = ofClass;
  database.set(current, 'current');
};

////////// load the last app state session \\\\\\\\\\
const load = () => {
  if (database.check('current')) {
    current = database.get('current');
  }
};

////////// export all in a small object (to use export default) \\\\\\\\\\
const methods = {
  get,
  set,
  load,
};

export default methods;
