import React from 'react';
import { View, Text, ScrollView, Image, Button } from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';
import { shareRecords, works } from '@/data/works';
import styles from './index.module.scss';

const MinePage: React.FC = () => {
  const totalWorks = works.length;
  const totalShares = shareRecords.length;
  const totalViews = shareRecords.reduce((sum, r) => sum + r.views, 0);

  const handleMenuClick = (menu: string) => {
    console.log('[Mine] 点击菜单:', menu);
    switch (menu) {
      case 'agent':
        Taro.showToast({ title: '编辑名片开发中', icon: 'none' });
        break;
      case 'color':
        Taro.showToast({ title: '我的配色开发中', icon: 'none' });
        break;
      case 'size':
        Taro.showToast({ title: '尺寸预设开发中', icon: 'none' });
        break;
      case 'settings':
        Taro.showToast({ title: '设置开发中', icon: 'none' });
        break;
      case 'about':
        Taro.showToast({ title: '关于我们开发中', icon: 'none' });
        break;
    }
  };

  const handleViewShareRecord = (recordId: string) => {
    const record = shareRecords.find((r) => r.id === recordId);
    if (record) {
      Taro.navigateTo({ url: `/pages/preview/index?workId=${record.workId}` });
    }
  };

  useDidShow(() => {
    console.log('[Mine] 页面显示');
  });

  return (
    <ScrollView className={styles.page} scrollY>
      <View className={styles.profileHeader}>
        <View className={styles.profileCard}>
          <View className={styles.avatar}>
            <Image
              className={styles.avatarImg}
              src="https://picsum.photos/id/64/200/200"
              mode="aspectFill"
              onError={(e) => console.error('[Mine] 头像加载失败:', e)}
            />
          </View>
          <View className={styles.profileInfo}>
            <Text className={styles.agentName}>小王</Text>
            <Text className={styles.agentCompany}>链家房产 · 金牌经纪人</Text>
          </View>
          <Button
            className={styles.editBtn}
            onClick={() => handleMenuClick('agent')}
          >
            编辑
          </Button>
        </View>
      </View>

      <View className={styles.statsBar}>
        <View className={styles.statItem}>
          <Text className={styles.statNum}>{totalWorks}</Text>
          <Text className={styles.statLabel}>作品数</Text>
        </View>
        <View className={styles.statItem}>
          <Text className={styles.statNum}>{totalShares}</Text>
          <Text className={styles.statLabel}>分享次数</Text>
        </View>
        <View className={styles.statItem}>
          <Text className={styles.statNum}>{totalViews}</Text>
          <Text className={styles.statLabel}>总浏览量</Text>
        </View>
      </View>

      <View className={styles.cardSection}>
        <View className={styles.cardTitle}>常用功能</View>
        <View className={styles.menuItem} onClick={() => handleMenuClick('agent')}>
          <Text className={styles.menuIcon}>💳</Text>
          <Text className={styles.menuText}>我的名片</Text>
          <Text className={styles.menuArrow}>›</Text>
        </View>
        <View className={styles.menuItem} onClick={() => handleMenuClick('color')}>
          <Text className={styles.menuIcon}>🎨</Text>
          <Text className={styles.menuText}>我的配色方案</Text>
          <Text className={styles.menuArrow}>›</Text>
        </View>
        <View className={styles.menuItem} onClick={() => handleMenuClick('size')}>
          <Text className={styles.menuIcon}>📐</Text>
          <Text className={styles.menuText}>尺寸预设</Text>
          <Text className={styles.menuArrow}>›</Text>
        </View>
      </View>

      <View className={styles.cardSection}>
        <View className={styles.cardTitle}>分享记录</View>
        <View className={styles.shareRecords}>
          {shareRecords.slice(0, 5).map((record) => (
            <View
              key={record.id}
              className={styles.recordItem}
              onClick={() => handleViewShareRecord(record.id)}
            >
              <View className={styles.recordInfo}>
                <Text className={styles.recordTitle}>{record.workTitle}</Text>
                <Text className={styles.recordMeta}>
                  {record.shareTime} · {record.platform}
                </Text>
              </View>
              <Text className={styles.recordViews}>👁 {record.views}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className={styles.cardSection}>
        <View className={styles.cardTitle}>其他</View>
        <View className={styles.menuItem} onClick={() => handleMenuClick('settings')}>
          <Text className={styles.menuIcon}>⚙️</Text>
          <Text className={styles.menuText}>设置</Text>
          <Text className={styles.menuArrow}>›</Text>
        </View>
        <View className={styles.menuItem} onClick={() => handleMenuClick('about')}>
          <Text className={styles.menuIcon}>ℹ️</Text>
          <Text className={styles.menuText}>关于我们</Text>
          <Text className={styles.menuArrow}>›</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default MinePage;
