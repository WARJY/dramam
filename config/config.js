import fzdm from './fzdm.js';

const OPTIONS = [{
  switchType: 'drama',
  site: keywords => '日剧tv',
},
{
  switchType: 'comic',
  site: (keywords) => {
    for (const [k, v] of fzdm.entries()) {
      if (keywords === v.title) {
        console.log(v.href);
        return {
          site: '风之动漫',
          url: v.href,
        };
      }
    }
    return '漫画人';
  },
},
{
  switchType: 'anime',
  site: keywords => '嘀哩嘀哩',
},
];


const WEBSITE = {
  '日剧tv': {
    url: 'https://www.rijutv.com/index.php?c=so&module=video&keyword=',
    keywords: true,
    jsFilter: () => '',
    cssFilter: () => {
      const els = ['.mian-sidebar', '.header-wrap', '.mod-search-head', '.widget-weixin', '.widget-qianhuiji',
        '.footer-wrap', '.mod-inner', '.breadcrumb', '#cs_DIV_cscpvrich8990B', '#widget-weixin', '.widget-qianhuiji',
      ];
      return getCss(els);
    },
  },
  '漫画人': {
    url: 'http://www.dm5.com/search?language=1&title=',
    keywords: true,
    jsFilter: () => '',
    cssFilter: () => {
      const els = ['.header', '.footer','.yddiv','.view-comment'];
      return getCss(els);
    },
  },
  '风之动漫': {
    url: '',
    keywords: false,
    jsFilter: () => '',
    cssFilter: () => {
      const els = ['#header', '#sogo', '.newsfeed', '#footer', '#xuanfu_news_id'];
      return getCss(els);
    },
  },
  '风车动漫': {
    url: 'http://www.fengchedm.com/common/search.aspx?key=',
    keywords: true,
    jsFilter: () => '',
    cssFilter: () => {
      const els = ['#HMcoupletDivleft', '#HMcoupletDivright', '.head', '.menu', '#cs_DIV_cscpvrich7960B', '.bg', '.foot'];
      return getCss(els) + 'body{background-color:#fff !important}';
    },
  },
	'嘀哩嘀哩':{
		url: 'http://www.dilidili.wang/search/index.html?q=',
		keywords: true
	}
};

let getCss = function (els) {
  const str = '{display:none !important} ';
  els[0] += str;
  const res = els.reduce((res, val, i) => res + val + str);
  return res;
};

let getSite = function(type,keywords){
	let res = OPTIONS.filter((i)=>{
		return type === i.switchType
	})[0]
	res = res.site(keywords)
	let resType = Object.prototype.toString.call(res)
	let data = {}
	switch(resType){
		case "[object Object]":
			data =  Object.assign({},WEBSITE[res.site])
			if(data.keywords === false && res.url) data.url = res.url
			break;
		case "[object String]":
			if(WEBSITE[res].keywords === true) data = Object.assign({},WEBSITE[res])
			data.url += keywords
			break;
		default:
			break;
	}
	data.url = encodeURI(data.url)
	return data
}

export default getSite
