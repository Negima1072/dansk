/**
 * 読み込みコード
 * window.__videoplayerにアクセスするため、scriptタグで読み込ませる
 */
window.onload = () => {
  const embedScript = document.createElement("script");
  embedScript.src = (chrome || browser).runtime.getURL("main.js");
  document.body.append(embedScript);
};
