/* Community page */
var CF = 0;
function renderPosts() {
  var all = S.posts.concat(POSTS);
  var labels = [{ label: 'All stages', val: 0 }].concat(PHASES.map(function (p, i) { return { label: 'Stage ' + (i + 1), val: i + 1 }; }));
  chipRow($('cFilter'), labels, function () { return CF; }, function (v) { CF = v; }, renderPosts);
  var host = $('posts'); host.textContent = '';
  var list = all.filter(function (p) { return CF === 0 || p.st === CF; });
  if (!list.length) host.appendChild(el('p', 'hint', 'Nothing here yet for this stage. Be the first to share.'));
  list.forEach(function (p) {
    var a = el('article', 'post'); var h = el('header');
    h.appendChild(el('span', 'who', p.who)); h.appendChild(el('span', 'tg', 'Stage ' + p.st));
    if (p.ex) h.appendChild(el('span', 'ex-flag', 'EXAMPLE'));
    a.appendChild(h); a.appendChild(el('p', null, p.t));
    var acts = el('div', 'acts'); var b = el('button', null, 'This helped (' + (p.likes || 0) + ')'); b.type = 'button';
    b.addEventListener('click', function () { p.likes = (p.likes || 0) + 1; b.textContent = 'This helped (' + p.likes + ')'; if (!p.ex) save(); });
    acts.appendChild(b); a.appendChild(acts); host.appendChild(a);
  });
}
$('postForm').addEventListener('submit', function (e) {
  e.preventDefault();
  var t = $('pText').value.trim(); if (!t) return;
  S.posts.unshift({ who: $('pName').value.trim() || 'Anonymous', st: +$('pStage').value, t: t });
  save(); $('pText').value = ''; $('pMsg').textContent = 'Posted. It is saved in this browser only.'; renderPosts();
});

load();
PHASES.forEach(function (p, i) { var o = el('option', null, 'Stage ' + (i + 1) + ': ' + p.name); o.value = i + 1; $('pStage').appendChild(o); });
renderPosts();
