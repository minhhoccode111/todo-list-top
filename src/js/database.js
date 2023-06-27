export const set = (variable, name) => {
  localStorage.setItem(name, JSON.stringify(variable));
};

export const get = (name) => JSON.parse(localStorage.getItem(name));

export const check = (name) => localStorage.getItem(name) !== null;
