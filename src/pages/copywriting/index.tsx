import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, Button, Input } from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';
import classnames from 'classnames';
import TagItem from '@/components/TagItem';
import EmptyState from '@/components/EmptyState';
import { copywritingCategories, copywritings } from '@/data/copywriting';
import { copyToClipboard } from '@/utils';
import styles from './index.module.scss';

const CopywritingPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchText, setSearchText] = useState<string>('');

  const filteredCopywritings = useMemo(() => {
    let result = copywritings;
    if (activeCategory !== 'all') {
      result = result.filter((c) => c.category === activeCategory);
    }
    if (searchText) {
      result = result.filter(
        (c) =>
          c.title.includes(searchText) ||
          c.content.includes(searchText)
      );
    }
    return result;
  }, [activeCategory, searchText]);

  const handleCopy = async (content: string, title: string) => {
    const success = await copyToClipboard(content);
    if (success) {
      Taro.showToast({ title: '已复制', icon: 'success' });
      console.log('[Copywriting] 复制文案:', title);
    } else {
      Taro.showToast({ title: '复制失败', icon: 'error' });
    }
  };

  const handleUse = (item: typeof copywritings[0]) => {
    console.log('[Copywriting] 使用文案:', item.title);
    Taro.showToast({ title: '已插入到编辑器', icon: 'success' });
  };

  useDidShow(() => {
    console.log('[Copywriting] 页面显示');
  });

  return (
    <ScrollView className={styles.page} scrollY>
      <ScrollView className={styles.categoryScroll} scrollX showScrollbar={false}>
        {copywritingCategories.map((cat) => (
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

      <View className={styles.searchBar}>
        <View className={styles.searchInput}>
          <Text className={styles.searchIcon}>🔍</Text>
          <Input
            className={styles.searchText}
            placeholder="搜索文案关键词..."
            value={searchText}
            onInput={(e) => setSearchText(e.detail.value)}
          />
        </View>
      </View>

      {filteredCopywritings.length > 0 ? (
        <View className={styles.copyList}>
          {filteredCopywritings.map((item) => (
            <View key={item.id} className={styles.copyCard}>
              <View className={styles.copyHeader}>
                <Text className={styles.copyTitle}>{item.title}</Text>
                <Text className={styles.copyCategory}>
                  {copywritingCategories.find((c) => c.id === item.category)?.name || item.category}
                </Text>
              </View>
              <Text className={styles.copyContent}>{item.content}</Text>
              <View className={styles.copyFooter}>
                <Text className={styles.copyUsage}>使用 {item.usageCount} 次</Text>
                <View className={styles.copyActions}>
                  <Button
                    className={classnames(styles.actionBtn, styles.secondary)}
                    onClick={() => handleCopy(item.content, item.title)}
                  >
                    复制
                  </Button>
                  <Button
                    className={classnames(styles.actionBtn, styles.primary)}
                    onClick={() => handleUse(item)}
                  >
                    使用
                  </Button>
                </View>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <EmptyState
          icon="📝"
          title="暂无文案"
          description="换个分类或关键词试试吧"
        />
      )}
    </ScrollView>
  );
};

export default CopywritingPage;
