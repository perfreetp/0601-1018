import type { Work, ShareRecord, ColorScheme, FestivalStyle, PlatformSize } from '@/types';

export const works: Work[] = [
  {
    id: 'w1',
    title: '万科翡翠滨江精装三房',
    cover: 'https://picsum.photos/id/1048/400/600',
    community: '万科翡翠滨江',
    templateName: '简约带看海报',
    createTime: '2024-01-15 14:30',
    views: 156,
    shares: 23,
    status: 'published'
  },
  {
    id: 'w2',
    title: '保利中央公园学区两房',
    cover: 'https://picsum.photos/id/164/400/600',
    community: '保利中央公园',
    templateName: '学区房精选',
    createTime: '2024-01-14 10:15',
    views: 89,
    shares: 12,
    status: 'published'
  },
  {
    id: 'w3',
    title: '龙湖天街单身公寓',
    cover: 'https://picsum.photos/id/177/400/600',
    community: '龙湖天街',
    templateName: '单身公寓',
    createTime: '2024-01-13 16:45',
    views: 67,
    shares: 8,
    status: 'published'
  },
  {
    id: 'w4',
    title: '绿地世纪城地铁口三房',
    cover: 'https://picsum.photos/id/1025/400/600',
    community: '绿地世纪城',
    templateName: '地铁口房源',
    createTime: '2024-01-12 09:20',
    views: 234,
    shares: 45,
    status: 'published'
  },
  {
    id: 'w5',
    title: '招商雍景湾精装婚房',
    cover: 'https://picsum.photos/id/1057/400/600',
    community: '招商雍景湾',
    templateName: '精装婚房',
    createTime: '2024-01-11 11:30',
    views: 0,
    shares: 0,
    status: 'draft'
  },
  {
    id: 'w6',
    title: '中海紫御豪庭独栋别墅',
    cover: 'https://picsum.photos/id/1018/400/600',
    community: '中海紫御豪庭',
    templateName: '江景豪宅',
    createTime: '2024-01-10 15:00',
    views: 78,
    shares: 15,
    status: 'published'
  }
];

export const shareRecords: ShareRecord[] = [
  {
    id: 's1',
    workId: 'w1',
    workTitle: '万科翡翠滨江精装三房',
    platform: '朋友圈',
    shareTime: '2024-01-15 15:00',
    views: 156
  },
  {
    id: 's2',
    workId: 'w1',
    workTitle: '万科翡翠滨江精装三房',
    platform: '微信群',
    shareTime: '2024-01-15 15:30',
    views: 45
  },
  {
    id: 's3',
    workId: 'w2',
    workTitle: '保利中央公园学区两房',
    platform: '朋友圈',
    shareTime: '2024-01-14 11:00',
    views: 89
  },
  {
    id: 's4',
    workId: 'w4',
    workTitle: '绿地世纪城地铁口三房',
    platform: '朋友圈',
    shareTime: '2024-01-12 10:00',
    views: 234
  }
];

export const colorSchemes: ColorScheme[] = [
  {
    id: 'cs1',
    name: '活力橙',
    primary: '#FF6B35',
    secondary: '#FF8F5E',
    background: '#FFF8F5',
    text: '#1D2129'
  },
  {
    id: 'cs2',
    name: '商务蓝',
    primary: '#165DFF',
    secondary: '#4080FF',
    background: '#F0F5FF',
    text: '#1D2129'
  },
  {
    id: 'cs3',
    name: '典雅金',
    primary: '#D4A853',
    secondary: '#E8C87A',
    background: '#FAF7F0',
    text: '#1D2129'
  },
  {
    id: 'cs4',
    name: '清新绿',
    primary: '#00B42A',
    secondary: '#23C343',
    background: '#F2FFF5',
    text: '#1D2129'
  },
  {
    id: 'cs5',
    name: '优雅紫',
    primary: '#722ED1',
    secondary: '#8F5AE8',
    background: '#F9F0FF',
    text: '#1D2129'
  },
  {
    id: 'cs6',
    name: '中国红',
    primary: '#F53F3F',
    secondary: '#FF6B6B',
    background: '#FFF1F0',
    text: '#1D2129'
  }
];

export const festivalStyles: FestivalStyle[] = [
  {
    id: 'f1',
    name: '春节',
    icon: '🧧',
    elements: ['红灯笼', '福字', '春联', '烟花']
  },
  {
    id: 'f2',
    name: '元宵节',
    icon: '🏮',
    elements: ['灯笼', '汤圆', '灯谜']
  },
  {
    id: 'f3',
    name: '端午节',
    icon: '🐲',
    elements: ['粽子', '龙舟', '艾草']
  },
  {
    id: 'f4',
    name: '中秋节',
    icon: '🌕',
    elements: ['月饼', '玉兔', '桂花']
  },
  {
    id: 'f5',
    name: '国庆节',
    icon: '🇨🇳',
    elements: ['国旗', '天安门', '烟花']
  },
  {
    id: 'f6',
    name: '元旦',
    icon: '🎊',
    elements: ['气球', '礼花', '倒计时']
  }
];

export const platformSizes: PlatformSize[] = [
  {
    id: 'p1',
    name: '朋友圈方图',
    width: 1080,
    height: 1080,
    platform: '微信',
    ratioClass: 'square'
  },
  {
    id: 'p2',
    name: '朋友圈竖图',
    width: 1080,
    height: 1440,
    platform: '微信',
    ratioClass: 'portrait'
  },
  {
    id: 'p3',
    name: '小红书',
    width: 1080,
    height: 1440,
    platform: '小红书',
    ratioClass: 'portrait'
  },
  {
    id: 'p4',
    name: '抖音',
    width: 1080,
    height: 1920,
    platform: '抖音',
    ratioClass: 'vertical'
  },
  {
    id: 'p5',
    name: '公众号封面',
    width: 900,
    height: 500,
    platform: '公众号',
    ratioClass: 'landscape'
  },
  {
    id: 'p6',
    name: '视频号',
    width: 1080,
    height: 1260,
    platform: '视频号',
    ratioClass: 'story'
  }
];

export const buildingProjects = [
  {
    id: 'b1',
    name: '万科翡翠滨江',
    count: 12,
    cover: 'https://picsum.photos/id/1048/200/200'
  },
  {
    id: 'b2',
    name: '保利中央公园',
    count: 8,
    cover: 'https://picsum.photos/id/164/200/200'
  },
  {
    id: 'b3',
    name: '龙湖天街',
    count: 5,
    cover: 'https://picsum.photos/id/177/200/200'
  },
  {
    id: 'b4',
    name: '绿地世纪城',
    count: 15,
    cover: 'https://picsum.photos/id/1025/200/200'
  },
  {
    id: 'b5',
    name: '中海紫御豪庭',
    count: 3,
    cover: 'https://picsum.photos/id/1018/200/200'
  }
];
