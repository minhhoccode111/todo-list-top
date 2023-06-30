//this is database.js

export const set = (variable, name) => {
  if (variable === null) {
    localStorage.removeItem(name);
  } else {
    try {
      localStorage.setItem(name, JSON.stringify(variable));
    } catch (error) {
      // Handle localStorage quota exceeded or other errors
      console.error("Error while storing data in localStorage:", error);
    }
  }
};

export const get = (name) => {
  try {
    return JSON.parse(localStorage.getItem(name));
  } catch (error) {
    // Handle invalid JSON or other errors
    console.error("Error while retrieving data from localStorage:", error);
    return null;
  }
};

export const check = (name) => {
  return localStorage.getItem(name) !== null;
};
