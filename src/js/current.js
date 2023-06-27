let current = "all";

export const get = () => current;

const set = (v) => (current = v);

const asideBtns = document.querySelectorAll("#aside .nav__button");

asideBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    set(e.target.textContent);
    console.log(get());
  });
});

export const refresh = () => {
  asideBtns = document.querySelectorAll("#aside .nav__button");
};
