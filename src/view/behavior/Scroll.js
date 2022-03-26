//FIXME:endless Scroll
// const setUpEndlessScroll = () => {
let filmGrid = document.querySelector(".film-library-container");
let tileInGrid = document.querySelector(".tileInGrid");
let clones = [];
let disableScroll = 0;
let scrollHeight = 0;
let scrollpos = 0;
let clonesHeight = 0;

function getScrollPos() {
  return filmGrid.scrollTop;
}
function setScrolPos(pos) {
  filmGrid.scrolTopPos = pos;
}
function getClonesHeight() {
  clonesHeight = 0;

  clones.forEach((clone) => {
    clonesHeight += clones.offSetHeight;
  });
  return clonesHeight;
}
function reCalc() {
  scrollpos = getScrollPos();
  scrollHeight = filmGrid.scrollHeight;
  clonesHeight = getClonesHeight();

  if (scrollpos <= 0) {
    setScrolPos(1);
  }
}
function scrollUpDate() {
  if (!disableScroll) {
    scrollpos = getScrollPos();
    if (clonesHeight + scrollpos >= scrollHeight) {
      setScrolPos(1);
      disableScroll = true;
    } else if (scrollpos <= 0) {
      setScrolPos(scrollHeight - clonesHeight);
      disableScroll = true;
    }
  }
  if (disableScroll) {
    window.setTimeout(() => {
      disableScroll = false;
    }, 40);
  }
}
function onLoad() {
  tileInGrid.forEach((tileInGrid) => {
    const clone = tileInGrid.cloneNode(true);
    filmGrid.appendChild(clone);
    clone.classList.add("js-clone");
  });
  clones = filmGrid.querySelectorAll("js-clone");
  reCalc();

  filmGrid.addEventListener(
    "scroll",
    () => {
      window.requestAnimationFrame(scrollUpDate);
    },
    false
  );
  window.addEventListener(
    "resize",
    () => {
      window.requestAnimationFrame(reCalc);
    },
    false
  );
}
// };
// window.onload = onLoad();
//FIXME:endless Scroll
