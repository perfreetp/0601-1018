import type { Template } from '@/types';

export const templateCategories = [
  { id: 'all', name: '全部' },
  { id: 'onebedroom', name: '一居室' },
  { id: 'twobedroom', name: '两居室' },
  { id: 'threebedroom', name: '三居室' },
  { id: 'villa', name: '别墅' },
  { id: 'shop', name: '商铺' },
  { id: 'office', name: '写字楼' }
];

export const templates: Template[] = [
  {
    id: 't1',
    name: '简约带看海报',
    category: 'threebedroom',
    cover: 'https://picsum.photos/id/1048/600/800',
    tags: ['热销', '简约'],
    isHot: true
  },
  {
    id: 't2',
    name: '品质生活风',
    category: 'twobedroom',
    cover: 'https://picsum.photos/id/164/600/800',
    tags: ['品质', '生活'],
    isHot: true
  },
  {
    id: 't3',
    name: '现代商务风',
    category: 'office',
    cover: 'https://picsum.photos/id/1040/600/800',
    tags: ['商务', '现代'],
    isNew: true
  },
  {
    id: 't4',
    name: '温馨家庭风',
    category: 'threebedroom',
    cover: 'https://picsum.photos/id/1043/600/800',
    tags: ['温馨', '家庭']
  },
  {
    id: 't5',
    name: '学区房精选',
    category: 'twobedroom',
    cover: 'https://picsum.photos/id/1031/600/800',
    tags: ['学区', '精选'],
    isHot: true
  },
  {
    id: 't6',
    name: '江景豪宅',
    category: 'villa',
    cover: 'https://picsum.photos/id/1018/600/800',
    tags: ['江景', '豪宅'],
    isNew: true
  },
  {
    id: 't7',
    name: '单身公寓',
    category: 'onebedroom',
    cover: 'https://picsum.photos/id/177/600/800',
    tags: ['单身', '公寓']
  },
  {
    id: 't8',
    name: '临街旺铺',
    category: 'shop',
    cover: 'https://picsum.photos/id/1059/600/800',
    tags: ['商铺', '旺铺']
  },
  {
    id: 't9',
    name: '精装婚房',
    category: 'twobedroom',
    cover: 'https://picsum.photos/id/1057/600/800',
    tags: ['精装', '婚房'],
    isNew: true
  },
  {
    id: 't10',
    name: '地铁口房源',
    category: 'threebedroom',
    cover: 'https://picsum.photos/id/1025/600/800',
    tags: ['地铁', '便捷']
  },
  {
    id: 't11',
    name: '写字楼甲级',
    category: 'office',
    cover: 'https://picsum.photos/id/1033/600/800',
    tags: ['甲级', '办公']
  },
  {
    id: 't12',
    name: '独家委托',
    category: 'villa',
    cover: 'https://picsum.photos/id/1079/600/800',
    tags: ['独家', '委托']
  }
];
