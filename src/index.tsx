window.onload = () => {
  const embedScript = document.createElement("script");
  embedScript.src = (chrome || browser).runtime.getURL("main.js");
  document.body.append(embedScript);
};
