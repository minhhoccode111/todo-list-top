//this is listener.js

import * as Dialogs from "./dialogs";
import * as Current from "./current.js";
import * as Create from "./create.js";
import * as Display from "./display.js";
import * as Id from "./id.js";
import * as Data from "./data.js";
import * as Diary from "./diary.js";

export const refresh = () => {
  Display.asideBtns(Data.get());
};

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
  //load data
  // Id.load();
  // Data.load();
  // Diary.load();
  Display.asideBtns(Data.get());
  Display.projectItems(Current.get());
});
