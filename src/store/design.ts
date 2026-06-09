import { create } from 'zustand';
import type { PropertyInfo, AgentInfo, ColorScheme, Work, ShareRecord } from '@/types';
import { works as mockWorks, shareRecords as mockRecords } from '@/data/works';

interface DesignState {
  selectedTemplateId: string | null;
  propertyInfo: PropertyInfo;
  agentInfo: AgentInfo;
  selectedColorScheme: ColorScheme | null;
  selectedFestivalId: string | null;
  selectedSizeId: string | null;
  blurPrivacy: boolean;
  hideHouseNumber: boolean;
  showQRCode: boolean;
  showAgentCard: boolean;
  works: Work[];
  shareRecords: ShareRecord[];
  propertyLibrary: PropertyInfo[];
  setSelectedTemplateId: (id: string | null) => void;
  setPropertyInfo: (info: Partial<PropertyInfo>) => void;
  setAgentInfo: (info: Partial<AgentInfo>) => void;
  setSelectedColorScheme: (scheme: ColorScheme | null) => void;
  setSelectedFestivalId: (id: string | null) => void;
  setSelectedSizeId: (id: string | null) => void;
  setBlurPrivacy: (blur: boolean) => void;
  setHideHouseNumber: (hide: boolean) => void;
  setShowQRCode: (show: boolean) => void;
  setShowAgentCard: (show: boolean) => void;
  resetDesign: () => void;
  saveWork: (work: Omit<Work, 'id' | 'createTime' | 'views' | 'shares'>) => string;
  updateWork: (id: string, updates: Partial<Work>) => void;
  incrementWorkViews: (id: string) => void;
  addShareRecord: (record: Omit<ShareRecord, 'id' | 'shareTime'>) => void;
  addPropertyToLibrary: (property: PropertyInfo) => void;
  batchCreateWorks: (propertyIds: string[], templateId: string, sizeId: string) => string[];
  getWorkById: (id: string) => Work | undefined;
}

const defaultPropertyInfo: PropertyInfo = {
  communityName: '',
  area: '',
  price: '',
  pricePerSqm: '',
  layout: '',
  floor: '',
  orientation: '',
  decoration: '',
  buildYear: '',
  address: '',
  description: '',
  images: [],
  features: []
};

const defaultAgentInfo: AgentInfo = {
  name: '小王',
  phone: '13888888888',
  company: '链家房产',
  avatar: 'https://picsum.photos/id/64/200/200',
  wechatId: 'wang_agent'
};

const samplePropertyLibrary: PropertyInfo[] = [
  {
    communityName: '万科翡翠滨江',
    area: '128',
    price: '688',
    pricePerSqm: '53750',
    layout: '三室两厅两卫',
    floor: '中楼层/共18层',
    orientation: '南北通透',
    decoration: '精装修',
    buildYear: '2020',
    address: '浦东新区滨江大道88弄3号楼1602室',
    description: '本房源位于小区中心位置，前后无遮挡，视野开阔。业主自住保养好，全屋品牌家电家具全送。对口重点学区，孩子上学无忧。周边配套齐全，超市、医院、学校一应俱全。业主诚心出售，价格可谈，随时可以看房。',
    images: [
      'https://picsum.photos/id/1048/600/600',
      'https://picsum.photos/id/164/600/600',
      'https://picsum.photos/id/1043/600/600'
    ],
    features: ['南北通透，采光极佳', '对口市重点学区', '地铁500米出行便利', '满五唯一税费低']
  },
  {
    communityName: '保利中央公园',
    area: '89',
    price: '458',
    pricePerSqm: '51461',
    layout: '两室一厅一卫',
    floor: '高楼层/共26层',
    orientation: '正南',
    decoration: '简装',
    buildYear: '2018',
    address: '徐汇区中山南二路168弄7号楼2201室',
    description: '经典两房户型，方正实用，主卧朝南带飘窗，采光好。小区环境优美，绿化率高，物业管理好。周边配套成熟，生活便利。房东置换，诚心出售。',
    images: [
      'https://picsum.photos/id/1031/600/600',
      'https://picsum.photos/id/1057/600/600'
    ],
    features: ['学区房对口重点小学', '高楼层视野开阔', '近地铁12号线', '房东诚心出售']
  },
  {
    communityName: '龙湖天街',
    area: '45',
    price: '268',
    pricePerSqm: '59556',
    layout: '一室一厅一卫',
    floor: '低楼层/共12层',
    orientation: '东南',
    decoration: '精装修',
    buildYear: '2019',
    address: '闵行区都市路5001弄2号楼305室',
    description: '单身公寓首选，LOFT设计，空间利用率高。精装修交付，拎包入住。紧邻龙湖天街商圈，购物娱乐一站式解决。适合年轻白领过渡居住。',
    images: [
      'https://picsum.photos/id/177/600/600',
      'https://picsum.photos/id/1040/600/600'
    ],
    features: ['精装拎包入住', '紧邻商圈配套全', '交通便利', '适合投资自住']
  },
  {
    communityName: '绿地世纪城',
    area: '105',
    price: '520',
    pricePerSqm: '49524',
    layout: '三室两厅一卫',
    floor: '中楼层/共22层',
    orientation: '南北通透',
    decoration: '毛坯',
    buildYear: '2015',
    address: '普陀区宁夏路201弄11号楼803室',
    description: '地铁口零距离，步行3分钟到地铁站。大三房设计，适合三口之家。毛坯交付，可按自己喜好装修。小区楼间距大，采光好。',
    images: [
      'https://picsum.photos/id/1025/600/600',
      'https://picsum.photos/id/1033/600/600'
    ],
    features: ['地铁口零距离', '大三房适合家庭', '毛坯自由装修', '性价比超高']
  },
  {
    communityName: '招商雍景湾',
    area: '135',
    price: '720',
    pricePerSqm: '53333',
    layout: '三室两厅两卫',
    floor: '低楼层/共11层',
    orientation: '南北通透',
    decoration: '精装修',
    buildYear: '2021',
    address: '静安区永和路398弄5号楼202室',
    description: '婚房装修标准，全屋中央空调+地暖，品牌家电全送。一梯两户，得房率高。小区人车分流，地下车位充足。',
    images: [
      'https://picsum.photos/id/1057/600/600',
      'https://picsum.photos/id/1048/600/600'
    ],
    features: ['婚房装修保养好', '一梯两户得房率高', '人车分流品质小区', '带地暖中央空调']
  },
  {
    communityName: '中海紫御豪庭',
    area: '268',
    price: '1880',
    pricePerSqm: '70149',
    layout: '五室三厅四卫',
    floor: '独栋别墅',
    orientation: '南北通透',
    decoration: '豪华装修',
    buildYear: '2017',
    address: '长宁区虹桥路2258弄A8栋',
    description: '独栋别墅，带私家花园200平，地下酒窖，双车位。豪华装修，全屋进口石材，厨卫均为国际一线品牌。小区品质高，私密性好。',
    images: [
      'https://picsum.photos/id/1018/600/600',
      'https://picsum.photos/id/1079/600/600'
    ],
    features: ['独栋别墅带花园', '豪华装修品质高', '私密性好', '双车位+酒窖']
  }
];

const nowStr = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
};

export const useDesignStore = create<DesignState>((set, get) => ({
  selectedTemplateId: null,
  propertyInfo: defaultPropertyInfo,
  agentInfo: defaultAgentInfo,
  selectedColorScheme: null,
  selectedFestivalId: null,
  selectedSizeId: 'p1',
  blurPrivacy: false,
  hideHouseNumber: false,
  showQRCode: true,
  showAgentCard: true,
  works: mockWorks,
  shareRecords: mockRecords,
  propertyLibrary: samplePropertyLibrary,

  setSelectedTemplateId: (id) => set({ selectedTemplateId: id }),
  setPropertyInfo: (info) =>
    set((state) => ({ propertyInfo: { ...state.propertyInfo, ...info } })),
  setAgentInfo: (info) =>
    set((state) => ({ agentInfo: { ...state.agentInfo, ...info } })),
  setSelectedColorScheme: (scheme) => set({ selectedColorScheme: scheme }),
  setSelectedFestivalId: (id) => set({ selectedFestivalId: id }),
  setSelectedSizeId: (id) => set({ selectedSizeId: id }),
  setBlurPrivacy: (blur) => set({ blurPrivacy: blur }),
  setHideHouseNumber: (hide) => set({ hideHouseNumber: hide }),
  setShowQRCode: (show) => set({ showQRCode: show }),
  setShowAgentCard: (show) => set({ showAgentCard: show }),

  resetDesign: () =>
    set({
      selectedTemplateId: null,
      propertyInfo: defaultPropertyInfo,
      selectedColorScheme: null,
      selectedFestivalId: null,
      selectedSizeId: 'p1',
      blurPrivacy: false,
      hideHouseNumber: false,
      showQRCode: true,
      showAgentCard: true
    }),

  saveWork: (work) => {
    const id = `w_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const newWork: Work = {
      ...work,
      id,
      createTime: nowStr(),
      views: 0,
      shares: 0
    };
    set((state) => ({ works: [newWork, ...state.works] }));
    console.log('[Store] 保存作品:', newWork);
    return id;
  },

  updateWork: (id, updates) => {
    set((state) => ({
      works: state.works.map((w) => (w.id === id ? { ...w, ...updates } : w))
    }));
    console.log('[Store] 更新作品:', id, updates);
  },

  incrementWorkViews: (id) => {
    set((state) => ({
      works: state.works.map((w) =>
        w.id === id ? { ...w, views: w.views + 1 } : w
      )
    }));
  },

  addShareRecord: (record) => {
    const id = `s_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const newRecord: ShareRecord = {
      ...record,
      id,
      shareTime: nowStr()
    };
    set((state) => ({
      shareRecords: [newRecord, ...state.shareRecords],
      works: state.works.map((w) =>
        w.id === record.workId ? { ...w, shares: w.shares + 1 } : w
      )
    }));
    console.log('[Store] 添加分享记录:', newRecord);
  },

  addPropertyToLibrary: (property) => {
    set((state) => ({
      propertyLibrary: [property, ...state.propertyLibrary]
    }));
    console.log('[Store] 添加房源到库:', property.communityName);
  },

  batchCreateWorks: (propertyNames, templateId, sizeId) => {
    const { propertyLibrary, selectedColorScheme, selectedFestivalId } = get();
    const newIds: string[] = [];
    const templateNames: Record<string, string> = {
      t1: '简约带看海报', t2: '品质生活风', t3: '现代商务风',
      t4: '温馨家庭风', t5: '学区房精选', t6: '江景豪宅',
      t7: '单身公寓', t8: '临街旺铺', t9: '精装婚房',
      t10: '地铁口房源', t11: '写字楼甲级', t12: '独家委托'
    };
    const selectedProperties = propertyLibrary.filter((p) =>
      propertyNames.includes(p.communityName)
    );
    const newWorks = selectedProperties.map((p, idx) => {
      const id = `w_${Date.now()}_${idx}`;
      newIds.push(id);
      return {
        id,
        title: `${p.communityName}${p.layout}`,
        cover: p.images?.[0] || 'https://picsum.photos/id/1048/400/600',
        community: p.communityName,
        templateName: templateNames[templateId] || '简约带看海报',
        createTime: nowStr(),
        views: 0,
        shares: 0,
        status: 'published' as const
      };
    });
    set((state) => ({ works: [...newWorks, ...state.works] }));
    console.log('[Store] 批量生成作品:', newIds.length, '个');
    return newIds;
  },

  getWorkById: (id) => {
    return get().works.find((w) => w.id === id);
  }
}));
