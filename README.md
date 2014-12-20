History data bookmarklet
========================
```
var tags = JSON.parse(localStorage.getItem('gu.history.summary')), str = '';

if (!tags || !tags.value || !tags.value.tags) { return; }

tags = tags.value.tags;

for (var t in tags) {
  str += '"' + tags[t][0] + '",' + asCsv(tags[t][1]) + '\n';
}

document.write('<pre>' + str + '</pre>');

function asCsv(freqs) {
  var arr = [];
  freqs.forEach(function(f) { arr[f[0]] = f[1]; });
  return arr.join(',');
}
```

Sticky bottom nav
===============

```
var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    winWidth = w.innerWidth || e.clientWidth || g.clientWidth,
    winHeight = w.innerHeight|| e.clientHeight|| g.clientHeight,

    vPosNow = w.scrollY,
    vPosCache = 0,
    vPosAll = [],

    sections,
    titles,

    heights = [],
    offsets = [],
    lastIndex = -1;

function getPositions() {
    if (vPosAll[lastIndex] !== getPosition(sections[lastIndex])) {
      winHeight = w.innerHeight|| e.clientHeight|| g.clientHeight;
      vPosAll = sections.map(getPosition);
    }
}

function getPosition(el) {
    return vPosNow + el.getBoundingClientRect().top;
}

function setPositions() {
  vPosNow = window.scrollY;

  if (vPosCache !== vPosNow) {
    vPosCache = vPosNow;  

    titles.forEach(function(el, i) {
      if (vPosAll[i] >  winHeight + vPosNow - offsets[i] - heights[i] + 5) {
        el.classList.add("fixed");
        el.style.bottom = (offsets[i + 1] || 0) + "px";
      } else {
        el.classList.remove("fixed");
        el.style.bottom = "inherit";
      }
    });
  }
}

function addCss() {
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".fc-container__header__title.fixed a:after {display: none;} .fc-container__header__title.fixed {position: fixed; z-index: 99; margin-left: -20px; padding-left: 20px; width: 230px; color: #5b5b5b; font-weight: normal; background: #ffffff; cursor: pointer; padding-bottom: 20px; padding-top: 5px;}";
  document.body.appendChild(css);
}

if (winWidth >= 1024) {
  sections = Array.prototype.slice.call(document.querySelectorAll('section:not(.fc-container--thrasher)')).slice(1).filter(function(section) {return section.querySelector('.fc-container__header__title');})

  titles = sections.map(function(section) {return section.querySelector('.fc-container__header__title');});

  lastIndex = titles.length - 1;

  for(var i = lastIndex; i >= 0; i -= 1) {
    heights[i] = titles[i].offsetHeight;
    offsets[i] = heights[i] + (offsets[i + 1] || 0);
  }

  addCss();
  getPositions();
  setPositions();

  setInterval(getPositions, 1000);
  setInterval(setPositions, 10);

  titles.forEach(function(el, index) {
    el.addEventListener("click", function(e) {
      if (el.classList.contains("fixed")) {
        window.scrollTo(0, vPosAll[index]);
        e.preventDefault();
      }
    });
  });
}
```
