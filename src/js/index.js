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
// import "./full.js";
// import "./form.js";
import "./create.js";
// import "./current.js";

//import module
import * as database from "./database.js";

export function resetApp() {
  database.set(null, "dairy");
  database.set(null, "id");
  database.set(null, "data");
}
