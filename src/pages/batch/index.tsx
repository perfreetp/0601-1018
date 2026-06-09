import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, Image } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import { useDesignStore } from '@/store/design';
import { templates } from '@/data/templates';
import { platformSizes } from '@/data/works';
import classnames from 'classnames';
import styles from './index.module.scss';

const BatchPage: React.FC = () => {
  const router = useRouter();
  const propertyLibrary = useDesignStore((state) => state.propertyLibrary);
  const batchCreateWorks = useDesignStore((state) => state.batchCreateWorks);

  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('t1');
  const [selectedSizeId, setSelectedSizeId] = useState<string>('p1');
  const [isGenerating, setIsGenerating] = useState(false);

  const toggleProperty = (name: string) => {
    setSelectedProperties((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const selectAllProperties = () => {
    if (selectedProperties.length === propertyLibrary.length) {
      setSelectedProperties([]);
    } else {
      setSelectedProperties(propertyLibrary.map((p) => p.communityName));
    }
  };

  const handleGenerate = () => {
    if (selectedProperties.length === 0) {
      Taro.showToast({ title: '请至少选择一套房源', icon: 'none' });
      return;
    }
    if (!selectedTemplateId) {
      Taro.showToast({ title: '请选择模板', icon: 'none' });
      return;
    }
    setIsGenerating(true);
    Taro.showLoading({ title: '正在批量生成...', mask: true });

    setTimeout(() => {
      try {
        const ids = batchCreateWorks(selectedProperties, selectedTemplateId, selectedSizeId);
        Taro.hideLoading();
        setIsGenerating(false);
        console.log('[Batch] 批量生成作品ID:', ids);
        Taro.showModal({
          title: '批量生成成功',
          content: `已为您生成 ${ids.length} 张作品海报，可在作品归档中查看。`,
          confirmText: '去查看',
          cancelText: '继续制作',
          success: (res) => {
            if (res.confirm) {
              Taro.switchTab({ url: '/pages/works/index' });
            } else {
              setSelectedProperties([]);
            }
          }
        });
      } catch (e) {
        Taro.hideLoading();
        setIsGenerating(false);
        Taro.showToast({ title: '生成失败，请重试', icon: 'none' });
      }
    }, 1500);
  };

  const handleAddNew = () => {
    Taro.navigateTo({ url: '/pages/import/index?from=batch' });
  };

  const templateList = templates.slice(0, 6);

  return (
    <ScrollView className={styles.page} scrollY>
      <View className={styles.tipBox}>
        <Text className={styles.tipIcon}>💡</Text>
        <Text className={styles.tipText}>
          批量制作：选择多套房源 + 一个模板和尺寸，一次性生成多张海报。每套房源会使用各自的真实数据。
        </Text>
      </View>

      <View className={styles.sectionCard}>
        <View className={styles.sectionTitle}>
          <Text>① 选择房源</Text>
          <Text className={styles.selectedCount}>
            已选 {selectedProperties.length}/{propertyLibrary.length}
          </Text>
        </View>
        <View className={styles.propertyList}>
          {propertyLibrary.map((p) => (
            <View
              key={p.communityName}
              className={classnames(styles.propertyItem, {
                [styles.selected]: selectedProperties.includes(p.communityName)
              })}
              onClick={() => toggleProperty(p.communityName)}
            >
              <View
                className={classnames(styles.checkBox, {
                  [styles.checked]: selectedProperties.includes(p.communityName)
                })}
              >
                {selectedProperties.includes(p.communityName) && (
                  <Text className={styles.checkIcon}>✓</Text>
                )}
              </View>
              <Image
                className={styles.propertyCover}
                src={p.images?.[0] || 'https://picsum.photos/id/1048/200/200'}
                mode="aspectFill"
              />
              <View className={styles.propertyContent}>
                <Text className={styles.propertyName}>{p.communityName}</Text>
                <View className={styles.propertyMeta}>
                  <Text>{p.layout}</Text>
                  <Text>·</Text>
                  <Text>{p.area}㎡</Text>
                  <Text>·</Text>
                  <Text className={styles.propertyPrice}>¥{p.price}万</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
        <View className={styles.addNewBtn} onClick={handleAddNew}>
          <Text>＋</Text>
          <Text>新增房源信息</Text>
        </View>
        <View
          className={styles.addNewBtn}
          onClick={selectAllProperties}
          style={{ marginTop: 16 }}
        >
          <Text>{selectedProperties.length === propertyLibrary.length ? '✕' : '☐'}</Text>
          <Text>
            {selectedProperties.length === propertyLibrary.length ? '取消全选' : '全选全部房源'}
          </Text>
        </View>
      </View>

      <View className={styles.sectionCard}>
        <View className={styles.sectionTitle}>
          <Text>② 选择模板</Text>
        </View>
        <View className={styles.optionGrid}>
          {templateList.map((t) => (
            <View
              key={t.id}
              className={classnames(styles.optionItem, {
                [styles.selected]: selectedTemplateId === t.id
              })}
              onClick={() => setSelectedTemplateId(t.id)}
            >
              <Image className={styles.optionCover} src={t.cover} mode="aspectFill" />
              <View className={styles.optionInfo}>
                <Text className={styles.optionName}>{t.name}</Text>
                <Text className={styles.optionDesc}>{t.size}</Text>
              </View>
              <View
                className={classnames(styles.checkBoxSmall, {
                  [styles.checked]: selectedTemplateId === t.id
                })}
              >
                {selectedTemplateId === t.id && <Text className={styles.checkIcon}>✓</Text>}
              </View>
            </View>
          ))}
        </View>
      </View>

      <View className={styles.sectionCard}>
        <View className={styles.sectionTitle}>
          <Text>③ 选择尺寸</Text>
        </View>
        <View className={styles.sizeList}>
          {platformSizes.map((s) => (
            <View
              key={s.id}
              className={classnames(styles.sizeItem, {
                [styles.selected]: selectedSizeId === s.id
              })}
              onClick={() => setSelectedSizeId(s.id)}
            >
              <View className={classnames(styles.sizePreview, s.ratioClass)}>
                <Text>{s.width}:{s.height}</Text>
              </View>
              <View className={styles.sizeContent}>
                <Text className={styles.sizeName}>{s.name}</Text>
                <Text className={styles.sizeDesc}>
                  {s.width} × {s.height} · 适合{s.platform}
                </Text>
              </View>
              <View
                className={classnames(styles.checkBoxSmall, {
                  [styles.checked]: selectedSizeId === s.id
                })}
              >
                {selectedSizeId === s.id && <Text className={styles.checkIcon}>✓</Text>}
              </View>
            </View>
          ))}
        </View>
      </View>

      <View className={styles.bottomBar}>
        <Text className={styles.summaryTip}>
          将生成 {selectedProperties.length || 0} 张海报
        </Text>
        <View
          className={classnames(styles.btnGenerate, {
            [styles.disabled]: selectedProperties.length === 0 || isGenerating
          })}
          onClick={handleGenerate}
        >
          {isGenerating ? '生成中...' : '批量生成作品'}
        </View>
      </View>
    </ScrollView>
  );
};

export default BatchPage;
