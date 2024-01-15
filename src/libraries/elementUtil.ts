const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
  window.HTMLInputElement.prototype,
  "value"
)?.set;
const nativeInputValueGetter = Object.getOwnPropertyDescriptor(
  window.HTMLInputElement.prototype,
  "value"
)?.get;
const nativeTextAreaValueSetter = Object.getOwnPropertyDescriptor(
  window.HTMLTextAreaElement.prototype,
  "value"
)?.set;
const nativeTextAreaValueGetter = Object.getOwnPropertyDescriptor(
  window.HTMLTextAreaElement.prototype,
  "value"
)?.get;

const updateReactHTMLInput = (
  targetElement: HTMLInputElement,
  content: string
) => {
  if (!nativeInputValueSetter || !nativeInputValueGetter) return;
  while (nativeInputValueGetter.call(targetElement) !== content) {
    nativeInputValueSetter.call(targetElement, content);
  }
  targetElement.dispatchEvent(new Event("change", { bubbles: true }));
  targetElement.dispatchEvent(new Event("input", { bubbles: true }));
};
const updateReactHTMLTextArea = (
  targetElement: HTMLTextAreaElement,
  content: string
) => {
  if (!nativeTextAreaValueSetter || !nativeTextAreaValueGetter) return;
  while (nativeTextAreaValueGetter.call(targetElement) !== content) {
    nativeTextAreaValueSetter.call(targetElement, content);
  }
  targetElement.dispatchEvent(new Event("change", { bubbles: true }));
  targetElement.dispatchEvent(new Event("input", { bubbles: true }));
};

export { updateReactHTMLInput, updateReactHTMLTextArea };
