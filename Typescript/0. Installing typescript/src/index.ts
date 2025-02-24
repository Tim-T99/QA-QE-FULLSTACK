type RectangleType = {
    width: number;
    height: number;
}

const rectangle ={
    width: 10,
    height: 20,
}

const getRectangleArea = (rectangle: RectangleType) => {
    return rectangle.width * rectangle.height;
  };
  
  const getRectanglePerimeter = (rectangle: RectangleType) => {
    return 2 * (rectangle.width + rectangle.height);
    
  };

console.log(getRectangleArea(rectangle))
console.log(getRectanglePerimeter(rectangle))
