class TextArea {
  constructor() {
    this.group = document.createElementNS('http://www.w3.org/2000/svg', 'g');

    this.openBracket1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    this.closeBracket1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    this.openBracket2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    this.closeBracket2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    this.openBracket3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    this.closeBracket3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    this.equal = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    this.times = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    this.iHat_x = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    this.iHat_y = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    this.jHat_x = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    this.jHat_y = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    this.lc_x = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    this.lc_y = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    this.r_x = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    this.r_y = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    this.label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    this.det = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    this.ta = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

    this.ta.setAttributeNS(null, 'style', 'filter:url(#shadow)');
    this.ta.setAttributeNS(null, 'fill', '#3b3b3b');
    this.ta.setAttributeNS(null, 'height', 275);
    this.ta.setAttributeNS(null, 'width', 425);
    this.ta.setAttributeNS(null, 'x', 12);
    this.ta.setAttributeNS(null, 'y', 10);

    this.times.setAttributeNS(null, 'fill', '#ffffff');
    this.times.setAttributeNS(null, 'font-size', '2em');
    this.times.setAttributeNS(null, 'x', 315);
    this.times.setAttributeNS(null, 'y', 164);
    this.times.textContent = 'x';

    this.equal.setAttributeNS(null, 'fill', '#ffffff');
    this.equal.setAttributeNS(null, 'font-size', '2em');
    this.equal.setAttributeNS(null, 'x', 485);
    this.equal.setAttributeNS(null, 'y', 164);
    this.equal.textContent = '=';

    this.setBrackets();
    this.setMatrix();
    this.setDet();

    this.group.append(this.times);
    this.group.append(this.equal);
    this.group.setAttributeNS(null, 'transform', 'scale(0.7) translate(-48, -10)');
  }

  setMatrix() {
    let values = [this.iHat_x, this.iHat_y, this.jHat_x, this.jHat_y,
                  this.lc_x, this.lc_y, this.r_x, this.r_y];
    let fill = ['#1abc9c', '#1abc9c', '#3498db', '#3498db', '#fd79a8', '#fd79a8',
                '#fd79a8', '#fd79a8',];
    let x = [148, 148, 230, 230, 401, 401, 572, 572];
    let y = [124, 204, 124, 204, 124, 204, 124, 204];
    let v = ['1', '0', '0', '1', '1', '1', '1', '1'];

    for (var i = 0; i < 8; i++) {
      values[i].setAttributeNS(null, 'font-size', '2em');
      values[i].setAttributeNS(null, 'fill', fill[i]);
      values[i].setAttributeNS(null, 'x', x[i]);
      values[i].setAttributeNS(null, 'y', y[i]);
      values[i].textContent = v[i];
      this.group.append(values[i]);
    }
  }

  setBrackets() {
    let paths = ['M85,80 L70,80 L70,225 L85,225', 'M185,80 L200,80 L200,225 L185,225',
                 'M85,80 L70,80 L70,225 L85,225', 'M185,80 L200,80 L200,225 L185,225',
                 'M85,80 L70,80 L70,225 L85,225', 'M185,80 L200,80 L200,225 L185,225'];

    let translations = ['translate(50, 0)', 'translate(75, 0)', 'translate(300, 0)',
                        'translate(250, 0)', 'translate(470, 0)', 'translate(420, 0)'];

    let brackets = [this.openBracket1, this.closeBracket1, this.openBracket2, this.closeBracket2,
                    this.openBracket3, this.closeBracket3];

    for (var i = 0; i < 6; i++) {
      brackets[i].setAttributeNS(null, 'd', paths[i]);
      brackets[i].setAttributeNS(null, 'transform', translations[i]);
      brackets[i].setAttributeNS(null, 'stroke', '#ffffff');
      brackets[i].setAttributeNS(null, 'stroke-width', 3);
      brackets[i].setAttributeNS(null, 'fill', 'none');
      this.group.append(brackets[i]);
    }
  }

  setDet() {
    this.label.setAttributeNS(null, 'font-size', '2em');
    this.label.setAttributeNS(null, 'fill', '#ffffff');
    this.label.setAttributeNS(null, 'x', 124);
    this.label.setAttributeNS(null, 'y', 336);

    this.det.setAttributeNS(null, 'font-size', '2em');
    this.det.setAttributeNS(null, 'fill', '#fd79a8');
    this.det.setAttributeNS(null, 'x', 205);
    this.det.setAttributeNS(null, 'y', 338);

    this.group.append(this.label);
    this.group.append(this.det);
  }

  updateDet(area, content, ops) {
    var delay = (ops) ? (ops.delay) : 0;

    setTimeout(function() {
      content.det.textContent = '';
      content.label.textContent = 'det = ' + content.det.textContent;
      content.det.textContent = area;
    }, (delay * 1000));
  }

  updateMatrix(matrix, content, ops) {
    setTimeout(function() {
      var result = multiply(matrix, [1, 1]);
      content.iHat_x.textContent = matrix[0][0];
      content.iHat_y.textContent = matrix[1][0];
      content.jHat_x.textContent = matrix[0][1];
      content.jHat_y.textContent = matrix[1][1];
      content.r_x.textContent = result[0];
      content.r_y.textContent = result[1];
    }, (ops.delay * 1000));
  }
}
