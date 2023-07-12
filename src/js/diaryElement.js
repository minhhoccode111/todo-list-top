import Data from './data.js';

////////// save details element state (open or not) to display next session  \\\\\\\\\\
function diaryToggledDetails(o) {
  if (o.isOpened) {
    o.isOpened = false;
  } else {
    o.isOpened = true;
  }
  Data.set();
}

////////// display diary elements  \\\\\\\\\\
export default function diary(obj) {
  let { isOpened, createdDate, day, night } = obj;
  const container = document.createElement('div');
  container.classList.add('diary__item');

  const details = document.createElement('details');
  details.classList.add('diary__item__details');
  details.open = isOpened;
  details.addEventListener('toggle', (e) => {
    diaryToggledDetails(obj);
  });
  container.appendChild(details);

  const summary = document.createElement('summary');
  summary.classList.add('diary__item__details__summary');
  details.appendChild(summary);

  const date = document.createElement('em');
  date.classList.add('diary__item__date');
  date.textContent = createdDate;
  summary.appendChild(date);

  const dayParagraph = document.createElement('p');
  dayParagraph.classList.add('diary__item__day');
  dayParagraph.textContent = day;
  details.appendChild(dayParagraph);

  const nightParagraph = document.createElement('p');
  nightParagraph.classList.add('diary__item__night');
  nightParagraph.textContent = night;
  details.appendChild(nightParagraph);

  return container;
}
