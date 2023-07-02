//this is index.js

//import icon
import "./../img/greenCheck.ico";

// import css
import "./../css/responsive.css";
import "./../css/animation.css";
import "./../css/dialogs.css";
import "./../css/styles.css";
import "./../css/header.css";
import "./../css/footer.css";
import "./../css/aside.css";
import "./../css/reset.css";
import "./../css/main.css";
import "animate.css";

//import javaScript
import "./fns.js";
import "./database.js";
import "./prototype.js";
import "./create.js";
import "./current.js";
import "./id.js";
import "./data.js";
import "./diary.js";
import "./display.js";
import "./dialogs.js";
import "./listener.js";
import "./edit.js";
import "./info.js";
import "./todoElement.js";
import "./noteElement.js";
import "./projectElement.js";
import "./diaryElement.js";

//import module
import * as database from "./database.js";

export function resetApp() {
  database.set(null, "diary");
  database.set(null, "id");
  database.set(null, "data");
  database.set(null, "current");
  database.set(null, "dairy"); //typos
  database.set(null, "date"); //typos
}
// resetApp();
