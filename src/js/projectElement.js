import { displayInfo } from './info.js';
import Data from './data.js';
import { nav, updateSpan } from './display.js';

////////// create project item and add event listeners \\\\\\\\\\
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
    container.classList.add('animate__animated', 'animate__backOutRight');
    setTimeout(() => {
      deleteButton.parentNode.remove();
    }, 500);
    projectClickedDelete(obj, type, title);
  });

  container.appendChild(titleLink);
  container.appendChild(infoButton);
  container.appendChild(deleteButton);

  return container;
}

function projectClickedDelete(obj, type, name) {
  Data.projects.del(obj, type);
  const element = nav.querySelector(`button[data-of-class="items"][data-type="${type}"][data-project="${name}"]`);
  element.classList.add('animate__animated', 'animate__backOutLeft');
  setTimeout(() => {
    element.parentNode.remove();
  }, 500);
  updateSpan();
}

function projectClickedLink(type, name) {
  nav.querySelector(`button[data-of-class="items"][data-type="${type}"][data-project="${name}"]`).click();
}
