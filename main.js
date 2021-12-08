import { GetHashDataTransitter } from './index.js';
const ns = 'http://www.w3.org/1999/xhtml';
const o = { v: null };
export class V {
	static gi(dels = []) {
		if (!o.v) o.v = new V();
		for (const del of dels) o.v.r(del);
		return o.v;
	}
	constructor() {
		this.d = document;
		this.w = window;
		this.x = this.tn('html');
		this.b = this.tn('body');
		this.h = this.tn('head');
	}
	init() {
		for (let c of this.b.children) this.b.removeChild(c);
	}
	c(t) {
		return this.d.createElementNS(ns, t);
	}
	a(parent, elm) {
		return parent.appendChild(elm);
	}
	e(e, en, callback) {
		e.addEventListener(en, callback);
	}
	gid(id) {
		return this.d.getElementById(id);
	}
	ct(t, tx, cn) {
		const e = this.c(t);
		e.textContent = tx;
		e.className = cn ? cn : '';
		return e;
	}
	sa(e, n, v) {
		e.setAttribute(n, v);
	}
	r(t) {
		const es = this.d.getElementsByTagName(t);
		if (!es) return es;
		for (let e of es) this.re(e);
	}
	re(e) {
		const p = e.parent ? e.parent : this.d;
		e.parent ? p.removeChild(e) : e.remove();
	}
	tn(t) {
		return this.d.getElementsByTagName(t)[0];
	}
	h1(tx, cn) {
		return this.ct('h1', tx, cn);
	}
	hr(tx, cn) {
		return this.ct('hr', tx, cn);
	}
	pre(tx, cn) {
		return this.ct('pre', tx, cn);
	}
	div(cn) {
		return this.ct('div', '', cn);
	}
	br(cn) {
		return this.ct('br', '', cn);
	}
	an(tx, cn) {
		return this.ct('a', tx, cn);
	}
}

class main {
	static reload() {
		window.navigator.serviceWorker.getRegistrations().then((registrations) => {
			for (let registration of registrations) {
				registration.unregister();
			}
		});
		window.location.reload(true);
	}
	static async getBookmarklet() {
		return await new GetHashDataTransitter().getURL();
	}
}
class view {
	constructor() {
		const v = V.gi();
		const reload = v.gid('reload');
		const f1 = () => {
			alert('test');
			main.reload();
		};
		console.log(v);
		v.e(reload, 'click', f1);
		this.setBookmarklet();
	}
	async setBookmarklet() {
		const v = V.gi();
		const bookmarklet = v.gid('bookmarklet');
		bookmarklet.textContent = 'bookmarklet';
		const url = await main.getBookmarklet();
		v.sa(bookmarklet, 'href', url);
		const text = v.gid('text');
		text.textContent = url + '  ' + url.length;
	}
}
new view();
