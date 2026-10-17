// c1_rooftop.js: shots A–B (0–10.1 s). Beat 0.8535 s, a beat at 0.07: B(n) = OFF + n * BEAT
// B(1) 0.92 · B(4) 3.48 · B(6) 5.19 · B(7) 6.04 · B(9) 7.75 · B(11) 9.46
(() => {
  const NX = 820, LX = 1110, RY = 836, U = 24;             // Nuan, Lan, the ridge they sit on

  // Nuan's pose in shot A (shared with the camera, which pushes in on the spark she catches)
  const nuanA = lt => {
    const m = birdMoods(lt, [[0, 'calm', { lookX: .6 }], [1.75, 'love', { lookX: .6 }], [3.22, 'wow', { lookX: .4, lookY: -1 }],
      [3.9, 'look', { lookX: .5, lookY: -1 }], [4.55, 'look', { lookX: .7, lookY: .1 }], [5.22, 'happy', { lookX: .5, lookY: .4 }]]);
    const reach = ease(seg(lt, 4.8, 5.15));
    return { key: 'nuan', ...m, wing: lerp(m.wing ?? 2.5, .35, reach) };
  };
  const TIP = birdTip(NX, RY, U, { wing: .35 });          // where the spark lands

  // ---------- A · 0–5.6 · rooftop: Lan sings to her, a firework, a spark falls into her wing ----------
  function shotA(t, lt, dur) {
    const k = ease(seg(lt, 4.95, 5.6));
    camBegin(lerp(965 + 14 * Math.sin(lt * .5), TIP[0], k), lerp(640 - 8 * lt, TIP[1], k), lerp(1.15 + .015 * lt, 2.5, easeIn(k)));
    nightSky(t);
    // fireworks: a rocket climbs (2.75–3.2), bursts on the line 像转瞬即逝的烟花 (3.2); a smaller one answers (3.75)
    rocket(1320, 760, 1180, 250, seg(lt, 2.75, 3.2));
    firework(1180, 250, 270, lt - 3.2, [COL.gold, PAL.rose, PAL.cream], 'a1');
    firework(620, 300, 170, lt - 3.75, ['#9FDCD6', PAL.cream], 'a2');
    rooftops(t, 860);
    const lit = lt > 3.2 ? Math.exp(-(lt - 3.2) * 1.3) : 0;
    if (lit > .02) glow(980, 640, 700, COL.gold, .55 * lit);
    // Lan: sings to her, leaning in, then looks up at the burst
    const lm = birdMoods(lt, [[0, 'calm', { lookX: .4 }], [1.12, 'chirp'], [2.95, 'happy'], [3.24, 'wow', { lookY: -1 }], [3.95, 'happy', { lookY: -1 }]]);
    const lean = ease(seg(lt, 1.0, 1.35)) * (1 - ease(seg(lt, 2.85, 3.2)));
    birdie(LX, RY - 4, U, { key: 'lan', who: 'lan', flip: true, ...lm, dx: (lm.dx || 0) - .55 * lean, rot: (lm.rot || 0) - .1 * lean });
    // the spark: drifts down from the fading burst (4.35) into her raised wing (5.2), then she holds it
    const n = nuanA(lt), held = lt >= 5.2;
    birdie(NX, RY, U, { ...n, hold: held ? (u, sw) => memBit(0, 0, u * .7, 1, 'aheld') : null });
    if (!held && lt > 4.3) {
      const q = seg(lt, 4.35, 5.2), sx = lerp(1150, TIP[0], ease(q)) + 50 * Math.sin(q * 7) * (1 - q), sy = lerp(400, TIP[1], q);
      memBit(sx, sy, 15 * Math.min(1, (lt - 4.3) * 4), 1, 'afall');
    }
    if (lit > .02) glow(960, 700, 520, COL.gold, .3 * lit);
    const at = toScreen(965, 720);
    camEnd();
    if (lt < .75) irisFast(...at, lerp(0, 1500, easeIn(lt / .75)));
  }

  // ---------- B · 5.6–10.1 · close-up: she holds it, eyes closed, leaning on him; opens them: he's gone ----------
  const UB = 60, XB = 760, YB = 1120;
  function shotB(t, lt, dur) {
    const m = birdMoods(lt, [[0, 'happy', { lookX: .4, lookY: .5 }], [1.8, 'dreamy'], [3.3, 'look', { lookX: 1 }], [3.95, 'sad', { lookX: 1, lookY: .3 }]]);
    const lean = ease(seg(lt, 1.8, 2.6)) * (1 - backOut(seg(lt, 3.25, 3.6)));
    const o = { key: 'nuanB', ...m, rot: (m.rot || 0) + .13 * lean, wing: .35 + .08 * Math.sin(lt * 2), noShadow: true,
      hold: (u, sw) => memBit(0, 0, u * .55, 1, 'bheld') };
    const tip = birdTip(XB, YB, UB, o);
    // the camera starts on the spark (the match from A), eases to frame her face, then pans right to the empty spot
    const pan = ease(seg(lt, 3.3, 3.95));
    const cx = lerp(lerp(tip[0], 850, ease(seg(lt, 0, 1.2))), 1250, pan), cy = lerp(lerp(tip[1], 600, ease(seg(lt, 0, 1.2))), 640, pan);
    camBegin(cx + 10 * Math.sin(lt * .7), cy, lerp(lerp(1.0, 1.0, 0), .95, pan));
    nightSky(t, { n: 30 });
    // a near roof edge the bird stands on
    boilSeed('b roof');
    flat([[-300, 1000], [2400, 960], [2400, 1500], [-300, 1500]], COL.roof);
    paint([[-300, 975], [2400, 935], [2400, 985], [-300, 1025]], { wash: COL.roofDk, ink: PAL.ink, sw: 1.2 });
    for (let i = 0; i < 9; i++) inkLine([[-200 + i * 300, 1000 - i * 4.5], [-320 + i * 300, 1400]], 1, COL.roofDk, 'ink', 0);
    // what's left where Lan sat: one blue feather on the ridge
    glow(1400, 940, 140, '#BFD8FF', .35);
    feather(1330, 950, 190, -.1, 'bf');
    glow(tip[0], tip[1], 260, COL.gold, .6);
    birdie(XB, YB, UB, o);
    camEnd();
    boilSeed('wipe');
    if (lt > dur - .3) paintWipe((lt - (dur - .3)) / .6, [COL.indigo, COL.night]);
  }

  shots([[0, shotA], [5.6, shotB]]);
})();
