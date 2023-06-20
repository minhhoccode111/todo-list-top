export default class Todo {
  constructor(title, description, dueDate, priority, notes, checkList) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.checkList = checkList;
  }

  info() {
    return this.title + this.description + this.notes;
  }
}
