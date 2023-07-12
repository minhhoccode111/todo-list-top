////////// set a variable to database with a specific name \\\\\\\\\\
export const set = (variable, name) => {
  if (variable === null) {
    localStorage.removeItem(name);
  } else {
    try {
      localStorage.setItem(name, JSON.stringify(variable));
    } catch (error) {
      // Handle localStorage quota exceeded or other errors
      console.error('Error while storing data in localStorage:', error);
    }
  }
};

////////// get name's data from database \\\\\\\\\\
export const get = (name) => {
  try {
    return JSON.parse(localStorage.getItem(name));
  } catch (error) {
    // Handle invalid JSON or other errors
    console.error('Error while retrieving data from localStorage:', error);
    return null;
  }
};

////////// to check a name existed before using get() \\\\\\\\\\
export const check = (name) => {
  return localStorage.getItem(name) !== null;
};
