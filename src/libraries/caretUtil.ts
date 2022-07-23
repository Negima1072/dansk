const caretUtil = {
  getFocusedNode: (): Node | undefined =>
    document.getSelection()?.getRangeAt(0).endContainer,
  get: (targetElement: Node): number | undefined => {
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
