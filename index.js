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
export const Query = [
	'main section>div',
	'article>div>div>div',
	{
		name: ['div>div>a>div>div:nth-child(1)>div>span>span', 'div>div>div>div>div>a>div>div:nth-child(1)>div>span>span'],
		id: 'div>div>a>div>div:nth-child(2)>div>span',
		text: 'div>div>div>div>span',
		href: 'div>div>div>div:nth-child(1)>a',
		time: ['div>div>div>div>a>span', 'div>div>div:nth-child(1)>a>time'],
	},
];
const SLASH = '&#47;';
const QUOTE = '&quot;';
const HTTP_REGXP = /http:\/\//g;
const HTTPS_REGXP = /https:\/\//g;
const A = 'ACCESS_POINT';
const Q = 'QUERY';
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
	/**
	 *
	 * @param {*} js js Path
	 * @param {*} q QueryData
	 * @param {*} d
	 * @returns
	 */
	static async getBookmarklet(js, q, d = '/') {
		const c = location.protocol + '//' + location.host + d;
		const s = await F.l(`${js}`, undefined, true);
		const b = s.split(A).join(c).split(Q).join(q);
		return BookmarkletBuilder.build(b);
	}
}

export class GetHashDataTransitter {
	constructor() {}
	async getURL(q = JSON.stringify(Query), d) {
		return await BookmarkletBuilder.getBookmarklet('./bookmarklet.js', q, d);
	}
}
