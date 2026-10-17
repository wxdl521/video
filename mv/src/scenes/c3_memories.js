// c3_memories.js: shots G–I2 (28.7–41.0 s). Beat 0.8535 s, a beat at 0.07: B(34) 29.09 · B(36) 30.80 · B(42) 35.92 · B(48) 41.04
(() => {
  // ---------- G · 28.7–31.0 · she sings to the jar; its light gathers into his shape, answers, and drifts apart ----------
  const GJX = 1160, GJY = 860, GJS = 200;
  function shotG(t, lt, dur) {
    const out = easeIn(seg(lt, dur - .35, dur));
    const inK = easeOut(seg(lt, 0, .55));
    camBegin(lerp(GJX, 1000, inK) + 10 * Math.sin(lt), lerp(560, 600, inK), lerp(1.7, 1.06, inK) + .04 * lt);
    flatRect(-3000, -3000, W + 6000, H + 6000, mixCol(COL.wall, '#8A7A9A', .35));
    glow(GJX, 560, 900, '#F3D7A8', .3);
    flatRect(-3000, GJY, W + 6000, 3000, COL.wood);
    boilSeed('g table'); inkLine([[-400, GJY], [W + 400, GJY]], 1.4, PAL.ink, 'ink', 0);
    for (let i = 0; i < 4; i++) inkLine([[-400, GJY + 40 + i * 45], [W + 400, GJY + 40 + i * 45]], .6, COL.woodDk, 'inkfine', 0);
    const sil = ease(seg(lt, .5, 1.1)) * (1 - ease(seg(lt, 1.6, 2.1)));
    memJar(GJX, GJY, GJS, { key: 'g', crack: 1, bow: 1, bowPop: 1, fill: 1, glow: .4 + .5 * sil + 2 * out, silhouette: sil });
    const hk = seg(lt, 1.1, 1.35) * (1 - seg(lt, 1.6, 1.9));
    if (hk > .02) emote('heart', GJX + 40, GJY - GJS * 1.7 - 80, 22, hk, lt - 1.1);
    const m = birdMoods(lt, [[0, 'chirp', { lookX: .7 }], [1.15, 'look', { lookX: .7 }], [1.9, 'sad', { lookX: .6, lookY: .3 }]]);
    birdie(650, GJY, 34, { key: 'nuanG', ...m });
    camEnd();
    flashFast(out, '#FFF3D6');
  }

  // ---------- H · 31.0–35.6 · a meadow of drifting pieces; she flies through and gathers them into the jar ----------
  const HX0 = 300, HX1 = 3050, UH = 27;
  const hb = (lt, dur) => [lerp(HX0, HX1, lt / dur), 520 + 25 * Math.sin(lt * 3.2) + 150 * easeIn(seg(lt, dur - .45, dur))];
  const PX = [650, 1080, 1510, 1940, 2370, 2800];
  function shotH(t, lt, dur) {
    const [bx, by] = hb(lt, dur);
    camBegin(bx + 200, 560, 1.22);
    nightSky(t, { n: 40 });
    flat(through([[-600, 760], [400, 690], [1300, 730], [2300, 680], [3300, 720], [4200, 700]], 4).concat([[4200, 2000], [-600, 2000]]), '#26315E');
    flat(through([[-600, 880], [500, 840], [1500, 870], [2600, 830], [3600, 860], [4200, 850]], 4).concat([[4200, 2000], [-600, 2000]]), '#1E3A44');
    boilSeed('h edges'); inkLine(through([[-600, 880], [500, 840], [1500, 870], [2600, 830], [3600, 860], [4200, 850]], 4), .9, PAL.ink, 'ink', .4);
    tufts(-200, 4000, 875, 90, '#2E5A5A', 'h tufts');
    // fireflies drifting about
    boilSeed('h flies');
    for (let i = 0; i < 14; i++) { const fx = hash(i * 3.3) * 3600, fy = 600 + hash(i * 1.1) * 260 + 20 * Math.sin(t * 1.3 + i); glow(fx, fy, 50, '#CFF28A', .5 + .3 * Math.sin(t * 4 + i)); }
    // the pieces: each one floats at beak height until she reaches it, then flies into the jar
    const tOf = px => (px - 5.2 * UH - HX0) / (HX1 - HX0) * dur;
    let n = 0;
    const flap = Math.sin(lt * 10);
    const o = { key: 'nuanH', ...birdMoods(lt, [[0, 'hopeful'], [2.2, 'calm', { lookY: .3 }], [3.4, 'hopeful']]), fly: true, noShadow: true,
      wing: Math.PI + 1.0 * flap, wingF: -2.0 + .9 * Math.sin(lt * 10 + .4), rot: -.05 * flap };
    const sway = 12 * Math.sin(lt * 3), jx = bx - 10 + sway, jy = by + 175;
    PX.forEach((px, i) => {
      const ti = tOf(px), pyc = hb(ti, dur)[1] - 5.4 * UH;
      if (lt < ti) memBit(px, pyc + 8 * Math.sin(t * 2 + i), 16, 1, 'hp' + i);
      else if (lt < ti + .3) { const k = ease(seg(lt, ti, ti + .3)), bk = birdBeak(bx, by, UH, o); memBit(lerp(bk[0], jx, k), lerp(bk[1], jy - 95, k), 15 * (1 - .4 * k), 1, 'hp' + i); }
      else n++;
      if (Math.abs(lt - ti) < .15) o.beak = Math.max(o.beak || 0, 1 - Math.abs(lt - ti) / .15);
    });
    // the jar hangs on a string from her feet
    boilSeed('h string'); inkLine([[bx - 6, by - 1.3 * UH], [jx, jy - 95]], .9, PAL.ink, 'inkfine', 0);
    memJar(jx, jy, 56, { key: 'h', crack: 1, bow: 1, bowPop: 1, fill: 1 + n, glow: .3 + .08 * n });
    birdie(bx, by, UH, o);
    camEnd();
    flashFast(1 - seg(lt, 0, .35), '#FFF3D6');
  }

  // ---------- I1 · 35.6–37.7 · she lands and hides behind the jar to cry ----------
  function shotI1(t, lt, dur) {
    camBegin(1010, 690, 1.35);
    nightSky(t, { n: 30 });
    flat(through([[-600, 820], [600, 780], [1500, 800], [2600, 770]], 4).concat([[2600, 2000], [-600, 2000]]), '#26315E');
    flat(through([[-600, 905], [700, 890], [1500, 900], [2600, 895]], 4).concat([[2600, 2000], [-600, 2000]]), '#1E3A44');
    boilSeed('i1 edge'); inkLine(through([[-600, 905], [700, 890], [1500, 900], [2600, 895]], 4), .9, PAL.ink, 'ink', .4);
    tufts(300, 1700, 900, 40, '#2E5A5A', 'i1 tufts');
    const land = seg(lt, 0, .4), flying = lt < .4;
    const m = birdMoods(lt, [[0, 'tired'], [.45, 'cry'], [1.62, 'sad', { lookY: .4 }]]);
    const tk = take(lt, .4, .5);
    let wing = flying ? Math.PI + .9 * Math.sin(lt * 9) : 2.7;
    if (lt > 1.2 && lt < 1.62) wing = lerp(2.7, -1.0, Math.sin(seg(lt, 1.2, 1.62) * Math.PI));
    birdie(lerp(860, 960, easeOut(land)), lerp(640, 900, easeIn(land)), 26, { key: 'nuanI1', ...m, fly: flying, wingF: -2.1 + .8 * Math.sin(lt * 9 + .4),
      wing, sq: (m.sq || 0) + (flying ? 0 : tk.sq), tear: lt > 1.3 && lt < 1.6 ? 0 : m.tear });
    memJar(1090, 900, 120, { key: 'i1', crack: 1, bow: 1, bowPop: 1, fill: 7, glow: .45 });
    camEnd();
    flashFast(0);
    if (lt > dur - .3) paintWipe((lt - (dur - .3)) / .6, ['#E59A6B', '#B5739A']);
  }

  // ---------- I2 · 37.7–41.0 · 像倦鸟: a tired bird over the dusk sea, wings slowing, lands on a lone post ----------
  const POST = [1457, 640];
  function shotI2(t, lt, dur) {
    camBegin(lerp(900, 1200, ease(seg(lt, 0, dur))), 520, 1.0);
    for (let i = 0; i < 30; i++) flatRect(-400, -400 + i * 38, W + 1200, 40, mixCol('#9E6A98', '#F2B07C', ease(i / 29)));
    const sunY = 600 + lt * 32;
    glow(1250, sunY, 480, '#FFC27A', .9);
    boilSeed('i2 sun'); paint(ellPts(1250, sunY, 110, 110, 24), { wash: '#FFD08A', ink: null });
    flatRect(-400, 700, W + 1200, 800, '#6E5A8A');
    boilSeed('i2 sea');
    inkLine([[-400, 700], [W + 800, 700]], 1, PAL.ink, 'ink', 0);
    for (let i = 0; i < 9; i++) { const y = 720 + i * 34 + i * i * 3, w = 220 - i * 12 + 30 * Math.sin(t * 2 + i); inkLine([[1250 - w, y], [1250 + w, y + 2]], 2.2 - i * .15, '#FFC98A', 'ink', 0); }
    for (let i = 0; i < 7; i++) { const y = 760 + i * 50, x0 = -300 + hash(i) * 600; inkLine(Array.from({ length: 9 }, (_, k) => [x0 + k * 300, y + 6 * Math.sin(k * 1.7 + t * 2 + i)]), .7, '#4E3E6E', 'ink', .5); }
    // the post
    boilSeed('i2 post');
    paint(rectPts(POST[0] - 17, POST[1], 34, 320), { wash: COL.woodDk, ink: PAL.ink, sw: 1 });
    inkLine([[POST[0] - 40, 760], [POST[0] + 40, 762]], .8, '#FFC98A', 'ink', 0);
    // her flight: slower and slower, sinking, until she lands on the post (2.5)
    const fl = seg(lt, 0, 2.5), landed = lt >= 2.5;
    const phase = lt < 2.27 ? 10 * lt - 2.2 * lt * lt : 10 * 2.27 - 2.2 * 2.27 * 2.27;
    const x = lerp(150, POST[0], ease(fl)), y = landed ? POST[1] : lerp(330, POST[1], easeIn(fl)) + 25 * Math.sin(lt * 2.4) * (1 - fl);
    const m = birdMoods(lt, [[0, 'tired'], [2.55, 'tired', { lookY: .3 }]]);
    birdie(x, y, 12, { key: 'nuanI2', ...m, fly: !landed, noShadow: true, wing: landed ? 2.6 : Math.PI + 1.0 * Math.sin(phase), wingF: -2.1 + .8 * Math.sin(phase + .4),
      sq: (m.sq || 0) + (landed ? take(lt, 2.5, .6).sq : 0) });
    const at = toScreen(POST[0], POST[1] - 60);
    camEnd();
    if (lt < .3) paintWipe(.5 + lt / .6, ['#E59A6B', '#B5739A']);
    if (lt > dur - .55) irisFast(...at, lerp(1500, 0, easeIn(seg(lt, dur - .55, dur - .05))));
  }

  shots([[28.7, shotG], [31.0, shotH], [35.6, shotI1], [37.7, shotI2]]);
})();
