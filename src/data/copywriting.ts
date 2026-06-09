import type { Copywriting } from '@/types';

export const copywritingCategories = [
  { id: 'all', name: '全部' },
  { id: 'sellpoint', name: '卖点短句' },
  { id: 'consult', name: '咨询话术' },
  { id: 'festival', name: '节日问候' },
  { id: 'morning', name: '每日早安' }
];

export const copywritings: Copywriting[] = [
  {
    id: 'c1',
    category: 'sellpoint',
    title: '核心地段',
    content: '城市核心地段，地铁5分钟直达，商圈环绕，升值潜力无限！',
    usageCount: 328
  },
  {
    id: 'c2',
    category: 'sellpoint',
    title: '学区房精选',
    content: '对口市重点名校，孩子赢在起跑线！步行即达，家长省心！',
    usageCount: 256
  },
  {
    id: 'c3',
    category: 'sellpoint',
    title: '品质精装',
    content: '全屋品牌精装，拎包入住，品质生活一步到位！',
    usageCount: 189
  },
  {
    id: 'c4',
    category: 'sellpoint',
    title: '黄金楼层',
    content: '黄金楼层，南北通透，采光无敌，视野开阔！',
    usageCount: 167
  },
  {
    id: 'c5',
    category: 'sellpoint',
    title: '交通便利',
    content: '地铁双轨交汇，多条公交线路，出行无忧，通勤首选！',
    usageCount: 145
  },
  {
    id: 'c6',
    category: 'consult',
    title: '首次咨询',
    content: '您好！我是XX房产的经纪人小王，很高兴为您服务。请问您想了解什么样的房源呢？我可以根据您的需求为您精准推荐！',
    usageCount: 412
  },
  {
    id: 'c7',
    category: 'consult',
    title: '约客户看房',
    content: '张先生您好，您关注的那套房源今天方便来看吗？我这边可以帮您安排业主开门，下午2点-5点都可以，您看哪个时间方便？',
    usageCount: 298
  },
  {
    id: 'c8',
    category: 'consult',
    title: '跟进客户',
    content: '李姐您好，上次看的那套房您考虑得怎么样了？业主这边最近有诚意让价，如果您感兴趣我可以帮您再争取一下！',
    usageCount: 201
  },
  {
    id: 'c9',
    category: 'consult',
    title: '价格谈判',
    content: '王总您好，关于价格方面，我帮您跟业主谈了很久，业主同意再降2万，这已经是他的底线了，您看这个价格能接受吗？',
    usageCount: 156
  },
  {
    id: 'c10',
    category: 'festival',
    title: '春节祝福',
    content: '新春快乐！祝您阖家幸福，万事如意，新的一年事业蒸蒸日上，生活美满幸福！如有购房需求，随时联系我~',
    usageCount: 567
  },
  {
    id: 'c11',
    category: 'festival',
    title: '端午节问候',
    content: '端午安康！愿您生活如粽子般甜蜜，家庭如龙舟般齐心！有好房推荐，随时恭候您的咨询~',
    usageCount: 234
  },
  {
    id: 'c12',
    category: 'morning',
    title: '早安分享',
    content: '早安！新的一天，新的开始。今天给您推荐一套性价比超高的好房，有兴趣的话随时联系我带您看房哦~',
    usageCount: 389
  },
  {
    id: 'c13',
    category: 'sellpoint',
    title: '满五唯一',
    content: '满五唯一，税费超低，性价比之王！错过再等十年！',
    usageCount: 178
  },
  {
    id: 'c14',
    category: 'sellpoint',
    title: '花园小区',
    content: '花园式小区，绿化率高达40%，鸟语花香，宜居首选！',
    usageCount: 123
  },
  {
    id: 'c15',
    category: 'consult',
    title: '成交跟进',
    content: '刘先生您好，恭喜您成功签约！后续过户、贷款等手续我会全程跟进，有任何问题随时联系我，祝您入住愉快！',
    usageCount: 89
  }
];
