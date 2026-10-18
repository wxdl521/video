// v2_b.js: shots 5–8 of the v2 storyboard (15.72–28.52 s). Beat 0.8535 s, a beat at 0.07: B(18) 15.43 · B(22) 18.85 · B(26) 22.26 · B(30) 25.68
(() => {
  // ---------- 5 · 15.72–19.16 · a snowy day, walking side by side under one long red scarf ----------
  const GY = 820;
  function shot5(t, lt, dur) {
    const w = stroll(lt, .15, dur - .1, 560, 1240, 24), nx = w.x, lxw = nx + 175;
    camBegin(nx + 120, 600, 1.25);
    flatRect(-3000, -3000, 9000, 6000, '#CCD8E6');
    glow(1300, 80, 1100, '#40382A', .2);
    const hills = through([[-1800, 700], [-400, 615], [600, 660], [1500, 595], [2600, 650], [3600, 620]], 4);
    flat(hills.concat([[3600, 900], [-1800, 900]]), '#DFE7F0');
    boilSeed('s5 hills'); inkLine(hills, .9, '#A9B6C8', 'ink', .4);
    for (const [tx, th] of [[380, 290], [1120, 240], [1900, 320]]) {
      boilSeed('s5 tree' + tx); const tc = mixCol(COL.woodDk, '#8090A8', .35), sway = 4 * Math.sin(t * 1.3 + tx);
      paint(ribbon([[tx, GY - 30], [tx + 6, GY - 30 - th * .5], [tx + 4 + sway, GY - 30 - th]], 26, 6), { wash: tc, ink: PAL.ink, sw: .8 });
      paint(ribbon([[tx + 4, GY - 30 - th * .5], [tx + 50, GY - 30 - th * .7], [tx + 90 + sway, GY - 30 - th * .85]], 12, 3), { wash: tc, ink: PAL.ink, sw: .6 });
      paint(ellPts(tx + 50, GY - 30 - th * .72, 26, 9, 12), { wash: COL.snow, ink: null });
    }
    flat([[-1800, GY - 30], [3600, GY - 50], [3600, 1600], [-1800, 1600]], COL.snow);
    boilSeed('s5 ground'); inkLine([[-1800, GY - 30], [600, GY - 38], [3600, GY - 50]], 1, '#9AA8BE', 'ink', .5);
    // two trails of footprints behind them, as far as each has walked
    boilSeed('s5 prints');
    for (const [x0, x1, py] of [[560, nx, GY - 4], [735, lxw, GY - 30]]) for (let x = x0, i = 0; x < x1 - 40; x += 62, i++) {
      const yy = py + (i % 2 ? 9 : -3);
      for (const a of [-.5, 0, .5]) inkLine([[x, yy], [x + 12 * Math.cos(a), yy + 12 * Math.sin(a) * .5]], 1.2, '#8C9AB2', 'ink', 0);
    }
    const nm = birdMoods(lt, [[0, 'happy'], [1.8, 'love', { lookX: .8, lookY: -.3 }]]);
    const lm = birdMoods(lt, [[0, 'happy', { lookX: .5 }], [2.1, 'happy', { lookX: -.6 }]]);
    const lo = { key: 'l5', who: 'lan', ...lm, scarf: 1, walk: w.walk + .5, dy: (lm.dy || 0) + w.dy };
    const no = { key: 'n5', ...nm, scarf: 1, walk: w.walk, dy: (nm.dy || 0) + w.dy };
    birdie(lxw, GY - 30, 22, lo);
    // the shared scarf: one red ribbon sagging between their two necks
    const a = neckPt(nx, GY, 24, no), b = neckPt(lxw, GY - 30, 22, lo);
    boilSeed('s5 scarf');
    paint(ribbon([a, [lerp(a[0], b[0], .5), Math.max(a[1], b[1]) + 34 + 6 * Math.sin(t * 3)], b], 22, 20), { wash: COL.scarf, ink: PAL.ink, sw: .9 });
    birdie(nx, GY, 24, no);
    camEnd();
    snowfall(t, 46);
    if (lt < .3) paintWipe(.5 + lt / .6, [COL.snow, '#C9D6E3']);
    if (lt > dur - .3) paintWipe((lt - (dur - .3)) / .6, ['#8A92A8', '#6F7890']);
  }

  // ---------- 6–7 · the rainy window: grey days, sitting together staring at nothing; he fans the gloom away ----------
  const WX = 520, WY = 140, WW = 880, WH = 520, SILL = WY + WH + 10, NXS = 860, LXS = 1070, US = 22;
  function rainRoom(t, clear, gust) {
    // clear 0..1: grey rain → blue sky and sun; gust = how far the clouds have been pushed apart
    const grey = '#7A8296', wall = mixCol(mixCol(COL.wall, '#8E93A6', .5), COL.wall, clear);
    roomWithWindow(WX, WY, WW, WH, () => {
      flatRect(WX, WY, WW, WH, mixCol(grey, '#9CCBEA', clear));
      if (clear > .05) { glow(WX + WW * .5, WY + 140, 260 * clear + 40, '#FFE6A0', clear); boilSeed('s7 sun'); paint(ellPts(WX + WW * .5, WY + 140, 60, 60, 20), { wash: '#FFE38A', washOp: 255 * clear, ink: null }); }
      flat([[WX, WY + WH * .78], [WX + 160, WY + WH * .62], [WX + 330, WY + WH * .7], [WX + 520, WY + WH * .58], [WX + WW, WY + WH * .7], [WX + WW, WY + WH], [WX, WY + WH]], mixCol('#5E6478', '#7FA36C', clear));
      // the gloom: three heavy clouds, pushed apart and lightened as he flaps
      for (const [cx, cy, cw, dir, k] of [[WX + 200, WY + 120, 420, -1, 'a'], [WX + 560, WY + 90, 460, 1, 'b'], [WX + 400, WY + 220, 380, 1, 'c']])
        cloudBlob(cx + dir * gust * 520, cy - gust * 30, cw, 150, mixCol('#5B6175', '#EEF2F8', clear), 'g' + k);
      if (clear < .9) rainfall(t, [WX, WY, WW, WH], Math.round(46 * (1 - clear)));
      boilSeed('s6 drops'); if (clear < .6) for (let i = 0; i < 14; i++) { const x = WX + 30 + hash(i * 3.1) * (WW - 60), y = WY + 30 + frac(hash(i * 1.9) + t * .08 * hash(i)) * (WH - 60);
        paint(ellPts(x, y, 6, 8, 10), { wash: '#B6BFD2', washOp: 200 * (1 - clear), ink: null }); }
    }, { wall, lamp: mixCol('#C9CCD8', '#F6DDB0', clear) });
    floorAndTable(0, 860, 0, { floor: mixCol('#8C8478', '#C89F78', clear) });
    if (clear > .05) { flat([[WX + WW * .3, WY + WH], [WX + WW * .75, WY + WH], [WX + WW * 1.05, 1080], [WX + WW * .1, 1080]], '#FFF1C8', 70 * clear); glow(WX + WW * .5, SILL + 60, 500, '#FFE6A0', .4 * clear); }
  }
  function shot6(t, lt, dur) {
    camBegin(960 + 8 * Math.sin(lt * .5), 500, 1.04 + .025 * lt);
    rainRoom(t, 0, 0);
    const lean = ease(seg(lt, 2.2, 2.9));
    birdie(LXS, SILL, US, { key: 'l6', who: 'lan', sit: true, noShadow: true, ...birdMoods(lt, [[0, 'calm', { lookX: .3, lookY: .1 }], [2.0, 'calm', { lookX: .1, lookY: .2 }]]), rot: -.07 * lean });
    birdie(NXS, SILL, US, { key: 'n6', sit: true, noShadow: true, ...birdMoods(lt, [[0, 'sad', { lookX: .3 }], [1.0, 'calm', { lookX: .2, lookY: .1, emote: 'dots' }], [2.3, 'dreamy']]), rot: .12 * lean, dx: .5 * lean });
    camEnd();
    if (lt < .3) paintWipe(.5 + lt / .6, ['#8A92A8', '#6F7890']);
  }
  function shot7(t, lt, dur) {
    const gust = ease(seg(lt, .5, 1.9)), clear = ease(seg(lt, .7, 2.1));
    camBegin(960 + 8 * Math.sin(lt * .5) + 20 * clear, lerp(500, 470, clear), 1.13 - .05 * clear);
    rainRoom(t, clear, gust);
    // he gets up and flaps hard at the window; the clouds part
    const up = lt > .15, flapping = lt > .35 && lt < 1.9;
    const lm = birdMoods(lt, [[0, 'calm'], [.25, 'look', { lookX: .5, lookY: -.4 }], [1.9, 'happy', { lookX: -.5 }]]);
    birdie(LXS, SILL, US, { key: 'l7', who: 'lan', sit: !up, noShadow: true, ...lm, sq: (lm.sq || 0) + take(lt, .15, .6).sq,
      wing: flapping ? Math.PI + 1.1 * Math.sin(lt * 16) : lm.wing, wingF: -2.0 + 1.0 * Math.sin(lt * 16 + .5), dy: flapping ? -.3 - .3 * Math.abs(Math.sin(lt * 8)) : 0 });
    const nm = birdMoods(lt, [[0, 'dreamy'], [.45, 'look', { lookX: .6, lookY: -.2 }], [1.9, 'wow', { lookY: -.6 }], [2.35, 'happy', { lookY: -.3 }]]);
    birdie(NXS, SILL, US, { key: 'n7', sit: true, noShadow: true, ...nm, rot: .12 * (1 - ease(seg(lt, .2, .5))), dx: .5 * (1 - ease(seg(lt, .2, .5))) });
    camEnd();
    if (lt > dur - .3) paintWipe((lt - (dur - .3)) / .6, ['#F2C46B', '#E7896A']);
  }

  // ---------- 8 · 25.56–28.52 · happy pieces of light drift into the jar; the grey gloom gets flicked out ----------
  const TY = 770, JX = 1150, JS = 110;
  function shot8(t, lt, dur) {
    camBegin(980 + 12 * Math.sin(lt * .6), 590, 1.3);
    roomWithWindow(200, 150, 460, 380, () => {
      flatRect(200, 150, 460, 380, '#9CCBEA'); glow(330, 230, 160, '#FFE6A0', .8);
      cloudBlob(500, 260, 180, 60, '#F4F7FB', 'w8a'); cloudBlob(320, 400, 150, 50, '#F4F7FB', 'w8b');
    }, { lamp: '#FBE6BE' });
    glow(440, 360, 500, '#FFE6A0', .3);
    floorAndTable(1000, TY, 1150);
    const arrive = [.7, 1.1, 1.5], n = arrive.filter(a => lt >= a).length;
    memJar(JX, TY, JS, { key: 'j8', fill: n, glow: .2 + .18 * n });
    arrive.forEach((a, i) => { if (lt < a && lt > a - .6) { const q = seg(lt, a - .6, a), p = arcPt([430 + i * 40, 330 + i * 30], [JX, TY - JS * 1.55], 140, ease(q)); memBit(...p, 15, 1, 'j8p' + i); } });
    // the gloom ball: sits on the table, gets flicked off on an arc (1.65)
    const flick = seg(lt, 1.65, 2.3), gb = flick > 0 ? arcPt([960, 744], [2300, 260], 260, easeIn(flick)) : [960, 744];
    boilSeed('gloom'); push(); translate(...gb); rotate(flick * 9);
    paint(ellPts(0, 0, 30, 26, 16, 2), { wash: '#8A8698', ink: PAL.ink, sw: .9 });
    for (let i = 0; i < 3; i++) inkLine([[-18 + i * 12, -14], [-8 + i * 10, 2], [-16 + i * 12, 14]], .7, '#4E4A5E', 'inkfine', .4);
    pop();
    const nm = birdMoods(lt, [[0, 'happy', { lookX: .7, lookY: -.3 }], [1.2, 'look', { lookX: .6, lookY: .5 }], [1.75, 'happy', { lookX: .9, lookY: -.4 }]]);
    const swing = lt > 1.45 && lt < 1.9 ? lerp(-1.3, .7, easeIn(seg(lt, 1.5, 1.68))) : nm.wing;
    birdie(820, TY, 22, { key: 'n8', ...nm, wing: lt > 1.45 && lt < 1.5 ? -1.3 : swing });
    birdie(620, TY, 21, { key: 'l8', who: 'lan', ...birdMoods(lt, [[0, 'happy', { lookX: .6, lookY: -.3 }], [1.8, 'chirp']]) });
    camEnd();
    if (lt < .3) paintWipe(.5 + lt / .6, ['#F2C46B', '#E7896A']);
    if (lt > dur - .3) paintWipe((lt - (dur - .3)) / .6, [COL.indigo, COL.night]);
  }

  shots([[15.72, shot5], [19.16, shot6], [22.60, shot7], [25.56, shot8]]);
})();
