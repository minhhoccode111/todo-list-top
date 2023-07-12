//this is prototype.js

import { now, checkExpired } from './fns.js';

// ******************** MODULE PROTOTYPE OF FACTORIES FUNCTION ********************
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

export const todo = Object.assign(Object.create(proto), {
  classDone() {
    return this.isDone ? 'done' : '';
  },
  htmlDone() {
    return this.isDone ? '&#x2713;' : '';
  },
  type: 'todo',
  ofClass: 'items',
});

export const note = Object.assign(Object.create(proto), {
  type: 'note',
  ofClass: 'items',
});

export const diary = Object.assign(Object.create(proto), {
  type: 'diary',
  ofClass: 'items',
  htmlOpened() {
    return this.isOpened ? 'open' : '';
  },
});

export const project = Object.assign(Object.create(proto), {
  ofClass: 'items',
});

export const restore = (data) => {
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

// this is data format
// const data = {
//   projects: {
//     note: [
//       {
//         // ...others properties
//         title: 'reading',
//         type: 'note',
//         ofClass: 'projects',
//       },
//       //... others note projects
//       // used to create note project buttons in #aside .note_projects_ctn
//     ],
//     todo: [
//       {
//         // ...others properties
//         title: 'today',
//         type: 'todo',
//         ofClass: 'projects',
//       },
//       //... others todo projects
//       // used to create todo project buttons in #aside .todo_project_ctn
//     ],
//   },
//   items: {
//     diary: [
//       {
//         // ...others properties
//         day: '...foo ...baz',
//         night: '...foo ...baz',
//       },
//       // ...other items
//     ],
//     todo: [
//       {
//         // ...others properties
//         title: 'finish Check-Mate project',
//         ofClass: 'items',
//         type: 'todo',
//         project: 'today', // must be included in data.projects.todo
//       },
//       // ...other items
//     ],
//     note: [
//       {
//         // ...others properties
//         title: 'how to be productive',
//         detail: 'stay focus',
//         ofClass: 'items',
//         type: 'note',
//         project: 'life', // must be included in data.projects.note
//       },
//       // ...other items
//     ],
//   },
// };
