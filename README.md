gu-history-bookmarklet
======================
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
    sections,
    titles,
    vPos;

var titleHeight = 28;

function rePosition() {
  var curr = window.scrollY + y - titleHeight;
  titles.forEach(function(el, index) {
    if (vPos[index] > curr - offset(index)) {
      el.style.position = "fixed";
      el.style.bottom = offset(index) + "px";
      el.style.zIndex = 99;
      el.style.marginLeft = "-20px";
      el.style.paddingLeft = "20px";
      el.style.width = "230px";
      el.style.background = "#ffffff";
      el.classList.add("js-fixed");
    } else {
      el.style.position = "inherit";
      el.style.bottom = "inherit";      
      el.classList.remove("js-fixed");
    }
  });
}

function offset(index) { return (titles.length - index - 1) * titleHeight; }

if (x >= 1300) {
  sections = Array.prototype.slice.call(document.querySelectorAll('section:not(.fc-container--thrasher)')).slice(1);

  titles = sections.map(function(section) {
    return section.querySelector('.fc-container__header__title');
  }).filter(function(title) { return title; });

  vPos = titles.map(function(el) { return el.getBoundingClientRect().top; });

  titles.forEach(function(el, index) {
    el.addEventListener("click", function(e) {
      if (el.classList.contains("js-fixed")) {
        window.scrollTo(0, vPos[index] - 15);
        e.preventDefault();
      }
    });
  });

  setInterval(rePosition, 10);
  rePosition();
}
```
