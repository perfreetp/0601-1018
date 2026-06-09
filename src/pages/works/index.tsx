import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, Image } from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';
import classnames from 'classnames';
import WorkCard from '@/components/WorkCard';
import EmptyState from '@/components/EmptyState';
import TagItem from '@/components/TagItem';
import { useDesignStore } from '@/store/design';
import styles from './index.module.scss';

type TabType = 'all' | 'published' | 'draft';

const WorksPage: React.FC = () => {
  const works = useDesignStore((state) => state.works);
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [activeBuilding, setActiveBuilding] = useState<string | null>(null);

  const buildingProjects = useMemo(() => {
    const map: Record<string, { name: string; count: number; cover: string }> = {};
    works.forEach((w) => {
      if (!w.community) return;
      if (!map[w.community]) {
        map[w.community] = {
          name: w.community,
          count: 0,
          cover: w.cover
        };
      }
      map[w.community].count += 1;
    });
    return Object.values(map).map((b, i) => ({
      id: `b_${i}`,
      ...b
    }));
  }, [works]);

  const filteredWorks = useMemo(() => {
    let result = works;
    if (activeTab === 'published') {
      result = result.filter((w) => w.status === 'published');
    } else if (activeTab === 'draft') {
      result = result.filter((w) => w.status === 'draft');
    }
    if (activeBuilding) {
      result = result.filter((w) => w.community === activeBuilding);
    }
    return result;
  }, [works, activeTab, activeBuilding]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  const handleBuildingClick = (name: string) => {
    setActiveBuilding(activeBuilding === name ? null : name);
  };

  useDidShow(() => {
    console.log('[Works] 页面显示, 当前作品数:', works.length);
  });

  return (
    <ScrollView className={styles.page} scrollY>
      <View className={styles.tabs}>
        {(['all', 'published', 'draft'] as TabType[]).map((tab) => (
          <Text
            key={tab}
            className={classnames(styles.tabItem, activeTab === tab && styles.active)}
            onClick={() => handleTabChange(tab)}
          >
            {tab === 'all'
              ? `全部作品(${works.length})`
              : tab === 'published'
              ? `已发布(${works.filter((w) => w.status === 'published').length})`
              : `草稿(${works.filter((w) => w.status === 'draft').length})`}
          </Text>
        ))}
      </View>

      <View className={styles.buildingSection}>
        <Text className={styles.sectionTitle}>按楼盘归档</Text>
        <ScrollView className={styles.buildingScroll} scrollX showScrollbar={false}>
          {buildingProjects.length === 0 && (
            <View style={{ padding: 32, color: '#86909C', fontSize: 24 }}>
              暂无楼盘归档，快去生成作品吧
            </View>
          )}
          {buildingProjects.map((b) => (
            <View
              key={b.id}
              className={classnames(styles.buildingCard, activeBuilding === b.name && styles.buildingCardActive)}
              onClick={() => handleBuildingClick(b.name)}
            >
              <Image
                className={styles.buildingImg}
                src={b.cover}
                mode="aspectFill"
                onError={(e) => console.error('[Works] 楼盘图加载失败:', e)}
              />
              <View className={styles.buildingInfo}>
                <Text className={styles.buildingName} numberOfLines={1}>{b.name}</Text>
                <Text className={styles.buildingCount}>{b.count}套作品</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <View className={styles.filterBar}>
        <View className={styles.filterLeft}>
          {activeBuilding && (
            <TagItem
              text={activeBuilding}
              type="primary"
              size="small"
              onClick={() => setActiveBuilding(null)}
            />
          )}
          <Text className={styles.resultCount}>共 {filteredWorks.length} 个作品</Text>
        </View>
        <Text className={styles.sortBtn}>
          最新 ↓
        </Text>
      </View>

      {filteredWorks.length > 0 ? (
        <View className={styles.worksGrid}>
          {filteredWorks.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </View>
      ) : (
        <EmptyState
          icon="📁"
          title="暂无作品"
          description={activeBuilding ? `该楼盘暂无${activeTab === 'draft' ? '草稿' : activeTab === 'published' ? '已发布' : ''}作品` : '快去模板页创建你的第一张海报吧'}
          actionText="去创建"
          onAction={() => Taro.switchTab({ url: '/pages/home/index' })}
        />
      )}
    </ScrollView>
  );
};

export default WorksPage;
