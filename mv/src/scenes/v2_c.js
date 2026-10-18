// v2_c.js: shots 9–12 of the v2 storyboard (28.52–42.70 s). Beat 0.8535 s, a beat at 0.07: B(33) 28.24 · B(37) 31.65 · B(41) 35.06 · B(45) 38.48 · B(50) 42.75
(() => {
  const NX = 900, LX = 1120, RY = 836, U = 24, ROCK_LIE = [1200, 840], ROCK_UP = [1250, 832];
  const BURSTS = [[33.16, 1180, 250, 280, [COL.gold, PAL.rose, PAL.cream]], [33.76, 640, 300, 170, ['#9FDCD6', PAL.cream]], [34.26, 1560, 340, 190, [COL.gold, PAL.rose]]];
  const TIP = birdTip(NX, RY, U, { wing: .35, sit: true });

  // ---------- 9 · 28.52–31.56 · on the rooftop he sings her sweet words; then he notices the dud firework ----------
  function shot9(t, lt, dur) {
    camBegin(1000 + 12 * Math.sin(lt * .5), 640, 1.22);
    nightSky(t);
    rooftops(t, 860);
    rocketProp(...ROCK_LIE, 105, { key: 's9', rot: 1.45 });
    const lm = birdMoods(lt, [[0, 'calm', { lookX: .4 }], [.25, 'chirp'], [2.25, 'look', { lookX: -1, emote: 'bulb' }]]);
    const lean = ease(seg(lt, .15, .5)) * (1 - ease(seg(lt, 2.0, 2.3)));
    birdie(LX, RY - 4, U, { key: 'l9', who: 'lan', flip: true, sit: true, ...lm, dx: (lm.dx || 0) - .55 * lean, rot: (lm.rot || 0) - .1 * lean });
    birdie(NX, RY, U, { key: 'n9', sit: true, ...birdMoods(lt, [[0, 'calm', { lookX: .6 }], [.9, 'love', { lookX: .6 }], [2.4, 'look', { lookX: .9, lookY: .1 }]]) });
    camEnd();
    if (lt < .3) paintWipe(.5 + lt / .6, [COL.indigo, COL.night]);
  }

  // ---------- 10 · 31.56–36.6 · he relights it: this time it climbs and blooms; the sky fills; then it fades, and a spark falls to her ----------
  function shot10(t, lt, dur) {
    const up = ease(seg(lt, 1.0, 1.8)) * (1 - ease(seg(lt, 3.4, 4.4)));
    camBegin(1000 + 12 * Math.sin(lt * .5), 640 - 90 * up, 1.22 - .06 * up);
    nightSky(t);
    // the rocket: stood up (0–0.5), fuse (0.6–1.05), away (1.05–1.6), and the bursts
    const stand = ease(seg(lt, .1, .5));
    if (lt < 1.05) rocketProp(lerp(ROCK_LIE[0], ROCK_UP[0], stand), lerp(ROCK_LIE[1], ROCK_UP[1], stand), 105, { key: 's10', rot: lerp(1.45, 0, stand), fuse: lt > .6 ? 1 : 0 });
    rocket(ROCK_UP[0], ROCK_UP[1] - 105, 1180, 250, seg(lt, 1.05, 1.6));
    for (const [tb, x, y, r, cols] of BURSTS) firework(x, y, r, t - tb, cols, 'b' + tb);
    rooftops(t, 860);
    const lit = t > 33.16 ? Math.exp(-(t - 33.16) * 1.2) : 0;
    if (lit > .02) glow(980, 640, 700, COL.gold, .55 * lit);
    const lm = birdMoods(lt, [[0, 'look', { lookX: .8, lookY: .3 }], [1.1, 'look', { lookX: .2, lookY: -1 }], [1.62, 'wow', { lookY: -1 }], [2.2, 'happy', { lookY: -1 }]]);
    birdie(LX, RY - 4, U, { key: 'l10', who: 'lan', sit: true, ...lm, wing: lt < .55 ? lerp(2.5, .1, Math.sin(seg(lt, .05, .55) * Math.PI)) : lm.wing, sq: (lm.sq || 0) + take(lt, .02, .5).sq });
    // the spark: drifts down from the fading burst (4.1) into her wing (4.85)
    const nm = birdMoods(lt, [[0, 'look', { lookX: .8 }], [1.1, 'look', { lookX: .3, lookY: -1 }], [1.62, 'wow', { lookY: -1 }], [2.2, 'love', { lookY: -1 }], [4.1, 'look', { lookX: .6, lookY: .1 }], [4.9, 'happy', { lookX: .5, lookY: .4 }]]);
    const held = lt >= 4.85, reach = ease(seg(lt, 4.45, 4.8));
    birdie(NX, RY, U, { key: 'n10', sit: true, ...nm, wing: lerp(nm.wing ?? 2.5, .35, reach), hold: held ? (u) => memBit(0, 0, u * .7, 1, 's10held') : null });
    if (!held && lt > 4.0) { const q = seg(lt, 4.05, 4.85); memBit(lerp(1150, TIP[0], ease(q)) + 50 * Math.sin(q * 7) * (1 - q), lerp(400, TIP[1], q), 15 * Math.min(1, (lt - 4.0) * 4), 1, 's10fall'); }
    if (lit > .02) glow(960, 700, 520, COL.gold, .3 * lit);
    camEnd();
  }

  // ---------- 11 · 36.6–38.36 · close-up: eyes closed, leaning toward him; she opens them and he is gone ----------
  const UB = 60, XB = 760, YB = 1120;
  function shot11(t, lt, dur) {
    const m = birdMoods(lt, [[0, 'dreamy'], [.85, 'look', { lookX: 1 }], [1.4, 'sad', { lookX: 1, lookY: .3 }]]);
    const lean = ease(seg(lt, 0, .4)) * (1 - backOut(seg(lt, .8, 1.1)));
    const o = { key: 'n11', sit: true, ...m, rot: (m.rot || 0) + .13 * lean, wing: .35 + .08 * Math.sin(lt * 2), noShadow: true, hold: (u) => memBit(0, 0, u * .55, 1, 's11held') };
    const pan = ease(seg(lt, .85, 1.4));
    camBegin(lerp(850, 1250, pan) + 8 * Math.sin(lt), lerp(600, 640, pan), lerp(1.0, .95, pan));
    nightSky(t, { n: 30 });
    flat([[-300, 1000], [2400, 960], [2400, 1500], [-300, 1500]], COL.roof);
    boilSeed('s11 roof');
    paint([[-300, 975], [2400, 935], [2400, 985], [-300, 1025]], { wash: COL.roofDk, ink: PAL.ink, sw: 1.2 });
    for (let i = 0; i < 9; i++) inkLine([[-200 + i * 300, 1000 - i * 4.5], [-320 + i * 300, 1400]], 1, COL.roofDk, 'ink', 0);
    glow(1400, 940, 140, '#BFD8FF', .35);
    feather(1330, 950, 190, -.1, 's11f');
    const tip = birdTip(XB, YB, UB, o);
    glow(...tip, 260, COL.gold, .6);
    birdie(XB, YB, UB, o);
    camEnd();
    if (lt > dur - .3) paintWipe((lt - (dur - .3)) / .6, ['#E59A6B', '#B5739A']);
  }

  // ---------- 12 · 38.36–42.70 · alone over the dusk sea, wings slower and slower, down onto a lone post ----------
  const POST = [1457, 640];
  function shot12(t, lt, dur) {
    camBegin(lerp(900, 1200, ease(seg(lt, 0, dur))), 520, 1.0);
    seaSet(t, { top: '#9E6A98', horizon: '#F2B07C', sea: '#6E5A8A', sun: [1250, 600 + lt * 30] });
    boilSeed('s12 post');
    paint(rectPts(POST[0] - 17, POST[1], 34, 320), { wash: COL.woodDk, ink: PAL.ink, sw: 1 });
    inkLine([[POST[0] - 40, 760], [POST[0] + 40, 762]], .8, '#FFC98A', 'ink', 0);
    const tl = 3.0, fl = seg(lt, 0, tl), landed = lt >= tl;
    const ph = lt < 2.7 ? 10 * lt - 1.85 * lt * lt : 10 * 2.7 - 1.85 * 2.7 * 2.7;
    const x = lerp(150, POST[0], ease(fl)), y = landed ? POST[1] : lerp(330, POST[1], easeIn(fl)) + 25 * Math.sin(lt * 2.4) * (1 - fl);
    const m = birdMoods(lt, [[0, 'tired'], [tl + .05, 'tired', { lookY: .3 }], [3.6, 'sad', { lookY: .4 }]]);
    birdie(x, y, 12, { key: 'n12', ...m, fly: !landed, noShadow: true, wing: landed ? 2.6 : Math.PI + 1.0 * Math.sin(ph), wingF: -2.1 + .8 * Math.sin(ph + .4),
      sq: (m.sq || 0) + (landed ? take(lt, tl, .6).sq : 0) });
    const at = toScreen(POST[0], POST[1] - 60);
    camEnd();
    if (lt < .3) paintWipe(.5 + lt / .6, ['#E59A6B', '#B5739A']);
    if (lt > dur - .55) irisFast(...at, lerp(1500, 0, easeIn(seg(lt, dur - .55, dur - .05))));
  }

  shots([[28.52, shot9], [31.56, shot10], [36.6, shot11], [38.36, shot12]]);
})();
