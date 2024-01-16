import { TMeasuredLayer } from "@/@types/layer";

class OverflowError extends Error {
  limit: number;
  count: number;
  layer: TMeasuredLayer;
  constructor(limit: number, count: number, layer: TMeasuredLayer) {
    super("OverflowError");
    this.limit = limit;
    this.count = count;
    this.layer = layer;
  }
}
OverflowError.prototype.name = "OverflowError";
export { OverflowError };
