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

function multiply(m1, m2) {
  let x = ((m1[0][0] * m2[0]) + (m1[0][1] * m2[1]));
  let y = ((m1[1][0] * m2[0]) + (m1[1][1] * m2[1]));
  return [x, y];
}

function determinant(m) {
  return ((m[1][1] * m[0][0]) - (m[1][0] * m[0][1]));
}
