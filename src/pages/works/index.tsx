import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, Image } from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';
import classnames from 'classnames';
import WorkCard from '@/components/WorkCard';
import EmptyState from '@/components/EmptyState';
import TagItem from '@/components/TagItem';
import { works, buildingProjects } from '@/data/works';
import styles from './index.module.scss';

type TabType = 'all' | 'published' | 'draft';

const WorksPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [activeBuilding, setActiveBuilding] = useState<string | null>(null);

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
  }, [activeTab, activeBuilding]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  const handleBuildingClick = (name: string) => {
    setActiveBuilding(activeBuilding === name ? null : name);
  };

  useDidShow(() => {
    console.log('[Works] 页面显示');
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
            {tab === 'all' ? '全部作品' : tab === 'published' ? '已发布' : '草稿'}
          </Text>
        ))}
      </View>

      <View className={styles.buildingSection}>
        <Text className={styles.sectionTitle}>按楼盘归档</Text>
        <ScrollView className={styles.buildingScroll} scrollX showScrollbar={false}>
          {buildingProjects.map((b) => (
            <View
              key={b.id}
              className={styles.buildingCard}
              onClick={() => handleBuildingClick(b.name)}
            >
              <Image
                className={styles.buildingImg}
                src={b.cover}
                mode="aspectFill"
                onError={(e) => console.error('[Works] 楼盘图加载失败:', e)}
              />
              <View className={styles.buildingInfo}>
                <Text className={styles.buildingName}>{b.name}</Text>
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
          description="快去模板页创建你的第一张海报吧"
          actionText="去创建"
          onAction={() => Taro.switchTab({ url: '/pages/home/index' })}
        />
      )}
    </ScrollView>
  );
};

export default WorksPage;
