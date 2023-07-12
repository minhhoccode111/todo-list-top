//this is todoElement.js
import { displayInfo } from './info.js';
import Data from './data.js';
import * as Display from './display.js';
import * as Edit from './edit.js';

export function todo(obj) {
  const { id, title, dueDate, priority, project } = obj;
  let div = document.createElement('div');
  div.className = 'todo__item' + ' ' + obj.classDone() + ' ' + priority;
  div.setAttribute('data-id', id);

  let h3 = document.createElement('h3');
  h3.className = 'todo__item__title';
  h3.textContent = title;

  let em = document.createElement('em');
  em.className = 'todo__item__date';
  em.textContent = dueDate;

  let buttonDone = document.createElement('button');
  buttonDone.className = 'todo__item__done';
  buttonDone.innerHTML = obj.htmlDone();
  buttonDone.addEventListener('click', () => {
    todoClickedDone(obj, buttonDone, div);
  });

  let buttonInfo = document.createElement('button');
  buttonInfo.className = 'todo__item__info info';
  buttonInfo.innerHTML = '?';
  buttonInfo.addEventListener('click', () => {
    displayInfo(obj);
  });

  let buttonDel = document.createElement('button');
  buttonDel.className = 'todo__item__del del';
  buttonDel.innerHTML = 'X';
  buttonDel.addEventListener('click', (e) => {
    buttonDel.parentNode.remove();
    todoClickedDelete(obj);
  });

  let buttonEdit = document.createElement('button');
  buttonEdit.className = 'todo__item__edit edit';
  buttonEdit.innerHTML = '...';
  buttonEdit.addEventListener('click', (e) => {
    Edit.setObjCurrent(obj);
    Edit.setElementParent(div);
    Edit.fillEditInputs();
    Edit.dialog.show();
  });

  div.appendChild(h3);
  div.appendChild(em);
  div.appendChild(buttonDone);
  div.appendChild(buttonEdit);
  div.appendChild(buttonInfo);
  div.appendChild(buttonDel);
  return div;
}

function todoClickedDelete(obj) {
  Data.items.del(obj, 'todo');
  Display.updateSpan();
}

function todoClickedDone(obj, buttonDone, div) {
  if (obj.isDone) {
    obj.isDone = false;
    div.classList.remove('done');
  } else {
    obj.isDone = true;
    div.classList.add('done');
  }
  obj.setLastModified();
  Data.set();
  buttonDone.innerHTML = obj.htmlDone();
  Display.updateSpan();
}
