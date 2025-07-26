import Car from "./car";
import { ControlType } from "./controls";
import Road from "./road";
import Visualizer from "./visualizer";

const carCanvas = document.getElementById("carCanvas") as HTMLCanvasElement;
carCanvas.width = 200;
const netowrkCanvas = document.getElementById("networkCanvas") as HTMLCanvasElement;
netowrkCanvas.width = 300;

const carCtx = carCanvas.getContext("2d") as CanvasRenderingContext2D;
const networkCtx = netowrkCanvas.getContext("2d") as CanvasRenderingContext2D;
const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);
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
  carCanvas.height = window.innerHeight;
  netowrkCanvas.height = window.innerHeight;

  carCtx.save();
  carCtx.translate(0, carCanvas.height * 0.7 - car.y);
  road.draw(carCtx);
  for (const trafficCar of traffic) {
    trafficCar.draw(carCtx, "red");
  }
  car.draw(carCtx, "blue");
  carCtx.restore();

  Visualizer.drawNetwork(networkCtx, car.brain!)
  requestAnimationFrame(animate);
}
