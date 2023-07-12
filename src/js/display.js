//this is display.js

import Data from './data.js';
import * as Diary from './diary.js';
import Current from './current.js';
import { buttonPlus } from './listener.js';
import { todo } from './todoElement.js';
import { note } from './noteElement.js';
import { project } from './projectElement.js';
import { diary } from './diaryElement.js';

const main = document.getElementById('main');
export const nav = document.getElementById('aside__nav');
// export const custom = document.getElementById('custom__projects__ctn');
const todoProjectsCtn = document.getElementById('todo_projects_ctn');
const noteProjectsCtn = document.getElementById('note_projects_ctn');

const buttons = document.querySelectorAll('.nav__button');
buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    // const name = e.target.dataset.name;
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

export function updateSpan() {
  const buttons = nav.querySelectorAll('.nav__button');
  buttons.forEach((button) => {
    const ofClass = button.dataset.ofClass;
    const type = button.dataset.type;
    const project = button.dataset.project;
    const span = button.nextElementSibling;
    if (ofClass === 'items') {
      span.textContent = Data.len.project(type, project);
    }
    if (ofClass === 'projects') {
      span.textContent = Data.len.type(ofClass, type);
    }
  });
}

// export function customProjectBtns(allTodoProjects) {
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

export const projectItems = (ofClass, type, projectName) => {
  main.innerHTML = '';
  if (ofClass === 'items') {
    const allItemsOfType = Data.items.get(type); //use when we want to display all items
    if (type === 'todo') {
      if (projectName === 'all') {
        for (const item of allItemsOfType) {
          main.appendChild(todo(allItemsOfType[item]));
        }
      } else {
        const itemsOfATodoProject = Data.items.project('todo', projectName);
        for (const item of itemsOfATodoProject) {
          main.appendChild(todo(itemsOfATodoProject[item]));
        }
      }
      return;
    }
    if (type === 'note') {
      if (projectName === 'all') {
        for (const item of allItemsOfType) {
          main.appendChild(note(allItemsOfType[item]));
        }
      } else {
        const itemsOfANoteProject = Data.items.project('note', projectName);
        for (const item of itemsOfANoteProject) {
          main.appendChild(note(itemsOfANoteProject[item]));
        }
      }
      return;
    }
    if (type === 'diary') {
      main.appendChild(Diary.typeInput(Diary.get()));
      for (const item of allItemsOfType) {
        main.appendChild(diary(allItemsOfType[item]));
      }
    }
  } else {
    const projects = Data.projects.get(type);
    for (const item of projects) {
      main.appendChild(project(projects[item]));
    }
  }
};
