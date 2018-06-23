class Vector {
  constructor(coord, options) {
    this.coordLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    this.point = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    this.arrow = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    this.coord = { x: coord[0], y: coord[1] };
    this.translate(this.coord);
    this.ipc = coord;

    this.ops = {
      showCoordinates: false,
      stroke: '#3b3b3b',
      type: 'arrow',
      lineWidth: 2,
    }

    if (options) {
      this.setOptions(options);
    }

    this.arrow.setAttributeNS(null, 'stroke-width', this.ops.lineWidth);
    this.arrow.setAttributeNS(null, 'stroke', this.ops.stroke);
    this.setArrow();
  }

  setOptions(options) {
    for (let key in options) {
      this.ops[key] = options[key];
    }
    if (this.ops.showCoordinates) {
      this.setLabel();
    }
    if (this.ops.type == 'point') {
      this.setPoint();
    }
  }

  translate(v) {
    this.coord = { x1: 600, y1: 350, x2: (600 + (50 * v.x)), y2: (350 - (50 * v.y)) };
    this.arrow.setAttributeNS(null, 'x1', this.coord.x1);
    this.arrow.setAttributeNS(null, 'y1', this.coord.y1);
    this.arrow.setAttributeNS(null, 'x2', this.coord.x2);
    this.arrow.setAttributeNS(null, 'y2', this.coord.y2);
  }

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

  setLabel() {
    let offset = (this.ipc[0] < 0) ? -64 : 12;
    this.coordLabel.textContent = '( ' + this.ipc[0] + ', ' + this.ipc[1] + ' )';
    this.coordLabel.setAttributeNS(null, 'x', (this.coord.x2 + offset));
    this.coordLabel.setAttributeNS(null, 'y', this.coord.y2);
    this.coordLabel.setAttributeNS(null, 'fill', this.ops.stroke);
  }

  setPoint() {
    this.point.setAttributeNS(null, 'fill', this.ops.stroke);
    this.point.setAttributeNS(null, 'cx', this.coord.x2);
    this.point.setAttributeNS(null, 'cy', this.coord.y2);
    this.point.setAttributeNS(null, 'r', 4);
  }
}
