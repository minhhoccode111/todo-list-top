# The Odin Project: Todo List

# Check Mate (Check the todo list, mate.)

## What I've learned.

- Using Webpack
- ES6 Modules
- add .gitignore to ignore node_modules/ folder
- textarea element expand height along with text wrap or line break
- `div[contenteditable="true"][spellcheck="false"]` will create a div can be written on like a textarea element
- grid-template-columns: repeat(auto-fit,minmax(25rem,1fr))
- flex-basis, flex-shrink, flex-grow
- details,summary,em,... elements.
- If you are not using form submit button and listen for that form's submit event, then the "required" attribute of inputs inside that form is not going to work correctly.
- DOM event occur when we change a `<div contenteditable="true"></div>` is "input" event (no matter you type, paste, delete or perform other editing actions)
- DOM event occur when we open or close a `<details>` element is the "toggle" event
- we can set a `<dialog></dialog>` open by default in HTML without using javaScript with open attribute `<dialog open></dialog>`
- to show or hide a `<dialog></dialog>` element we can use the DOM API methods `show()` and `close()` with that element
- but the `show()` method set the `<dialog></dialog>` element style to `display: block;` we can change this default behavior with the css selector: `dialog[open] {display: flex;}` (or any display style you want)
- we can use `input.disabled = true;` to disable any input with javaScript
- when we want to listen to `<input type='radio'/>` 'change' event, we have to select all inputs element with the same name `document.querySelectorAll('input[name="radioInputGroupName"]').forEach(input=>{input.addEventListener('change',()=>{//do something with its value maybe})})`
- when we compare dates with FNS library, if we pass is that function an empty string then it gonna throw an error NOT A FALSE. So we must double check the date we pass in first `const isTimeExpired = dueDate!=='' && isBefore(dueDate, createdDate);`
- 'blur' event occur when a button, a link, an input, or a div contenteditable='true'...etc stop being `focus`
- By combining the `blur` event with a suitable delay or timeout of `input` event, we can determine when the user has stopped typing and trigger the creation of an object (of update it).
- About `parseISO()` method in date-fns library, if we pass is a string date argument e.g. "2023-6-25" then it work just fine. `fns.parseISO("2023-6-25")` but if we want to pass a `new Date()` javaScript object to it, then we have to format it first so that it can work correctly `fns.parseISO(fns.format(new Date()))`
- Inside a prototype object of an object, `this` is point to that object when object use that method, but if that method create and return html elements and we want to bind events listener to elements in that html while creating them inside prototype's method at the same time, then normally `this` inside `addEventListener` is point to the element we are listening but if we want `this` to point to the object which is using the prototype's method then we have 2 approach:
  1. Using arrow function: because arrow function inherit the `this` value from their surrounding scope `element.addEventListener('click',()=>{console.log(this)});//'this' refers to the object using prototype method`
  2. Using closure: create a variable that references the object and use it inside the event listener call back
  ```
  let self = this;
  element.addEventListener('click',function(){
    console.log(self);//'self' refers to object using that prototype method;
  })
  ```
- `format()` take a Date object and a format we want then return a time stamp or a string date format
- `parseISO()` take date string and return a Date object
- `isBefore()` take both 2 arguments Date objects

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

## Live Demos

- [All projects's live demos](https://minhhoccode111.github.io/allProjectssLiveDemo)

- [Check mate demo](https://minhhoccode111.github.io/todoListTOP/)
