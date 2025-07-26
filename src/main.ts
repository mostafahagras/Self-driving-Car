import Car from "./car";
import { ControlType } from "./controls";
import { NeuralNetwork } from "./network";

import Road from "./road";
import Visualizer from "./visualizer";
const carCanvas = document.getElementById("carCanvas") as HTMLCanvasElement;
carCanvas.width = 200;
const networkCanvas = document.getElementById(
  "networkCanvas",
) as HTMLCanvasElement;
networkCanvas.width = 300;

const carCtx = carCanvas.getContext("2d") as CanvasRenderingContext2D;
const networkCtx = networkCanvas.getContext("2d") as CanvasRenderingContext2D;

const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);

const N = 2000;
const cars = generateCars(N);
let bestCar = cars[0];
if (localStorage.getItem("bestBrain")) {
  for (let i = 0; i < cars.length; i++) {
    cars[i].brain = JSON.parse(localStorage.getItem("bestBrain")!);
    if (i !== 0) {
      NeuralNetwork.mutate(cars[i].brain!, 0.1);
    }
  }
}

const traffic = [
  new Car(road.getLaneCenter(1), -100, 30, 50, ControlType.Dummy, 2),
  new Car(road.getLaneCenter(0), -300, 30, 50, ControlType.Dummy, 2),
  new Car(road.getLaneCenter(2), -300, 30, 50, ControlType.Dummy, 2),
  new Car(road.getLaneCenter(0), -500, 30, 50, ControlType.Dummy, 2),
  new Car(road.getLaneCenter(1), -500, 30, 50, ControlType.Dummy, 2),
  new Car(road.getLaneCenter(1), -700, 30, 50, ControlType.Dummy, 2),
  new Car(road.getLaneCenter(2), -700, 30, 50, ControlType.Dummy, 2),
];

animate(0);

function save() {
  localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain));
}

function discard() {
  localStorage.removeItem("bestBrain");
}
const saveBtn = document.getElementById("saveBtn") as HTMLButtonElement;
const discardBtn = document.getElementById("discardBtn") as HTMLButtonElement;
saveBtn.onclick = save;
discardBtn.onclick = discard;

function generateCars(n: number) {
  const cars = [];
  for (let i = 1; i <= n; i++) {
    cars.push(new Car(road.getLaneCenter(1), 100, 30, 50, ControlType.Ai));
  }
  return cars;
}

function animate(time: number) {
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].update(road.borders, []);
  }
  for (let i = 0; i < cars.length; i++) {
    cars[i].update(road.borders, traffic);
  }
  bestCar =
    cars.find((c) => c.y === Math.min(...cars.map((c) => c.y))) ?? bestCar;

  carCanvas.height = window.innerHeight;
  networkCanvas.height = window.innerHeight;

  carCtx.save();
  carCtx.translate(0, -bestCar.y + carCanvas.height * 0.7);

  road.draw(carCtx);
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].draw(carCtx, "red");
  }
  carCtx.globalAlpha = 0.2;
  for (let i = 0; i < cars.length; i++) {
    cars[i].draw(carCtx, "blue");
  }
  carCtx.globalAlpha = 1;
  bestCar.draw(carCtx, "blue", true);

  carCtx.restore();

  networkCtx.lineDashOffset = -time / 50;
  Visualizer.drawNetwork(networkCtx, bestCar.brain!);
  requestAnimationFrame(animate);
}
