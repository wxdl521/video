// cast.js: the two birds (小暖 and 阿蓝), their moods, and the shared props and sets of 把回忆拼好给你.
// Shared by every chapter file; chapter files don't edit it. All pure functions of t.

const COL = {
  nuan: '#F0B98D', nuanDk: '#C9825A', belly: '#FFF1DC', beak: '#E8AA38', blush: '#E27A92',
  lan: '#7E9CC4', lanDk: '#506E9A', lanBelly: '#DCE6F0', lanTuft: '#3A9C98',
  scarf: '#C9454F', scarfDk: '#8E2D3A', ribbon: '#EE9AB0',
  night: '#1F2550', indigo: '#2F3C7A', dusk: '#E59A6B', gold: '#FFD27A', glass: '#CFE4EE',
  snow: '#EEF1F6', wood: '#9A6A48', woodDk: '#6E4A33', wall: '#E9D6BC', roof: '#8E4A3C', roofDk: '#5E2F2A'
};

// ---------- moods ----------
// Each mood is a face and a way of moving, locked to the beat. birdMoods(t, keys) acts the changes like emotions():
// eyes squeeze shut just before a change, the face swaps under the blink, a take fires and the body settles.
const BM = {
  calm:    { eyes: 'dot', blush: .35, take: .3, body: t => ({ dy: -.15 * Math.abs(Math.sin(bpOf(t) * Math.PI)) }) },
  happy:   { eyes: 'happy', beak: .15, blush: .7, take: .6, body: t => ({ dy: -.5 * Math.abs(Math.sin(bpOf(t) * Math.PI)), sq: .06 * pulse(t), wing: 2.5 + .15 * Math.sin(bpOf(t) * TAU) }) },
  love:    { eyes: 'happy', blush: 1, emote: 'hearts', take: .7, body: t => ({ dy: -.4 * Math.abs(Math.sin(bpOf(t) * Math.PI)), rot: .05 * Math.sin(bpOf(t) * Math.PI) }) },
  chirp:   { eyes: 'happy', blush: .5, emote: 'music', take: .5, body: t => ({ beak: .25 + .45 * Math.abs(Math.sin(t * 9)), dy: -.3 * Math.abs(Math.sin(t * 4.5)), rot: -.05 }) },
  wow:     { eyes: 'wide', beak: .45, emote: '!', take: 1, fade: true, body: t => ({ sq: -.04 }) },
  look:    { eyes: 'wide', beak: .1, blush: .3, take: .5, body: t => ({ dy: -.1 * Math.abs(Math.sin(bpOf(t) * Math.PI)) }) },
  dreamy:  { eyes: 'closed', blush: .8, take: .3, body: t => ({ rot: .07 * Math.sin(bpOf(t) * Math.PI * .5), dy: -.15 * Math.abs(Math.sin(bpOf(t) * Math.PI)) }) },
  sad:     { eyes: 'sad', take: .4, body: t => ({ dy: .15, sq: .05, rot: -.04 + .02 * Math.sin(bpOf(t) * Math.PI), wing: 2.85 }) },
  cry:     { eyes: 'cry', tear: 1, take: .5, body: t => ({ sq: .06 + .04 * Math.abs(Math.sin(t * 11)), dy: .1, wing: 2.85 }) },
  shiver:  { eyes: 'sad', tint: '#9DB4D8', tintK: .55, emote: 'sweat', take: .4, body: t => ({ dx: .12 * Math.sin(t * 46), sq: .05 }) },
  proud:   { eyes: 'closed', take: .5, body: t => ({ rot: -.14, sq: -.05 }) },
  sneaky:  { eyes: 'dot', blush: .4, emote: 'sweat', take: .4, body: t => ({ sq: .1, dy: .2 }) },
  tired:   { eyes: 'sleepy', take: .3, body: t => ({ sq: .07, dy: .1, rot: .03 * Math.sin(bpOf(t) * Math.PI * .5) }) },
  hopeful: { eyes: 'dot', blush: .6, take: .5, body: t => ({ dy: -.25 * Math.abs(Math.sin(bpOf(t) * Math.PI)), rot: -.06 }) },
  smileCry:{ eyes: 'happy', tear: .8, blush: .8, take: .6, body: t => ({ dy: -.2 * Math.abs(Math.sin(bpOf(t) * Math.PI)), rot: .04 * Math.sin(bpOf(t) * Math.PI * .5) }) },
  sleep:   { eyes: 'closed', emote: 'zzz', take: .2, body: t => ({ sq: .05 * Math.sin(t * 2.2), rot: .05 }) }
};
function birdMood(name, t, over = {}) {
  const M = BM[name] || BM.calm;
  return { eyes: M.eyes, beak: M.beak || 0, blush: M.blush || 0, tear: M.tear || 0, tint: M.tint, tintK: M.tintK || 0, emote: M.emote, ...(M.body ? M.body(t) : {}), ...over };
}
function birdMoods(t, keys, o = {}) {
  let i = 0; while (i + 1 < keys.length && t >= keys[i + 1][0]) i++;
  const [tc, name, over] = keys[i], age = t - tc, cur = birdMood(name, t, over), M = BM[name] || BM.calm;
  const tn = i + 1 < keys.length ? keys[i + 1][0] : Infinity, tk = o.take ?? 1;
  let squint = 0;
  if (tn - t < .09) squint = 1 - (tn - t) / .09;
  if (i > 0 && age < .12) squint = Math.max(squint, 1 - age / .12);
  const prev = i > 0 ? birdMood(keys[i - 1][1], t, keys[i - 1][2]) : null;
  if (prev && age < .5) {
    const k = backOut(seg(age, 0, .4)), kc = ease(seg(age, 0, .3));
    for (const f of ['dy', 'sq', 'rot', 'dx', 'wing', 'lookX', 'lookY']) if (prev[f] != null || cur[f] != null) cur[f] = lerp(prev[f] ?? (f === 'wing' ? 2.5 : 0), cur[f] ?? (f === 'wing' ? 2.5 : 0), k);
    for (const f of ['blush', 'tear', 'beak']) cur[f] = lerp(prev[f] || 0, cur[f] || 0, kc);
    if (prev.tint || cur.tint) { cur.tint = cur.tint || prev.tint; cur.tintK = lerp(prev.tintK || 0, cur.tintK || 0, kc); }
  }
  const a = prev ? take(t, tc, (M.take ?? .5) * tk) : { sq: 0, dy: 0 };
  const Mn = i + 1 < keys.length ? BM[keys[i + 1][1]] || BM.calm : null, b = Mn ? take(t, tn, (Mn.take ?? .5) * tk) : { sq: 0, dy: 0 };
  cur.sq = (cur.sq || 0) + a.sq + b.sq; cur.dy = (cur.dy || 0) + a.dy + b.dy;
  cur.squint = squint;
  const same = prev && prev.emote === cur.emote;
  cur.emoteK = same ? 1 : seg(age, .06, .32) * (M.fade && !(over && over.emote) ? 1 - seg(age, 1.2, 1.6) : 1);
  cur.emoteAge = age;
  return cur;
}

// ---------- the bird ----------
// birdie(x, y, u, o): (x, y) = ground point between the feet; the bird is about 10u wide and 10u tall.
// Faces screen-right (3/4 view); flip: true faces left. view: 'q' (default) | 'front'.
// o: key (boil id), who ('nuan' | 'lan'), dx, dy (u, −dy = up), sq, rot, eyes, squint, lookX, lookY, beak 0..1,
//    blush, tear, tint + tintK, wing (near-wing angle, rad: 2.5 folded, π straight back, ≈ −2.2 raised, 0 forward),
//    wingF (far wing angle, front view / flying), fly (legs tucked), walk (leg phase), hold(u, sw) (drawn at the
//    near wing tip), chest(u, sw) (drawn on the body under the near wing), scarf 0..1 (wrapped around the neck), emote/emoteK/emoteAge, noShadow, tuft.
function birdie(x, y, u, o = {}) {
  const key = o.key || 'bird', rs = p => boilSeed(`${key} ${p}`);
  const lan = o.who === 'lan', front = o.view === 'front';
  let col = o.col || (lan ? COL.lan : COL.nuan), dk = lan ? COL.lanDk : COL.nuanDk;
  if (o.tint && o.tintK) { col = mixCol(col, o.tint, o.tintK); dk = mixCol(dk, o.tint, o.tintK * .7); }
  const belly = lan ? COL.lanBelly : COL.belly, sw = clamp(u / 15, .4, 2.4), sq = o.sq || 0;
  const dy = (o.dy || 0) * u, H0 = 1.6 * u;            // legs are 1.6u long; the body sits on them
  rs('shadow');
  if (!o.noShadow) { const f = 1 - Math.min(.6, Math.abs(o.dy || 0) * .07); paint(ellPts(x, y + .1 * u, 3.6 * u * f, .7 * u * f, 18), { wash: PAL.ink, washOp: 45, ink: null }); }
  push(); translate(x + (o.dx || 0) * u, y + dy); if (o.rot) rotate(o.rot); scale((o.flip ? -1 : 1) * (1 + sq * .6), 1 - sq);
  // legs
  rs('legs');
  if (!o.fly) for (const [lx, ph] of [[-1.1, 0], [1.1, Math.PI]]) {
    const w = o.walk != null ? Math.sin(o.walk * Math.PI + ph) : 0, lift = o.walk != null ? Math.max(0, w) * .5 * u : 0;
    const fx = lx * u + w * .7 * u;
    inkLine([[lx * u * .8, -H0 - .3 * u], [fx, -lift]], sw * 1.3, COL.woodDk, 'ink', 0);
    inkLine([[fx - .6 * u, -lift], [fx + .8 * u, -lift + .05 * u]], sw * 1.1, COL.woodDk, 'ink', 0);
  } else { inkLine([[-.6 * u, -H0 - .4 * u], [-1.6 * u, -H0 + .1 * u]], sw, COL.woodDk, 'ink', 0); inkLine([[.4 * u, -H0 - .4 * u], [-.5 * u, -H0 + .2 * u]], sw, COL.woodDk, 'ink', 0); }
  const by = -H0 - 3.5 * u;                              // body centre
  // far wing (behind the body) when flying or seen from the front
  const wingAt = (a, near, px, py) => {
    rs('wing' + (near ? 'N' : 'F'));
    const d = [Math.cos(a), Math.sin(a)], n = [-d[1], d[0]], L = 3.6 * u;
    const P = [[px, py], [px + d[0] * L * .45 + n[0] * .5 * u, py + d[1] * L * .45 + n[1] * .5 * u], [px + d[0] * L, py + d[1] * L]];
    paint(ribbon(P, 2.3 * u, .5 * u), { wash: near ? mixCol(col, dk, .35) : mixCol(dk, PAL.ink, .2), ink: PAL.ink, sw: sw * .85 });
    // two feather lines
    if (near && u > 8) for (const f of [.55, .8]) inkLine([[px + d[0] * L * f + n[0] * .55 * u, py + d[1] * L * f + n[1] * .55 * u], [px + d[0] * L * (f + .14), py + d[1] * L * (f + .14)]], sw * .6, PAL.ink, 'inkfine', 0);
    return [px + d[0] * L, py + d[1] * L, a];
  };
  if (o.fly || front) wingAt(o.wingF ?? (front ? Math.PI - .6 : -2.3), false, front ? -3 * u : -.8 * u, by - .2 * u);
  // tail
  rs('tail');
  if (!front) { const ta = (o.tail || 0) + .1 * Math.sin(T * 3); push(); translate(-3.3 * u, by + .6 * u); rotate(-.5 + ta);
    paint(ribbon([[0, 0], [-1.4 * u, -.2 * u], [-2.6 * u, -.1 * u]], 1.8 * u, 1.2 * u), { wash: dk, ink: PAL.ink, sw: sw * .85 }); pop(); }
  // body
  rs('body');
  paint(ellPts(0, by, 4.1 * u, 3.7 * u, 30, u * .04), { wash: col, ink: PAL.ink, sw });
  rs('belly');
  paint(ellPts(front ? 0 : .9 * u, by + 1.3 * u, 2.6 * u, 2.1 * u, 22, u * .03), { wash: belly, ink: null });
  // tuft: three little feathers
  rs('tuft');
  const tc = lan ? COL.lanTuft : dk, tx = front ? 0 : .6 * u, ty = by - 3.5 * u, tw = .15 * Math.sin(T * 4 + (lan ? 1 : 0)) + (o.tuft || 0);
  for (const [a, l] of [[-.5, 1.5], [-.15, 2], [.25, 1.4]]) { const aa = a + tw - Math.PI / 2; paint(ribbon([[tx, ty + .3 * u], [tx + Math.cos(aa) * l * .55 * u, ty + Math.sin(aa) * l * .55 * u], [tx + Math.cos(aa - .35) * l * u, ty + Math.sin(aa - .35) * l * u]], .55 * u, .15 * u), { wash: tc, ink: PAL.ink, sw: sw * .6 }); }
  // scarf
  if (o.scarf) {
    rs('scarf');
    const k = clamp(o.scarf), sy = by + .3 * u;
    paint(ribbon([[-3.9 * u, sy - .6 * u], [-1 * u, sy + .3 * u], [2 * u, sy + .2 * u], [lerp(-3.9, 3.9, k) * u, sy - .7 * u]].slice(0, k > .5 ? 4 : 3), 1.3 * u, 1.1 * u), { wash: COL.scarf, ink: PAL.ink, sw: sw * .8 });
    if (k > .8) { const sway = .2 * Math.sin(T * 3); paint(ribbon([[-2.6 * u, sy], [-3.3 * u + sway * u, sy + 2 * u], [-3.1 * u + sway * 2 * u, sy + 3.6 * u]], 1.1 * u, .9 * u), { wash: COL.scarf, ink: PAL.ink, sw: sw * .8 });
      for (let i = 0; i < 3; i++) inkLine([[(-3.6 + i * .35 + sway * 2) * u, sy + 3.6 * u], [(-3.6 + i * .35 + sway * 2) * u, sy + 4.2 * u]], sw * .6, COL.scarfDk, 'inkfine', 0); }
  }
  // face
  const ex = front ? [-1.3, 1.3] : [.5, 2.6], ey = by - 1.1 * u, lx = (o.lookX || 0) * .3 * u, ly = (o.lookY || 0) * .3 * u;
  rs('blush');
  if (o.blush > .05) for (const cx of front ? [-2.3, 2.3] : [1.0, 3.3]) paint(ellPts(cx * u, ey + 1.3 * u, .75 * u, .45 * u, 14), { wash: COL.blush, washOp: 150 * clamp(o.blush), ink: null });
  rs('eyes');
  let eyes = o.eyes || 'dot';
  if (o.squint > .5) eyes = 'closed';
  if (!o.noBlink && eyes !== 'closed' && eyes !== 'happy' && eyes !== 'cry' && frac(T / 3.3 + hash(key.length * 7.3)) < .035) eyes = 'closed';
  ex.forEach((e, i) => {
    const s = front ? 1 : (i ? 1 : .85), cx = e * u + lx, cy = ey + ly;
    if (eyes === 'happy') inkLine([[cx - .65 * u * s, cy + .25 * u], [cx, cy - .45 * u], [cx + .65 * u * s, cy + .25 * u]], sw * 1.4, PAL.ink, 'ink', .6);
    else if (eyes === 'closed' || eyes === 'cry') inkLine([[cx - .65 * u * s, cy - .1 * u], [cx, cy + .4 * u], [cx + .65 * u * s, cy - .1 * u]], sw * 1.3, PAL.ink, 'ink', .6);
    else {
      const r = (eyes === 'wide' ? .78 : .6) * u * s, ry = eyes === 'sleepy' ? r * .55 : r * 1.15;
      paint(ellPts(cx, cy + (eyes === 'sleepy' ? .25 * u : 0), r, ry, 14), { wash: PAL.ink, ink: null });
      paint(ellPts(cx + .2 * u, cy - .3 * u, r * .32, r * .32, 8), { wash: PAL.cream, ink: null });
      if (eyes === 'sleepy') inkLine([[cx - r * 1.2, cy - .1 * u], [cx + r * 1.2, cy - .1 * u]], sw * 1.2, PAL.ink, 'ink', 0);
      // sad brows: the inner ends (toward the other eye) lifted
      if (eyes === 'sad') inkLine(i === 0 ? [[cx - .8 * u, cy - .72 * u], [cx + .6 * u, cy - 1.18 * u]] : [[cx - .6 * u, cy - 1.18 * u], [cx + .8 * u, cy - .72 * u]], sw * 1.1, PAL.ink, 'ink', 0);
    }
  });
  // tears
  if (o.tear > .05) {
    rs('tear');
    const k = clamp(o.tear), cx = ex[front ? 1 : 1] * u + .2 * u;
    for (let j = 0; j < 2; j++) { const ph = frac(T * 1.4 + j * .5), ty2 = ey + .6 * u + ph * 2.6 * u, r = .45 * u * k * (1 - ph * .4);
      paint([[cx + j * .3 * u, ty2 - r * 1.6], [cx + j * .3 * u + r, ty2 + r * .3], [cx + j * .3 * u, ty2 + r], [cx + j * .3 * u - r, ty2 + r * .3]], { wash: '#A9CBEA', washOp: 230, ink: PAL.ink, sw: sw * .5, curv: .7 }); }
  }
  // beak
  rs('beak');
  { const bo = clamp(o.beak || 0), bx = front ? 0 : 3.75 * u, byk = ey + .7 * u, L = front ? .9 * u : 1.6 * u;
    if (front) { paint([[bx - .7 * u, byk - .2 * u], [bx + .7 * u, byk - .2 * u], [bx, byk + .6 * u + bo * .2 * u]], { wash: COL.beak, ink: PAL.ink, sw: sw * .8 }); if (bo > .2) paint([[bx - .45 * u, byk + .25 * u], [bx + .45 * u, byk + .25 * u], [bx, byk + (.6 + bo * .9) * u]], { wash: COL.nuanDk, ink: PAL.ink, sw: sw * .7 }); }
    else { paint([[bx - .2 * u, byk - .55 * u], [bx + L, byk - .05 * u - bo * .35 * u], [bx - .2 * u, byk + .2 * u]], { wash: COL.beak, ink: PAL.ink, sw: sw * .8 });
      paint([[bx - .2 * u, byk + .15 * u], [bx + L * .8, byk + .2 * u + bo * .7 * u], [bx - .2 * u, byk + .6 * u]], { wash: mixCol(COL.beak, COL.nuanDk, .4), ink: PAL.ink, sw: sw * .7 }); }
  }
  // near wing (in front of the body) and whatever it holds
  if (o.chest) o.chest(u, sw);                          // held against the body, under the near wing
  const tip = wingAt(o.wing ?? 2.5, true, front ? 3 * u : -.3 * u, by + .3 * u);
  if (front) { /* the front view's second wing is the "far" one drawn first, mirrored */ }
  if (o.hold) { push(); translate(tip[0], tip[1]); o.hold(u, sw, tip[2]); pop(); }
  if (o.over) o.over(u, sw);
  pop();
  if (o.emote && (o.emoteK ?? 1) > .02) { rs('emote'); emote(o.emote, x + (o.flip ? -3.5 : 3.5) * u + (o.dx || 0) * u, y + dy - 11.5 * u, u * .5, o.emoteK ?? 1, o.emoteAge ?? T); }
  boilSeed(key + ' done');
}

// ---------- props ----------
// a memory piece: a little four-point star of light
function memBit(x, y, r, k = 1, key = 'bit') {
  if (k <= .02) return;
  boilSeed('bit ' + key);
  glow(x, y, r * 5, COL.gold, .8 * k);
  const tw = 1 + .15 * Math.sin(T * 7 + x * .01);
  paint(starPts(x, y, r * tw * k, .42, 4, -Math.PI / 2 + .2 * Math.sin(T * 2 + y)), { wash: '#FFF0C4', ink: mixCol(PAL.ochre, PAL.ink, .3), sw: clamp(r / 25, .3, 1) });
}
// the glass jar: (x, y) = bottom centre, s = height/2. o.crack 0..1 (visible crack), o.bow 0..1 (ribbon wrapped + bow),
// o.fill = number of pieces inside, o.glow 0..1, o.silhouette 0..1 (a faint bird made of light)
function memJar(x, y, s, o = {}) {
  boilSeed('jar back ' + (o.key || ''));
  const w = s * .82, h = s * 1.7, top = y - h, sw = clamp(s / 60, .5, 1.6);
  const gl = o.glow || 0;
  if (gl > .01) glow(x, y - h * .45, s * 2.6, COL.gold, gl);
  flat(rrPts(x - w, top + s * .25, 2 * w, h - s * .25, w * .45), COL.glass, 80);
  // pieces inside
  const n = Math.round(o.fill || 0);
  for (let i = 0; i < n; i++) {
    const px = x + (hash(i * 3.1) - .5) * w * 1.4, py = y - s * .25 - hash(i * 7.7) * h * .55 - (i > 8 ? s * .2 : 0);
    memBit(px, py + Math.sin(T * 2 + i) * s * .03, s * (.12 + .05 * hash(i)), 1, (o.key || '') + 'in' + i);
  }
  if (o.silhouette > .02) { const k = o.silhouette, sy = y - h * .5;
    glow(x, sy, s * 1.2 * k, '#BFD8FF', .9 * k);
    boilSeed('jar sil');
    paint(ellPts(x, sy, s * .45, s * .42, 18), { wash: '#DDE9FF', washOp: 120 * k, ink: null });
    paint(ellPts(x + s * .1, sy - s * .5, s * .25, s * .25, 14), { wash: '#DDE9FF', washOp: 120 * k, ink: null }); }
  boilSeed('jar front ' + (o.key || ''));
  paint(rrPts(x - w, top + s * .25, 2 * w, h - s * .25, w * .45, s * .01), { ink: PAL.ink, sw });
  // shine
  inkLine([[x - w * .65, top + s * .6], [x - w * .72, top + h * .55]], sw * 2.2, PAL.cream, 'ink', .4);
  // neck and cork
  paint(rrPts(x - w * .62, top, w * 1.24, s * .34, s * .08), { wash: '#C99A6A', ink: PAL.ink, sw });
  if (o.crack) { const k = clamp(o.crack); inkLine([[x + w * .2, top + s * .55], [x + w * .38, top + s * .8], [x + w * .25, top + s * 1.0], [x + w * .45, top + s * 1.25]].slice(0, 2 + Math.round(k * 2)), sw * 1.1, PAL.ink, 'inkfine', 0); }
  if (o.bow > .01) {
    const k = clamp(o.bow), by2 = top + s * .9;
    paint(ribbon([[x - w * 1.02, by2 - s * .04], [x, by2 + s * .06], [lerp(x - w, x + w * 1.02, k), by2 - s * .04]], s * .2, s * .2), { wash: COL.ribbon, ink: PAL.ink, sw: sw * .8 });
    if (o.bowPop != null && o.bowPop > .02) { const p = backOut(o.bowPop), bx = x + w * .35;
      push(); translate(bx, by2); scale(p);
      for (const sd of [-1, 1]) paint([[0, 0], [sd * s * .35, -s * .22], [sd * s * .42, s * .05], [sd * s * .3, s * .2]], { wash: COL.ribbon, ink: PAL.ink, sw: sw * .8, curv: .5 });
      for (const sd of [-1, 1]) paint(ribbon([[0, 0], [sd * s * .12, s * .25], [sd * s * .2, s * .42]], s * .1, s * .07), { wash: COL.ribbon, ink: PAL.ink, sw: sw * .6 });
      paint(ellPts(0, 0, s * .08, s * .08, 8), { wash: mixCol(COL.ribbon, COL.scarf, .4), ink: PAL.ink, sw: sw * .6 });
      pop(); }
  }
}
// a blue feather (Lan's), tip at (x, y), pointing angle a
function feather(x, y, s, a = 0, key = 'f') {
  boilSeed('feather ' + key);
  push(); translate(x, y); rotate(a);
  paint(ribbon([[0, 0], [s * .5, -s * .12], [s, 0]], s * .08, s * .3).map(([px, py]) => [px, py]), { wash: COL.lan, ink: PAL.ink, sw: clamp(s / 60, .4, 1.2) });
  inkLine([[-s * .15, 0], [s * .95, 0]], clamp(s / 70, .3, 1), PAL.ink, 'inkfine', 0);
  pop();
}
// a firework burst at (x, y): age seconds since launch, r radius, cols. shape 'heart' for the final one.
function firework(x, y, r, age, cols = [COL.gold, PAL.rose], key = 'fw', shape = null) {
  if (age < 0) return;
  boilSeed('fw ' + key);
  const k = easeOut(age / .7), fade = 1 - seg(age, .9, 2.0), n = 22;
  if (fade <= 0) return;
  glow(x, y + age * 20, r * 1.4 * k, cols[0], .9 * fade * (1 - seg(age, 0, 1.2) * .5));
  for (let i = 0; i < n; i++) {
    const a = i / n * TAU + hash(i) * .1;
    let dx = Math.cos(a), dy = Math.sin(a);
    if (shape === 'heart') { const tt = a, hx = 16 * Math.pow(Math.sin(tt), 3) / 16, hy = -(13 * Math.cos(tt) - 5 * Math.cos(2 * tt) - 2 * Math.cos(3 * tt) - Math.cos(4 * tt)) / 16; dx = hx; dy = hy; }
    const d0 = r * k * .45, d1 = r * k * (shape ? 1 : .85 + .2 * hash(i + 5)), sag = age * age * 30;
    const c = cols[i % cols.length];
    inkLine([[x + dx * d0, y + dy * d0 + sag * .3], [x + dx * (d0 + d1) * .5, y + dy * (d0 + d1) * .5 + sag * .7], [x + dx * d1, y + dy * d1 + sag]], 1.6 * fade + .3, c, 'ink', .5);
    if (age > .5 && !shape) paint(starPts(x + dx * d1, y + dy * d1 + sag, 7 * fade, .4, 4), { wash: mixCol(c, PAL.cream, .5), washOp: 255 * fade, ink: null });
  }
  // a heart-shaped burst: the outline itself is traced in sparks, so the shape reads at a glance
  if (shape === 'heart') {
    const hp = heartPts(x, y + age * age * 20, r * k * .9, 30);
    glow(x, y, r * 1.2 * k, PAL.rose, .6 * fade);
    inkLine(hp.concat([hp[0]]), 1.4 * fade + .4, mixCol(PAL.rose, PAL.cream, .3), 'ink', .5);
    hp.forEach((p, i) => paint(starPts(p[0], p[1], (6 + 5 * (i % 3 === 0)) * fade + 1, .4, 4), { wash: i % 2 ? COL.gold : PAL.cream, washOp: 255 * fade, ink: null }));
  }
}
// a rising rocket trail before a burst: from (x0, y0) to (x, y), k 0..1
function rocket(x0, y0, x, y, k) {
  if (k <= 0 || k >= 1) return;
  boilSeed('rocket');
  const px = lerp(x0, x, easeOut(k)), py = lerp(y0, y, easeOut(k));
  glow(px, py, 40, COL.gold, .9);
  inkLine([[px, py], [lerp(x0, x, easeOut(k * .7)), lerp(y0, y, easeOut(k * .7))]], 1.2, COL.gold, 'ink', 0);
}

// ---------- sets ----------
function nightSky(t, o = {}) {
  flatRect(-3000, -3000, W + 6000, H + 6000, o.col || COL.night);
  glow(960, 1100, 1300, o.low || '#3A4A8A', .55);
  boilSeed('stars');
  for (let i = 0; i < (o.n || 46); i++) {
    const x = hash(i * 2.1) * (W + 600) - 300, y = hash(i * 5.3) * 700 - 250, tw = .6 + .4 * Math.sin(t * (1.5 + hash(i) * 2) + i);
    paint(starPts(x, y, (4 + 6 * hash(i * 9)) * tw, .4, 4), { wash: PAL.cream, washOp: 200, ink: null });
  }
}
// the sky seen through a window (wx, wy, ww, wh): stars, and snow if o.snow, all inside the pane
function windowSky(t, wx, wy, ww, wh, o = {}) {
  flatRect(wx, wy, ww, wh, o.col || COL.night);
  glow(wx + ww * .5, wy + wh, ww * .7, o.low || '#3A4A8A', .5);
  boilSeed('wstars');
  for (let i = 0; i < (o.n ?? 12); i++) {
    const x = wx + 20 + hash(i * 2.1) * (ww - 40), y = wy + 20 + hash(i * 5.3) * (wh * .6), tw = .6 + .4 * Math.sin(t * (1.5 + hash(i) * 2) + i);
    paint(starPts(x, y, (3 + 5 * hash(i * 9)) * tw, .4, 4), { wash: PAL.cream, washOp: 200, ink: null });
  }
  if (o.snow) snowfall(t, o.snow, { box: [wx, wy, ww, wh] });
}
// the rooftop ridge the birds sit on: ridge line at y, spanning the frame; distant roofs behind
function rooftops(t, y = 860, o = {}) {
  const far = [];
  for (let i = 0; i < 6; i++) {
    const x = -200 + i * 420 + hash(i) * 120, h = 160 + hash(i * 3) * 140, w = 300 + hash(i * 7) * 100;
    far.push([x, h, w]);
    flat([[x, y + 120], [x, y + 120 - h], [x + w / 2, y + 120 - h - 90], [x + w, y + 120 - h], [x + w, y + 120]], mixCol(COL.night, COL.indigo, .6));
  }
  flat([[-300, y], [W + 300, y - 30], [W + 300, H + 300], [-300, H + 300]], COL.roof);
  boilSeed('roofs far');
  for (const [x, h, w] of far) inkLine([[x, y + 120 - h], [x + w / 2, y + 120 - h - 90], [x + w, y + 120 - h]], .8, mixCol(COL.night, PAL.ink, .5), 'ink', 0);
  far.forEach(([x, h, w], i) => { if (hash(i * 11) > .4) { const wx = x + w * .3, wy = y + 120 - h + 40; paint(rectPts(wx, wy, 50, 60), { wash: '#F5C66E', ink: null }); glow(wx + 25, wy + 30, 90, COL.gold, .5 * (o.lights ?? 1)); } });
  boilSeed('roof near');
  for (let i = 0; i < 14; i++) { const x = -260 + i * 170; inkLine([[x, y - i * 2.1 + 6], [x - 120, H + 80]], .8, COL.roofDk, 'ink', 0); }
  for (let j = 1; j < 4; j++) inkLine([[-300, y + j * 90], [W + 300, y + j * 90 - 30]], .7, COL.roofDk, 'ink', 0);
  paint([[-300, y - 18], [W + 300, y - 48], [W + 300, y - 10], [-300, y + 22]], { wash: COL.roofDk, ink: PAL.ink, sw: 1 });
}
// a room wall with a window (wx, wy, ww, wh): the wall, the view (outside(), which paints inside the pane), the frame
function roomWithWindow(wx, wy, ww, wh, outside, o = {}) {
  flatRect(-3000, -3000, W + 6000, H + 6000, o.wall || COL.wall);
  outside();
  glow(wx + ww / 2, wy + wh / 2, ww * 1.3, o.lamp || '#F6DDB0', .25);
  boilSeed('window frame');
  paint(rectPts(wx - 18, wy - 18, ww + 36, wh + 36), { ink: COL.woodDk, sw: 2.2 });
  paint(rectPts(wx, wy, ww, wh), { ink: COL.woodDk, sw: 1.2 });
  inkLine([[wx + ww / 2, wy], [wx + ww / 2, wy + wh]], 3, COL.woodDk, 'ink', 0);
  inkLine([[wx, wy + wh / 2], [wx + ww, wy + wh / 2]], 3, COL.woodDk, 'ink', 0);
  paint(rectPts(wx - 50, wy + wh + 10, ww + 100, 34), { wash: COL.wood, ink: PAL.ink, sw: 1 });
}
// the floor and a table
function floorAndTable(tx, ty, tw, o = {}) {
  flatRect(-3000, ty + 160, W + 6000, 3000, o.floor || '#C89F78');
  boilSeed('floor');
  inkLine([[-400, ty + 160], [W + 400, ty + 160]], 1.2, COL.woodDk, 'ink', 0);
  for (let i = 0; i < 6; i++) inkLine([[-400, ty + 230 + i * 70 + i * i * 8], [W + 400, ty + 230 + i * 70 + i * i * 8]], .6, mixCol(COL.wood, COL.woodDk, .5), 'inkfine', 0);
  if (!tw) return;
  boilSeed('table');
  paint(rectPts(tx - tw / 2, ty, tw, 34), { wash: COL.wood, ink: PAL.ink, sw: 1.2 });
  for (const lx of [tx - tw / 2 + 30, tx + tw / 2 - 60]) paint(rectPts(lx, ty + 34, 30, 260), { wash: COL.woodDk, ink: PAL.ink, sw: 1 });
}
// falling snow over the frame, density n; o.box = [x, y, w, h] keeps it inside a window pane
function snowfall(t, n = 60, o = {}) {
  boilSeed('snow');
  const [bx, by, bw, bh] = o.box || [-200, -100, W + 400, H + 200];
  for (let i = 0; i < n; i++) {
    const sp = 60 + hash(i * 3) * 80, r = 4 + 4 * hash(i * 9) * (o.box ? .7 : 1);
    const x = bx + r + frac(hash(i * 1.7) + Math.sin(t * .8 + i) * .01) * (bw - 2 * r), y = by + r + frac(hash(i * 4.1) + t * sp / bh) * (bh - 2 * r);
    paint(ellPts(x + (o.dx || 0), y, r, r, 8), { wash: COL.snow, washOp: 230, ink: null });
  }
}
// grass tufts along a ground line
function tufts(x0, x1, y, n, col, key = 'tufts') {
  boilSeed(key);
  for (let i = 0; i < n; i++) {
    const x = lerp(x0, x1, (i + hash(i * 3)) / n), h = 18 + 26 * hash(i * 7), sway = 6 * Math.sin(T * 2 + i);
    paint([[x - 7, y], [x + sway, y - h], [x + 7, y]], { wash: col, ink: null });
  }
}

// ---------- flat colour for big areas ----------
// p5.brush costs about 1.2 s per screenful of painted area under software GL (no GPU), so big plain areas (sky, walls,
// floor, the inside of an iris) are filled with plain p5 shapes, which are nearly free. The brushwork goes on top:
// ink edges, props, characters. Plain shapes land on the canvas at once, while p5.brush queues its marks, so anything
// queued is flushed first to keep the painting order.
let BRUSH_DIRTY = false;
function flat(pts, col, a = 255) {
  if (BRUSH_DIRTY) flushBrush();
  const c = color(col); c.setAlpha(a);
  push(); noStroke(); fill(c); beginShape(); for (const p of pts) vertex(p[0], p[1]); endShape(CLOSE); pop();
}
const flatRect = (x, y, w, h, col, a) => flat([[x, y], [x + w, y], [x + w, y + h], [x, y + h]], col, a);
// an iris: everything outside a circle of radius r around (cx, cy) in col, with a boiling ink edge (screen space)
function irisFast(cx, cy, r, col = PAL.ink) {
  if (r > 2400) return;
  if (r < 4) { flatRect(-60, -60, W + 120, H + 120, col); return; }
  if (BRUSH_DIRTY) flushBrush();
  push(); noStroke(); fill(col); beginShape(); vertex(-200, -200); vertex(W + 200, -200); vertex(W + 200, H + 200); vertex(-200, H + 200);
  beginContour(); for (let i = 40; i > 0; i--) { const a = i / 40 * TAU; vertex(cx + Math.cos(a) * r, cy + Math.sin(a) * r); } endContour(); endShape(CLOSE); pop();
  boilSeed('iris edge');
  inkLine(ellPts(cx, cy, r + 3, r + 3, 40).concat([[cx + r + 3, cy]]), clamp(r / 200, .8, 2.4), col, 'ink', .5);
}
const flashFast = (k, col = '#FFF6E0') => { if (k > .01) flatRect(-60, -60, W + 120, H + 120, col, 255 * clamp(k)); };
// a brush wipe painted as flat washes (the kit's brushWipe adds watercolour and hatching, which is slow without a GPU)
function paintWipe(p, cols = [PAL.clayDk, PAL.clay]) {
  if (p <= 0 || p >= 1) return;
  const [c1, c2] = cols, n = 5, bh = (H + 420) / n + 40;
  push(); translate(W / 2, H / 2); rotate(-.1); translate(-W / 2, -H / 2);
  for (let i = 0; i < n; i++) {
    const y0 = -230 + i * (H + 420) / n, d = [0, .14, .06, .18, .1][i];
    const q = p < .5 ? easeOut(clamp((p * 2 - d) / (1 - d))) : ease(clamp(((p - .5) * 2 - d) / (1 - d)));
    const x0 = p < .5 ? -300 : lerp(-300, W + 400, q), x1 = p < .5 ? lerp(-300, W + 400, q) : W + 400;
    if (x1 - x0 < 30) continue;
    const pts = [], rag = k => 40 + 50 * hash(i * 31 + k) + jit(12);
    for (let k = 0; k <= 8; k++) pts.push([lerp(x0, x1, k / 8), y0 + Math.sin(k * .9 + i) * 14 + jit(5)]);
    for (let k = 1; k < 9; k++) pts.push([x1 + rag(k) - 40, y0 + bh * k / 9]);
    for (let k = 8; k >= 0; k--) pts.push([lerp(x0, x1, k / 8), y0 + bh + Math.sin(k * .8 + i * 2) * 14 + jit(5)]);
    if (p >= .5) for (let k = 8; k > 0; k--) pts.push([x0 - rag(k + 20) + 40, y0 + bh * k / 9]);
    flat(pts, i % 2 ? c1 : c2);
    inkLine(pts.slice(9, 17), 1.2, mixCol(i % 2 ? c1 : c2, PAL.ink, .4), 'dry', .4);
  }
  pop();
}

// ---------- software-GL speed fix ----------
// Under SwiftShader (no GPU, e.g. a cloud container) each p5.brush watercolour fill costs about a second, so there they
// are painted as flat washes instead. A real GPU keeps them.
let _softGL = null;
const _paintAt = paintAt;
paintAt = (pts, o) => {
  if (_softGL === null) { try { _softGL = /swiftshader/i.test(window.gpuInfo()); } catch (e) { _softGL = false; } }
  BRUSH_DIRTY = true;
  // watercolour fills cost ~1 s each there even without texture: keep the flat wash (or turn the fill into one)
  if (_softGL && o.fill) o = o.wash ? { ...o, fill: null } : { ...o, wash: o.fill, washOp: (o.fillOp ?? 170) * .7, fill: null };
  _paintAt(pts, o);
};
const _inkLine = inkLine;
inkLine = (...a) => { BRUSH_DIRTY = true; _inkLine(...a); };
const _flushBrush = flushBrush;
flushBrush = () => { _flushBrush(); BRUSH_DIRTY = false; };

// ---------- where things are on a bird (world coordinates, for props that leave or reach a wing or the beak) ----------
function birdPt(x, y, u, o, lx, ly) {
  const sq = o.sq || 0, sx = (o.flip ? -1 : 1) * (1 + sq * .6), sy = 1 - sq, r = o.rot || 0;
  const px = lx * sx, py = ly * sy, c = Math.cos(r), s = Math.sin(r);
  return [x + (o.dx || 0) * u + px * c - py * s, y + (o.dy || 0) * u + px * s + py * c];
}
function birdTip(x, y, u, o) {
  const a = o.wing ?? 2.5, front = o.view === 'front', px = front ? 3 * u : -.3 * u, py = -1.6 * u - 3.5 * u + .3 * u;
  return birdPt(x, y, u, o, px + Math.cos(a) * 3.6 * u, py + Math.sin(a) * 3.6 * u);
}
const birdBeak = (x, y, u, o) => birdPt(x, y, u, o, 5.2 * u, -5.4 * u);
const birdHead = (x, y, u, o) => birdPt(x, y, u, o, 1 * u, -6.2 * u);

// ---------- more props ----------
// the glowing heart the pieces become: centre (x, y), size r, k 0..1 brightness
function heartLight(x, y, r, k = 1, key = 'heart') {
  boilSeed('heart ' + key);
  glow(x, y, r * 4.5, COL.gold, .9 * k);
  glow(x, y, r * 2.2, '#FFB0C0', .5 * k);
  const b = 1 + .06 * pulse(T, 4);
  paint(heartPts(x, y, r * b), { wash: mixCol('#F4B63A', '#FFE6A8', k), ink: mixCol(PAL.ochre, PAL.ink, .4), sw: clamp(r / 40, .4, 1.4) });
  paint(heartPts(x - r * .15, y - r * .2, r * .5 * b), { wash: '#FFF6DC', washOp: 200, ink: null });
}
// a letter held in a wing: an envelope with a heart seal (no writing); crumple 0..1 squeezes it into a paper ball
function letterProp(s, crumple = 0, key = 'letter') {
  boilSeed('letter ' + key);
  const c = clamp(crumple), w = lerp(s * 1.4, s * .7, c), h = lerp(s, s * .7, c);
  if (c < .6) {
    paint(rectPts(-w / 2, -h / 2, w, h, s * .04 * c * 3), { wash: PAL.cream, ink: PAL.ink, sw: clamp(s / 40, .4, 1.2) });
    inkLine([[-w / 2, -h / 2], [0, h * .1], [w / 2, -h / 2]], clamp(s / 50, .3, 1), PAL.ink, 'inkfine', .2);
    paint(heartPts(0, h * .05, s * .14), { wash: COL.scarf, ink: null });
  } else {
    paint(ellPts(0, 0, w * .55, h * .55, 14, s * .06), { wash: '#F2E7D2', ink: PAL.ink, sw: clamp(s / 40, .4, 1.2) });
    for (let i = 0; i < 3; i++) inkLine([[-w * .3 + i * w * .2, -h * .3], [-w * .2 + i * w * .25, h * .1], [-w * .25 + i * w * .2, h * .3]], clamp(s / 60, .3, .9), PAL.ink, 'inkfine', .3);
  }
}
// a whip pan's motion streaks (screen space): k 0..1 strength, dir ±1
function whipStreaks(k, cols = [PAL.cream, PAL.sky]) {
  if (k <= .02) return;
  boilSeed('whip');
  for (let i = 0; i < 16; i++) {
    const y = hash(i * 4.3) * H, x0 = hash(i * 1.9) * W * .5 - 200, len = (600 + hash(i) * 900) * k;
    paint(ribbon([[x0, y], [x0 + len * .5, y + 4], [x0 + len, y]], 6 + 30 * hash(i * 7) * k, 2), { wash: cols[i % cols.length], washOp: 200 * k, ink: null });
  }
}
