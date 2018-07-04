class Grid {
  constructor(svg, options) {
    this.grid = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    this.path = 'M600,350 L650,350 L650,300 L600,300Z';
    this.originX = 600;
    this.originY = 350;
    this.vectors = [];
    this.svg = svg;

    this.ops = {
      points: false,
      basis: false
    }

    this.tl = new TimelineMax();
    this.textArea = new TextArea();
    this.setDeterminant();

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

    this.svg.append(this.grid);
    this.createGrid(false);
    this.createGrid(true);

    this.grid.append(this.det);
    this.grid.append(this.areaNum);

    if (options) {
      this.setOptions(options);
    }
    if (this.ops.basis) {
      this.setBasis();
    }
    if (this.ops.points) {
      this.setPoints();
    }

    this.grid.append(this.textArea.ta);
    this.grid.append(this.textArea.group);
  }

  setOptions(options) {
    for (let key in options) {
      this.ops[key] = options[key];
    }
  }

  setBasis() {
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

  _linearTransformation(matrix, area, ops) {
    this.linc.transform(multiply(matrix, [this.linc.ipc[0], this.linc.ipc[1]]), ops);
    this.iHat.transform([matrix[0][0], matrix[1][0]], ops);
    this.jHat.transform([matrix[0][1], matrix[1][1]], ops);

    this.textArea.updateMatrix(matrix, this.textArea, ops);
    this.textArea.updateDet(determinant(matrix), this.textArea, ops);

    for (var i = 0; i < this.vectors.length; i++) {
      var landing = multiply(matrix, [this.vectors[i].ipc[0], this.vectors[i].ipc[1]]);
      this.vectors[i].transform(landing, ops);
    }

    this.det.path = 'M600,350 L' + this.iHat.coord.x2 + ',' + this.iHat.coord.y2 +
    ' L' + this.linc.coord.x2 + ',' + this.linc.coord.y2 + ' L' + this.jHat.coord.x2 +
    ',' + this.jHat.coord.y2 + 'Z';

    let morph = this.det.path;
    setTimeout(function() {
      area.animate({ d: morph }, (ops.duration * 1000), mina.easeinout);
    }, (ops.delay * 1000));
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
      if (obj.ops.type == 'arrow') {
        this.tl.from(obj.arrow, obj.ops.duration, { attr: { x2: this.originX, y2: this.originY }, ease: easeFunctions[obj.ops.ease] });
      }
      else {
        this.tl.from(obj.point, obj.ops.duration, { attr: { r: 0 }, ease: easeFunctions[obj.ops.ease] });
      }
    }
  }

  setDeterminant() {
    this.areaNum = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    this.det = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    this.path = 'M600,350 L650,350 L650,300 L600,300Z';

    this.det.setAttributeNS(null, 'fill', 'rgba(253, 121, 168, 0.1)');
    this.det.setAttributeNS(null, 'stroke', '#fd79a8');
    this.det.setAttributeNS(null, 'd', this.path);
    this.det.id = 'det';

    this.areaNum.setAttributeNS(null, 'font-size', '1.8em');
    this.areaNum.setAttributeNS(null, 'fill', '#ffffff');
    this.areaNum.setAttributeNS(null, 'x', 617);
    this.areaNum.setAttributeNS(null, 'y', 336);
    this.areaNum.textContent = '1';
  }

  linearTransformation() {
    let _this = this;
    var matrix = [ [1, 0],
                   [0, 1] ];

    var area = determinant(matrix);
    this.textArea.updateDet(area, this.textArea);

    matrix = [ [1,  3],
               [-2, 0] ];

    this.area = Snap.select('#det');
    this.tl.to(this.areaNum, 3, { attr: { x: 692, y: 410 }, delay: 2, ease: easeFunctions['sine-ease-in-out'] });
    this._linearTransformation(matrix, this.area, { duration: 3, delay: 2 });
    setTimeout(function() { _this.areaNum.textContent = determinant(matrix); }, 3000);

    this.reset(8);

    setTimeout(function() {
      matrix = [ [5, 0],
                 [0, 3] ];

      _this.tl.to(_this.areaNum, 3, { attr: { x: 708, y: 288 }, ease: easeFunctions['sine-ease-in-out'] });
      _this.areaNum.textContent = determinant(matrix);

      _this.area = Snap.select('#det');
      _this._linearTransformation(matrix, _this.area, { duration: 3, delay: 0 });
    }, 12000);

    this.reset(18);

    setTimeout(function() {
      matrix = [ [1, 1],
                 [1, 1] ];

      _this.tl.to(_this.areaNum, 3, { attr: { x: 642, y: 260 }, ease: easeFunctions['sine-ease-in-out'] });
      _this.areaNum.textContent = determinant(matrix);

      _this.area = Snap.select('#det');
      _this._linearTransformation(matrix, _this.area, { duration: 3, delay: 0 });
    }, 22000);

    this.reset(27);
  }

  reset(delay) {
    let _this = this;
    setTimeout(function() {
      var matrix = [ [1, 0],
                     [0, 1] ];

      _this.tl.to(_this.areaNum, 3, { attr: { x: 617, y: 336 }, ease: easeFunctions['sine-ease-in-out'] });
      _this.areaNum.textContent = determinant(matrix);

      _this.area = Snap.select('#det');
      _this._linearTransformation(matrix, _this.area, { duration: 3, delay: 0 });
    }, (delay * 1000));
  }
}
