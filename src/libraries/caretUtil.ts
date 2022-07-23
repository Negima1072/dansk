import typeGuard from "@/libraries/typeGuard";

const caretUtil = {
  getFocusedNode: (): Node | undefined => {
    if ((document.getSelection()?.rangeCount || 0) === 0) return;
    return document.getSelection()?.getRangeAt(0).endContainer;
  },
  getFocusedElement: (): HTMLElement | null | undefined => {
    if ((document.getSelection()?.rangeCount || 0) === 0) return;
    const focusedNode = document.getSelection()?.getRangeAt(0).endContainer;
    return typeGuard.dom.isDivElement(focusedNode)
      ? focusedNode
      : focusedNode?.parentElement;
  },
  get: (targetElement: Node): number | undefined => {
    if (document.getSelection()?.rangeCount === 0) return undefined;
    const originalRange = document.getSelection()?.getRangeAt(0);
    if (!originalRange) return;
    const range = originalRange.cloneRange();
    range.selectNodeContents(targetElement);
    range.setEnd(originalRange.endContainer, originalRange.endOffset);
    return range.toString().length;
  },
  set: (targetElement: HTMLElement, offset: number) => {
    const targetNode = targetElement.childNodes[0];
    const range = document.createRange();
    const selection = window.getSelection();
    if (!selection || !targetNode) return;
    range.setStart(targetNode, offset);
    range.collapse(true);

    selection.removeAllRanges();
    selection.addRange(range);
  },
};
export default caretUtil;
