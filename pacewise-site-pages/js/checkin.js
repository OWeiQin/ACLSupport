/* Daily check-in page */
function bindRange(id, oid) { var r = $(id), o = $(oid); r.addEventListener('input', function () { o.textContent = r.value; }); }
bindRange('pain', 'painO'); bindRange('urge', 'urgeO');
$('runCheck').addEventListener('click', function () {
  var pain = +$('pain').value, sw = +$('swell').value, urge = +$('urge').value, v = $('verdict');
  var s, tag, h, items;
  if (sw === 2 || pain >= 7) {
    s = 'red'; tag = 'Stop for today'; h = 'Rest the knee and watch it';
    items = ['Skip training. Gentle walking only if it does not hurt.', 'Raise and ice the leg as your team has advised.', 'If swelling or pain keeps rising, or you have calf pain, fever or the knee gives way, contact your doctor or physio today.', 'A flare-up is a reason to slow down, not a reason to catch up tomorrow.'];
  } else if (pain >= 4 || sw === 1) {
    s = 'amber'; tag = 'Hold steady'; h = 'Do the light version only';
    items = ['Stick to mobility and easy activation work. No added load.', 'Do not repeat a session that caused this swelling or pain.', 'Check the knee again tomorrow morning before deciding.'];
  } else {
    s = 'green'; tag = 'Go as planned'; h = 'Do today’s plan, nothing extra';
    items = ['Your knee looks calm. Do exactly the session your physio set.', 'Stop at the limit you wrote down, even if you feel great.', 'Check for swelling tomorrow morning. A calm knee tomorrow is what earns progress.'];
  }
  if (urge >= 7) items.push('Your urge to push is high. Write your session limit down first, wait 90 seconds, then start. Open the Mind section if you need a reset.');
  v.setAttribute('data-s', s); v.textContent = '';
  v.appendChild(el('span', 'tag', tag)); v.appendChild(el('h3', null, h));
  var ul = el('ul'); items.forEach(function (t) { ul.appendChild(el('li', null, t)); }); v.appendChild(ul);
});

