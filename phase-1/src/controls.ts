export enum ControlType {
  Ai,
  Keys,
  Dummy,
  Traffic,
}

export default class Controls {
  forward = false;
  left = false;
  right = false;
  reverse = false;

  constructor(controlType: ControlType) {
    if (controlType === ControlType.Keys) {
      this.#addKeyboardListeners();
    } else {
      this.forward = true;
    }
  }

  #addKeyboardListeners() {
    document.onkeydown = (e) => {
      switch (e.key) {
        case "ArrowLeft":
          this.left = true;
          break;
        case "ArrowRight":
          this.right = true;
          break;
        case "ArrowUp":
          this.forward = true;
          break;
        case "ArrowDown":
          this.reverse = true;
          break;
      }
    };
    document.onkeyup = (e) => {
      switch (e.key) {
        case "ArrowLeft":
          this.left = false;
          break;
        case "ArrowRight":
          this.right = false;
          break;
        case "ArrowUp":
          this.forward = false;
          break;
        case "ArrowDown":
          this.reverse = false;
          break;
      }
    };
  }
}
