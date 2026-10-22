/* Exercise library page */
/* Exercises */
var FP = 0, FF = 'All';
function renderEx() {
  var pl = [{ label: 'All stages', val: 0 }].concat(PHASES.map(function (p, i) { return { label: 'Stage ' + (i + 1), val: i + 1 }; }));
  chipRow($('fPhase'), pl, function () { return FP; }, function (v) { FP = v; }, renderEx);
  var fl = ['All', 'Hamstring', 'Quad', 'Motion', 'Control'].map(function (x) { return { label: x, val: x }; });
  chipRow($('fFocus'), fl, function () { return FF; }, function (v) { FF = v; }, renderEx);
  var g = $('exGrid'); g.textContent = '';
  var list = EXS.filter(function (e) { return (FP === 0 || e.p.indexOf(FP) > -1) && (FF === 'All' || e.f === FF); });
  if (!list.length) g.appendChild(el('p', 'hint', 'No exercises match. Try another stage or focus.'));
  list.forEach(function (e) {
    var c = el('div', 'ex'); c.appendChild(el('h3', null, e.n));
    var m = el('div', 'meta'); m.appendChild(el('span', null, 'Stage ' + e.p.join(', '))); m.appendChild(el('span', null, e.f)); c.appendChild(m);
    c.appendChild(el('div', 'dose', e.d)); c.appendChild(el('p', null, e.t));
    c.appendChild(el('p', 'stop', 'Stop if sharp pain, giving way, or swelling afterwards.'));
    g.appendChild(c);
  });
}

renderEx();
