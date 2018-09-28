## basic vector usage

![Eureka vector](https://firebasestorage.googleapis.com/v0/b/web-demo-2188e.appspot.com/o/vector_large.png?alt=media&token=e588713a-0e0e-4a97-93c2-f532cbd3cf0e)

```js
let svg = document.querySelector('svg');
let grid = new Grid(svg);

let v1 = new Vector([1, 2], {
   showCoordinates: true,
   stroke: '#1abc9c'
});
let v2 = new Vector([-4, 4], {
   stroke: '#9b59b6'
});
let v3 = new Vector([2, -3], {
   showCoordinates: true,
   stroke: '#3498db',
   type: 'point'
});

grid.addToView(v1);
grid.addToView(v2);
grid.addToView(v3);
```

## some examples of stuff made using eureka

https://codepen.io/nshillingford/pen/PavZqX

https://codepen.io/nshillingford/pen/Zjemwa

https://codepen.io/nshillingford/pen/YveXRE
