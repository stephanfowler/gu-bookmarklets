gu-history-bookmarklet
======================

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
