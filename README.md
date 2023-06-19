# todoListTOP

# The Odin Project: Todo List

# Check Mate (Check the list, Mate.)

## What I've learned.

- Using Webpack
- ES6 Modules
- add .gitignore to ignore node_modules/ folder
-

## Requirements from The Odin Project:

- "Todos" are going to be objects that we'll want to dynamically create, which means either using factories or constructors/classes to generate them.
- "Todos" should have properties: "title", "description", "dueDate" and "priority"
- We might also want to include: "notes" or even a "checkList"
- Our todo list should have "projects" or separate lists of "Todos".
- When a user first opens the app, there should be some sort of "default" project to which all of their "Todos" are put.
- Users should be able to create new projects and choose which project their "Todos" go into.
- We should separate our application logic (i.e. create new "Todos", setting "Todos" as complete, changing "Todos" priority etc.) from the DOM-related stuff, so keep all of those things in separate modules.
- The UI should be able to do the following:
  - View all "Projects"
  - View all "Todos" in each "Project" (probably just the "title" and "dueDate"...perhaps changing color for different "Priorities")
  - Expand a single "Todo" to see/edit its details
  - Delete a "Todo"
- Inspiration:
  - [bscottnz on The Odin Project's Solutions](https://bscottnz.github.io/todo/)
  - [Todoist](https://en.todoist.com/)
  - [Things](https://culturedcode.com/things/)
  - [any.do](https://www.any.do/)
- Webpack's external libraries
  - [data-fns](https://github.com/date-fns/date-fns): formatting and manipulating dates and times.
  - devServer
  - css-loader
  - style-loader
  - file-loader
- Web Storage API
  - localStorage
    - get (use when page loaded)
    - set (use when add "Todo")
    - **make sure our app doesn't crash if the data we may want to retrieve from localStorage isn't there**
    - localStorage use [JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON) to send and store data
    - **WE CANNOT STORE FUNCTIONS IN JSON**, so we'll have to figure out **how to add methods back to our object properties once we fetch them**

## Check Mate Documentation:
