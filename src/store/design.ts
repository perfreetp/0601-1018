import { create } from 'zustand';
import type { PropertyInfo, AgentInfo, ColorScheme } from '@/types';

interface DesignState {
  selectedTemplateId: string | null;
  propertyInfo: PropertyInfo;
  agentInfo: AgentInfo;
  selectedColorScheme: ColorScheme | null;
  selectedFestivalId: string | null;
  selectedSizeId: string | null;
  blurPrivacy: boolean;
  setSelectedTemplateId: (id: string | null) => void;
  setPropertyInfo: (info: Partial<PropertyInfo>) => void;
  setAgentInfo: (info: Partial<AgentInfo>) => void;
  setSelectedColorScheme: (scheme: ColorScheme | null) => void;
  setSelectedFestivalId: (id: string | null) => void;
  setSelectedSizeId: (id: string | null) => void;
  setBlurPrivacy: (blur: boolean) => void;
  resetDesign: () => void;
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
  name: '',
  phone: '',
  company: '',
  avatar: '',
  wechatId: ''
};

export const useDesignStore = create<DesignState>((set) => ({
  selectedTemplateId: null,
  propertyInfo: defaultPropertyInfo,
  agentInfo: defaultAgentInfo,
  selectedColorScheme: null,
  selectedFestivalId: null,
  selectedSizeId: null,
  blurPrivacy: false,
  setSelectedTemplateId: (id) => set({ selectedTemplateId: id }),
  setPropertyInfo: (info) =>
    set((state) => ({ propertyInfo: { ...state.propertyInfo, ...info } })),
  setAgentInfo: (info) =>
    set((state) => ({ agentInfo: { ...state.agentInfo, ...info } })),
  setSelectedColorScheme: (scheme) => set({ selectedColorScheme: scheme }),
  setSelectedFestivalId: (id) => set({ selectedFestivalId: id }),
  setSelectedSizeId: (id) => set({ selectedSizeId: id }),
  setBlurPrivacy: (blur) => set({ blurPrivacy: blur }),
  resetDesign: () =>
    set({
      selectedTemplateId: null,
      propertyInfo: defaultPropertyInfo,
      agentInfo: defaultAgentInfo,
      selectedColorScheme: null,
      selectedFestivalId: null,
      selectedSizeId: null,
      blurPrivacy: false
    })
}));
