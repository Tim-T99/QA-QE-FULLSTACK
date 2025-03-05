// //          1. Classes
// // 1: Creating a Class
// // class CanvasNode {
// //   readonly x = 0;
// //   readonly y = 0;
// // }

// // it("Should store some basic properties", () => {
// //   const canvasNode = new CanvasNode();

// //   expect(canvasNode.x).toEqual(0);

// //   expect(canvasNode.y).toEqual(0);

// //   // @ts-expect-error Property is readonly
// //   canvasNode.x = 10;

// //   // @ts-expect-error Property is readonly
// //   canvasNode.y = 20;
// // });

// // 2: Implementing Class Methods
// class CanvasNode {
//   x = 0;
//   y = 0;
//   move = (x: number, y: number) => {
//     this.x = x;
//     this.y = y;
//   };
// }



// it("Should be able to move to a new location", () => {
  // const canvasNode = new CanvasNode();

//   expect(canvasNode.x).toEqual(0);
//   expect(canvasNode.y).toEqual(0);

  // canvasNode.move(10, 20);


//   expect(canvasNode.x).toEqual(10);
//   expect(canvasNode.y).toEqual(20);
// });

// // 3: Implement a Getter
// // class CanvasNode {
// //   x: number;
// //   y: number;

// //   constructor(position?: { x: number; y: number }) {
// //     this.x = position?.x ?? 0;
// //     this.y = position?.y ?? 0;
// //   }

// //   move(x: number, y: number) {
// //     this.x = x;
// //     this.y = y;
// //   }
// // }

// // it("Should be able to move", () => {
// //   const canvasNode = new CanvasNode();

// //   expect(canvasNode.position).toEqual({ x: 0, y: 0 });


// //   canvasNode.move(10, 20);

// //   expect(canvasNode.position).toEqual({ x: 10, y: 20 });

// // });

// // it("Should be able to receive an initial position", () => {
// //   const canvasNode = new CanvasNode({
// //     x: 10,
// //     y: 20,
// //   });

// //   expect(canvasNode.position).toEqual({ x: 10, y: 20 });

// // });

// // 4: Implement a Setter
// class CanvasNode {
//   set position(pos) {
//     this.x = pos.x;
//     this.y = pos.y;
//   }
//   constructor(position?: { x: number; y: number }) {
//     this.#x = position?.x ?? 0;
//     this.#y = position?.y ?? 0;
//   }

// }

// canvasNode.position = { x: 10, y: 20 };

// // 5: Extending a Class
class Shape {
  #x: number;
  #y: number;

  constructor(options?: { x: number; y: number }) {
    this.#x = options?.x ?? 0;
    this.#y = options?.y ?? 0;
  }

  // position getter and setter methods

  move(x: number, y: number) {
    this.#x = x;
    this.#y = y;
  }
}