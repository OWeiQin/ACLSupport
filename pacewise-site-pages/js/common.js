/* Shared data and helpers used by every page. Edit PHASES, EXS and POSTS here. */
var PHASES = [
  { name: 'Protect and wake up', span: 'Typically weeks 0 to 2 after surgery', goal: 'Calm swelling, get the knee fully straight, and switch the thigh muscle back on.',
    gates: ['Swelling is steady or falling, not climbing', 'Knee straightens as far as the other leg, or your physio says it is on track', 'You can tighten the thigh and lift the leg without the knee sagging', 'Your team has cleared how you walk (crutches or not)'] },
  { name: 'Restore motion', span: 'Typically weeks 2 to 6', goal: 'Full straightening, good bending, and a normal walking pattern.',
    gates: ['Full straightening of the knee', 'Bends past roughly 120 degrees', 'Walks without a limp', 'Only trace swelling after normal daily activity', 'Straight-leg raise with no lag'] },
  { name: 'Build strength', span: 'Typically weeks 6 to 12 and beyond', goal: 'Rebuild quads, hamstrings and hips, and control the knee on one leg.',
    gates: ['Stands on the injured leg for 30 seconds with control', 'Mini squats and step-downs without the knee falling inward', 'Physio has tested thigh strength and it is improving', 'No swelling flare after sessions'] },
  { name: 'Run and jump prep', span: 'Typically months 3 to 6', goal: 'Return to straight-line running, then landing, then change of direction.',
    gates: ['Physio has cleared you to start jogging after strength testing', 'Jogs in a straight line without pain or next-day swelling', 'Lands from low jumps with control', 'Sport drills do not cause next-day swelling'] },
  { name: 'Return to sport', span: 'Typically month 9 and later', goal: 'Return when tests and confidence both say the knee is ready.',
    gates: ['Hop and strength tests reach about 90 percent of the other leg', 'Hamstring and quad strength balance checked by your physio', 'You trust the knee (for example a confidence questionnaire score your physio uses)', 'Surgeon and physio sign off'] }
];
var EXS = [
  { n: 'Heel slides', p: [1,2], f: 'Motion', d: '2 x 10, slow', t: 'Lie back, slide the heel toward you to bend the knee, then straighten. Stay inside comfortable range.' },
  { n: 'Thigh squeezes (quad sets)', p: [1,2], f: 'Quad', d: '10 x 5 second holds', t: 'Press the back of the knee down into the bed and tighten the thigh. Watch the kneecap glide up.' },
  { n: 'Straight-leg raise', p: [1,2], f: 'Quad', d: '2 x 10', t: 'Tighten the thigh first, then lift the straight leg. Stop if the knee bends or sags.' },
  { n: 'Glute bridge, both legs', p: [2,3], f: 'Hamstring', d: '3 x 10', t: 'Press through the heels and lift the hips. Early hamstring-friendly work. Confirm with your physio if you had a hamstring graft.' },
  { n: 'Mini squats to a chair', p: [2,3], f: 'Control', d: '3 x 8 to 10', t: 'Keep the knee over the second toe. Stay in a shallow range at first.' },
  { n: 'Single-leg balance', p: [3], f: 'Control', d: '3 x 30 seconds', t: 'Soft knee, level hips. Progress to a foam pad only when steady.' },
  { n: 'Hamstring curl on a slider or ball', p: [3,4], f: 'Hamstring', d: '3 x 8, slow lowering', t: 'Lift the hips, drag the heel in and out. Add only with physio approval after a hamstring graft.' },
  { n: 'Step-ups and step-downs', p: [3,4], f: 'Quad', d: '3 x 8 each leg', t: 'Control the way down. The knee should not wobble inward.' },
  { n: 'Romanian deadlift, single leg', p: [3,4], f: 'Hamstring', d: '3 x 8 each leg', t: 'Hinge from the hip with a soft knee. Start with no weight.' },
  { n: 'Jog-walk intervals', p: [4], f: 'Control', d: 'As set by physio', t: 'Only after clearance. Check swelling the next morning before progressing.' },
  { n: 'Nordic hamstring lowering', p: [4,5], f: 'Hamstring', d: '2 to 3 x 4 to 6, advanced', t: 'High-load exercise. Only when your physio says the hamstring is ready.' },
  { n: 'Hop and landing tests', p: [5], f: 'Control', d: 'Done with your physio', t: 'Measured against the other leg. This is a test, not daily training.' }
];
var POSTS = [
  { who: 'Example: Mei', st: 4, t: 'I felt fantastic at month three and nearly skipped my strength test. It showed my hamstring was still well behind. Glad I waited.', ex: true },
  { who: 'Example: Daniel', st: 2, t: 'Writing my daily limit on a sticky note before I trained stopped me adding "just one more set".', ex: true },
  { who: 'Example: Aisha', st: 3, t: 'Filming my step-downs showed the knee dropping inward. Fixing that mattered more than doing more reps.', ex: true },
  { who: 'Example: Ravi', st: 1, t: 'The first weeks are boring. Counting the checks I had ticked off helped me stay patient.', ex: true }
];
var KEY = 'pacewise-v1';
var S = { phase: 0, gates: {}, cleared: {}, posts: [], cf: 0 };
function load() { try { var r = localStorage.getItem(KEY); if (r) { var o = JSON.parse(r); for (var k in o) S[k] = o[k]; } } catch (e) {} }
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
function el(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }
function $(id) { return document.getElementById(id); }


function chipRow(host, labels, getVal, setVal, after) {
  host.textContent = '';
  labels.forEach(function (lb) {
    var b = el('button', 'chip', lb.label); b.type = 'button';
    b.setAttribute('aria-pressed', String(getVal() === lb.val));
    b.addEventListener('click', function () { setVal(lb.val); after(); });
    host.appendChild(b);
  });
}
