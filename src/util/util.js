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

function cartesian(center_x, center_y, radius, degrees) {
    let radians = (degrees - 90) * Math.PI / 180.0;

    return {
      x: center_x + (radius * Math.cos(radians)),
      y: center_y + (radius * Math.sin(radians))
    }
}

function arc(x, y, radius, start_angle, end_angle) {
    let start = cartesian(x, y, radius, end_angle);
    let end = cartesian(x, y, radius, start_angle);

    let laf = (end_angle - start_angle) <= 180 ? '0' : '1';

    var path = [
        'M', start.x, start.y,
        'A', radius, radius, 0, laf, 0, end.x, end.y
    ].join(' ');

    path += (end_angle == 359) ? 'Z' : '';

    return path;
}

function _dot(v1, v2) {
  let p1 = (v1.ipc[0] * v2.ipc[0]);
  let p2 = (v1.ipc[1] * v2.ipc[1]);

  return (p1 + p2);
}

function multiply(m1, m2) {
  let x = ((m1[0][0] * m2[0]) + (m1[0][1] * m2[1]));
  let y = ((m1[1][0] * m2[0]) + (m1[1][1] * m2[1]));

  return [x, y];
}

function determinant(m) {
  return ((m[1][1] * m[0][0]) - (m[1][0] * m[0][1]));
}
