interface vec {
  x: number;
  y: number;
}

export default class Vector2 {
  x: number;
  y: number;

  constructor();
  constructor(x: number, y: number);
  constructor(x?: number, y?: number) {
    if (x !== undefined && y != undefined) {
      this.x = x;
      this.y = y;
    } else {
      this.x = 0;
      this.y = 0;
    }
  }

  static Add(a: vec, b: vec): Vector2 {
    return new Vector2(a.x + b.x, a.y + b.y);
  }

  static Subtract(a: vec, b: vec): Vector2 {
    return new Vector2(a.x - b.x, a.y - b.y);
  }

  static Multiply(a: vec, b: vec): Vector2 {
    return new Vector2(a.x * b.x, a.y * b.y);
  }

  // a + (b - a) * t
  static Lerp(a: vec, b: vec, t: number) {
    let x = a.x + (b.x - a.x) * t;
    let y = a.y + (b.y - a.y) * t;
    return new Vector2(x, y);
  }

  length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalized(): Vector2 {
    let magnitude = this.length();
    return new Vector2(this.x / magnitude, this.y / magnitude);
  }

  scale(factor: number): Vector2 {
    return new Vector2(this.x * factor, this.y * factor);
  }

  add(vect: vec): Vector2 {
    return Vector2.Add(this, vect);
  }

  sub(vect: vec): Vector2 {
    return Vector2.Subtract(this, vect);
  }

  lerp(vect: vec, t: number) {
    return Vector2.Lerp(this, vect, t);
  }
}
