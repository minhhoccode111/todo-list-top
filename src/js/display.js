import Data from './data.js';
import * as Diary from './diary.js';
import Current from './current.js';
import { buttonPlus } from './listener.js';
import Todo from './todoElement.js';
import Note from './noteElement.js';
import Project from './projectElement.js';
import DiaryHtml from './diaryElement.js';

//////////   \\\\\\\\\\
const main = document.getElementById('main');
export const nav = document.getElementById('aside__nav');
const todoProjectsCtn = document.getElementById('todo_projects_ctn');
const noteProjectsCtn = document.getElementById('note_projects_ctn');

const buttons = document.querySelectorAll('.nav__button');
buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    const ofClass = e.target.dataset.ofClass;
    const project = e.target.dataset.project;
    const type = e.target.dataset.type;
    if (Current.get('project') === project && Current.get('type') === type && Current.get('ofClass') === ofClass) {
      return;
    }
    Current.set(ofClass, type, project);

    projectItems(ofClass, type, project);
    if (type === 'diary') {
      buttonPlus.classList.add('hidden');
    } else {
      buttonPlus.classList.remove('hidden');
    }
  });
});

////////// small number next to each button to display how many item it has \\\\\\\\\\
export function updateSpan() {
  const buttons = nav.querySelectorAll('.nav__button');
  buttons.forEach((button) => {
    const ofClass = button.dataset.ofClass;
    const type = button.dataset.type;
    const project = button.dataset.project;
    const span = button.nextElementSibling;
    if (ofClass === 'items') {
      span.textContent = Data.len.project(type, project);
    } else {
      span.textContent = Data.len.type('projects', type);
    }
  });
}

////////// display all projects of a specific type (note or todo) \\\\\\\\\\
export function allProjectsOfTypeBtns(type) {
  if (type === 'note') {
    noteProjectsCtn.innerHTML = '';
    for (const item of Data.projects.get('note')) {
      const name = item.title;
      const len = Data.len.project('note', name);
      noteProjectsCtn.appendChild(createCustomButtons(name, len, 'note'));
    }
  } else {
    todoProjectsCtn.innerHTML = '';
    for (const item of Data.projects.get('todo')) {
      const name = item.title;
      const len = Data.len.project('todo', name);
      todoProjectsCtn.appendChild(createCustomButtons(name, len, 'todo'));
    }
  }
}

////////// create buttons for all projects of a specific type (note or todo) \\\\\\\\\\
function createCustomButtons(name, length, type) {
  const container = document.createElement('div');
  container.classList.add('nav__button__ctn');
  container.classList.add('child');

  const button = document.createElement('button');
  button.classList.add('nav__button');
  button.setAttribute('data-of-class', `items`);
  button.setAttribute('data-type', `${type}`);
  button.setAttribute('data-project', `${name}`);
  button.textContent = name;
  button.addEventListener('click', () => {
    if (Current.get('project') === name && Current.get('type') === type && Current.get('ofClass') === 'items') {
      return;
    }
    Current.set('items', type, name);
    projectItems('items', type, name);
  });
  container.appendChild(button);

  const span = document.createElement('span');
  span.classList.add('tinynum');
  span.textContent = length;
  container.appendChild(span);

  return container;
}

////////// display all items of a project in main element \\\\\\\\\\
export const projectItems = (ofClass, type, projectName) => {
  main.innerHTML = '';
  if (ofClass === 'items') {
    const allItemsOfType = Data.items.get(type); //use when we want to display all items
    if (type === 'todo') {
      if (projectName === 'all') {
        for (const item of allItemsOfType) {
          main.appendChild(Todo(item));
        }
      } else {
        const itemsOfATodoProject = Data.items.project('todo', projectName);
        for (const item of itemsOfATodoProject) {
          main.appendChild(Todo(item));
        }
      }
      return;
    }
    if (type === 'note') {
      if (projectName === 'all') {
        for (const item of allItemsOfType) {
          main.appendChild(Note(item));
        }
      } else {
        const itemsOfANoteProject = Data.items.project('note', projectName);
        for (const item of itemsOfANoteProject) {
          main.appendChild(Note(item));
        }
      }
      return;
    }
    if (type === 'diary') {
      main.appendChild(Diary.typeInput(Diary.get()));
      for (const item of allItemsOfType) {
        main.appendChild(DiaryHtml(item));
      }
    }
  } else {
    const projects = Data.projects.get(type);
    for (const item of projects) {
      main.appendChild(Project(item));
    }
  }
};
