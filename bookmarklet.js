(function () {
	const A = 'ACCESS_POINT';
	const Q = QUERY;
	const fa = (v) => {
		return Array.isArray(v);
	};
	const fs = (v) => {
		return typeof v === 'string';
	};
	const fn = (n, h) => {
		if (!n) {
			n = h;
		} else if (!fa(n) && h && n !== h) {
			n = [n, h];
		} else if (h && !n.includes(h)) {
			n.push(h);
		}
		return n;
	};

	const t64 = (s) => {
		const m = 50000;
		const l = s.length;
		const p = Math.ceil(l / m);
		const r = [];
		for (let j = 0; j < p; j++) {
			const b = m * j;
			const z = l - b;
			const p = z > m ? m : z > 0 ? z : l;
			const e = b + p;
			const i = s.substring(b, e);
			const u = new Uint16Array(p);
			for (let k = 0; k < p; k++) {
				u[k] = i.charCodeAt(k);
			}
			const c = String.fromCharCode(...new Uint8Array(u.buffer));
			r.push(c);
		}
		return btoa(r.join(''));
	};
	const f1 = (s) => {
		console.log('--f1--s:' + s);
		// const e = new TextEncoder();
		// const u = e.encode(s);
		// const d = new TextDecoder('utf8');
		const D = t64(s).split('+').join('-').split('/').join('_').split('=').join('');
		const a = `${A}#${D}`;
		console.log('a:' + a + ' /' + a.length);
		/* window.open(a, '_blank').focus();*/
	};
	const f3 = (e) => {
		console.log('--f3--');
		console.log(e);
		if (fs(e)) return e;
		const t = e.tagName;
		if (t === 'SPAN') return e.textContent;
		if (t === 'A') return e.getAttribute('href');
		if (t === 'TIME') return e.getAttribute('datetime');
		if (t === 'DIV') return e.children;
		if (fa(e) || e.length > 0) return e;
	};
	const f4 = (q, Q1, d) => {
		console.log('--f4--');
		const e1 = d.querySelectorAll(q);
		console.log(e1);
		if (!fs(e1) && (fa(e1) || e1.length > 0)) {
			console.log('--f4-1-');
			const l = fa(e1) ? el : e1.values();
			let m = null;
			for (const e of l) {
				const r = f3(e);
				console.log(r);
				if (!r) {
					continue;
				} else if (!fs(r) && (fa(r) || r.length > 0)) {
					console.log('--f4-1a-');
					let n = null;
					const l = r.length;
					for (let i = 0; i < l; i++) {
						console.log('--f4-1a-i:' + i);
						const h = f2(Q1, r[i]);
						n = fn(n, h);
					}
					m = fn(m, n);
				} else {
					console.log('--f4-1b-r:' + r);
					m = fn(m, r);
				}
			}
			if (m.length < 1) {
				return null;
			}
			return m;
		} else if (!fs(e1) && e1.length < 1) {
			return null;
		} else {
			const r = f3(e1);
			console.log('--f4-2-');
			console.log(r);
			if (!r) {
				return null;
			} else if (fa(r) || (!fs(r) && r.length > 0)) {
				let n = null;
				const l = r.length;
				for (let i = 0; i < l; i++) {
					const h = f2(Q1, r[i]);
					n = fn(n, h);
				}
				return n;
			} else {
				return r;
			}
		}
	};
	const f2 = (Q, d = document) => {
		console.log('--f2--');
		console.log(d);
		const Q1 = JSON.parse(JSON.stringify(Q));
		console.log(Q);
		if (!Q1) {
			return null;
		}
		const q = Array.isArray(Q1) && typeof Q1 === 'object' ? Q1.shift() : Q1;
		const t = typeof q;
		console.log(q);
		if (fa(q) && !fs(q) && q.length > 0) {
			let n = null;
			for (const p of q) {
				console.log('A t:' + t + '/Q1:' + Q1);
				const r = f4(p, Q1, d);
				if (!r) {
					continue;
				}
				n = fn(n, r);
			}
			return n;
		} else if (t === 'object') {
			const n = {};
			let i = 0;
			for (const k in q) {
				const v = q[k];
				if (fa(v)) {
					let m = null;
					for (const x of v) {
						console.log('D t:' + t + ' /x:' + x);
						const r = f2(x, d);
						if (r) {
							i++;
						}
						m = fn(m, r);
					}
					n[k] = m;
				} else {
					console.log('B t:' + t + '/v:' + v);
					const r = f2(v, d);
					if (r) {
						i++;
					}
					n[k] = r;
				}
			}
			return i > 0 ? n : null;
		} else if (fs(q)) {
			console.log('C t:' + t + '/q:' + q);
			return f4(q, Q1, d);
		}
		return null;
	};
	const r = f2(Q);
	console.log('----');
	console.log(r);
	const j = JSON.stringify(r);
	f1(j);
})();
