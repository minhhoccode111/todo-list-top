//this is display.js

import Data from './data.js';
import * as Diary from './diary.js';
import Current from './current.js';
import { buttonPlus } from './listener.js';
import { todo } from './todoElement.js';
import { note } from './noteElement.js';
import { project } from './projectElement.js';
import { diary } from './diaryElement.js';

export const main = document.getElementById('main');
export const nav = document.getElementById('aside__nav');
export const custom = document.getElementById('custom__projects__ctn');

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
    Current.set('ofClass') === ofClass;
    Current.set('type') === type;
    Current.set('project') === project;
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

export function customProjectBtns(customProjects) {
  custom.innerHTML = '';
  for (const item of customProjects) {
    const name = item.title;
    const length = Data.projects.getL(name);
    custom.appendChild(createCustomButtons(name, length));
  }
}

function createCustomButtons(name, length) {
  const container = document.createElement('div');
  container.classList.add('nav__button__ctn');
  container.classList.add('child');

  const button = document.createElement('button');
  button.classList.add('nav__button');
  button.setAttribute('data-name', `${name}`); //FIXME fix this classList to be data-name because if user create a project named with space then we'll have an error with classList.add()
  button.textContent = name;
  button.addEventListener('click', () => {
    if (Current.get() === name) return;
    Current.set(name);
    projectItems(Current.get());
  });
  container.appendChild(button);

  const span = document.createElement('span');
  span.classList.add('tinynum');
  span.textContent = length;
  container.appendChild(span);

  return container;
}

export const projectItems = (ofClass, type, project) => {
  let items = Data.projects.get(name);
  let data = Data.get();
  main.innerHTML = '';
  if (name === 'all') {
    for (const prop in data) {
      if (['project', 'note', 'diary'].includes(prop)) continue;
      for (let i = 0; i < data[prop].length; i++) {
        main.appendChild(todo(data[prop][i], prop, i));
      }
    }
  } else {
    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      if (name === 'diary' && i === 0) {
        main.appendChild(Diary.typeInput(Diary.get()));
      }
      if (name === 'diary') {
        main.appendChild(diary(item, i));
      } else if (name === 'note') {
        main.appendChild(note(item, i));
      } else if (name === 'project') {
        main.appendChild(project(item, i));
      } else {
        main.appendChild(todo(item, name, i));
      }
    }
  }
};
