const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
  window.HTMLInputElement.prototype,
  "value"
)?.set;

const updateReactInput = (targetElement: HTMLElement, content: string) => {
  if (!nativeInputValueSetter) return;
  nativeInputValueSetter.call(targetElement, content);
  targetElement.dispatchEvent(new Event("change", { bubbles: true }));
  targetElement.dispatchEvent(new Event("input", { bubbles: true }));
};

export { updateReactInput };
