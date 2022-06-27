window.addEventListener('message', function (event) {
	if (event.data.type == "time_seek") {
		var a = event.data.text;
		var c = window.__videoplayer.currentTime() * 100;
		var p = (a.substr(0, 1) == '-');
		var d = Number.parseInt(a.substr(1, 1)) * 100 + Number.parseInt(a.substr(3, 2));
		if (p) d = d * -1;
		var y = c + d;
		if (y < 0) y = 0;
		if (y > window.__videoplayer.duration() * 100) y = window.__videoplayer.duration() * 100;
		window.__videoplayer.currentTime((Math.floor(y) + 0.1) / 100);
		window.document.getElementsByClassName("CommentOnOffButton")[0].click();
		window.document.getElementsByClassName("CommentOnOffButton")[0].click();
	} else if (event.data.type == "color_click") {
		document.activeElement.blur();
	} else if (event.data.type == "time_seek_int") {
		var d = event.data.int;
		var c = window.__videoplayer.currentTime() * 100;
		var y = c + d;
		if (y < 0) y = 0;
		if (y > window.__videoplayer.duration() * 100) y = window.__videoplayer.duration() * 100;
		window.__videoplayer.currentTime((Math.floor(y) + 0.1) / 100);
		window.document.getElementsByClassName("CommentOnOffButton")[0].click();
		window.document.getElementsByClassName("CommentOnOffButton")[0].click();
	}
});

let p = !1;
document.getElementById("myTimeField").addEventListener("focus", function (ex) {
	p = !0;
});
document.getElementById("myTimeField").addEventListener("input", function (ex) {
	p = !0;
});
document.getElementById("myTimeField").addEventListener("blur", function (ex) {
	p = !1;
});
document.getElementById("myTimeField").addEventListener("change", function (ex) {
	p = !1;
});

document.getElementById("myTimeField").addEventListener("keydown", function (ex) {
	if (ex.key == "Enter") {
		var a = ex.target.value;
		var y = Number.parseInt(a.substr(0, 2)) * 6000 + Number.parseInt(a.substr(3, 2)) * 100 + Number.parseInt(a.substr(6, 2));
		if (y < 0) y = 0;
		if (y > window.__videoplayer.duration() * 100) y = window.__videoplayer.duration() * 100;
		window.__videoplayer.currentTime((Math.floor(y) + 0.1) / 100);
		window.document.getElementsByClassName("CommentOnOffButton")[0].click();
		window.document.getElementsByClassName("CommentOnOffButton")[0].click();
		document.activeElement.blur();
	}
});

let o = () => {
	var f = window.document.getElementById("myTimeField");
	if (window.__videoplayer.seeking()) {
		f.disabled = true;
	} else {
		f.disabled = false;
	}
	var c = window.__videoplayer.currentTime() * 100;
	var a = ("0" + Math.floor(c / 6000).toString()).slice(-2);
	var b = ("0" + Math.floor((c % 6000) / 100).toString()).slice(-2);
	var d = ("0" + Math.floor((c % 6000) % 100).toString()).slice(-2);
	var y = a + ":" + b + "." + d;
	p || (f.value = y), requestAnimationFrame(o);
}
o();