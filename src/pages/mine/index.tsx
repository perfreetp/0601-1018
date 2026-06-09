import React, { useMemo } from 'react';
import { View, Text, ScrollView, Image, Button } from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';
import { useDesignStore } from '@/store/design';
import EmptyState from '@/components/EmptyState';
import styles from './index.module.scss';

const MinePage: React.FC = () => {
  const works = useDesignStore((state) => state.works);
  const shareRecords = useDesignStore((state) => state.shareRecords);
  const agentInfo = useDesignStore((state) => state.agentInfo);

  const totalWorks = works.length;
  const totalShares = shareRecords.length;
  const totalViews = works.reduce((sum, w) => sum + w.views, 0);

  const handleMenuClick = (menu: string) => {
    console.log('[Mine] 点击菜单:', menu);
    switch (menu) {
      case 'agent':
        Taro.navigateTo({ url: '/pages/editor/index' });
        setTimeout(() => {
          Taro.showToast({ title: '请在编辑器"名片"标签中编辑', icon: 'none', duration: 2500 });
        }, 300);
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
        Taro.showToast({ title: '房产海报设计 v1.0', icon: 'none' });
        break;
    }
  };

  const handleViewShareRecord = (recordId: string) => {
    const record = shareRecords.find((r) => r.id === recordId);
    if (record) {
      Taro.navigateTo({ url: `/pages/preview/index?workId=${record.workId}` });
    }
  };

  const platformIcon: Record<string, string> = {
    '朋友圈': '🟢',
    '微信群': '💬',
    '微信好友': '👤',
    '抖音': '🎵',
    '小红书': '📕',
    '保存图片': '💾'
  };

  useDidShow(() => {
    console.log('[Mine] 页面显示, 分享记录数:', shareRecords.length);
  });

  return (
    <ScrollView className={styles.page} scrollY>
      <View className={styles.profileHeader}>
        <View className={styles.profileCard}>
          <View className={styles.avatar}>
            <Image
              className={styles.avatarImg}
              src={agentInfo.avatar || 'https://picsum.photos/id/64/200/200'}
              mode="aspectFill"
              onError={(e) => console.error('[Mine] 头像加载失败:', e)}
            />
          </View>
          <View className={styles.profileInfo}>
            <Text className={styles.agentName}>{agentInfo.name || '小王'}</Text>
            <Text className={styles.agentCompany}>{agentInfo.company || '链家房产'} · 金牌经纪人</Text>
            <Text style={{ fontSize: 22, color: '#86909C', marginTop: 4 }}>
              {agentInfo.phone || '13888888888'}
            </Text>
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
        <View className={styles.cardTitle}>
          分享记录
          <Text style={{ fontSize: 22, color: '#86909C', fontWeight: 400, marginLeft: 8 }}>
            共 {shareRecords.length} 条
          </Text>
        </View>
        {shareRecords.length === 0 ? (
          <EmptyState
            icon="📤"
            title="暂无分享记录"
            description="快去预览页分享作品给客户吧"
          />
        ) : (
          <View className={styles.shareRecords}>
            {shareRecords.slice(0, 8).map((record) => (
              <View
                key={record.id}
                className={styles.recordItem}
                onClick={() => handleViewShareRecord(record.id)}
              >
                <Text className={styles.recordPlatformIcon}>
                  {platformIcon[record.platform] || '📱'}
                </Text>
                <View className={styles.recordInfo}>
                  <Text className={styles.recordTitle} numberOfLines={1}>{record.workTitle}</Text>
                  <Text className={styles.recordMeta}>
                    {record.shareTime} · {record.platform}
                  </Text>
                </View>
                <Text className={styles.recordViews}>👁 {record.views}</Text>
              </View>
            ))}
          </View>
        )}
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
