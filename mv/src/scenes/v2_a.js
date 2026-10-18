// v2_a.js: shots 1–4 of the v2 storyboard (0–15.72 s). Beat 0.8535 s, a beat at 0.07: B(2) 1.78 · B(6) 5.19 · B(10) 8.61 · B(14) 12.02
(() => {
  const NX = 900, LX = 1120, RY = 836, ROCK = [1080, 832];

  // ---------- 1 · 0–5.0 · the sky is huge; on one rooftop sits someone very small ----------
  function shot1(t, lt, dur) {
    const down = ease(seg(lt, .4, 2.8));
    camBegin(960 + 10 * Math.sin(lt * .5), lerp(60, 600, down), lerp(1.0, 1.12, ease(seg(lt, 1.5, dur))));
    nightSky(t, { n: 60 });
    boilSeed('s1 high stars');
    for (let i = 0; i < 40; i++) { const x = hash(i * 7.7) * (W + 600) - 300, y = -560 + hash(i * 3.9) * 320, tw = .6 + .4 * Math.sin(t * (1.2 + hash(i) * 2) + i);
      paint(starPts(x, y, (4 + 7 * hash(i * 9)) * tw, .4, 4), { wash: PAL.cream, washOp: 210, ink: null }); }
    glow(1500, -260, 220, '#DDE6FF', .5);
    boilSeed('s1 moon'); paint(ellPts(1500, -260, 70, 70, 22), { wash: '#F4F0DC', ink: PAL.ink, sw: 1 }); paint(ellPts(1528, -276, 62, 62, 22), { wash: COL.night, ink: null });
    // a shooting star crosses (2.9–3.6), she reaches for it, too far away
    const sk = seg(lt, 2.9, 3.6);
    if (sk > 0 && sk < 1) { boilSeed('s1 shoot'); const p = [lerp(1550, 650, easeIn(sk)), lerp(160, 390, easeIn(sk))];
      glow(...p, 90, '#FFF2C4', 1 - sk * .5); inkLine([p, [p[0] + 160 * (1 - sk * .3), p[1] - 42]], 1.6, '#FFF2C4', 'ink', 0); }
    rooftops(t, 860);
    const m = birdMoods(lt, [[0, 'calm', { lookY: -.8 }], [2.95, 'look', { lookY: -1, lookX: .4 }], [3.75, 'sad', { lookY: -.4 }]]);
    const reach = Math.sin(seg(lt, 3.1, 3.9) * Math.PI);
    birdie(NX, RY, 14, { key: 'n1', ...m, sit: true, wing: lerp(m.wing ?? 2.5, -1.4, reach) });
    const at = toScreen(NX, RY - 80);
    camEnd();
    if (lt < .7) irisFast(960, 540, lerp(0, 1500, easeIn(lt / .7)));
  }

  // ---------- 2 · 5.0–8.48 · she tries to send up a little firework; it fizzles and falls over ----------
  const rocketS2 = lt => {
    if (lt < .5) return { x: lerp(NX + 90, ROCK[0], ease(seg(lt, 0, .5))), y: ROCK[1], rot: 0, held: lt < .45 };
    const hop = lt > 1.3 && lt < 1.75 ? -40 * Math.sin(seg(lt, 1.3, 1.75) * Math.PI) : 0;
    return { x: ROCK[0], y: ROCK[1] + hop, rot: lt < 1.75 ? 0 : lerp(0, 1.45, backOut(seg(lt, 1.75, 2.05))), fuse: lt > .55 && lt < 1.32 ? 1 : 0, fizz: lt - 1.3 };
  };
  function shot2(t, lt, dur) {
    camBegin(990 + 12 * Math.sin(lt * .6), 640, 1.3 + .02 * lt);
    nightSky(t);
    rooftops(t, 860);
    const m = birdMoods(lt, [[0, 'hopeful', { lookX: .8, lookY: .3 }], [.6, 'wow', { lookX: .9, lookY: .2 }], [1.35, 'look', { lookX: .9, lookY: -.3 }], [1.85, 'sad', { lookX: .9, lookY: .4 }], [2.9, 'sad', { lookX: .6, lookY: .5, emote: 'sweat' }]]);
    const r = rocketS2(lt);
    const wing = lt < .5 ? .3 : lt < .9 ? lerp(.3, -1.2, ease(seg(lt, .5, .7))) : lt > 2.6 && lt < 3.1 ? lerp(2.5, .2, Math.sin(seg(lt, 2.6, 3.1) * Math.PI)) : (m.wing ?? 2.5);
    if (!r.held) rocketProp(r.x, r.y, 105, { key: 's2', rot: r.rot, fuse: r.fuse, fizz: r.fizz });
    // the spit of sparks as it fizzles
    if (lt > 1.3 && lt < 1.8) { boilSeed('s2 spit'); for (let i = 0; i < 6; i++) { const q = seg(lt, 1.3 + i * .04, 1.7), a = -Math.PI / 2 + (hash(i) - .5) * 1.4; if (q > 0 && q < 1) memBit(ROCK[0] + Math.cos(a) * 80 * q, ROCK[1] - 115 + Math.sin(a) * 70 * q + 60 * q * q, 7 * (1 - q), 1, 's2s' + i); } }
    birdie(NX, RY, 24, { key: 'n2', ...m, sit: true, wing, hold: r.held ? (u) => rocketProp(0, u * 1.2, 2.9 * u, { key: 's2h' }) : null });
    camEnd();
  }

  // ---------- 3 · 8.48–11.92 · then he arrives with a light for her, and the whole town lights up ----------
  function shot3(t, lt, dur) {
    camBegin(1000 + 10 * Math.sin(lt * .5), 620, 1.22);
    nightSky(t);
    const lit = ease(seg(lt, 2.0, 3.2));
    glow(1000, 700, 900, COL.gold, .35 * lit);
    rooftops(t, 860, { litK: lit });
    rocketProp(ROCK[0] + 120, ROCK[1] + 4, 105, { key: 's3', rot: 1.45 });
    // Lan glides in from the upper right and lands beside her (8.48–9.4)
    const fl = seg(lt, 0, .95), landed = lt >= .95;
    const lx = lerp(1700, LX, easeOut(fl)), ly = landed ? RY : lerp(380, RY, ease(fl));
    const lm = birdMoods(lt, [[0, 'happy'], [1.0, 'happy', { lookX: .7, lookY: .2 }], [2.0, 'love']]);
    const offer = ease(seg(lt, 1.1, 1.6)) * (1 - ease(seg(lt, 1.9, 2.1)));
    const lo = { key: 'l3', who: 'lan', flip: true, ...lm, fly: !landed, sit: landed, noShadow: !landed,
      wing: landed ? lerp(2.5, .3, offer) : Math.PI + 1.0 * Math.sin(lt * 10), wingF: -2.0 + .9 * Math.sin(lt * 10 + .4),
      sq: (lm.sq || 0) + (landed ? take(lt, .95, .6).sq : 0) };
    const given = lt >= 2.05;
    birdie(lx, ly, 24, { ...lo, hold: !given && lt > .3 ? (u) => memBit(0, 0, u * .6, 1, 's3gift') : null });
    const m = birdMoods(lt, [[0, 'sad', { lookY: .4 }], [.7, 'look', { lookX: .9, lookY: -.2 }], [2.05, 'wow', { lookX: .5 }], [2.6, 'happy', { lookX: .6 }]]);
    const take_ = ease(seg(lt, 1.7, 2.05));
    const no = { key: 'n3', ...m, sit: true, wing: given ? .35 : lerp(m.wing ?? 2.5, .35, take_) };
    birdie(NX, RY, 24, { ...no, hold: given ? (u) => memBit(0, 0, u * .7, 1, 's3held') : null });
    const tip = birdTip(NX, RY, 24, no);
    if (given) glow(...tip, 300 + 500 * lit, COL.gold, .5 + .3 * lit);
    const out = easeIn(seg(lt, dur - .4, dur));
    const tipS = toScreen(...tip);
    camEnd();
    if (out > 0) { glow(...tipS, 600 + 1800 * out, COL.gold, out); flashFast(out, '#FFF1D6'); }
  }

  // ---------- 4 · 11.92–15.72 · together over a sea that goes on forever, at sunrise ----------
  function shot4(t, lt, dur) {
    const cx = lerp(900, 1500, lt / dur);
    camBegin(cx, 520, 1.0);
    seaSet(t, { top: '#6F78B8', horizon: '#FFC08A', sea: '#5E79A8', sun: [1400 + lt * 40, 720 - lt * 28], glint: '#FFE2A8', wave: '#4A5F8E', sunCol: '#FFE0A0', glowCol: '#FFD39A' });
    boilSeed('s4 isles');
    for (const [ix, iw] of [[300, 260], [2400, 340]]) paint(through([[ix - iw / 2, 702], [ix - iw * .2, 670], [ix + iw * .1, 660], [ix + iw / 2, 702]], 4), { wash: '#6A6A9A', ink: null });
    const bx = cx - 120 + 30 * Math.sin(lt * 1.3), by = 470 + 20 * Math.sin(lt * 2.4);
    const f1 = Math.sin(lt * 9), f2 = Math.sin(lt * 9 + 1.7);
    birdie(bx + 260, by - 90 + 15 * Math.sin(lt * 2), 18, { key: 'l4', who: 'lan', ...birdMoods(lt, [[0, 'happy'], [1.6, 'chirp'], [2.8, 'happy']]), fly: true, noShadow: true, wing: Math.PI + 1.0 * f2, wingF: -2.0 + .9 * Math.sin(lt * 9 + 2.1), rot: -.05 * f2 });
    birdie(bx, by, 18, { key: 'n4', ...birdMoods(lt, [[0, 'happy', { lookX: .6, lookY: -.3 }], [2.0, 'love', { lookX: .7, lookY: -.4 }]]), fly: true, noShadow: true, wing: Math.PI + 1.0 * f1, wingF: -2.0 + .9 * Math.sin(lt * 9 + .4), rot: -.05 * f1 });
    camEnd();
    flashFast(1 - seg(lt, 0, .4), '#FFF1D6');
    if (lt > dur - .3) paintWipe((lt - (dur - .3)) / .6, [COL.snow, '#C9D6E3']);
  }

  shots([[0, shot1], [5.0, shot2], [8.48, shot3], [11.92, shot4]]);
})();
