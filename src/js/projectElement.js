//this is projectElement.js
import { displayInfo } from './info.js';
import Data from './data.js';
import { nav, updateSpan } from './display.js';

export default function project(obj) {
  let { id, title, type } = obj;

  const container = document.createElement('div');
  container.classList.add('project__item');
  container.dataset.id = id;

  const titleLink = document.createElement('a');
  titleLink.classList.add('project__item__title');
  titleLink.href = '#';
  titleLink.textContent = title;
  titleLink.addEventListener('click', () => {
    projectClickedLink(type, title);
  });

  const infoButton = document.createElement('button');
  infoButton.classList.add('project__item__info', 'info');
  infoButton.textContent = '?';
  infoButton.addEventListener('click', () => {
    displayInfo(obj);
  });

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('project__item__del', 'del');
  deleteButton.textContent = 'X';
  deleteButton.addEventListener('click', () => {
    deleteButton.parentNode.remove();
    projectClickedDelete(obj, type, title);
  });

  container.appendChild(titleLink);
  container.appendChild(infoButton);
  container.appendChild(deleteButton);

  return container;
}

function projectClickedDelete(obj, type, name) {
  Data.projects.del(obj, type);
  nav.querySelector(`button[data-of-class="items"][data-type="${type}"][data-project="${name}"]`).parentNode.remove();
  updateSpan();
}

function projectClickedLink(type, name) {
  nav.querySelector(`button[data-of-class="items"][data-type="${type}"][data-project="${name}"]`).click();
}
