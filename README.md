gu-history-bookmarklet
======================

Drag to bookmarks
<a class="bookmarklet" href="javascript:(function()%7Bvar%20popular%20%3D%20window.localStorage.getItem('gu.history.popular')%3Bpopular%20%3D%20popular%20%26%26%20JSON.parse(popular)%3Bpopular%20%3D%20popular%20%26%26%20popular.value%3Bif%20(popular)%20%7Bvar%20nav%20%3D%20document.createElement(%22div%22)%3Bnav.innerHTML%20%3D%20'%3Ccenter%3E'%20%2B%20(popular).map(function(p)%20%7Breturn%20'%3Ca%20href%3D%22'%20%2B%20p%5B0%5D%20%2B%20'%22%3E'%20%2B%20p%5B1%5D%20%2B%20'%3C%2Fa%3E'%7D).join('%26nbsp%3B%26nbsp%3B%26nbsp%3B')%20%2B%20'%3C%2Fcenter%3E'%3Bdocument.body.insertBefore(nav%2C%20document.body.firstChild)%3B%7D%7D)()">Show History</a>

js:
```
var popular = window.localStorage.getItem('gu.history.popular');
popular = popular && JSON.parse(popular);
popular = popular && popular.value;
if (popular) {
  var nav = document.createElement("div");
  nav.innerHTML = '<center>' + (popular).map(function(p) {
        return '<a href="' + p[0] + '">' + p[1] + '</a>'
    }).join('&nbsp;&nbsp;&nbsp;') + '</center>';
  document.body.insertBefore(nav, document.body.firstChild);
}
```
