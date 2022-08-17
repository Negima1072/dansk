/**
 * 読み込みコード
 * window.__videoplayerにアクセスするため、scriptタグで読み込ませる
 */
window.onload = () => {
  const embedScript = document.createElement("script");
  embedScript.src = (
    typeof chrome !== "undefined" ? chrome : browser
  ).runtime.getURL("main.js");
  document.body.append(embedScript);
};
