//this is database.js

export const set = (variable, name) => {
  if (variable === null) {
    localStorage.removeItem(name);
  } else {
    localStorage.setItem(name, JSON.stringify(variable));
  }
};

export const get = (name) => JSON.parse(localStorage.getItem(name));

export const check = (name) => localStorage.getItem(name) !== null;
