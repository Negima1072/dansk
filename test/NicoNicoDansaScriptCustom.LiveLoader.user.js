// ==UserScript==
// @name         NicoNicoDansaScriptCustom Live Loader
// @namespace    https://github.com/eneko0513/
// @version      0.1
// @description  Load NicoNicoDansaScriptCustom from idea build in server
// @author       xpadev-net
// @match        *://www.nicovideo.jp/watch/*
// @grant        none
// @run-at       document-body
// ==/UserScript==
const script = document.createElement("script");
script.src=`http://localhost:63342/NicoNicoDansaScriptCustom/dist/main.js?q=${Math.random()}`;
document.body.append(script);