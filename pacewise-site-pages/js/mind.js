/* Mind page */
$('ceilBtn').addEventListener('click', function () {
  var v = $('ceil').value.trim(), o = $('ceilOut');
  o.textContent = v ? 'Locked in. Today you stop after: ' + v + '. When you reach it, you are done, and that counts as a good session.' : 'Write your limit first.';
});
var bTimer = null, bStep = 0, bRound = 0, bLeft = 4;
var STEPS = [['Breathe in', true], ['Hold', true], ['Breathe out', false], ['Hold', false]];
function bShow() {
  var s = STEPS[bStep]; $('orbT').textContent = s[0]; $('orb').classList.toggle('big', s[1]);
  $('orbC').textContent = 'Round ' + (bRound + 1) + ' of 4 · ' + bLeft + 's';
}
function bStop(msg) { clearInterval(bTimer); bTimer = null; $('orb').classList.remove('big'); $('orbT').textContent = 'Done'; $('orbC').textContent = msg; $('breathBtn').textContent = 'Start again'; }
$('breathBtn').addEventListener('click', function () {
  if (bTimer) { bStop('Stopped. Come back any time.'); return; }
  bStep = 0; bRound = 0; bLeft = 4; this.textContent = 'Stop'; bShow();
  bTimer = setInterval(function () {
    bLeft--;
    if (bLeft === 0) {
      bStep++; bLeft = 4;
      if (bStep === 4) { bStep = 0; bRound++; if (bRound === 4) { bStop('Nice. Notice if your shoulders dropped.'); return; } }
    }
    bShow();
  }, 1000);
});

