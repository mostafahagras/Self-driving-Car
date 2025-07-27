import type Point from "../primitives/point";
import type Segment from "../primitives/segment";

export default class Graph {
    points: Point[];
    segments: Segment[];

    constructor(points: Point[] = [], segments: Segment[] = []) {
        this.points = points;
        this.segments = segments;
    }

    addPoint(point: Point) {
        this.points.push(point)
    }

    containsPoint(point: Point) {
        return this.points.find(p => p.equals(point))
    }

    tryAddPoint(point: Point) {
        if (!this.containsPoint(point)) {
            this.addPoint(point);
            return true;
        }
        return false;
    }

    removePoint(point: Point) {
        // this.points.splice(this.points.indexOf(point), 1)
        // this.segments = this.segments.filter(seg => !seg.includes(point))
        const segs = this.getSegmentsWithPoint(point);
        for (const seg of segs) {
            this.removeSegment(seg);
        }
        this.points.splice(this.points.indexOf(point), 1);
    }

    addSegment(segment: Segment) {
        this.segments.push(segment);
    }

    containsSegment(segment: Segment) {
        return this.segments.find(s => s.equals(segment))
    }

    tryAddSegment(segment: Segment) {
        if (!this.containsSegment(segment)) {
            this.addSegment(segment);
            return true;
        }
        return false;
    }

    removeSegment(seg: Segment) {
        this.segments.splice(this.segments.indexOf(seg), 1)
    }

    getSegmentsWithPoint(point: Point) {
        return this.segments.filter(seg => seg.includes(point))
    }

    dispose() {
        this.points.length = 0;
        this.segments.length = 0;
    }

    draw(ctx: CanvasRenderingContext2D) {
        for (const seg of this.segments) {
            seg.draw(ctx);
        }

        for (const point of this.points) {
            point.draw(ctx)
        }
    }
}