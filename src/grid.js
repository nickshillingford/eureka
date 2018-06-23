class Grid {
  constructor(svg, options) {
    this.topLayer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    this.grid = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    this.svg = svg;

    this.originX = 600;
    this.originY = 350;

    this.svg.append(this.grid);
    this.createGrid(false);
    this.createGrid(true);
    this.svg.append(this.topLayer);

    this.ops = {
      showOrigin: false,
      fill: '#3b3b3b'
    }

    if (options) {
      this.setOptions(options);
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

  setOptions(options) {
    if (options.showOrigin) {
      for (let key in options) {
        this.ops[key] = options[key];
      }
      let origin = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      origin.setAttributeNS(null, 'fill', this.ops.fill);
    	origin.setAttributeNS(null, 'cx', this.originX);
    	origin.setAttributeNS(null, 'cy', this.originY);
    	origin.setAttributeNS(null, 'r', 4);
      this.topLayer.append(origin);
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
  }
}
