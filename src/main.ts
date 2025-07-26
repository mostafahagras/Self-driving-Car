import Car from "./car";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;


const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
const car = new Car(100, 100, 30, 50);

car.draw(ctx);

animate()

function animate() {
  canvas.height = window.innerHeight
  canvas.width = 200;
  car.update();
  car.draw(ctx)
  requestAnimationFrame(animate);
}