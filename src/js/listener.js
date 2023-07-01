//this is listener.js

import * as Dialogs from "./dialogs";
import * as Current from "./current.js";
import * as Display from "./display.js";
import * as Data from "./data.js";
import * as Id from "./id.js";
import * as Diary from "./diary.js";

//show about section
const ofAbout = document.getElementById("of__about");
const aboutClose = document.getElementById("about__close");
const aboutOpen = document.getElementById("header__about");
aboutOpen.addEventListener("click", (e) => {
  ofAbout.show();
});
aboutClose.addEventListener("click", (e) => {
  ofAbout.close();
});

//Show forms base on Current
export const buttonPlus = document.getElementById("button__plus");
const ofTodo = document.getElementById("of__todo");
const ofNote = document.getElementById("of__note");
const ofProject = document.getElementById("of__project");

buttonPlus.addEventListener("click", () => {
  const name = Current.get();
  if (name === "note") {
    ofNote.show();
  } else if (name === "project") {
    ofProject.show();
  } else {
    ofTodo.show();
  }
});
//DOM Loaded
window.addEventListener("DOMContentLoaded", () => {
  Dialogs.listenForCreate("todo");
  Dialogs.listenForCreate("note");
  Dialogs.listenForCreate("project");
  //data init of the app when user open the first time
  Data.init();
  //load data from database
  Id.load();
  Data.load();
  Diary.load();
  Current.load();
  //hide button plus
  if (Current.get() === "diary") {
    buttonPlus.classList.add("hidden");
  }
  //init display
  Display.customProjectBtns(Data.projects.get("project"));
  Display.projectItems(Current.get());
  Display.updateSpan();
});
