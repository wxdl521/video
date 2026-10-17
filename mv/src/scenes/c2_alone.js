// c2_alone.js: shots C–F (10.1–28.7 s). Beat 0.8535 s, a beat at 0.07: B(12) 10.31 · B(17) 14.58 · B(23) 19.70 · B(28) 23.97
(() => {
  // ---------- C · 10.1–14.8 · the cracked jar: she ribbons the crack into a bow and drops the spark in ----------
  const TY = 770, JX = 1130, JS = 120, SPOT = [985, 752];   // table top, jar, where she sets the spark down
  function shotC(t, lt, dur) {
    const whip = easeIn(seg(lt, dur - .28, dur));
    camBegin(1000 + 20 * Math.sin(lt * .6) + whip * 1600, 600, 1.32 + .02 * lt);
    roomWithWindow(200, 150, 460, 380, () => windowSky(t, 200, 150, 460, 380, { n: 14 }));
    floorAndTable(1000, TY, 1150);
    const w = stroll(lt, 1.15, 1.5, 770, 880, 22);
    const m = birdMoods(lt, [[0, 'sad', { lookX: .8 }], [1.3, 'calm', { lookX: .8, lookY: .2 }], [2.55, 'happy'], [3.05, 'look', { lookX: .5, lookY: .5 }], [3.8, 'happy', { emote: 'sweat' }]]);
    // her wing: holds the spark, sets it down (1.0–1.15), wraps the ribbon round the jar (1.4–2.5), picks the spark up
    // and tosses it in (3.1–3.45), then pats the jar (3.9–4.6)
    let wing = .35;
    if (lt > .95 && lt < 1.3) wing = lerp(.35, 1.0, ease(seg(lt, .95, 1.15)));
    else if (lt >= 1.3 && lt < 2.55) wing = .1 + .35 * Math.sin((lt - 1.3) * 9);
    else if (lt >= 2.55 && lt < 3.1) wing = lerp(.2, .9, ease(seg(lt, 2.8, 3.1)));
    else if (lt >= 3.1 && lt < 3.9) wing = lerp(.9, -1.1, backOut(seg(lt, 3.15, 3.4)));
    else if (lt >= 3.9) wing = -.05 + .25 * Math.abs(Math.sin((lt - 3.9) * 7)) * (1 - seg(lt, 4.4, 4.6));
    const o = { key: 'nuanC', ...m, wing, walk: w.walk, dy: (m.dy || 0) + w.dy };
    const nx = w.x, inHand = lt < 1.1 || (lt > 3.05 && lt < 3.2);
    const fill = lt > 3.75 ? 1 : 0, gl = .15 + .5 * ease(seg(lt, 3.7, 4.1));
    memJar(JX, TY, JS, { key: 'c', crack: 1, bow: ease(seg(lt, 1.4, 2.5)), bowPop: seg(lt, 2.5, 2.85), fill, glow: gl });
    // the spark on the table, then flying into the jar
    if (lt >= 1.1 && lt < 3.05) memBit(...SPOT, 14, 1, 'cspot');
    if (lt >= 3.2 && lt < 3.75) { const q = seg(lt, 3.2, 3.75), p = arcPt(birdTip(nx, TY, 22, { ...o, wing: -1.1 }), [JX, TY - JS * 1.2], 120, ease(q)); memBit(...p, 14, 1, 'cfly'); }
    birdie(nx, TY, 22, { ...o, hold: inHand ? (u) => memBit(0, 0, u * .65, 1, 'chold') : null });
    camEnd();
    boilSeed('wipe');
    if (lt < .3) paintWipe(.5 + lt / .6, [COL.indigo, COL.night]);
    whipStreaks(whip, [COL.wall, PAL.cream, COL.snow]);
  }

  // ---------- D · 14.8–19.4 · his footprints in the snow end; a feather falls; she catches it before it lands ----------
  const GY = 820, U = 22;
  const nuanDX = lt => lt < 3.05 ? stroll(lt, .25, 1.9, 300, 1640, U).x : lerp(1640, 1790, ease(seg(lt, 3.05, 3.4)));
  function shotD(t, lt, dur) {
    const nx = nuanDX(lt), whipIn = 1 - easeOut(seg(lt, 0, .3));
    camBegin(clamp(nx + 100, 900, 1450) - whipIn * 1500, 600, 1.3);
    flatRect(-3000, -3000, 9000, 6000, '#C9D6E3');
    glow(1200, 100, 1300, '#3A3020', .25);
    const hills = through([[-1800, 700], [-400, 610], [600, 660], [1500, 590], [2600, 650], [3600, 620]], 4);
    flat(hills.concat([[3600, 900], [-1800, 900]]), '#DCE4EE');
    boilSeed('d hills'); inkLine(hills, .9, '#A9B6C8', 'ink', .4);
    // bare winter trees: trunk and two branches, each one painted ribbon
    for (const [tx, th] of [[560, 300], [1250, 230], [2150, 340], [-200, 260]]) {
      boilSeed('tree' + tx); const tc = mixCol(COL.woodDk, '#8090A8', .35), sway = 4 * Math.sin(t * 1.3 + tx);
      paint(ribbon([[tx, GY - 30], [tx + 6, GY - 30 - th * .5], [tx + 4 + sway, GY - 30 - th]], 26, 6), { wash: tc, ink: PAL.ink, sw: .8 });
      paint(ribbon([[tx + 4, GY - 30 - th * .5], [tx + 50, GY - 30 - th * .7], [tx + 90 + sway, GY - 30 - th * .85]], 12, 3), { wash: tc, ink: PAL.ink, sw: .6 });
      paint(ribbon([[tx + 5, GY - 30 - th * .65], [tx - 40, GY - 30 - th * .85], [tx - 70 + sway, GY - 30 - th * .95]], 10, 3), { wash: tc, ink: PAL.ink, sw: .6 });
      paint(ellPts(tx + 50, GY - 30 - th * .72, 26, 9, 12), { wash: COL.snow, ink: null });
    }
    flat([[-1800, GY - 30], [3600, GY - 50], [3600, 1600], [-1800, 1600]], COL.snow);
    boilSeed('d ground');
    inkLine([[-1800, GY - 30], [600, GY - 38], [3600, GY - 50]], 1, '#9AA8BE', 'ink', .5);
    // Lan's footprints: three-toed marks, every 70 px, ending at x 1700 (he flew from there)
    boilSeed('prints');
    for (let x = 160, i = 0; x <= 1700; x += 70, i++) {
      const py = GY - 6 + (i % 2 ? 12 : -4);
      for (const a of [-.5, 0, .5]) inkLine([[x, py], [x + 14 * Math.cos(a), py + 14 * Math.sin(a) * .5]], 1.3, '#8C9AB2', 'ink', 0);
      inkLine([[x, py], [x - 8, py]], 1.1, '#8C9AB2', 'ink', 0);
    }
    // the feather: drifts down in front of her (2.1–3.4), caught just above the snow
    const caught = lt >= 3.4;
    const m = birdMoods(lt, [[0, 'sad', { lookX: .5, lookY: .6 }], [1.95, 'look', { lookX: .8, lookY: -.2 }], [2.35, 'sad', { lookX: .4, lookY: -1 }],
      [2.75, 'wow', { lookX: .6, lookY: -.4 }], [3.45, 'look', { lookX: .4, lookY: .5 }], [3.85, 'sad', { lookX: .3, lookY: .6 }]]);
    const lunge = jump(lt, 3.05, 3.4, 1.4), w = stroll(lt, .25, 1.9, 300, 1640, U);
    let wing = m.wing ?? 2.5;
    if (lt > 2.95) wing = lerp(2.5, .15, ease(seg(lt, 2.95, 3.25)));
    if (lt > 3.6) wing = lerp(.15, 1.25, ease(seg(lt, 3.6, 3.95)));
    const o = { key: 'nuanD', ...m, wing, walk: lt < 1.95 ? w.walk : null, dy: (m.dy || 0) + (lt < 1.95 ? w.dy : 0) + lunge.dy, sq: (m.sq || 0) + lunge.sq, rot: lt > 3.0 && lt < 3.6 ? .25 * Math.sin(seg(lt, 3.0, 3.6) * Math.PI) : (m.rot || 0) };
    if (!caught && lt > 2.0) {
      const q = seg(lt, 2.05, 3.4), tip = birdTip(1790, GY, U, { wing: .15 });
      const fx = lerp(1880, tip[0], ease(q)) + 70 * Math.sin(q * 6) * (1 - q), fy = lerp(-120, tip[1], q);
      feather(fx, fy, 110, .5 * Math.sin(q * 6), 'dfall');
    }
    birdie(nx, GY, U, { ...o, hold: caught ? (u, sw, a) => { rotate(-a + .3); feather(-.4 * u, 0, 5 * u, 0, 'dheld'); } : null });
    // a puff of snow where she lands
    if (lt > 3.38 && lt < 3.9) { boilSeed('puff'); const q = seg(lt, 3.38, 3.9); for (let i = 0; i < 6; i++) paint(ellPts(1790 + (i - 2.5) * 30 * (1 + q), GY - 10 - 40 * q * hash(i), 14 * (1 - q) + 2, 10 * (1 - q) + 2, 10), { wash: PAL.cream, washOp: 230, ink: null }); }
    const at = toScreen(1790, GY - 120);
    camEnd();
    snowfall(t, 50);
    whipStreaks(whipIn, [COL.snow, PAL.cream, '#C9D6E3']);
    if (lt > dur - .55) irisFast(...at, lerp(1500, 0, easeIn(seg(lt, dur - .55, dur - .05))));
  }

  // ---------- E · 19.4–24.0 · 时差: her sunny window / his night window; she throws the letter away, then sneaks it back ----------
  const SX = 960, SY = 760, LWX = 3500;
  function camE(lt) {
    if (lt < 1.1) return 960;
    if (lt < 2.2) return lerp(960, LWX, ease(seg(lt, 1.1, 1.85)));
    return lerp(LWX, 1020, easeOut(seg(lt, 2.2, 2.5)));
  }
  function shotE(t, lt, dur) {
    const cx = camE(lt), whip = lt > 2.2 && lt < 2.5 ? Math.sin(seg(lt, 2.2, 2.5) * Math.PI) : 0;
    camBegin(cx + 10 * Math.sin(lt), 540, 1.05);
    // the sky turns from day (left) to night (right) across the world
    for (let i = 0; i < 60; i++) { const k = ease(clamp((i - 14) / 32)); flatRect(-800 + i * 96, -1000, 100, 2600, mixCol('#9CCBEA', COL.night, k)); }
    boilSeed('e sun'); glow(520, 210, 260, '#FFE6A0', .8); paint(ellPts(520, 210, 80, 80, 20), { wash: '#FFE38A', ink: PAL.ink, sw: 1 });
    boilSeed('e moon'); glow(3900, 200, 200, '#DDE6FF', .7); paint(ellPts(3900, 200, 60, 60, 20), { wash: '#F4F0DC', ink: PAL.ink, sw: 1 }); paint(ellPts(3925, 185, 52, 52, 20), { wash: COL.night, ink: null });
    boilSeed('e stars'); for (let i = 0; i < 26; i++) { const x = 2700 + hash(i * 3) * 1900, y = hash(i * 7) * 600 - 100; paint(starPts(x, y, 5 + 4 * hash(i), .4, 4), { wash: PAL.cream, washOp: 200, ink: null }); }
    for (let i = 0; i < 6; i++) { const k = clamp((i - 1) / 3.5); flat(through([[-800 + i * 900, 1600], [-600 + i * 900, 720 + 40 * hash(i)], [-100 + i * 900, 690], [400 + i * 900, 740], [600 + i * 900, 1600]], 4), mixCol('#7FB069', '#22305E', k)); }
    // her house wall + windowsill
    flatRect(520, 300, 900, 1300, COL.wall); flatRect(700, 380, 540, 360, '#BFDDF0');
    boilSeed('e her house');
    paint(rectPts(520, 300, 900, 1300), { ink: PAL.ink, sw: 1.2 });
    paint(rectPts(700, 380, 540, 360), { ink: COL.woodDk, sw: 2 });
    inkLine([[970, 380], [970, 740]], 3, COL.woodDk, 'ink', 0);
    paint(rectPts(640, SY, 660, 30), { wash: COL.wood, ink: PAL.ink, sw: 1 });
    // his house wall and window, at night: Lan asleep inside
    flatRect(3050, 300, 900, 1300, '#3B4778'); flatRect(3230, 380, 540, 360, '#5A5F8E');
    boilSeed('e his house');
    paint(rectPts(3050, 300, 900, 1300), { ink: PAL.ink, sw: 1.2 });
    glow(3500, 600, 260, '#F0C27A', .35);
    paint(ellPts(3500, 700, 150, 40, 20), { wash: COL.woodDk, ink: PAL.ink, sw: 1 });
    birdie(3500, 700, 20, { key: 'lanE', who: 'lan', flip: true, ...birdMood('sleep', t), emoteK: 1, emoteAge: t, noShadow: true, noBlink: true });
    boilSeed('e his frame');
    paint(rectPts(3230, 380, 540, 360), { ink: COL.woodDk, sw: 2 }); inkLine([[3500, 380], [3500, 560]], 3, COL.woodDk, 'ink', 0);
    paint(rectPts(3170, 740, 660, 30), { wash: COL.wood, ink: PAL.ink, sw: 1 });
    // Nuan: waves the letter; crumples it (2.6–2.95); throws it (3.0) and turns away; peeks back, fetches it, hugs it
    const m = birdMoods(lt, [[0, 'happy'], [2.5, 'sad', { lookX: .3, lookY: .4 }], [3.08, 'proud'], [3.6, 'sneaky', { lookX: -1 }], [4.3, 'hopeful']]);
    const away = lt > 3.1 && lt < 3.85;
    const w = stroll(lt, 3.9, 4.25, SX, 1215, 22);
    let wing = -1.45 + .4 * Math.sin(lt * 9);
    if (lt > 2.45) wing = lerp(-1.4, .5, ease(seg(lt, 2.45, 2.6)));
    if (lt > 2.92) wing = lerp(.5, -1.6, ease(seg(lt, 2.92, 2.98)));
    if (lt > 3.0) wing = lerp(-1.6, .9, easeOut(seg(lt, 3.0, 3.1)));
    if (lt > 3.1) wing = 2.5;
    if (lt > 4.2) wing = lerp(.3, 1.15, ease(seg(lt, 4.2, 4.45)));
    const crum = ease(seg(lt, 2.6, 2.95)), unfold = ease(seg(lt, 4.3, 4.5));
    const held = lt < 3.0 ? crum : lt > 4.25 ? 1 - unfold : null;
    // the ball: thrown on an arc to the end of the sill, bounces, waits
    if (lt >= 3.0 && lt < 4.25) {
      const q = seg(lt, 3.0, 3.4), p = q < 1 ? arcPt(birdTip(SX, SY, 22, { wing: -1.6 }), [1240, SY - 14], 160, q) : [1240, SY - 14 - 18 * Math.abs(Math.sin((lt - 3.4) * 12)) * Math.exp(-(lt - 3.4) * 7)];
      push(); translate(...p); letterProp(46, 1, 'eball'); pop();
    }
    birdie(lt < 3.9 ? SX : w.x, SY, 22, { key: 'nuanE', ...m, flip: away, wing, walk: lt > 3.9 ? w.walk : null,
      hold: held != null ? (u, sw, a) => { rotate(-a); letterProp(2.4 * u, held, 'eheld'); } : null });
    camEnd();
    whipStreaks(whip, ['#9CCBEA', COL.indigo, PAL.cream]);
    boilSeed('wipe');
    if (lt < .3) { const r = lerp(0, 1500, easeIn(seg(lt, 0, .3))); irisFast(960, 520, r); }
    if (lt > dur - .3) paintWipe((lt - (dur - .3)) / .6, [COL.scarfDk, COL.scarf]);
  }

  // ---------- F · 24.0–28.7 · she knits him a scarf that piles up across the floor, while she freezes ----------
  const CHX = 860, SEAT = 700, UF = 24;
  function shotF(t, lt, dur) {
    const toJar = easeIn(seg(lt, dur - .5, dur));
    camBegin(lerp(960 + 15 * Math.sin(lt * .5), 1530, toJar), lerp(540, 600, toJar), lerp(1.04 + .015 * lt, 1.9, toJar));
    roomWithWindow(150, 130, 420, 360, () => windowSky(t, 150, 130, 420, 360, { n: 8, col: '#2A3466', snow: 14 + Math.round(22 * seg(lt, 1.4, 3)) }), { lamp: '#F3D7A8' });
    floorAndTable(0, 750, 0, { floor: '#B98F6C' });
    // the side table with the jar (it already holds the spark)
    boilSeed('f side');
    paint(rectPts(1420, 640, 220, 26), { wash: COL.wood, ink: PAL.ink, sw: 1 }); paint(rectPts(1515, 666, 30, 250), { wash: COL.woodDk, ink: PAL.ink, sw: 1 });
    memJar(1530, 640, 70, { key: 'f', crack: 1, bow: 1, bowPop: 1, fill: 1, glow: .35 });
    // armchair back
    boilSeed('f chair back');
    paint(rrPts(CHX - 230, 330, 460, 520, 90), { wash: '#6E86A8', ink: PAL.ink, sw: 1.3 });
    // the scarf: from her needles down over the seat and into a heap that grows across the floor
    const L = ease(seg(lt, 0, 3.1)), heapN = Math.round(2 + 12 * L);
    boilSeed('f heap');
    for (let i = 0; i < heapN; i++) {
      const hx = CHX + 230 + i * 34 + 10 * Math.sin(i * 2.1), hy = 905 - (i % 3) * 22 - 40 * L * Math.sin(i / Math.max(1, heapN - 1) * Math.PI);
      paint(ellPts(hx, hy, 60, 34, 14, 2, i * .7), { wash: i % 2 ? COL.scarf : mixCol(COL.scarf, COL.scarfDk, .4), ink: PAL.ink, sw: .9 });
      inkLine([[hx - 30, hy - 8], [hx + 30, hy - 14]], .7, COL.scarfDk, 'inkfine', .3);
    }
    const knit = lt < 3.1;
    const m = birdMoods(lt, [[0, 'happy', { emote: 'hearts', lookX: .3, lookY: .6 }], [1.45, 'calm', { lookY: .6 }], [1.75, 'shiver', { lookY: .5 }], [3.15, 'wow', { beak: 1 }], [3.75, 'sad', { lookX: .8, lookY: .7 }]]);
    const sneeze = take(lt, 3.3, 1.3);
    const wing = knit ? .35 + .22 * Math.sin(lt * 15) : lerp(.35, 1.0, ease(seg(lt, 3.2, 3.5)));
    birdie(CHX, SEAT, UF, { key: 'nuanF', ...m, sq: (m.sq || 0) + sneeze.sq, dy: (m.dy || 0) + sneeze.dy, wing, noShadow: true, scarf: 0,
      hold: (u, sw) => {
        // two needles and the first stretch of scarf hanging from them, running to the seat
        boilSeed('needles');
        inkLine([[-1.4 * u, -1.2 * u], [1.6 * u, .9 * u]], sw * 1.1, '#D9C9A8', 'ink', 0);
        inkLine([[-1.2 * u, .8 * u], [1.5 * u, -1.0 * u]], sw * 1.1, '#D9C9A8', 'ink', 0);
      } });
    const tipF = birdTip(CHX, SEAT, UF, { wing });
    // the sneeze: a puff off her beak
    if (lt > 3.3 && lt < 3.9) { const q = seg(lt, 3.3, 3.9), bk = birdBeak(CHX, SEAT, UF, {}); boilSeed('sneeze'); for (let i = 0; i < 4; i++) paint(ellPts(bk[0] + 40 + q * 160 + i * 30, bk[1] - 10 + (i - 1.5) * 26 * q, 22 * (1 - q) + 4, 18 * (1 - q) + 4, 10), { wash: PAL.cream, washOp: 220 * (1 - q), ink: q < .5 ? PAL.ink : null, sw: .6 }); }
    // armchair arms and cushion, in front of her
    boilSeed('f chair front');
    paint(rrPts(CHX - 250, SEAT - 10, 500, 200, 40), { wash: '#7F98BA', ink: PAL.ink, sw: 1.3 });
    paint(rrPts(CHX - 300, 560, 110, 360, 50), { wash: '#6E86A8', ink: PAL.ink, sw: 1.3 });
    paint(rrPts(CHX + 190, 560, 110, 360, 50), { wash: '#6E86A8', ink: PAL.ink, sw: 1.3 });
    // the scarf: from her needles, over the arm of the chair, down into the heap
    boilSeed('f scarf');
    paint(ribbon([tipF, [CHX + 150, 600], [CHX + 250, 560], [CHX + 300, 640], [CHX + 280, 820], [CHX + 250, 900]], 34, 40), { wash: COL.scarf, ink: PAL.ink, sw: .9 });
    for (let i = 1; i < 6; i++) { const a = [[CHX + 150, 600], [CHX + 250, 560], [CHX + 300, 640], [CHX + 280, 820], [CHX + 250, 900]][i - 1]; inkLine([[a[0] - 14, a[1] - 4], [a[0] + 14, a[1] + 4]], .6, COL.scarfDk, 'inkfine', 0); }
    camEnd();
    boilSeed('wipe');
    if (lt < .3) paintWipe(.5 + lt / .6, [COL.scarfDk, COL.scarf]);
  }

  shots([[10.1, shotC], [14.8, shotD], [19.4, shotE], [24.0, shotF]]);
})();
