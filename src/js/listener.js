//this is listener.js

import * as Form from "./form";
import * as Current from "./current.js";
import * as Create from "./create.js";
import * as Display from "./display.js";
import * as Id from "./id.js";
import * as Data from "./data.js";
import * as Diary from "./diary.js";

const buttonPlus = document.getElementById("button__plus");

export const main = document.getElementById("main");

const ofTodo = document.getElementById("of__todo");
const ofNote = document.getElementById("of__note");
const ofProject = document.getElementById("of__project");

let asideBtns = document.querySelectorAll("#aside .nav__button");

asideBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    Current.set(e.target.textContent);
    main.innerHTML = Display.items(Current.get());
    if (Current.get() === "diary") {
      buttonPlus.classList.add("hidden");
    } else {
      buttonPlus.classList.remove("hidden");
    }
  });
});

export const refresh = () => {
  asideBtns = document.querySelectorAll("#aside .nav__button");
};

buttonPlus.addEventListener("click", () => {
  const project = Current.get();
  //we must hide this buttonPlus if Current.get() is 'diary'
  if (project === "note") {
    // Note form
    ofNote.show();
  } else if (project === "project") {
    // Project form
    ofProject.show();
  } else {
    // Todo form
    ofTodo.show();
  }
});

window.addEventListener("DOMContentLoaded", () => {
  Form.listen("todo");
  Form.listen("note");
  Form.listen("project");
  //load data
  Id.load();
  Data.load();
  Diary.load();
  main.innerHTML = Display.items(Current.get());
});
