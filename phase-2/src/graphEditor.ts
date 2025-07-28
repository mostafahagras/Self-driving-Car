import type Graph from "./math/graph";
import { getNearestPoint } from "./math/utils";
import Point from "./primitives/point";
import Segment from "./primitives/segment";

export default class GraphEditor {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    graph: Graph;
    selected: Point | null = null;
    hovered: Point | null = null
    mouse: Point | null = null
    dragging = false

    constructor(canvas: HTMLCanvasElement, graph: Graph) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        this.graph = graph;

        this.#addEventListeners();
    }

    #addEventListeners() {
        this.canvas.addEventListener("mousedown", this.#handleMouseDown.bind(this));
        this.canvas.addEventListener("mousemove", this.#handleMouseMove.bind(this));
        this.canvas.addEventListener("contextmenu", (evt) => evt.preventDefault());
        this.canvas.addEventListener("mouseup", () => { this.dragging = false });
    }

    #handleMouseMove(e: MouseEvent) {
        this.mouse = new Point(e.offsetX, e.offsetY);
        this.hovered = getNearestPoint(this.mouse, this.graph.points, 10);
        if (this.dragging === true && this.selected) {
            this.selected.x = this.mouse.x;
            this.selected.y = this.mouse.y;
        }
    }

    #handleMouseDown(e: MouseEvent) {
        if (e.button === 2) {
            if (this.selected) {
                this.selected = null;
            } else if (this.hovered) {
                this.#removePoint(this.hovered);
            }
        }
        if (e.button === 0) {
            if (this.hovered) {
                this.#select(this.hovered);
                this.dragging = true;
                return;
            }
            this.graph.addPoint(this.mouse!);
            this.#select(this.mouse!);
            this.hovered = this.mouse;
        }
    }

    #select(point: Point) {
        if (this.selected) {
            this.graph.tryAddSegment(new Segment(this.selected, point));
        }
        this.selected = point;
    }

    #removePoint(point: Point) {
        this.graph.removePoint(point);
        this.hovered = null;
        if (this.selected === point) {
            this.selected = null;
        }
    }

    display() {
        this.graph.draw(this.ctx)
        if (this.hovered) {
            this.hovered.draw(this.ctx, { fill: true });
        }
        if (this.selected) {
            new Segment(this.selected, this.hovered ?? this.mouse!).draw(this.ctx, { width: 1, dash: [3, 3]})
            this.selected.draw(this.ctx, { outline: true });
        }
    }
}