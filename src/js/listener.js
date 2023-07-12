//this is listener.js

import Data from './data.js';
import Current from './current.js';
import * as Dialogs from './dialogs';
import * as Display from './display.js';
import * as Id from './id.js';
import * as Diary from './diary.js';

//show about section
const ofAbout = document.getElementById('of__about');
const aboutClose = document.getElementById('about__close');
const aboutOpen = document.getElementById('header__about');
aboutOpen.addEventListener('click', (e) => {
  ofAbout.show();
});
aboutClose.addEventListener('click', (e) => {
  ofAbout.close();
});

//Show forms base on Current
export const buttonPlus = document.getElementById('button__plus');
const ofTodo = document.getElementById('of__todo');
const ofNote = document.getElementById('of__note');
const ofProject = document.getElementById('of__project');

buttonPlus.addEventListener('click', () => {
  const currentType = Current.get('type');
  const currentOfClass = Current.get('ofClass');

  if (currentOfClass === 'items' && currentType === 'todo') {
    ofTodo.show();
    return;
  }
  if (currentOfClass === 'items' && currentType === 'note') {
    ofNote.show();
    return;
  }
  if (currentOfClass === 'projects') {
    ofProject.show();
    return;
  }
});
//DOM Loaded
window.addEventListener('DOMContentLoaded', () => {
  Dialogs.listenForCreate('todo');
  Dialogs.listenForCreate('note');
  Dialogs.listenForCreate('project');
  //load data from database
  Id.load();
  Data.load();
  Diary.load();
  Current.load();
  //hide button plus
  if (Current.get('type') === 'diary' && Current.get('project') === 'diary' && Current.get('ofClass') === 'items') {
    buttonPlus.classList.add('hidden');
  }
  //init display
  Display.allProjectsOfTypeBtns('todo');
  Display.allProjectsOfTypeBtns('note');
  Display.projectItems(Current.get('ofClass'), Current.get('type'), Current.get('project'));
  Display.updateSpan();
});
