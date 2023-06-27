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
import "./form.js";
import "./listener.js";

//import module
import * as database from "./database.js";

export function resetApp() {
  database.set(null, "dairy");
  database.set(null, "id");
  database.set(null, "data");
}
import * as data from "./data.js";
// console.log(data.projects.all()); //test