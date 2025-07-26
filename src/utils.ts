export function lerp(start: number, end: number, bias: number) {
    return start + bias * (end - start);
}