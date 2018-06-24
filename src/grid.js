class Grid {
  constructor(svg) {
    this.grid = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    this.svg = svg;

    this.originX = 600;
    this.originY = 350;

    this.svg.append(this.grid);
    this.createGrid(false);
    this.createGrid(true);
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

  addToView(obj) {
    if (obj.ops.showCoordinates) {
      this.grid.append(obj.coordLabel);
    }

    this.grid.append(obj.arrow);

    if (obj.ops.animate) {
      let tl = new TimelineMax();
      tl.from(obj.arrow, obj.ops.duration, { attr: { x2: this.originX, y2: this.originY }, ease: easeFunctions[obj.ops.ease] });
    }
  }
}
