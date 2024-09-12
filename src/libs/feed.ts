import type { PartialByKeys } from '@/types/utility';

export const news = createFeedSourceGroup('资讯', [
  createFeedSource('网易', 'news.163.com', [
    createFeed({ label: '全站', route: '/163/news/rank/whole/click/day', image: 'right' }),
    createFeed({ label: '新闻', route: '/163/news/rank/news/click/day', image: 'right' }),
    createFeed({ label: '科技', route: '/163/news/rank/tech/click/day', image: 'right' }),
    createFeed({ label: '娱乐', route: '/163/news/rank/entertainment/click/day', image: 'right' }),
    createFeed({ label: '运动', route: '/163/news/rank/sports/click/day', image: 'right' }),
  ]),
  createFeedSource('新浪', 'news.sina.com.cn', [
    createFeed({ label: '全部', route: '/sina/rollnews/2509', image: 'right' }),
    createFeed({ label: '国内', route: '/sina/rollnews/2510', image: 'right' }),
    createFeed({ label: '国际', route: '/sina/rollnews/2511', image: 'right' }),
    createFeed({ label: '科技', route: '/sina/rollnews/2515', image: 'right' }),
    createFeed({ label: '娱乐', route: '/sina/rollnews/2513', image: 'right' }),
    createFeed({ label: '体育', route: '/sina/rollnews/2512', image: 'right' }),
  ]),
  createFeedSource('澎湃新闻', 'thepaper.cn', [
    createFeed({ label: '热门', route: '/thepaper/featured', image: 'right' }),
    createFeed({ label: '科技', route: '/thepaper/channel/119908', image: 'right' }),
    createFeed({ label: '体育', route: '/thepaper/channel/-21', image: 'right' }),
  ]),
  createFeedSource('虎嗅', 'huxiu.com', [
    createFeed({ label: '24 小时', route: '/huxiu/moment', image: 'right' }),
    createFeed({ label: '资讯', route: '/huxiu/article', image: 'right' }),
    createFeed({ label: '早报', route: '/huxiu/briefcolumn/1', image: 'right' }),
    createFeed({ label: '晚报', route: '/huxiu/briefcolumn/2', image: 'right' }),
  ]),
  createFeedSource('36氪', '36kr.com', [
    createFeed({ label: '热门', route: '/36kr/news', image: 'right' }),
    createFeed({ label: '快讯', route: '/36kr/newsflashes', image: 'right' }),
  ]),
  createFeedSource('机核', 'gcores.com', [
    createFeed({ label: '资讯', route: '/gcores/category/news', image: 'right' }),
    createFeed({ label: '文章', route: '/gcores/category/articles', image: 'right' }),
  ]),
  createFeedSource('少数派', 'sspai.com', [
    createFeed({ label: '首页', route: '/sspai/index' }),
  ]),
  createFeedSource('IT之家', 'ithome.com', [
    createFeed({ label: '最新资讯', route: '/ithome/it', image: 'right' }),
    createFeed({ label: '日榜', route: '/ithome/ranking/24h', image: 'right' }),
    createFeed({ label: '周榜', route: '/ithome/ranking/7days', image: 'right' }),
    createFeed({ label: '月榜', route: '/ithome/ranking/monthly', image: 'right' }),
  ]),
  createFeedSource('什么值得买', 'smzdm.com', [
    createFeed({ label: '好价品类', route: '/smzdm/ranking/pinlei/11/3' }),
    createFeed({ label: '京东', route: '/smzdm/ranking/dianshang/23/3' }),
    createFeed({ label: '淘宝', route: '/smzdm/ranking/dianshang/25/3' }),
    createFeed({ label: '海淘', route: '/smzdm/ranking/haitao/39/3' }),
  ]),
]);

export const ent = createFeedSourceGroup('娱乐', [
  createFeedSource('微博', 'weibo.com', [
    createFeed({ label: '热搜', route: '/weibo/search/hot', image: 'none' }),
  ]),
  createFeedSource('哔哩哔哩', 'bilibili.com', [
    createFeed({ label: '综合热门', route: '/bilibili/popular/all' }),
    createFeed({ label: '全站排行榜', route: '/bilibili/ranking/0/3/1' }),
    createFeed({ label: '每周必看', route: '/bilibili/weekly' }),
  ]),
  createFeedSource('豆瓣', 'douban.com', [
    createFeed({ label: '实时热门电影', route: '/douban/list/movie_real_time_hotest' }),
    createFeed({ label: '实时热门电视', route: '/douban/list/tv_real_time_hotest' }),
    createFeed({ label: '即将上映', route: '/douban/movie/later' }),
  ]),
  createFeedSource('煎蛋', 'jandan.net', [
    createFeed({ label: '4 小时热榜', route: '/jandan/top-4h', image: 'right' }),
    createFeed({ label: '吐槽', route: '/jandan/top-tucao', image: 'right' }),
    createFeed({ label: '无聊图', route: '/jandan/top', image: 'right' }),
    createFeed({ label: '随手拍', route: '/jandan/top-ooxx', image: 'right' }),
    createFeed({ label: '树洞', route: '/jandan/top-comments', image: 'right' }),
  ]),
  createFeedSource('虎扑', 'bbs.hupu.com', [
    createFeed({ label: '步行街', route: '/hupu/all/topic-daily', image: 'right' }),
  ]),
  createFeedSource('Bangumi', 'bgm.tv', [
    createFeed({ label: '每日放送', route: '/bangumi/tv/calendar/today', ranking: false }),
  ]),
  createFeedSource('アニメ新番組', 'bangumi.online', [
    createFeed({ label: '每日放送', route: '/bangumi/online', ranking: false }),
  ]),
  createFeedSource('游民娱乐', 'gamersky.com', [
    createFeed({ label: '热点图文', route: '/gamersky/ent/all' }),
    createFeed({ label: '今日推荐', route: '/gamersky/news/today' }),
    createFeed({ label: '单机电玩', route: '/gamersky/news/pc' }),
    createFeed({ label: 'NS', route: '/gamersky/news/ns' }),
    createFeed({ label: '手游', route: '/gamersky/news/mobile' }),
    createFeed({ label: '网游', route: '/gamersky/news/web' }),
    createFeed({ label: '业界', route: '/gamersky/news/industry' }),
    createFeed({ label: '硬件', route: '/gamersky/news/hardware' }),
    createFeed({ label: '科技', route: '/gamersky/news/tech' }),
  ]),
  createFeedSource('大麦', 'damai.cn', [
    createFeed({ label: '全部', route: '/damai/activity/全部/全部/全部' }),
    createFeed({ label: '音乐会', route: '/damai/activity/全部/音乐会/全部' }),
    createFeed({ label: '演唱会', route: '/damai/activity/全部/演唱会/全部' }),
    createFeed({ label: '话剧歌剧', route: '/damai/activity/全部/话剧歌剧/全部' }),
    createFeed({ label: '展览休闲', route: '/damai/activity/全部/展览休闲/全部' }),
  ], 'https://img.alicdn.com/tfs/TB1RxAHSmrqK1RjSZK9XXXyypXa-16-16.ico'),
  createFeedSource('酷安', 'coolapk.com', [
    createFeed({ label: '今日热门', route: '/coolapk/hot/jrrm', image: 'none' }),
    createFeed({ label: '收藏榜', route: '/coolapk/hot/scb', image: 'none' }),
  ]),
  createFeedSource('Bing 壁纸', 'bing.com', [
    createFeed({ label: '每日壁纸', route: '/bing/', ranking: false }),
  ]),
]);

export const dev = createFeedSourceGroup('开发', [
  createFeedSource('v2ex', 'v2ex.com', [
    createFeed({ label: '最热', route: '/v2ex/topics/hot', image: 'right' }),
    createFeed({ label: '最新', route: '/v2ex/topics/latest', image: 'right' }),
    createFeed({ label: '技术', route: '/v2ex/tab/tech', image: 'right' }),
    createFeed({ label: '创意', route: '/v2ex/tab/creative', image: 'right' }),
    createFeed({ label: '好玩', route: '/v2ex/tab/play', image: 'right' }),
    createFeed({ label: '酷工作', route: '/v2ex/tab/jobs', image: 'right' }),
    createFeed({ label: '交易', route: '/v2ex/tab/deals', image: 'right' }),
    createFeed({ label: '城市', route: '/v2ex/tab/city', image: 'right' }),
    createFeed({ label: '问与答', route: '/v2ex/tab/qna', image: 'right' }),
  ]),
  createFeedSource('掘金', 'juejin.cn', [
    createFeed({ label: '本周最热', route: '/juejin/trending/all/weekly', image: 'right' }),
    createFeed({ label: '本月最热', route: '/juejin/trending/all/monthly', image: 'right' }),
    createFeed({ label: '沸点', route: '/juejin/pins/recommend', image: 'right' }),
    createFeed({ label: '前端', route: '/juejin/category/frontend', image: 'right' }),
    createFeed({ label: '后端', route: '/juejin/category/backend', image: 'right' }),
    createFeed({ label: 'iOS', route: '/juejin/category/ios', image: 'right' }),
    createFeed({ label: 'Android', route: '/juejin/category/android', image: 'right' }),
    createFeed({ label: '人工智能', route: '/juejin/category/ai', image: 'right' }),
  ], 'https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/static/favicons/favicon-32x32.png'),
  createFeedSource('GitHub', 'github.com', [
    createFeed({ label: 'Daily', route: '/github/trending/daily/any', image: 'none' }),
    createFeed({ label: 'Weekly', route: '/github/trending/weekly/any', image: 'none' }),
    createFeed({ label: 'Monthly', route: '/github/trending/monthly/any', image: 'none' }),
    createFeed({ label: 'JavaScript', route: '/github/trending/daily/javascript', image: 'none' }),
    createFeed({ label: 'TypeScript', route: '/github/trending/daily/typescript', image: 'none' }),
    createFeed({ label: 'Go', route: '/github/trending/daily/go', image: 'none' }),
    createFeed({ label: 'Rust', route: '/github/trending/daily/rust', image: 'none' }),
    createFeed({ label: 'Java', route: '/github/trending/daily/java', image: 'none' }),
    createFeed({ label: 'Python', route: '/github/trending/daily/python', image: 'none' }),
    createFeed({ label: 'Swift', route: '/github/trending/daily/Swift', image: 'none' }),
  ]),
  createFeedSource('Hacker News', 'news.ycombinator.com', [
    createFeed({ label: 'News', route: '/hackernews/index/sources', image: 'none' }),
    createFeed({ label: 'Newest', route: '/hackernews/newest/sources', image: 'none' }),
  ]),
]);

export interface Feed {
  name: string;
  label: string;
  route: string;
  image: 'left' | 'right' | 'none';
  ranking: boolean;
}

export interface FeedSource {
  name: string;
  label: string;
  icon: string;
  feeds: Feed[];
}

function createFeed(feed: PartialByKeys<Feed, 'name' | 'image' | 'ranking'>): Feed {
  if (!feed.name) {
    feed.name = feed.route;
  }
  if (typeof feed.ranking !== 'boolean') {
    feed.ranking = true;
  }
  if (!feed.image) {
    feed.image = 'left';
  }
  return feed as Feed;
}

function createFeedSource(label: string, host: string, feeds: Feed[], icon?: string): FeedSource {
  return {
    name: host,
    icon: icon || `https://icons.duckduckgo.com/ip3/${host}.ico`,
    label,
    feeds,
  };
}

function createFeedSourceGroup(label: string, sources: FeedSource[]) {
  return Object.assign(sources, { label });
}
