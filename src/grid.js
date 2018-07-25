class Grid {
  constructor(svg, options) {
    this.grid = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    this.path = 'M600,350 L650,350 L650,300 L600,300Z';
    this.originX = 600;
    this.originY = 350;
    this.vectors = [];
    this.svg = svg;

    this.tl = new TimelineMax();

    this.ops = {
      cartesian: false,
      points: false,
      basis: false
    }

    this.svg.append(this.grid);
    this.createGrid(false);
    this.createGrid(true);

    if (options) {
      this.setOptions(options);
    }
    if (this.ops.basis) {
      this.setBasis();
    }
    if (this.ops.points) {
      this.setPoints();
    }
  }

  setOptions(options) {
    for (let key in options) {
      this.ops[key] = options[key];
    }
  }

  setCartesian() {
    let x_axis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    let y_axis = document.createElementNS('http://www.w3.org/2000/svg', 'line');

    x_axis.setAttributeNS(null, 'stroke-linecap', 'round');
    x_axis.setAttributeNS(null, 'stroke', '#4b4b4b');
    x_axis.setAttributeNS(null, 'stroke-width', 3);
    x_axis.setAttributeNS(null, 'x1', 350);
    x_axis.setAttributeNS(null, 'y1', 350);
    x_axis.setAttributeNS(null, 'x2', 850);
    x_axis.setAttributeNS(null, 'y2', 350);

    y_axis.setAttributeNS(null, 'stroke-linecap', 'round');
    y_axis.setAttributeNS(null, 'stroke', '#4b4b4b');
    y_axis.setAttributeNS(null, 'stroke-width', 3);
    y_axis.setAttributeNS(null, 'x1', 600);
    y_axis.setAttributeNS(null, 'y1', 100);
    y_axis.setAttributeNS(null, 'x2', 600);
    y_axis.setAttributeNS(null, 'y2', 600);

    this.grid.append(x_axis);
    this.grid.append(y_axis);
  }

  setBasis() {
    this.iHat = new Vector([1, 0], {
      stroke:'#1abc9c'
    });
    this.jHat = new Vector([0, 1], {
      stroke: '#3498db'
    });
    this.linc = new Vector([1, 1], {
      stroke: '#fd79a8',
      type: 'point'
    });

    this.addToView(this.iHat);
    this.addToView(this.jHat);
    this.addToView(this.linc);
  }

  setPoints() {
    var count = 0;
    var x = -11;
    var y = 6;
    var stroke;

    for (var i = 0; i < 299; i++) {
      if (count == 23) {
        count = 0;
        x = (-11);
        y--;
      }

      stroke = (x == 1 && y == 1) ? '#fd79a8' : '#ffffff';

      var v = new Vector([x, y], {
        stroke: stroke,
        type: 'point'
      });

      this.vectors.push(v);
      this.addToView(v);
      count++;
      x++;
    }
  }

  createGrid(axis) {
   let unitGap = 50;

    var x1 = 0;
    var y1 = 0;
    var x2, y2;
    var line;

    if (axis) {
      y2 = 700, x2 = 0;
    }
    else {
      x2 = 1200, y2 = 0;
    }

    for (var i = 0; i < 24; i++) {
      line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttributeNS(null, 'stroke-dasharray', '1px, 2px');
      line.setAttributeNS(null, 'stroke-linecap', 'round');
      line.setAttributeNS(null, 'stroke', '#bdc3c7');
      line.setAttributeNS(null, 'x1', x1);
      line.setAttributeNS(null, 'y1', y1);
      line.setAttributeNS(null, 'x2', x2);
      line.setAttributeNS(null, 'y2', y2);
      this.grid.append(line);

    if (axis) {
      x1 += unitGap;
      x2 += unitGap;
    }
    else {
      y1 += unitGap;
      y2 += unitGap;
    }
   }
  }

  addToView(obj) {
    if (obj.ops.showCoordinates) {
      this.grid.append(obj.coordLabel);
    }

    switch (obj.ops.type) {
      case 'point':
        this.grid.append(obj.point);
        break;
      case 'arrow':
        this.grid.append(obj.arrow);
        this.grid.append(obj.rotationPath);
        break;
      case 'square':
        this.grid.append(obj.unit);
        break;
    }

    if (this.ops.cartesian) {
      this.setCartesian();
    }
  }
}
