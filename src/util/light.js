class Light {
  constructor(v1) {
    this.flashlight = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    this.light = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    this.angle = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    this.components = [];

    this.p1 = 'M993.16,587.1c-6.81,1.28-13.55,1.65-20.09-1.3-.57-.26-1.53-.66-1.8-.42-4.75,4.27-5.59-.53-7.19-3.13q-13.9-22.74-27.65-45.58c-1-1.73-3.58-3.46-.69-6,1-.89-.33-2.11-.9-3.05-9.14-15.24-18.35-30.43-27.38-45.73-1.48-2.51-2.75-3-4.94-1.15-2.47,2.1-3.95,1.54-5.62-1.33q-17.44-29.92-35.26-59.6c-1.75-2.91-2.06-4.68,1.41-6s1.57-3.16.51-4.93c-13.75-22.93-27.22-46-41.41-68.69-4.74-7.56-3.74-13.64,1-20.1,7.59-10.28,17.19-18.51,27.36-26.06,11.63-8.64,23.74-16.51,37.67-21.1,9-3,12.62-2,18.84,5.15q71.87,82.27,143.8,164.5c1,1.19,1.71,3.43,4.24,1.71,1.6-1.09,2.27.91,3,1.79,12.52,14.67,25,29.4,37.49,44.06,1.53,1.79,2.38,3.2-.22,4.65-.88.49-.85,1.29-.74,2.16,1.31,11-3.82,19.92-10,28A175.52,175.52,0,0,1,1000,585.56,65,65,0,0,1,993.16,587.1Z';
    this.p2 = 'M933.83,318.44c1.72-.41,2.56,2.17,3.84,3.61,12.33,14,24.53,28,36.78,42.06,23.73,27.19,47.39,54.43,71.28,81.48,2.9,3.29,2.06,4.48-.94,6.66q-49.91,36.16-99.61,72.59c-3,2.23-4.37,1.62-6.07-1.25-8.77-14.88-17.54-29.77-26.59-44.48-1.86-3-1.12-4.19,1.52-5.67,5.36-3,10.55-6.32,15.92-9.29,2.45-1.36,3.33-2.49,1.66-5.27q-18-29.9-35.63-60c-1.74-3-3.16-2.5-5.51-1-5.49,3.44-11.15,6.61-16.66,10-2,1.24-3.23,1.5-4.67-1-5.25-9.06-10.74-18-16.18-26.91-1.09-1.8-1.12-3.16.57-4.76,22.55-21.33,46.42-40.86,74.55-54.55C929.58,319.94,931.18,319.46,933.83,318.44Z';
    this.p3 = 'M929.12,312.47c.21,1.67-1.08,2.15-2,2.58-14.06,6.22-26.77,14.73-39.1,23.73A327.27,327.27,0,0,0,851.14,370c-2,2-2.83,2.72-4.46-.35-2.88-5.42-6.08-10.68-9.47-15.79-1.55-2.33-1.23-3.95.55-5.63,21.68-20.5,44.67-39.21,71.8-52.25,3-1.45,4.54-1,6.55,1.55,3.47,4.44,7.45,8.48,11.2,12.7C928,311,928.56,311.77,929.12,312.47Z';
    this.p4 = 'M908.7,288.81c-.1,2.22-2,2.41-3.4,3.07a224.91,224.91,0,0,0-38.36,24c-10.72,8.13-21.2,16.63-30.55,26.35-3.21,3.34-4.57,2.53-6.7-1-6.64-11.09-6.87-12.78,2-22.41,15.5-16.79,33.59-30.13,54.76-39,9.88-4.15,10.95-3.77,17.84,4.2C905.71,285.64,907.21,287.2,908.7,288.81Z';
    this.p5 = 'M868.13,419.08c-.17-1.93,1.52-2.43,2.71-3.14,5.83-3.51,11.79-6.8,17.56-10.4,2.9-1.81,4.47-1.36,6.2,1.62,8.66,14.93,17.57,29.7,26.27,44.61,4.89,8.37,4.78,8.45-3.46,13.36-4.42,2.63-8.89,5.17-13.28,7.85-1.85,1.13-3.29,1.41-4.57-.74q-15.46-26.13-31-52.25C868.43,419.72,868.3,419.41,868.13,419.08Z';
    this.p6 = 'M1088.9,499c.19,7-2.2,12.32-5.48,17-22.3,32.1-52.06,54-89.74,64.88-5.18,1.49-10.64,2.16-17-.16Z';

    this.shadow = new Vector([v1.ipc[0], 0], {
      stroke: 'rgba(127, 140, 141, 0.8)',
      lineWidth: 3
    });
    this.glow = new Vector([v1.ipc[0], (v1.ipc[1] + 0.05)], {
      stroke: 'rgba(252, 232, 131, 1)',
      lineWidth: 1.9
    });

    this.shadow.arrow.setAttributeNS(null, 'opacity', 0);
    this.glow.arrow.setAttributeNS(null, 'opacity', 0);

    this.angle.setAttributeNS(null, 'd', 'M600,350 L750,250 L750,350Z');
    this.angle.setAttributeNS(null, 'fill', 'rgba(127, 140, 141, 0)'); // 0.15
    this.angle.id = 'triangle';

    this.build();
  }

  build() {
    let colors = ['#5b3718', '#d42027', '#b52025', '#d42027', '#b52025', '#ecf0f1'];
    let paths = [this.p1, this.p2, this.p3, this.p4, this.p5, this.p6];

    for (var i = 0; i < paths.length; i++) {
      let p = document.createElementNS('http://www.w3.org/2000/svg', 'path');

      p.setAttributeNS(null, 'transform', 'translate(-819.06 -271.38)');
      p.setAttributeNS(null, 'fill', colors[i]);
      p.setAttributeNS(null, 'd', paths[i]);

      this.flashlight.append(p);
      this.components.push(p);
    }

    this.light.setAttributeNS(null, 'd', 'M705,100 L550,390 C550,390 712,520 900,390 L750,100');
    this.light.setAttributeNS(null, 'fill', 'rgba(252, 232, 131, 0)');

    this.flashlight.setAttributeNS(null, 'transform', 'translate(685, 18) scale(0.3)');
    this.flashlight.id = 'flashlight';
  }

  turnOn() {
    this.light.setAttributeNS(null, 'fill', 'rgba(252, 232, 131, 0.15)');
    this.angle.setAttributeNS(null, 'fill', 'rgba(127, 140, 141, 0.15)');
    this.components[5].setAttributeNS(null, 'fill', '#fddb6d');
    this.shadow.arrow.setAttributeNS(null, 'opacity', 1);
    this.glow.arrow.setAttributeNS(null, 'opacity', 1);
  }

  turnOff() {
    this.light.setAttributeNS(null, 'fill', 'rgba(252, 232, 131, 0)');
    this.angle.setAttributeNS(null, 'fill', 'rgba(127, 140, 141, 0)');
    this.components[5].setAttributeNS(null, 'fill', '#ecf0f1');
    this.shadow.arrow.setAttributeNS(null, 'opacity', 0);
    this.glow.arrow.setAttributeNS(null, 'opacity', 0);
  }
}