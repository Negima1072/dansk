import type { TMeasuredLayer } from "@/types/layer";

export class OverflowError extends Error {
  limit: number;
  count: number;
  layer: TMeasuredLayer;
  constructor(limit: number, count: number, layer: TMeasuredLayer) {
    super("OverflowError");
    this.name = "OverflowError";
    this.limit = limit;
    this.count = count;
    this.layer = layer;
  }
}
