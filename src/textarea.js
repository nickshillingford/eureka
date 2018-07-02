class TextArea {
  constructor() {
    this.group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    this.openBracket = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    this.closeBracket = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    this.iHat_x = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    this.iHat_y = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    this.jHat_x = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    this.jHat_y = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    this.ta = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

    this.ta.setAttributeNS(null, 'style', 'filter:url(#shadow)');
    this.ta.setAttributeNS(null, 'fill', '#3b3b3b');
    this.ta.setAttributeNS(null, 'height', 275);
    this.ta.setAttributeNS(null, 'width', 425);
    this.ta.setAttributeNS(null, 'x', 12);
    this.ta.setAttributeNS(null, 'y', 10);

    this.setBrackets();
    this.setMatrix();

    this.group.setAttributeNS(null, 'transform', 'scale(0.7) translate(-48, -10)');
  }

  setMatrix() {
    let values = [this.iHat_x, this.iHat_y, this.jHat_x, this.jHat_y];
    let fill = ['#1abc9c', '#1abc9c', '#3498db', '#3498db'];
    let x = [148, 148, 230, 230];
    let y = [124, 204, 124, 204];
    let v = ['1', '0', '0', '1'];

    for (var i = 0; i < 4; i++) {
      values[i].setAttributeNS(null, 'font-size', '2em');
      values[i].setAttributeNS(null, 'fill', fill[i]);
      values[i].setAttributeNS(null, 'x', x[i]);
      values[i].setAttributeNS(null, 'y', y[i]);
      values[i].textContent = v[i];
      this.group.append(values[i]);
    }
  }

  setBrackets() {
    let paths = ['M85,80 L70,80 L70,225 L85,225', 'M185,80 L200,80 L200,225 L185,225'];
    let translations = ['translate(50, 0)', 'translate(75, 0)'];
    let brackets = [this.openBracket, this.closeBracket];

    for (var i = 0; i < 2; i++) {
      brackets[i].setAttributeNS(null, 'd', paths[i]);
      brackets[i].setAttributeNS(null, 'transform', translations[i]);
      brackets[i].setAttributeNS(null, 'stroke', '#ffffff');
      brackets[i].setAttributeNS(null, 'stroke-width', 3);
      brackets[i].setAttributeNS(null, 'fill', 'none');
      this.group.append(brackets[i]);
    }
  }

  updateMatrix(matrix, content, ops) {
    setTimeout(function() {
      content.iHat_x.textContent = (matrix[0][0] + '');
      content.iHat_y.textContent = (matrix[1][0] + '');
      content.jHat_x.textContent = (matrix[0][1] + '');
      content.jHat_y.textContent = (matrix[1][1] + '');
    }, (ops.delay * 1000));
  }
}
