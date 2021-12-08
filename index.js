export class F {
	static async l(p, c = 'application/json', isText) {
		const q = {
			method: 'GET',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'omit',
			redirect: 'follow',
			referrer: 'no-referrer',
			headers: { 'Content-Type': c },
		};
		const r = await fetch(p, q);
		return isText ? await r.text() : await r.blob();
	}
}
const SLASH = '&#47;';
const QUOTE = '&quot;';
const HTTP_REGXP = /http:\/\//g;
const HTTPS_REGXP = /https:\/\//g;
const A = 'ACCESS_POINT';
export class BookmarkletBuilder {
	static build(src) {
		const rows = src
			.split('\t')
			.join('')
			.replace(/\/\*[^\/]+\*\//g, '')
			.split('\n');
		const f = [];
		for (const r of rows) {
			const n = r.replace(HTTP_REGXP, 'http:' + SLASH + SLASH).replace(HTTPS_REGXP, 'https:' + SLASH + SLASH);
			f.push(n.split('//')[0].split(SLASH).join('/'));
		}
		const b = f.join(' ');
		return `javascript:(()=>{${b}})()`;
	}
	static async getBookmarklet(js, d = '/') {
		const c = location.protocol + '//' + location.host + d;
		const s = await F.l(`${js}`, undefined, true);
		const b = s.split(A).join(c);
		return BookmarkletBuilder.build(b);
	}
}

export class GetHashDataTransitter {
	constructor() {}
	async getURL() {
		return await BookmarkletBuilder.getBookmarklet('./bookmarklet.js');
	}
}
