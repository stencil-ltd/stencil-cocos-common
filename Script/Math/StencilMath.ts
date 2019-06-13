// Converts from degrees to radians.
export function radians(deg: number): number {
  return deg * Math.PI / 180;
}

// Converts from radians to degrees.
export function degrees(rads: number): number {
  return rads * 180 / Math.PI;
}

export class StencilMath {

  // [min, max)
  public static randomInt(min: number, max: number): number {
    return Math.floor(this.randomFloat(min, max))
  }

  public static randomFloat(min: number, max: number): number {
    const range = max - min
    return min + (Math.random() * range)
  }

  public static clamp(val: number, min: number, max: number): number {
    return Math.max(Math.min(val, max), min)
  }
}