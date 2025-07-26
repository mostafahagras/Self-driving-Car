import Car from "./car";
import { ControlType } from "./controls";
import Road from "./road";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
canvas.width = 200;

const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
const road = new Road(canvas.width / 2, canvas.width * 0.9);
const car = new Car(road.getLaneCenter(1), 100, 30, 50, ControlType.Ai);
const traffic = [
  new Car(road.getLaneCenter(1), -100, 30, 50, ControlType.Dummy, 2),
];
animate();

function animate() {
  for (const trafficCar of traffic) {
    trafficCar.update(road.borders, []);
  }
  car.update(road.borders, traffic);
  canvas.height = window.innerHeight;
  ctx.save();
  ctx.translate(0, canvas.height * 0.7 - car.y);
  road.draw(ctx);
  for (const trafficCar of traffic) {
    trafficCar.draw(ctx, "red");
  }
  car.draw(ctx, "blue");
  ctx.restore();
  requestAnimationFrame(animate);
}
