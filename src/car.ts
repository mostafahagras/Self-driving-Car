import Controls from "./controls"

export default class Car {
    x: number;
    y: number;
    width: number;
    height: number;
    angle = 0;
    controls: Controls;
    speed = 0;
    maxSpeed = 3;
    friction = 0.05
    acceleration = 0.2;

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y
        this.width = width
        this.height = height

        this.controls = new Controls()
    }

    update() {
        this.#move();
    }

    #move() {
        if (this.controls.forward) {
            this.speed += this.acceleration
        } else if (this.controls.reverse) {
            this.speed -= this.acceleration
        }

        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }
        if (this.speed < -this.maxSpeed / 2) {
            this.speed = -this.maxSpeed / 2;
        }
        if (this.speed > 0) {
            this.speed -= this.friction;
        }
        if (this.speed < 0) {
            this.speed += this.friction;
        }
        if (Math.abs(this.speed) < this.friction) {
            this.speed = 0
        }
        if (this.speed) {
            const flip = this.speed > 0 ? 1 : -1;
            if (this.controls.left) {
                this.angle += 0.03 * flip
            } else if (this.controls.right) {
                this.angle -= 0.03 * flip
            }
        }

        this.x -= Math.sin(this.angle) * this.speed;
        this.y -= Math.cos(this.angle) * this.speed;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save()
        ctx.translate(this.x, this.y);
        ctx.rotate(-this.angle)
        ctx.beginPath()
        ctx.rect(-this.width / 2, - this.height / 2, this.width, this.height);
        ctx.fill()
        ctx.restore()
    }

}
