export default class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    equals(other: Point) {
        return this.x === other.x && this.y === other.y
    }

    draw(ctx: CanvasRenderingContext2D, { size = 10, color = "black", outline = false, fill = false } = {}) {
        const radius = size / 2;
        ctx.beginPath()
        ctx.fillStyle = color;
        ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
        ctx.fill();
        if (outline) {
            ctx.beginPath()
            ctx.strokeStyle = "yellow";
            ctx.lineWidth = 2
            ctx.arc(this.x, this.y, radius * 0.6, 0, Math.PI * 2);
            ctx.stroke();
        }
        if (fill) {
            ctx.beginPath()
            ctx.arc(this.x, this.y, radius * 0.4, 0, Math.PI * 2);
            ctx.fillStyle = "yellow";
            ctx.fill();
        }
    }
}