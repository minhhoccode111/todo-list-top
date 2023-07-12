/////////////// elements to display an object's info \\\\\\\\\\\\\\\
export const wrapper = document.querySelector('.popup__info__wrapper');
const messageH2 = wrapper.querySelector('.popup__info__message');
const idP = wrapper.querySelector('.info__id');
const titleP = wrapper.querySelector('.info__title');
const detailP = wrapper.querySelector('.info__detail');
const isDoneP = wrapper.querySelector('.info__isDone');
const projectP = wrapper.querySelector('.info__project');
const dueDateP = wrapper.querySelector('.info__dueDate');
const priorityP = wrapper.querySelector('.info__priority');
const createdDateP = wrapper.querySelector('.info__createdDate');
const lastModifiedP = wrapper.querySelector('.info__lastModified');
const isTimeExpiredP = wrapper.querySelector('.info__isTimeExpired');

const removeButton = wrapper.querySelector('.popup__info__remove');

removeButton.addEventListener('click', () => {
  wrapper.classList.add('hidden');
});

/////////////// display all infos in an object \\\\\\\\\\\\\\\
export function displayInfo(o) {
  let { id, ofClass, type, title, detail, isDone, project, dueDate, priority, createdDate, lastModified, isTimeExpired } = o;

  ////////// header base on object's type \\\\\\\\\\
  if (type === 'todo' && ofClass === 'items') messageH2.textContent = 'Information of Todo item';
  if (type === 'note' && ofClass === 'items') messageH2.textContent = 'Information of Note item';
  if (type === 'todo' && ofClass === 'projects') messageH2.textContent = 'Information of Todo project';
  if (type === 'note' && ofClass === 'projects') messageH2.textContent = 'Information of Note project';

  ////////// the rest base on object's values \\\\\\\\\\
  idP.textContent = id;
  titleP.textContent = title;
  isDoneP.textContent = isDone ?? '';
  detailP.textContent = detail;
  projectP.textContent = project;
  dueDateP.textContent = dueDate;
  priorityP.textContent = priority ?? '';
  createdDateP.textContent = createdDate;
  lastModifiedP.textContent = lastModified;
  isTimeExpiredP.textContent = isTimeExpired;

  ////////// remove hidden to display \\\\\\\\\\
  wrapper.classList.remove('hidden');
}
