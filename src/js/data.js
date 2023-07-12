//this is data.js

import * as database from './database.js';
import * as Prototype from './prototype.js';
import * as Create from './create.js';
import { sub, endOfWeek, endOfMonth, endOfYear, format } from 'date-fns';

const today = new Date();
// const thisDay = format(new Date(), 'yyyy-MM-dd');
const yesterday = format(sub(today, { days: 1 }), 'yyyy-MM-dd');
const twoDaysPast = format(sub(today, { days: 2 }), 'yyyy-MM-dd');
// const thisWeek = format(endOfWeek(today), 'yyyy-MM-dd');
// const thisMonth = format(endOfMonth(today), 'yyyy-MM-dd');
// const thisYear = format(endOfYear(today), 'yyyy-MM-dd');

const yesterdayDiary = Create.Diary(
  'diary project is used to save your diary record, daily events, daybook, just write down your thoughts, talk to yourself to be more mindfulness',
  'it has 2 sections, your thoughts along the day and your thoughts before going to bed'
);
yesterdayDiary.createdDate = yesterday;
const twoDaysBeforeDiary = Create.Diary(
  'Hmmm I did dopamine detox quite well today, just learn and play soccer, not wasting time on game or social media :)',
  'Today I did 8 pomodoros 1 hours, but still feel like I am not productive as I want, I must push harder tomorrow and become a Backend Engineer in the future :) '
);
twoDaysBeforeDiary.createdDate = twoDaysPast;

let data = {
  projects: {
    todo: [
      Create.Project('gym', 'contains todos of my gym project', '', false, 'todo'),
      Create.Project('work', 'contains todos of my work project', '', false, 'todo'),
      Create.Project('learn', 'contains todos of my learn project', '', false, 'todo'),
    ],
    note: [
      Create.Project('cooking recipes', 'contains notes of my cooking recipes project', '', false, 'note'),
      Create.Project('reading', 'contains notes of my reading project', '', false, 'note'),
      Create.Project('dsa', 'contains notes of my data structures and algorithms project', '', false, 'note'),
    ],
  },
  items: {
    diary: [yesterdayDiary, twoDaysBeforeDiary],
    todo: [
      Create.Todo('dummy todo of all 0', 'dummy todo of all 0', '', false, 'high', false, 'all'),
      Create.Todo('dummy todo of all 1', 'dummy todo of all 1', '', false, 'med', false, 'all'),
      Create.Todo('dummy todo of all 2', 'dummy todo of all 2', '', false, 'low', false, 'all'),
      Create.Todo('dummy todo of gym 0', 'dummy todo of gym 0', '', false, 'low', false, 'gym'),
      Create.Todo('dummy todo of gym 1', 'dummy todo of gym 1', '', false, 'med', false, 'gym'),
      Create.Todo('dummy todo of gym 2', 'dummy todo of gym 2', '', false, 'high', false, 'gym'),
      Create.Todo('dummy todo of work 0', 'dummy todo of work 0', '', false, 'low', true, 'work'),
      Create.Todo('dummy todo of work 1', 'dummy todo of work 1', '', false, 'med', true, 'work'),
      Create.Todo('dummy todo of work 2', 'dummy todo of work 2', '', false, 'high', true, 'work'),
      Create.Todo('dummy todo of learn 0', 'dummy todo of learn 0', '', false, 'low', false, 'learn'),
      Create.Todo('dummy todo of learn 1', 'dummy todo of learn 1', '', false, 'med', true, 'learn'),
      Create.Todo('dummy todo of learn 3', 'dummy todo of learn 3', '', false, 'high', false, 'learn'),
    ],
    note: [
      Create.Note('dummy cooking recipe note 0', 'dummy cooking recipe note 0', '', false, 'cooking recipes'),
      Create.Note('dummy cooking recipe note 1', 'dummy cooking recipe note 1', '', false, 'cooking recipes'),
      Create.Note('dummy reading note 0', 'dummy reading note 0', '', false, 'reading'),
      Create.Note('dummy reading note 1', 'dummy reading note 1', '', false, 'reading'),
      Create.Note('dummy dsa note 0', 'dummy dsa note 0', '', false, 'dsa'),
      Create.Note('dummy dsa note 1', 'dummy dsa note 1', '', false, 'dsa'),
      Create.Note('dummy all note 0', 'dummy all note 0', '', false, 'all'),
      Create.Note('dummy all note 1', 'dummy all note 1', '', false, 'all'),
    ],
  },
};

//////////////////// data methods \\\\\\\\\\\\\\\\\\\\
const loadData = () => {
  if (database.check('data')) {
    data = Prototype.restore(database.get('data'));
  }
};

const saveData = () => database.set(data, 'data');

const getData = () => data;

//////////////////// data.projects methods \\\\\\\\\\\\\\\\\\\\
const getAllProjectsOfASpecificType = (type) => data.projects[type];

const addNewProjectToASpecificType = (obj, type) => {
  const projectsOfType = data.projects[type];
  //check if all projects in that type (note or todo) has 1 project with the same title then return
  for (const item of projectsOfType) {
    if (projectsOfType[item].title === obj.title) {
      alert(`This ${type} project is already existed, please choose another title.`);
      return `This ${type} project is already existed, please choose another title.`;
    }
  }
  // else add it to the beginning of array
  projectsOfType.unshift(obj);
  saveData();
};

const deleteAProjectAndAllItsItemsOfASpecificType = (obj, type) => {
  // del that project in projects[type]
  let index = data.projects[type].indexOf(obj);
  data.projects[type].splice(index, 1);
  // del all items of that project in items[type]
  data.items[type] = data.items[type].filter((item) => obj.title !== item.project);
  // if item in that items[type] array has 'project' property === title of the obj we remove in projects[type] then that item should be removed too
  saveData();
};

//////////////////// data.items methods \\\\\\\\\\\\\\\\\\\\
const getASpecificTypeAllItems = (type) => data.items[type];

const getASpecificProjectAllItems = (type, project) => {
  return data.items[type].reduce((total, current) => {
    if (current.project === project) {
      total.push(current);
    }
    return total;
  }, []);
};

const addOneObjToASpecificType = (obj, type) => {
  data.items[type].unshift(obj);
  saveData();
};

const deleteOneObjFromASpecificType = (obj, type) => {
  let index = data.items[type].indexOf(obj);
  data.items[type].splice(index, 1);
  saveData();
};

//////////////////// lengths in data \\\\\\\\\\\\\\\\\\\\
const allItemsOfASpecificTypeOfAClass = (ofClass, type) => {
  if (ofClass === 'items' && type === 'todo') {
    return data.items.todo.reduce((total, current) => {
      if (!current.isDone) total++;
      return total;
    }, 0);
  }

  return data[ofClass][type].length;
};

const allItemsOfASpecificProjectOfTypeInItemsProperty = (type, project) => {
  if (type === 'diary' && project === 'diary') return data.items.diary.length;

  if (type === 'note' && project === 'all') return data.items.note.length;

  if (type === 'note' && project !== 'all') {
    return data.items.note.reduce((total, current) => {
      if (current.project === project) total++;
      return total;
    }, 0);
  }

  if (type === 'todo' && project === 'all') return allItemsOfASpecificTypeOfAClass('items', 'todo');

  if (type === 'todo' && project !== 'all') {
    return data.items.todo.reduce((total, current) => {
      if (current.project === project && !current.isDone) total++;
      return total;
    }, 0);
  }
};

//////////////////// export everything in a small object \\\\\\\\\\\\\\\\\\\\
const methods = {
  set: saveData,
  get: getData,
  load: loadData,
  projects: {
    get: getAllProjectsOfASpecificType,
    add: addNewProjectToASpecificType,
    del: deleteAProjectAndAllItsItemsOfASpecificType,
  },
  items: {
    get: getASpecificTypeAllItems,
    add: addOneObjToASpecificType,
    del: deleteOneObjFromASpecificType,
    project: getASpecificProjectAllItems,
  },
  len: {
    type: allItemsOfASpecificTypeOfAClass, // (ofClass, type)
    project: allItemsOfASpecificProjectOfTypeInItemsProperty, // (type, project)
  },
};

export default methods;
