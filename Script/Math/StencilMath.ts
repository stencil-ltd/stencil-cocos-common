// Converts from degrees to radians.
export function radians(deg: number): number {
  return deg * Math.PI / 180;
}

// Converts from radians to degrees.
export function degrees(rads: number): number {
  return rads * 180 / Math.PI;
}

export class StencilMath {

  // min and max included
  public static random(min: number, max: number): number {
    return Math.floor(Math.random()*(max-min+1)+min);
  }

  public static clamp(val: number, min: number, max: number): number {
    return Math.max(Math.min(val, max), min)
  }
}