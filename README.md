# Eureka

## Basic Usage

```js

let svg = document.querySelector('svg');

let grid = new Grid(svg);

let v1 = new Vector([1, 2], {
   stroke: '#1abc9c'
});

let v2 = new Vector([-3, 4], {
   showCoordinates: true,
   stroke: '#00a8ff',
   animate: true,
   duration: 2.5,
   ease: 'bounce'
});

let v3 = new Vector([1, -1.5], {
   showCoordinates: true,
   stroke: '#e67e22',
   type: 'point'
});

grid.addToView(v1);
grid.addToView(v2);
grid.addToView(v3);

```

![Eureka vector](https://firebasestorage.googleapis.com/v0/b/web-demo-2188e.appspot.com/o/example.png?alt=media&token=59a9745c-dea1-4001-9085-8f20f8968d7d)
