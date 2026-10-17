// sheet_birds.js: a model sheet for the two birds (a standalone loop, not part of the video): ?loop=birds
(() => {
  LOOPS.birds = t => {
    paint(rectPts(-50, -50, W + 100, H + 100), { wash: PAL.paper, ink: null });
    const row = [['calm', 'nuan'], ['happy', 'nuan'], ['chirp', 'lan'], ['wow', 'nuan'], ['sad', 'nuan'], ['cry', 'nuan']];
    row.forEach(([m, who], i) => birdie(180 + i * 310, 470, 22, { key: 'r1' + i, who, ...birdMood(m, t), emoteK: 1, emoteAge: t }));
    birdie(220, 1000, 22, { key: 'f1', ...birdMood('happy', t), view: 'front' });
    birdie(560, 1000, 22, { key: 'f2', ...birdMood('shiver', t), scarf: 1, emoteK: 1 });
    birdie(900, 960, 22, { key: 'f3', ...birdMood('happy', t), fly: true, dy: -2, wing: Math.PI + 1.1 * Math.sin(t * 8), wingF: -2.2 + .9 * Math.sin(t * 8) });
    birdie(1240, 1000, 22, { key: 'f4', ...birdMood('hopeful', t), wing: .3, hold: (u, sw) => memBit(0, 0, u * .9, 1, 'held') });
    birdie(1560, 1000, 22, { key: 'f5', ...birdMood('sleep', t), who: 'lan', emoteK: 1, flip: true });
    memJar(1820, 1000, 70, { crack: 1, bow: 1, bowPop: 1, fill: 5, glow: .4 });
  };
  LOOPS.birds.len = 2;
})();
