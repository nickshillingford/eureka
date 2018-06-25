class Vector {
  constructor(coord, options) {
    this.coordLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    this.arrow = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    this.coord = { x: coord[0], y: coord[1] };
    this.translate(this.coord);
    this.ipc = coord;
    this.scalarInput;
    this.xInput;
    this.yInput;

    this.ops = {
      showCoordinates: false,
      interactive: false,
      stroke: '#3b3b3b',
      lineWidth: 2,
      animate: true,
      duration: 0.5,
      ease: 'linear'
    }

    if (options) {
      this.setOptions(options);
    }
    if (this.ops.interactive) {
      this.setController();
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

  setController() {
    let controllers = document.querySelector('.controllers');
    let controller = document.createElement('div');
    this.scalarInput = document.createElement('input');
    this.xInput = document.createElement('input');
    this.yInput = document.createElement('input');
    let openBracket = document.createElement('p');
    let closeBracket = document.createElement('p');
    let comma = document.createElement('p');

    controller.className = 'controller';
    controller.append(this.scalarInput);
    controller.append(openBracket);
    controller.append(this.xInput);
    controller.append(comma);
    controller.append(this.yInput);
    controller.append(closeBracket);

    this.scalarInput.style.color = this.ops.stroke;
    this.scalarInput.className = 'scalar';
    this.scalarInput.type = 'number';
    this.scalarInput.value = 1;

    openBracket.className = 'open';
    openBracket.textContent = '[';
    closeBracket.className = 'close';
    closeBracket.textContent = ']';

    comma.className = 'comma';
    comma.textContent = ',';

    this.yInput.style.color = this.ops.stroke;
    this.yInput.value = this.ipc[1];
    this.yInput.type = 'number';
    this.yInput.className = 'y';

    this.xInput.style.color = this.ops.stroke;
    this.xInput.value = this.ipc[0];
    this.xInput.type = 'number';
    this.xInput.className = 'x';

    controller.style.color = this.ops.stroke;
    controllers.append(controller);
    this.configure(this);
  }

  configure(vector) {
    let tl = new TimelineMax();

    this.scalarInput.addEventListener('change', function(e) {
      vector.coord.x2 = (600 + (50 * (e.target.value * vector.ipc[0])));
      vector.coord.y2 = (350 - (50 * (e.target.value * vector.ipc[1])));
      tl.to(vector.arrow, vector.ops.duration, { attr: { x2: vector.coord.x2, y2: vector.coord.y2  }, ease: easeFunctions[vector.ops.ease] });
    });

    this.xInput.addEventListener('change', function(e) {
      vector.ipc[0] = e.target.value;
      vector.coord.x2 = (600 + (50 * (vector.scalarInput.value * vector.ipc[0])));
      tl.to(vector.arrow, vector.ops.duration, { attr: { x2: vector.coord.x2 }, ease: easeFunctions[vector.ops.ease] });
    });

    this.yInput.addEventListener('change', function(e) {
      vector.ipc[1] = e.target.value;
      vector.coord.y2 = (350 - (50 * (vector.scalarInput.value * vector.ipc[1])));
      tl.to(vector.arrow, vector.ops.duration, { attr: { y2: vector.coord.y2  }, ease: easeFunctions[vector.ops.ease] });
    });
  }

  addition(v, options) {
    let ops = options;
    let v1 = this;
    let v2 = v;
    if (v1.ops.animate || v2.ops.animate) {
      setTimeout(function() {
        sumVectors(v1, v2, ops);
      }, (v.ops.duration * 2000));
    }
    else {
      sumVectors(v1, v2, ops);
    }
  }
}
