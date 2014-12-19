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
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight,
    vPos,
    titles,
    vPosAll;

var titleHeight = 28;

function rePosition() {
  var newVPos = window.scrollY + y - titleHeight;
  if (vPos === newVPos) { return; }
  vPos = newVPos;  
  titles.forEach(function(el, index) {
    if (vPosAll[index] > vPos - offset(index) - 20) {
      el.classList.add("fixed");
      el.style.bottom = offset(index) + "px";
    } else {
      el.classList.remove("fixed");
      el.style.bottom = "inherit";
    }
  });
}

function offset(index) { return (titles.length - index - 1) * titleHeight; }

var css = document.createElement("style");
css.type = "text/css";
css.innerHTML = ".fc-container__header__title.fixed a:after {display: none;} .fc-container__header__title.fixed {position: fixed; z-index: 99; margin-left: -20px; padding-left: 20px; width: 230px; color: #5b5b5b; background: #ffffff; cursor: pointer; padding-bottom: 20px;}";
document.body.appendChild(css);

if (x >= 1300) {
  titles = Array.prototype.slice.call(document.querySelectorAll('section:not(.fc-container--thrasher)')).slice(1).map(function(section) {
    return section.querySelector('.fc-container__header__title');
  }).filter(function(title) { return title; });

  vPosAll = titles.map(function(el) { return el.getBoundingClientRect().top; });

  titles.forEach(function(el, index) {
    el.addEventListener("click", function(e) {
      if (el.classList.contains("fixed")) {
        window.scrollTo(0, vPosAll[index] - 15);
        e.preventDefault();
      }
    });
  });

  setInterval(rePosition, 10);
  rePosition();
}
```
