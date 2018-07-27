/**
 * This class represents a vector object and it's appearance/style.
 * This class also implements a few standard vector operations.
 *
 * @class Vector
 */
class Vector {
  constructor(coord, options) {
    // circle representing the path the vector takes when rotated.
    this.rotationPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    // the (x, y) coordinates of the vector.
    this.coordLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');

    // the vector represented as a point on the grid instead of an arrow.
    this.point = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

    // the vector represented as an arrow on the grid instead of a point.
    this.arrow = document.createElementNS('http://www.w3.org/2000/svg', 'line');

    // the vectors coordinates on the grid.
    this.coord = { x: coord[0], y: coord[1] };
    this.translate(this.coord);

    // the vectors non-translated cartesian coordinates.
    this.ipc = coord;

    // the radius of the vectors rotation path.
    this.radius = this.setRotationPath();

    // GSAP animation object.
    this.tl = new TimelineMax();

    // the vector's default options.
    this.ops = {
      showCoordinates: false,
      showRotatePath: false,
      stroke: '#3b3b3b',
      type: 'arrow',
      lineWidth: 2
    }

    if (options) {
      this.setOptions(options);
    }

    this.arrow.setAttributeNS(null, 'stroke-width', this.ops.lineWidth);
    this.arrow.setAttributeNS(null, 'stroke', this.ops.stroke);
    this.setArrow();
  }

  /**
   * Updates the vector's default options with any custom options that are given.
   *
   * @name setOptions
   * @param {options} custom options.
   * @return none
   */
  setOptions(options) {
    for (let key in options) {
      this.ops[key] = options[key];
    }
    if (this.ops.showCoordinates) {
      this.setLabel();
    }
    if (this.ops.showRotatePath) {
      this.rotationPath.setAttributeNS(null, 'opacity', 1);
    }
    if (this.ops.type == 'point') {
      this.setPoint();
    }
  }

  /**
   * Translates the vector's cartesian coordinates into the proper SVG coordinates.
   *
   * @name translate
   * @param {v} cartesian coordinates.
   * @return none
   */
  translate(v) {
    this.coord = { x1: 600, y1: 350, x2: (600 + (50 * v.x)), y2: (350 - (50 * v.y)) };
    this.arrow.setAttributeNS(null, 'x1', this.coord.x1);
    this.arrow.setAttributeNS(null, 'y1', this.coord.y1);
    this.arrow.setAttributeNS(null, 'x2', this.coord.x2);
    this.arrow.setAttributeNS(null, 'y2', this.coord.y2);
  }

  /**
   * Builds the appearance of the vector's arrow.
   *
   * @name setArrow
   * @param none
   * @return none
   */
  setArrow() {
    let marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
    let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    let svg = document.querySelector('svg');
    let num = svg.childNodes.length;

    marker.setAttributeNS(null, 'markerHeight', '13');
    marker.setAttributeNS(null, 'markerWidth', '13');
    marker.setAttributeNS(null, 'id', 'arrow' + num);
    marker.setAttributeNS(null, 'orient', 'auto');
    marker.setAttributeNS(null, 'refX', '7');
    marker.setAttributeNS(null, 'refY', '5');

    path.setAttributeNS(null, 'd', 'M2,2 L2,11 L10,6 L2,2');
    path.setAttributeNS(null, 'transform', 'scale(0.8)');
    path.setAttributeNS(null, 'fill', this.ops.stroke);

    marker.append(path);
    svg.append(marker);

    this.arrow.setAttributeNS(null, 'marker-end', 'url(#arrow' + num + ')');
  }

  /**
   * Sets the text label of the vector's coordinates.
   *
   * @name setLabel
   * @param none
   * @return none
   */
  setLabel() {
    let offset = (this.ipc[0] < 0) ? -64 : 12;
    this.coordLabel.textContent = '( ' + this.ipc[0] + ', ' + this.ipc[1] + ' )';
    this.coordLabel.setAttributeNS(null, 'x', (this.coord.x2 + offset));
    this.coordLabel.setAttributeNS(null, 'y', this.coord.y2);
    this.coordLabel.setAttributeNS(null, 'fill', this.ops.stroke);
  }

  /**
   * Builds the appearance of the vector's circle point.
   *
   * @name setPoint
   * @param none
   * @return none
   */
  setPoint() {
    this.point.setAttributeNS(null, 'fill', this.ops.stroke);
    this.point.setAttributeNS(null, 'cx', this.coord.x2);
    this.point.setAttributeNS(null, 'cy', this.coord.y2);
    this.point.setAttributeNS(null, 'r', 3);
  }

  /**
   * Performs a transformation on the vector.
   *
   * @name transform
   * @param [landing] an array of cartesian coordinates for where the vector will land.
   * @param {ops} animation options.
   * @return none
   */
  transform(landing, ops) {
    var duration = 2;
    var delay = 0;

    if (ops) {
      duration = ops.duration;
      delay = ops.delay;
    }

    this.coord.x2 = (600 + (50 * landing[0]));
    this.coord.y2 = (350 - (50 * landing[1]));
    this.ipc = landing;

    if (this.ops.type == 'arrow') {
      this.tl.to(this.arrow, duration, { attr: { x2: this.coord.x2, y2: this.coord.y2 }, delay: delay, ease: easeFunctions['sine-ease-in-out'] });
    }
    else {
      this.tl.to(this.point, duration, { attr: { cx: this.coord.x2, cy: this.coord.y2 }, delay: delay, ease: easeFunctions['sine-ease-in-out'] });
    }
  }

  /**
   * Rotates the vector by a specified amount.
   *
   * @name rotate
   * @param (amount_degrees) the degree to rotate to.
   * @return none
   */
  rotate(amount_degrees) {
    var theta_radians = -Math.atan2(this.sine(), this.cosine());
    var theta_degrees = (theta_radians * (180 / Math.PI));
    var delta = 0.017, x, y;

    var stop = Math.round(theta_degrees + (-amount_degrees));
    var _this = this;

    var anim = setInterval(function() {
      // todo: if the degree amount is negative, apply += instead.
      theta_radians -= delta;

      x = Math.cos(theta_radians) * _this.radius + 600;
      y = Math.sin(theta_radians) * _this.radius + 350;

      _this.arrow.setAttributeNS(null, 'x2', x);
      _this.arrow.setAttributeNS(null, 'y2', y);

      theta_degrees = Math.round((theta_radians * (180 / Math.PI)));
      (theta_degrees == stop) ? clearInterval(anim) : console.log();
      // todo: update the vector's ipc coordinates when anim is done.
    }, 25);
  }

  /**
   * Calculates the cosine of the vector's angle.
   *
   * @name cosine
   * @param none
   * @return a number between -1 and 1 inclusive.
   */
  cosine() {
    let adjacent = new Vector([this.ipc[0], 0]);

    let mag_1 = this.magnitude();
    let mag_2 = adjacent.magnitude();
    let dp = dotProduct(this, adjacent);

    return (dp / (mag_1 * mag_2));
  }

  /**
   * Calculates the sine of the vector's angle.
   *
   * @name sine
   * @param none
   * @return a number between -1 and 1 inclusive.
   */
  sine() {
    // use the pythagorean identity to calculate sine given cosine
    return Math.sqrt((1 - Math.pow(this.cosine(), 2)));
  }

  /**
   * Calculates the magnitude (length) of the vector.
   *
   * @name magnitude
   * @param none
   * @return a number.
   */
  magnitude() {
    let x_squared = Math.pow(this.ipc[0], 2);
    let y_squared = Math.pow(this.ipc[1], 2);
    let sum = (x_squared + y_squared);

    return Math.sqrt(sum).toFixed(2);
  }

  /**
   * Calculates and builds the rotation path circle.
   *
   * @name setRotationPath
   * @param none
   * @return a number representing the circle's radius.
   */
  setRotationPath() {
    let magnitude = this.magnitude().toString();
    let offset = parseInt(magnitude.substring(2, 4));
    let scale = parseInt(magnitude.substring(0, 1));
    let percent = ((offset / 100) * 50);
    let radius = ((scale * 50) + percent);

    let path = arc(600, 350, radius, 0, 359);

    this.rotationPath.setAttributeNS(null, 'stroke-width', 2);
    this.rotationPath.setAttributeNS(null, 'stroke', '#fff');
    this.rotationPath.setAttributeNS(null, 'fill', 'none');
    this.rotationPath.setAttributeNS(null, 'opacity', 0);
    this.rotationPath.setAttributeNS(null, 'd', path);

    return radius;
  }
}
