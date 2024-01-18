import { atom } from "jotai";
import { TLayer } from "@/@types/layer";
import { TBackground } from "@/@types/background";
import { TElement } from "@/@types/element";
import { TOption } from "@/@types/option";

export const layerAtom = atom<TLayer[]>([]);
export const backgroundAtom = atom<TBackground>({
  selected: -1,
  images: [],
  open: false,
  mode: "fill",
  visible: true,
  transparency: 100,
});
export const optionAtom = atom<TOption>({
  grid: false,
  replace: false,
  preview: "disable",
});
export const elementAtom = atom<TElement | undefined>(undefined);
export const exportLayerAtom = atom<string[]>([]);
