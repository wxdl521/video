// c4_heart.js: shots J–L (41.0–56.0 s). Beat 0.8535 s, a beat at 0.07: B(48) 41.04 · B(53) 45.31 · B(57) 48.72 · B(61) 52.14
(() => {
  // ---------- J · 41.0–45.5 · she tips the jar out; the pieces fit together into a heart; she holds it tight ----------
  const TJ = 780, JJ = 1260, JS = 110, HC = [980, 500], HR = 120, UJ = 24;
  const heartSpots = heartPts(HC[0], HC[1], HR * .8, 10);
  const nuanXJ = lt => stroll(lt, 0, .35, 700, 1010, UJ);
  const chestJ = u => [2.0 * u, -4.6 * u];
  function shotJ(t, lt, dur) {
    const push_ = ease(seg(lt, 2.4, dur - .45)), dive = easeIn(seg(lt, dur - .45, dur));
    const w = nuanXJ(lt);
    const m = birdMoods(lt, [[0, 'calm', { lookX: .8 }], [1.0, 'look', { lookX: .3, lookY: -1 }], [2.0, 'wow', { lookY: -1 }], [2.55, 'love'], [3.3, 'dreamy']]);
    let wing = m.wing ?? 2.5;
    if (lt < .7) wing = lerp(2.5, .15, ease(seg(lt, .2, .4)));
    else if (lt < 2.4) wing = lerp(.15, 2.5, ease(seg(lt, .7, .9)));
    else wing = lerp(2.5, 1.3, ease(seg(lt, 2.4, 2.6)));
    const o = { key: 'nuanJ', ...m, wing, walk: lt < .4 ? w.walk : null, dy: (m.dy || 0) + (lt < .4 ? w.dy : 0) };
    const hugged = lt >= 2.55;
    const chestW = birdPt(w.x, TJ, UJ, o, ...chestJ(UJ));
    const cam = [lerp(lerp(1000, 1010, push_), chestW[0], dive), lerp(lerp(560, 620, push_), chestW[1], dive)];
    camBegin(cam[0] + 8 * Math.sin(lt), cam[1], lerp(lerp(1.15, 1.35, push_), 2.6, dive));
    roomWithWindow(240, 120, 440, 340, () => windowSky(t, 240, 120, 440, 340, { n: 14 }), { lamp: '#F6D29A' });
    floorAndTable(980, TJ, 1400);
    glow(600, 330, 500, '#F6D29A', .25);
    // the jar tips over (0.35–0.7) and the pieces pour out across the table
    const tip = ease(seg(lt, .35, .7)), out = lt > .62;
    push(); translate(JJ - JS * .82, TJ); rotate(-1.2 * tip); translate(-(JJ - JS * .82), -TJ);
    memJar(JJ, TJ, JS, { key: 'j', crack: 1, bow: 1, bowPop: 1, fill: out ? 0 : 9, glow: out ? .15 : .55 });
    pop();
    const mouth = [JJ - JS * 1.9, TJ - JS * .7];
    // each piece: pours out (0.62–1.0), rests, glides on an arc into its place in the heart (1.0 + i·0.09), glows
    const lit = ease(seg(lt, 2.0, 2.25));
    if (out && lt < 2.25) heartSpots.forEach((hp, i) => {
      const rest = [860 + i * 34 + 20 * hash(i), TJ - 14];
      const k1 = easeOut(seg(lt, .62 + i * .02, 1.0)), t2 = 1.0 + i * .09, k2 = ease(seg(lt, t2, t2 + .45));
      const p1 = arcPt(mouth, rest, 60, k1), p = k2 > 0 ? arcPt(rest, hp, 140, k2) : p1;
      memBit(...p, 14 * (1 - .6 * lit), 1, 'jp' + i);
    });
    // the heart: lights up (2.0), flies to her (2.25–2.55), then she holds it against her chest
    if (lt >= 2.0 && !hugged) {
      const k = ease(seg(lt, 2.25, 2.55)), p = [lerp(HC[0], chestW[0], k), lerp(HC[1], chestW[1], k)];
      heartLight(...p, lerp(HR, 2.2 * UJ, k), lit, 'jh');
    }
    birdie(w.x, TJ, UJ, { ...o, chest: hugged ? (u) => heartLight(...chestJ(u), 2.2 * u, 1, 'jhug') : null });
    if (lt > 2.0 && lt < 2.4) glow(...HC, 400, COL.gold, .6 * (1 - seg(lt, 2.0, 2.4)));
    camEnd();
    if (lt < .45) irisFast(960, 540, lerp(0, 1500, easeIn(lt / .45)));
    flashFast(dive * .9, '#FFE7B8');
  }

  // ---------- K · 45.5–49.0 · on the windowsill with the heart, days and seasons rush past outside; it keeps glowing ----------
  const WX = 560, WY = 150, WW = 800, WH = 500, SILL = WY + WH + 10, UK = 22, NXK = 900;
  const chestK = u => [2.0 * u, -4.6 * u];
  function outsideK(t, lt) {
    const u = frac(lt / 1.15 + .1), night = .5 - .5 * Math.cos(u * TAU);
    flatRect(WX, WY, WW, WH, mixCol('#9CCBEA', COL.night, night));
    // the sun by day, the moon by night, each crossing the pane on an arc
    const arcAt = q => [WX + WW * q, WY + WH * .95 - WH * .75 * Math.sin(q * Math.PI)];
    const ps = frac(u + .25);
    boilSeed('k sky');
    if (ps < .5) { const p = arcAt(ps * 2); glow(...p, 160, '#FFE6A0', .8); paint(ellPts(...p, 44, 44, 18), { wash: '#FFE38A', ink: PAL.ink, sw: .8 }); }
    else { const p = arcAt((ps - .5) * 2); glow(...p, 130, '#DDE6FF', .6); paint(ellPts(...p, 34, 34, 18), { wash: '#F4F0DC', ink: PAL.ink, sw: .8 }); }
    flat(through([[WX, WY + WH * .82], [WX + 300, WY + WH * .74], [WX + 600, WY + WH * .8], [WX + WW, WY + WH * .76]], 4).concat([[WX + WW, WY + WH], [WX, WY + WH]]), mixCol('#7FB069', '#22305E', night));
    // the seasons: falling leaves, then snow, then blossom petals, all inside the pane
    const season = lt < 1.2 ? 0 : lt < 2.4 ? 1 : 2, cols = ['#E08A3C', COL.snow, '#F4B6C8'];
    boilSeed('k fall');
    for (let i = 0; i < 18; i++) {
      const x = WX + 20 + frac(hash(i * 1.7) + .02 * Math.sin(t + i)) * (WW - 40), y = WY + 10 + frac(hash(i * 4.1) + t * (.25 + .2 * hash(i))) * (WH - 30);
      if (season === 1) paint(ellPts(x, y, 5, 5, 8), { wash: cols[1], ink: null });
      else paint(ellPts(x, y, 9, 5, 10, 0, t * 3 + i), { wash: cols[season], ink: PAL.ink, sw: .4 });
    }
    // a branch across the top corner that changes with the seasons
    boilSeed('k branch');
    paint(ribbon([[WX + WW + 10, WY + 60], [WX + WW - 200, WY + 110], [WX + WW - 420, WY + 90]], 24, 6), { wash: COL.woodDk, ink: PAL.ink, sw: .8 });
    for (let i = 0; i < 6; i++) { const bx = WX + WW - 60 - i * 62, byy = WY + 85 + 18 * Math.sin(i * 1.3);
      if (season === 0 && hash(i) > .3) paint(ellPts(bx, byy + 14, 16, 9, 12, 0, .6), { wash: '#E08A3C', ink: PAL.ink, sw: .5 });
      if (season === 1) paint(ellPts(bx, byy - 8, 22, 8, 12), { wash: COL.snow, ink: null });
      if (season === 2) paint(starPts(bx, byy + 6, 14, .5, 5), { wash: '#F4B6C8', ink: PAL.ink, sw: .5 }); }
  }
  function shotK(t, lt, dur) {
    const m = birdMoods(lt, [[0, 'calm', { lookX: .5, lookY: -.5 }], [2.4, 'hopeful', { lookY: -.6 }]]);
    const o = { key: 'nuanK', ...m, wing: 1.3, noShadow: true };
    const heartW = birdPt(NXK, SILL, UK, o, ...chestK(UK));
    const back = ease(seg(lt, 0, 1.0)), dive = easeIn(seg(lt, dur - .35, dur));
    const zoom = lt < 1 ? lerp(2.6, 1.0, back) : lerp(1.0 + .03 * (lt - 1), 2.6, dive);
    const cx = lt < 1 ? lerp(heartW[0], 960, back) : lerp(960, heartW[0], dive), cy = lt < 1 ? lerp(heartW[1], 470, back) : lerp(470, heartW[1], dive);
    camBegin(cx, cy, zoom);
    roomWithWindow(WX, WY, WW, WH, () => outsideK(t, lt), { lamp: '#F6D29A' });
    floorAndTable(0, 820, 0);
    birdie(NXK, SILL, UK, { ...o, chest: (u) => heartLight(...chestK(u), 2.2 * u, 1, 'khug') });
    camEnd();
    flashFast(Math.max(.9 * (1 - seg(lt, 0, .35)), .9 * dive), '#FFE7B8');
  }

  // ---------- L · 49.0–56.0 · the rooftop again, alone, in the scarf: she lets the heart go; it blooms into a firework ----------
  const NX = 900, RY = 836, U = 24, SKY = [1150, 260];
  const chestL = u => [2.0 * u, -4.6 * u];
  function nuanL(lt) {
    const m = birdMoods(lt, [[0, 'calm', { lookX: .8 }], [1.0, 'hopeful', { lookY: -.4 }], [2.25, 'hopeful', { lookY: -1, lookX: .4 }], [3.03, 'wow', { lookY: -1, lookX: .3 }],
      [3.6, 'smileCry', { lookY: -.8 }], [4.45, 'look', { lookX: .7, lookY: .1 }], [5.15, 'happy', { lookX: .5, lookY: .4 }]]);
    let wing = 1.3;
    if (lt > 1.6) wing = lerp(1.3, -1.45, ease(seg(lt, 1.6, 2.2)));
    if (lt > 2.3) wing = lerp(-1.45, 2.5, ease(seg(lt, 2.3, 2.7)));
    if (lt > 4.8) wing = lerp(2.5, .35, ease(seg(lt, 4.8, 5.1)));
    return { key: 'nuanL', ...m, wing, scarf: 1 };
  }
  const TIPL = birdTip(NX, RY, U, { wing: .35 });
  function shotL(t, lt, dur) {
    const o = nuanL(lt);
    const chestW = birdPt(NX, RY, U, o, ...chestL(U)), back = ease(seg(lt, 0, 1.4)), up = ease(seg(lt, 2.2, 3.2)) * (1 - ease(seg(lt, 4.2, 5.2)));
    camBegin(lerp(chestW[0], 965, back), lerp(chestW[1], 620, back) - 90 * up, lerp(2.6, 1.15, back) + .015 * lt);
    nightSky(t);
    // the heart rises (2.25–3.0) and blooms into a heart-shaped firework (3.0); two more answer it
    const rise = seg(lt, 2.25, 3.0);
    if (lt >= 2.25 && lt < 3.0) { const from = birdTip(NX, RY, U, { ...o, wing: -1.45 }), k = ease(rise);
      heartLight(lerp(from[0], SKY[0], k) + 30 * Math.sin(rise * 8) * (1 - k), lerp(from[1], SKY[1], k), lerp(2 * U, 70, k), 1, 'lrise'); }
    firework(...SKY, 310, lt - 3.0, [PAL.rose, COL.gold, PAL.cream], 'l1', 'heart');
    firework(620, 330, 170, lt - 3.45, ['#9FDCD6', PAL.cream], 'l2');
    firework(1520, 360, 190, lt - 3.9, [COL.gold, PAL.rose], 'l3');
    rooftops(t, 860);
    const lit = lt > 3.0 ? Math.exp(-(lt - 3.0) * 1.1) : 0;
    if (lit > .02) glow(980, 640, 700, '#FFB0C0', .5 * lit);
    const held = lt < 2.25 ? 'chest' : lt >= 5.1 ? 'spark' : null;
    birdie(NX, RY, U, { ...o,
      chest: held === 'chest' && lt < 1.6 ? (u) => heartLight(...chestL(u), 2 * u, 1, 'lhug') : null,
      hold: lt >= 1.6 && lt < 2.25 ? (u) => heartLight(0, -.5 * u, 2 * u, 1, 'lup') : held === 'spark' ? (u) => memBit(0, 0, u * .7, 1, 'lheld') : null });
    // one spark drifts down into her wing, as on the first night
    if (lt > 4.3 && lt < 5.1) { const q = seg(lt, 4.35, 5.1); memBit(lerp(1180, TIPL[0], ease(q)) + 50 * Math.sin(q * 7) * (1 - q), lerp(380, TIPL[1], q), 15 * Math.min(1, (lt - 4.3) * 4), 1, 'lfall'); }
    if (lit > .02) glow(960, 700, 520, COL.gold, .3 * lit);
    const at = toScreen(NX + 30, RY - 120);
    camEnd();
    flashFast(.9 * (1 - seg(lt, 0, .35)), '#FFE7B8');
    if (lt > 5.4) irisFast(...at, lerp(1500, 0, easeIn(seg(lt, 5.4, 6.75))));
  }

  shots([[41.0, shotJ], [45.5, shotK], [49.0, shotL]]);
})();
