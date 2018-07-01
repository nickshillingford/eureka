class Grid {
  constructor(svg, options) {
    this.grid = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    this.originX = 600;
    this.originY = 350;
    this.vectors = [];
    this.svg = svg;

    this.iHat = new Vector([1, 0], {
      stroke:'#1abc9c'
    });
    this.jHat = new Vector([0, 1], {
      stroke: '#3498db'
    });

    this.ops = {
      allVectors: false,
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
    if (this.ops.allVectors) {
      this.setPoints();
    }
  }

  setOptions(options) {
    for (let key in options) {
      this.ops[key] = options[key];
    }
  }

  setBasis() {
    this.addToView(this.iHat);
    this.addToView(this.jHat);
  }

  setPoints() {
    var count = 0;
    var x = -11;
    var y = 6;

    for (var i = 0; i < 299; i++) {
      if (count == 23) {
        count = 0;
        x = (-11);
        y--;
      }

      var v = new Vector([x, y], {
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
        line.setAttributeNS(null, 'stroke', '#f5f6fa');
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

  linearTransformation(matrix, ops) {
    this.iHat.transform([matrix[0][0], matrix[1][0]], ops);
    this.jHat.transform([matrix[0][1], matrix[1][1]], ops);

    for (var i = 0; i < this.vectors.length; i++) {
      var landing = multiply(matrix, [this.vectors[i].ipc[0], this.vectors[i].ipc[1]]);
      this.vectors[i].transform(landing, ops);
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
      default:
        this.grid.append(obj.arrow);
    }

    if (obj.ops.animate) {
      let tl = new TimelineMax();
      if (obj.ops.type == 'arrow') {
        tl.from(obj.arrow, obj.ops.duration, { attr: { x2: this.originX, y2: this.originY }, ease: easeFunctions[obj.ops.ease] });
      }
      else {
        tl.from(obj.point, obj.ops.duration, { attr: { r: 0 }, ease: easeFunctions[obj.ops.ease] });
      }
    }
  }
}
