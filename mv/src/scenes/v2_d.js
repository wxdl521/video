// v2_d.js: shots 13–14 of the v2 storyboard (42.70–56.0 s). Beat 0.8535 s, a beat at 0.07: B(50) 42.75 · B(54) 46.16 · B(58) 49.57 · B(62) 52.99
(() => {
  // ---------- 13 · 42.70–49.30 · 时差: her sunny window, his night window; she throws the letter away, then sneaks it back ----------
  const SX = 960, SY = 760, LWX = 3500;
  function camE(lt) {
    if (lt < 1.3) return 960;
    if (lt < 2.6) return lerp(960, LWX, ease(seg(lt, 1.3, 2.2)));
    return lerp(LWX, 1020, easeOut(seg(lt, 2.6, 2.95)));
  }
  function shot13(t, lt, dur) {
    const cx = camE(lt), whip = lt > 2.6 && lt < 2.95 ? Math.sin(seg(lt, 2.6, 2.95) * Math.PI) : 0;
    camBegin(cx + 10 * Math.sin(lt), 540, 1.05);
    for (let i = 0; i < 60; i++) { const k = ease(clamp((i - 14) / 32)); flatRect(-800 + i * 96, -1000, 100, 2600, mixCol('#9CCBEA', COL.night, k)); }
    boilSeed('e sun'); glow(520, 210, 260, '#FFE6A0', .8); paint(ellPts(520, 210, 80, 80, 20), { wash: '#FFE38A', ink: PAL.ink, sw: 1 });
    boilSeed('e moon'); glow(3900, 200, 200, '#DDE6FF', .7); paint(ellPts(3900, 200, 60, 60, 20), { wash: '#F4F0DC', ink: PAL.ink, sw: 1 }); paint(ellPts(3925, 185, 52, 52, 20), { wash: COL.night, ink: null });
    boilSeed('e stars'); for (let i = 0; i < 26; i++) { const x = 2700 + hash(i * 3) * 1900, y = hash(i * 7) * 600 - 100; paint(starPts(x, y, 5 + 4 * hash(i), .4, 4), { wash: PAL.cream, washOp: 200, ink: null }); }
    for (let i = 0; i < 6; i++) { const k = clamp((i - 1) / 3.5); flat(through([[-800 + i * 900, 1600], [-600 + i * 900, 720 + 40 * hash(i)], [-100 + i * 900, 690], [400 + i * 900, 740], [600 + i * 900, 1600]], 4), mixCol('#7FB069', '#22305E', k)); }
    flatRect(520, 300, 900, 1300, COL.wall); flatRect(700, 380, 540, 360, '#BFDDF0');
    boilSeed('e her house');
    paint(rectPts(520, 300, 900, 1300), { ink: PAL.ink, sw: 1.2 });
    paint(rectPts(700, 380, 540, 360), { ink: COL.woodDk, sw: 2 });
    inkLine([[970, 380], [970, 740]], 3, COL.woodDk, 'ink', 0);
    paint(rectPts(640, SY, 660, 30), { wash: COL.wood, ink: PAL.ink, sw: 1 });
    flatRect(3050, 300, 900, 1300, '#3B4778'); flatRect(3230, 380, 540, 360, '#5A5F8E');
    boilSeed('e his house');
    paint(rectPts(3050, 300, 900, 1300), { ink: PAL.ink, sw: 1.2 });
    glow(3500, 600, 260, '#F0C27A', .35);
    paint(ellPts(3500, 700, 150, 40, 20), { wash: COL.woodDk, ink: PAL.ink, sw: 1 });
    birdie(3500, 700, 20, { key: 'lanE', who: 'lan', flip: true, sit: true, ...birdMood('sleep', t), emoteK: 1, emoteAge: t, noShadow: true, noBlink: true });
    boilSeed('e his frame');
    paint(rectPts(3230, 380, 540, 360), { ink: COL.woodDk, sw: 2 }); inkLine([[3500, 380], [3500, 560]], 3, COL.woodDk, 'ink', 0);
    paint(rectPts(3170, 740, 660, 30), { wash: COL.wood, ink: PAL.ink, sw: 1 });
    // Nuan: waves the letter; on 也为你骗自己放下 (3.3) crumples it, throws it (3.7), turns away; peeks back, fetches it, hugs it
    const m = birdMoods(lt, [[0, 'happy'], [3.0, 'sad', { lookX: .3, lookY: .4 }], [3.78, 'proud'], [4.6, 'sneaky', { lookX: -1 }], [5.4, 'hopeful']]);
    const away = lt > 3.8 && lt < 4.9;
    const w = stroll(lt, 4.95, 5.35, SX, 1215, 22);
    let wing = -1.45 + .4 * Math.sin(lt * 9);
    if (lt > 2.95) wing = lerp(-1.4, .5, ease(seg(lt, 2.95, 3.1)));
    if (lt > 3.62) wing = lerp(.5, -1.6, ease(seg(lt, 3.62, 3.68)));
    if (lt > 3.7) wing = lerp(-1.6, .9, easeOut(seg(lt, 3.7, 3.8)));
    if (lt > 3.8) wing = 2.5;
    if (lt > 5.3) wing = lerp(.3, 1.15, ease(seg(lt, 5.3, 5.55)));
    const crum = ease(seg(lt, 3.3, 3.65)), unfold = ease(seg(lt, 5.4, 5.65));
    const held = lt < 3.7 ? crum : lt > 5.35 ? 1 - unfold : null;
    if (lt >= 3.7 && lt < 5.35) {
      const q = seg(lt, 3.7, 4.1), p = q < 1 ? arcPt(birdTip(SX, SY, 22, { wing: -1.6 }), [1240, SY - 14], 160, q) : [1240, SY - 14 - 18 * Math.abs(Math.sin((lt - 4.1) * 12)) * Math.exp(-(lt - 4.1) * 7)];
      push(); translate(...p); letterProp(46, 1, 'eball'); pop();
    }
    birdie(lt < 4.95 ? SX : w.x, SY, 22, { key: 'nuanE', ...m, flip: away, wing, walk: lt > 4.95 ? w.walk : null,
      hold: held != null ? (u, sw, a) => { rotate(-a); letterProp(2.4 * u, held, 'eheld'); } : null });
    camEnd();
    whipStreaks(whip, ['#9CCBEA', COL.indigo, PAL.cream]);
    if (lt < .3) irisFast(960, 520, lerp(0, 1500, easeIn(seg(lt, 0, .3))));
    if (lt > dur - .3) paintWipe((lt - (dur - .3)) / .6, [COL.scarfDk, COL.scarf]);
  }

  // ---------- 14 · 49.30–56.0 · she knits him a scarf that piles up across the floor while she freezes;
  //                             then she wraps the end of it round her own neck, and smiles ----------
  const CHX = 860, SEAT = 700, UF = 24;
  function shot14(t, lt, dur) {
    camBegin(960 + 15 * Math.sin(lt * .5) - 60 * ease(seg(lt, 4.4, 5.6)), 560, 1.04 + .012 * lt + .12 * ease(seg(lt, 4.4, 5.6)));
    roomWithWindow(150, 130, 420, 360, () => windowSky(t, 150, 130, 420, 360, { n: 8, col: '#2A3466', snow: 14 + Math.round(24 * seg(lt, 1.6, 3.4)) }), { lamp: '#F3D7A8' });
    floorAndTable(0, 750, 0, { floor: '#B98F6C' });
    boilSeed('f side');
    paint(rectPts(1420, 640, 220, 26), { wash: COL.wood, ink: PAL.ink, sw: 1 }); paint(rectPts(1515, 666, 30, 250), { wash: COL.woodDk, ink: PAL.ink, sw: 1 });
    memJar(1530, 640, 70, { key: 'f', fill: 3, glow: .35 + .3 * ease(seg(lt, 5.0, 5.6)) });
    boilSeed('f chair back');
    paint(rrPts(CHX - 230, 330, 460, 520, 90), { wash: '#6E86A8', ink: PAL.ink, sw: 1.3 });
    const L = ease(seg(lt, 0, 3.4)), heapN = Math.round(2 + 12 * L);
    boilSeed('f heap');
    for (let i = 0; i < heapN; i++) {
      const hx = CHX + 230 + i * 34 + 10 * Math.sin(i * 2.1), hy = 905 - (i % 3) * 22 - 40 * L * Math.sin(i / Math.max(1, heapN - 1) * Math.PI);
      paint(ellPts(hx, hy, 60, 34, 14, 2, i * .7), { wash: i % 2 ? COL.scarf : mixCol(COL.scarf, COL.scarfDk, .4), ink: PAL.ink, sw: .9 });
      inkLine([[hx - 30, hy - 8], [hx + 30, hy - 14]], .7, COL.scarfDk, 'inkfine', .3);
    }
    const knit = lt < 3.5, wrap = ease(seg(lt, 4.7, 5.3));
    const m = birdMoods(lt, [[0, 'happy', { emote: 'hearts', lookX: .3, lookY: .6 }], [1.6, 'calm', { lookY: .6 }], [2.3, 'shiver', { lookY: .5 }], [3.6, 'wow', { beak: 1 }],
      [4.15, 'sad', { lookX: .8, lookY: .7 }], [4.55, 'look', { lookX: -.2, lookY: .6 }], [5.15, 'love'], [5.6, 'happy']]);
    const sneeze = take(lt, 3.75, 1.3);
    let wing = knit ? .35 + .22 * Math.sin(lt * 15) : lerp(.35, 1.0, ease(seg(lt, 3.6, 3.9)));
    if (lt > 4.6) wing = lerp(1.0, -.7, Math.sin(seg(lt, 4.6, 5.4) * Math.PI));
    if (lt > 5.4) wing = lerp(1.0, 1.25, ease(seg(lt, 5.4, 5.7)));
    const o = { key: 'nuanF', sit: true, ...m, sq: (m.sq || 0) + sneeze.sq, dy: (m.dy || 0) + sneeze.dy, wing, noShadow: true, scarf: wrap,
      hold: knit ? (u, sw) => { boilSeed('needles'); inkLine([[-1.4 * u, -1.2 * u], [1.6 * u, .9 * u]], sw * 1.1, '#D9C9A8', 'ink', 0); inkLine([[-1.2 * u, .8 * u], [1.5 * u, -1.0 * u]], sw * 1.1, '#D9C9A8', 'ink', 0); } : null };
    birdie(CHX, SEAT, UF, o);
    // the sneeze: a puff off her face
    if (lt > 3.75 && lt < 4.35) { const q = seg(lt, 3.75, 4.35), bk = birdBeak(CHX, SEAT, UF, { sit: true }); boilSeed('sneeze'); for (let i = 0; i < 4; i++) paint(ellPts(bk[0] + 40 + q * 160 + i * 30, bk[1] - 10 + (i - 1.5) * 26 * q, 22 * (1 - q) + 4, 18 * (1 - q) + 4, 10), { wash: PAL.cream, washOp: 220 * (1 - q), ink: q < .5 ? PAL.ink : null, sw: .6 }); }
    boilSeed('f chair front');
    paint(rrPts(CHX - 250, SEAT - 10, 500, 200, 40), { wash: '#7F98BA', ink: PAL.ink, sw: 1.3 });
    paint(rrPts(CHX - 300, 560, 110, 360, 50), { wash: '#6E86A8', ink: PAL.ink, sw: 1.3 });
    paint(rrPts(CHX + 190, 560, 110, 360, 50), { wash: '#6E86A8', ink: PAL.ink, sw: 1.3 });
    // the scarf strand: from her needles while she knits, from her own neck once she has wrapped it, over the chair arm into the heap
    const from = lt < 4.75 ? birdTip(CHX, SEAT, UF, { wing: knit ? wing : lerp(.35, 1.0, ease(seg(lt, 3.6, 3.9))), sit: true }) : neckPt(CHX, SEAT, UF, { sit: true });
    const path = [from, [CHX + 150, 600], [CHX + 250, 560], [CHX + 300, 640], [CHX + 280, 820], [CHX + 250, 900]];
    boilSeed('f scarf');
    paint(ribbon(path, 34, 40), { wash: COL.scarf, ink: PAL.ink, sw: .9 });
    for (let i = 1; i < 6; i++) { const a = path[i]; inkLine([[a[0] - 14, a[1] - 4], [a[0] + 14, a[1] + 4]], .6, COL.scarfDk, 'inkfine', 0); }
    if (lt > 5.1) glow(CHX + 40, SEAT - 120, 380, '#FFD9A0', .35 * ease(seg(lt, 5.1, 5.6)));
    const at = toScreen(CHX + 30, SEAT - 120);
    camEnd();
    if (lt < .3) paintWipe(.5 + lt / .6, [COL.scarfDk, COL.scarf]);
    if (lt > 5.9) irisFast(...at, lerp(1500, 0, easeIn(seg(lt, 5.9, 6.6))));
  }

  shots([[42.70, shot13], [49.30, shot14]]);
})();
