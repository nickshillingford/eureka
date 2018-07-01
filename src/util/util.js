let easeFunctions = {
  'linear': Power0.easeNone,
  'ease-in': Power1.easeIn,
  'ease-out': Power1.easeOut,
  'ease-in-out': Power1.easeInOut,
  'sine-ease-in': Sine.easeIn,
  'sine-ease-out': Sine.easeOut,
  'sine-ease-in-out': Sine.easeInOut,
  'back': Back.easeOut.config(1.7),
  'elastic': Elastic.easeOut.config(1, 0.3),
  'bounce': Bounce.easeOut,
  'slowMo': SlowMo.ease.config(0.7, 0.7, false),
  'circ-ease-in': Circ.easeIn,
  'circ-ease-out': Circ.easeOut,
  'circ-ease-in-out': Circ.easeInOut
};

function sumVectors(v1, v2, ops) {
  var options = {};

  if (ops != undefined) {
    options = ops;
  }

  let svg = document.querySelector('svg');
  let sumX = v1.ipc[0] + v2.ipc[0];
  let sumY = v1.ipc[1] + v2.ipc[1];
  let sum = new Vector([sumX, sumY], options);

  if (sum.ops.showCoordinates) {
    svg.append(sum.coordLabel);
  }

  if ((ops != undefined) && (ops.animate == false)) {
     svg.append(sum.arrow);
  }
  else {
     let def = { ease: 'linear', duration: 1, delay: 0 };
     let tl = new TimelineMax();

     if ((ops != undefined) && ops.ease) {
       def['ease'] = ops['ease'];
     }
     if ((ops != undefined) && ops.duration) {
       def['duration'] = ops['duration'];
     }
     if ((ops != undefined) && ops.delay) {
       def['delay'] = ops['delay'];
     }

     var c2 = function() {
       tl.to(v2.arrow, def.duration, { attr: { x1: 600, y1: 350, x2: v2.coord.x2, y2: v2.coord.y2  }, delay: def.delay, ease: easeFunctions[def.ease] });
     };
     var c1 = function() {
       svg.append(sum.arrow);
       tl.from(sum.arrow, def.duration, { attr: { x2: 600, y2: 350 }, delay: def.delay, ease: easeFunctions[def.ease], onComplete: c2 });
     };
     tl.to(v2.arrow, def.duration, { attr: { x1: v1.coord.x2, y1: v1.coord.y2, x2: sum.coord.x2, y2: sum.coord.y2  },
     delay: def.delay, ease: easeFunctions[def.ease], onComplete: c1 });
  }
}

function multiply(m1, m2) {
  let x = ((m1[0][0] * m2[0]) + (m1[0][1] * m2[1]));
  let y = ((m1[1][0] * m2[0]) + (m1[1][1] * m2[1]));

  return [x, y];
}
