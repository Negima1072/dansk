import { describe } from "@jest/globals";

import { SampleLayerData, SampleOutputData } from "@/__tests__/layerData";
import { layerUtil } from "@/libraries/layerUtil/layerUtil";

beforeEach(() => {
  globalThis.alert = jest.fn((...args) => console.log(...args));
});

describe("big9", () => {
  test("normal export", () => {
    const output = layerUtil.toString(
      SampleLayerData.big9,
      false,
      false,
      false,
    );
    expect(output).toBeDefined();
    if (!output) return;
    const string = layerUtil.formatAsString(output);
    expect(string).toEqual(SampleOutputData.big9.normal);
  });

  test("tab export", () => {
    const output = layerUtil.toString(SampleLayerData.big9, false, true, false);
    expect(output).toBeDefined();
    if (!output) return;
    const string = layerUtil.formatAsString(output);
    expect(string).toEqual(SampleOutputData.big9.tab);
  });
});

describe("ts38", () => {
  test("normal export", () => {
    const output = layerUtil.toString(
      SampleLayerData.ts38,
      false,
      false,
      false,
    );
    expect(output).toBeUndefined();
  });

  test("tab export", () => {
    const output = layerUtil.toString(SampleLayerData.ts38, false, true, false);
    expect(output).toBeUndefined();
  });

  test("normal owner export", () => {
    const output = layerUtil.toString(SampleLayerData.ts38, false, false, true);
    expect(output).toBeDefined();
    if (!output) return;
    const string = layerUtil.formatAsString(output);
    expect(string).toEqual(SampleOutputData.ts38.normal_owner);
  });

  test("tab owner export", () => {
    const output = layerUtil.toString(SampleLayerData.ts38, false, true, true);
    expect(output).toBeDefined();
    if (!output) return;
    const string = layerUtil.formatAsString(output);
    expect(string).toEqual(SampleOutputData.ts38.tab_owner);
  });

  test("monospaced owner export", () => {
    const output = layerUtil.toString(SampleLayerData.ts38, true, false, true);
    expect(output).toBeDefined();
    if (!output) return;
    const string = layerUtil.formatAsString(output);
    expect(string).toEqual(SampleOutputData.ts38.monospaced_owner);
  });

  test("monospaced tab owner export", () => {
    const output = layerUtil.toString(SampleLayerData.ts38, true, true, true);
    expect(output).toBeDefined();
    if (!output) return;
    const string = layerUtil.formatAsString(output);
    expect(string).toEqual(SampleOutputData.ts38.monospaced_tab_owner);
  });
});
