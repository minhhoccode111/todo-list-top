import { now, checkExpired } from './fns.js';

////////// prototypes used to create new items  \\\\\\\\\\
const proto = {
  get(prop) {
    return this[prop] ?? '';
  },
  setLastModified() {
    this.lastModified = now();
  },
  setExpired() {
    this.isTimeExpired = checkExpired(this.dueDate);
  },
};

const todo = Object.assign(Object.create(proto), {
  classDone() {
    return this.isDone ? 'done' : '';
  },
  htmlDone() {
    return this.isDone ? '&#x2713;' : '';
  },
  type: 'todo',
  ofClass: 'items',
});

const note = Object.assign(Object.create(proto), {
  type: 'note',
  ofClass: 'items',
});

const diary = Object.assign(Object.create(proto), {
  type: 'diary',
  ofClass: 'items',
  project: 'diary',
  htmlOpened() {
    return this.isOpened ? 'open' : '';
  },
});

const project = Object.assign(Object.create(proto), {
  ofClass: 'items',
});

const restore = (data) => {
  for (let prop in data.projects) {
    for (let item of data.projects[prop]) {
      Object.setPrototypeOf(item, project);
    }
  }

  for (let prop in data.items) {
    switch (prop) {
      case 'todo':
        for (let obj of data.items.todo) {
          Object.setPrototypeOf(obj, todo);
        }
        break;
      case 'note':
        for (let obj of data.items.note) {
          Object.setPrototypeOf(obj, note);
        }
        break;
      case 'diary':
        for (let obj of data.items.diary) {
          Object.setPrototypeOf(obj, diary);
        }
        break;
    }
  }

  return data;
};

////////// use export default \\\\\\\\\\
const prototypes = {
  todo,
  note,
  diary,
  project,
  restore,
};

export default prototypes;
