//this is listener.js

import * as Form from "./form";
import * as Current from "./current.js";
import * as Create from "./create.js";
import * as Display from "./display.js";
import * as Id from "./id.js";
import * as Data from "./data.js";
import * as Diary from "./diary.js";

export const main = document.getElementById("main");
const nav = document.getElementById("aside__nav");

const refreshAsideBtns = () => {
  nav.innerHTML = Display.asideBtns(Data.get());
  const asideBtns = document.querySelectorAll("#aside .nav__button");
  asideBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      Current.set(e.target.textContent);
      // main.innerHTML = Display.projectItems(Current.get());
      if (Current.get() === "diary") {
        buttonPlus.classList.add("hidden");
      } else {
        buttonPlus.classList.remove("hidden");
      }
    });
  });
};

export const refresh = () => {
  refreshAsideBtns();
};

//Show forms base on Current
const buttonPlus = document.getElementById("button__plus");
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
  Form.listen("todo");
  Form.listen("note");
  Form.listen("project");
  //load data
  Id.load();
  Data.load();
  Diary.load();
  refresh();
  main.innerHTML = Display.projectItems(Current.get());
});
