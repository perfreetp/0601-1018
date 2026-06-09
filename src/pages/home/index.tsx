import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, Image, Button } from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';
import classnames from 'classnames';
import TemplateCard from '@/components/TemplateCard';
import TagItem from '@/components/TagItem';
import { templateCategories, templates } from '@/data/templates';
import { works } from '@/data/works';
import styles from './index.module.scss';

const HomePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredTemplates = useMemo(() => {
    if (activeCategory === 'all') return templates;
    return templates.filter((t) => t.category === activeCategory);
  }, [activeCategory]);

  const recentWorks = works.slice(0, 5);
  const publishedCount = works.filter((w) => w.status === 'published').length;
  const totalViews = works.reduce((sum, w) => sum + w.views, 0);

  const handleQuickAction = (action: string) => {
    console.log('[Home] 快捷操作:', action);
    switch (action) {
      case 'create':
        Taro.navigateTo({ url: '/pages/import/index' });
        break;
      case 'gallery':
        Taro.navigateTo({ url: '/pages/gallery/index' });
        break;
      case 'copywriting':
        Taro.switchTab({ url: '/pages/copywriting/index' });
        break;
      case 'batch':
        Taro.showToast({ title: '批量制作开发中', icon: 'none' });
        break;
    }
  };

  const handleViewAllWorks = () => {
    Taro.switchTab({ url: '/pages/works/index' });
  };

  useDidShow(() => {
    console.log('[Home] 页面显示');
  });

  return (
    <ScrollView className={styles.page} scrollY>
      <View className={styles.header}>
        <Text className={styles.greeting}>早上好，经纪人小王 👋</Text>
        <Text className={styles.subtitle}>今天也要加油开单哦！</Text>
      </View>

      <View className={styles.quickActions}>
        <View className={styles.quickItem} onClick={() => handleQuickAction('create')}>
          <Text className={styles.quickIcon}>✏️</Text>
          <Text className={styles.quickText}>新建海报</Text>
        </View>
        <View className={styles.quickItem} onClick={() => handleQuickAction('gallery')}>
          <Text className={styles.quickIcon}>🖼️</Text>
          <Text className={styles.quickText}>我的图库</Text>
        </View>
        <View className={styles.quickItem} onClick={() => handleQuickAction('copywriting')}>
          <Text className={styles.quickIcon}>📝</Text>
          <Text className={styles.quickText}>文案助手</Text>
        </View>
        <View className={styles.quickItem} onClick={() => handleQuickAction('batch')}>
          <Text className={styles.quickIcon}>📦</Text>
          <Text className={styles.quickText}>批量制作</Text>
        </View>
      </View>

      <View className={styles.statsRow}>
        <View className={styles.statCard}>
          <Text className={styles.statValue}>{publishedCount}</Text>
          <Text className={styles.statLabel}>已发布作品</Text>
        </View>
        <View className={styles.statCard}>
          <Text className={styles.statValue}>{totalViews}</Text>
          <Text className={styles.statLabel}>累计浏览量</Text>
        </View>
        <View className={styles.statCard}>
          <Text className={styles.statValue}>28</Text>
          <Text className={styles.statLabel}>本月成交</Text>
        </View>
      </View>

      <View className={styles.section}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>最近作品</Text>
          <Text className={styles.sectionMore} onClick={handleViewAllWorks}>查看全部 →</Text>
        </View>
        <ScrollView className={styles.recentWorks} scrollX showScrollbar={false}>
          {recentWorks.map((work) => (
            <View key={work.id} className={styles.recentWorkItem}>
              <Image
                className={styles.recentWorkImg}
                src={work.cover}
                mode="aspectFill"
                onClick={() => Taro.navigateTo({ url: `/pages/preview/index?workId=${work.id}` })}
                onError={(e) => console.error('[Home] 作品图片加载失败:', e)}
              />
              <View className={styles.recentWorkInfo}>
                <Text className={styles.recentWorkTitle}>{work.title}</Text>
                <Text className={styles.recentWorkTime}>{work.createTime}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <View className={styles.section}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>精选模板</Text>
        </View>
        <ScrollView className={styles.categoryScroll} scrollX showScrollbar={false}>
          {templateCategories.map((cat) => (
            <View key={cat.id} className={styles.categoryItem}>
              <TagItem
                text={cat.name}
                type={activeCategory === cat.id ? 'primary' : 'default'}
                size="medium"
                selected={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id)}
              />
            </View>
          ))}
        </ScrollView>
        <View className={styles.templatesGrid}>
          {filteredTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default HomePage;
