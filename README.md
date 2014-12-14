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

Previous:
```
var navId = "gu-history-test-display", popular;
if (document.getElementById(navId)) { return; }

popular = window.localStorage.getItem('gu.history.popular');
popular = popular && JSON.parse(popular);
popular = popular && popular.value;
if (!popular) { return; };

var nav = document.createElement("div");
nav.id = navId;
nav.innerHTML = '<center>' + (popular).map(function(p) {
      return '<a href="' + p[0] + '">' + p[1] + '</a>'
  }).join('&nbsp;&nbsp;&nbsp;') + '</center>';
document.body.insertBefore(nav, document.body.firstChild);

```
