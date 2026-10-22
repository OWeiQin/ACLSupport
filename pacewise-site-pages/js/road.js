/* Recovery road page */
function gateCount(i) { var g = S.gates[i] || []; return PHASES[i].gates.filter(function (_, j) { return g[j]; }).length; }
function renderRoad() {
  var sel = $('startPhase');
  if (!sel.options.length) {
    PHASES.forEach(function (p, i) { var o = el('option', null, 'Stage ' + (i + 1) + ': ' + p.name); o.value = i; sel.appendChild(o); });
    sel.addEventListener('change', function () { S.phase = +sel.value; save(); renderRoad(); });
  }
  sel.value = S.phase;
  var ol = $('road'); ol.textContent = '';
  PHASES.forEach(function (p, i) {
    var st = i < S.phase ? 'done' : (i === S.phase ? 'now' : 'later');
    var li = el('li', 'stage ' + st);
    li.appendChild(el('div', 'dot', i < S.phase ? '✓' : String(i + 1)));
    var card = el('div', 'card');
    card.appendChild(el('h3', null, p.name));
    card.appendChild(el('div', 'span', p.span));
    card.appendChild(el('p', 'goal', p.goal));
    var ul = el('ul', 'gates' + (i === S.phase ? '' : ' locked'));
    p.gates.forEach(function (g, j) {
      var li2 = el('li'); var lb = el('label'); var cb = el('input'); cb.type = 'checkbox';
      cb.id = 'g' + i + '_' + j;
      var done = i < S.phase || (S.gates[i] && S.gates[i][j]);
      cb.checked = !!done; cb.disabled = i !== S.phase;
      cb.addEventListener('change', function () { S.gates[i] = S.gates[i] || []; S.gates[i][j] = cb.checked; save(); renderRoad(); });
      lb.appendChild(cb); lb.appendChild(el('span', null, g)); li2.appendChild(lb); ul.appendChild(li2);
    });
    card.appendChild(ul);
    if (i === S.phase) {
      var n = gateCount(i), tot = p.gates.length;
      var adv = el('div', 'advance');
      var m = el('div', 'meter'); m.innerHTML = 'Checks met: <b>' + n + ' of ' + tot + '</b>'; adv.appendChild(m);
      var lab = el('label'); var c2 = el('input'); c2.type = 'checkbox'; c2.id = 'clr' + i; c2.checked = !!S.cleared[i];
      c2.addEventListener('change', function () { S.cleared[i] = c2.checked; save(); renderRoad(); });
      lab.appendChild(c2); lab.appendChild(el('span', null, 'My physio or surgeon has agreed I can move on'));
      adv.appendChild(lab);
      var b = el('button', 'btn', i === PHASES.length - 1 ? 'Final stage' : 'Move to stage ' + (i + 2)); b.type = 'button';
      b.disabled = !(n === tot && S.cleared[i] && i < PHASES.length - 1);
      b.addEventListener('click', function () { S.phase = i + 1; save(); renderRoad(); });
      adv.appendChild(b);
      if (b.disabled && i < PHASES.length - 1) adv.appendChild(el('p', 'hint', 'This unlocks when every check is ticked and your physio has agreed.'));
      card.appendChild(adv);
    }
    li.appendChild(card); ol.appendChild(li);
  });
  $('roadMeter').textContent = 'Now: stage ' + (S.phase + 1) + ' of ' + PHASES.length;
}

load();
renderRoad();
