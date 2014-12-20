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
    vPosCache,
    vPosAll = [],

    sections,
    sectionOne,
    sectionOnePos,
    titles,

    heights = [],
    offsets = [],
    lastIndex = -1;

function getPosition(el) {
    return vPosNow + el.getBoundingClientRect().top;
}

function getPositions() {
    if (vPosAll[lastIndex] !== getPosition(sections[lastIndex])) {
      winHeight = w.innerHeight|| e.clientHeight|| g.clientHeight;
      vPosAll = sections.map(getPosition);
      sectionOnePos = getPosition(sectionOne);
      setPositions(true);
    }
}

function setPositions(forced) {
  var offScreen;

  vPosNow = Math.max(0, w.scrollY);

  if (vPosCache !== vPosNow || forced) {
    vPosCache = vPosNow;

    offScreen = Math.min(0, winHeight + vPosNow - sectionOnePos - offsets[0] - heights[0] - 100);

    titles.forEach(function(el, i) {
      if (vPosAll[i] >  winHeight + vPosNow - offsets[i] - heights[i] + 5) {
        el.classList.add("fixed");
        el.style.bottom = (offsets[i + 1] || 0) + offScreen + "px";
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
  sections = Array.prototype.slice.call(document.querySelectorAll('section:not(.fc-container--thrasher)')).filter(function(section) {return section.querySelector('.fc-container__header__title');})

  sectionOne = sections.splice(0,1)[0];

  titles = sections.map(function(section) {return section.querySelector('.fc-container__header__title');});

  lastIndex = titles.length - 1;

  for(var i = lastIndex; i >= 0; i -= 1) {
    heights[i] = titles[i].offsetHeight;
    offsets[i] = heights[i] + (offsets[i + 1] || 0);
  }

  addCss();
  getPositions();

  setInterval(getPositions, 51);
  setInterval(setPositions, 11);

  titles.forEach(function(el, index) {
    el.addEventListener("click", function(e) {
      if (el.classList.contains("fixed")) {
        w.scrollTo(0, vPosAll[index]);
        e.preventDefault();
      }
    });
  });
}
```
