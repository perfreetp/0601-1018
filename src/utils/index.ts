export const formatNumber = (num: number): string => {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + '万';
  }
  return num.toString();
};

export const generateSellPoints = (property: {
  layout?: string;
  floor?: string;
  orientation?: string;
  decoration?: string;
  area?: string;
}): string[] => {
  const points: string[] = [];
  
  if (property.layout) {
    points.push(`经典${property.layout}户型，方正实用`);
  }
  if (property.floor) {
    points.push(`${property.floor}楼层，视野开阔无遮挡`);
  }
  if (property.orientation && property.orientation.includes('南北')) {
    points.push('南北通透，采光通风俱佳');
  } else if (property.orientation) {
    points.push(`${property.orientation}朝向，阳光充足`);
  }
  if (property.decoration && property.decoration !== '毛坯') {
    points.push(`${property.decoration}交付，品质有保障`);
  }
  if (property.area && parseFloat(property.area) > 100) {
    points.push('大空间设计，居住舒适度高');
  }
  
  if (points.length === 0) {
    points.push('优质房源，不容错过');
    points.push('性价比超高，诚心出售');
    points.push('业主急售，价格可谈');
  }
  
  return points.slice(0, 4);
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (process.env.TARO_ENV === 'h5') {
      await navigator.clipboard.writeText(text);
    } else {
      const { setClipboardData } = await import('@tarojs/taro');
      await setClipboardData({ data: text });
    }
    return true;
  } catch (error) {
    console.error('[Copy] 复制失败:', error);
    return false;
  }
};

export const getFromClipboard = async (): Promise<string> => {
  try {
    if (process.env.TARO_ENV === 'h5') {
      return await navigator.clipboard.readText();
    } else {
      const { getClipboardData } = await import('@tarojs/taro');
      const res = await getClipboardData();
      return res.data || '';
    }
  } catch (error) {
    console.error('[Clipboard] 读取失败:', error);
    return '';
  }
};

export const formatDate = (date: string | Date, format: string = 'YYYY-MM-DD HH:mm'): string => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hour = String(d.getHours()).padStart(2, '0');
  const minute = String(d.getMinutes()).padStart(2, '0');
  
  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hour)
    .replace('mm', minute);
};
