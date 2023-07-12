//this is index.js

//import icon
import './../img/greenCheck.ico';

// import css
import './../css/responsive.css';
import './../css/animation.css';
import './../css/hamburger.css';
import './../css/dialogs.css';
import './../css/styles.css';
import './../css/header.css';
import './../css/footer.css';
import './../css/aside.css';
import './../css/reset.css';
import './../css/main.css';
import 'animate.css';

//import javaScript
import './projectElement.js';
import './diaryElement.js';
import './todoElement.js';
import './noteElement.js';
import './prototype.js';
import './animation.js';
import './hamburger.js';
import './listener.js';
import './database.js';
import './current.js';
import './display.js';
import './dialogs.js';
import './create.js';
import './diary.js';
import './data.js';
import './edit.js';
import './info.js';
import './fns.js';
import './id.js';

//import module
import * as database from './database.js';

function resetApp() {
  database.set(null, 'diary');
  database.set(null, 'id');
  database.set(null, 'data');
  database.set(null, 'current');
  database.set(null, 'dairy'); //typos
  database.set(null, 'date'); //typos
}
resetApp();
