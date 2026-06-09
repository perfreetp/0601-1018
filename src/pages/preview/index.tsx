import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, ScrollView, Image } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import NavBar from '@/components/NavBar';
import { useDesignStore } from '@/store/design';
import { copyToClipboard } from '@/utils';
import { copywriting } from '@/data/copywriting';
import classnames from 'classnames';
import styles from './index.module.scss';

const PreviewPage: React.FC = () => {
  const router = useRouter();
  const workId = router.params?.workId || 'w1';
  const store = useDesignStore();
  const { works, getWorkById, incrementWorkViews, addShareRecord, propertyLibrary, agentInfo } = store;

  const work = useMemo(() => getWorkById(workId) || works[0], [workId, works]);
  const [localShares, setLocalShares] = useState(work?.shares || 0);
  const [localViews, setLocalViews] = useState(work?.views || 0);

  const matchedProperty = useMemo(() => {
    if (work?.community) {
      return propertyLibrary.find((p) => p.communityName === work.community);
    }
    return propertyLibrary[0];
  }, [work, propertyLibrary]);

  const consultationCopy = useMemo(() => {
    const consultItems = copywriting.filter((c) => c.category === 'consult');
    const item = consultItems[Math.floor(Math.random() * consultItems.length)] || copywriting[0];
    return item?.content
      .replace('{小区}', matchedProperty?.communityName || '本小区')
      .replace('{户型}', matchedProperty?.layout || '该户型')
      .replace('{价格}', matchedProperty?.price || '价格面议');
  }, [matchedProperty]);

  useEffect(() => {
    if (work?.id) {
      incrementWorkViews(work.id);
      setLocalViews((v) => v + 1);
      console.log('[Preview] 增加浏览量, workId:', work.id);
    }
  }, []);

  const handleShare = (platform: string) => {
    if (!work) return;
    Taro.showLoading({ title: `正在分享到${platform}...` });
    setTimeout(() => {
      Taro.hideLoading();
      setLocalShares((s) => s + 1);
      addShareRecord({
        workId: work.id,
        workTitle: work.title,
        platform,
        views: 0
      });
      Taro.showToast({ title: `已分享到${platform}`, icon: 'success' });
      console.log('[Preview] 分享成功:', platform);
    }, 1000);
  };

  const handleShareClick = () => {
    Taro.showActionSheet({
      itemList: ['朋友圈', '微信好友', '微信群', '保存图片'],
      success: (res) => {
        const platforms = ['朋友圈', '微信好友', '微信群'];
        if (res.tapIndex === 3) {
          Taro.showLoading({ title: '正在保存...' });
          setTimeout(() => {
            Taro.hideLoading();
            Taro.showToast({ title: '已保存到相册', icon: 'success' });
          }, 1000);
        } else {
          handleShare(platforms[res.tapIndex]);
        }
      },
      fail: () => {
        Taro.showToast({ title: '取消分享', icon: 'none' });
      }
    });
  };

  const handleCopyConsultation = async () => {
    try {
      const result = await copyToClipboard(consultationCopy);
      if (result) {
        Taro.showToast({ title: '话术已复制', icon: 'success' });
        console.log('[Preview] 复制咨询话术成功');
      } else {
        Taro.showModal({
          title: '复制失败',
          content: '自动复制失败，请长按手动复制以下话术：\n\n' + consultationCopy,
          showCancel: false
        });
      }
    } catch (e) {
      console.error('[Preview] 复制失败:', e);
      Taro.showModal({
        title: '复制失败',
        content: '系统不支持自动复制，请长按手动复制：\n\n' + consultationCopy,
        showCancel: false
      });
    }
  };

  const handleSaveImage = () => {
    Taro.showLoading({ title: '正在生成图片...' });
    setTimeout(() => {
      Taro.hideLoading();
      Taro.showToast({ title: '已保存到相册', icon: 'success' });
    }, 1200);
  };

  if (!work) {
    return (
      <View className={styles.page}>
        <NavBar title="客户预览" />
        <View style={{ padding: 80, textAlign: 'center', color: '#86909C' }}>
          作品不存在
        </View>
      </View>
    );
  }

  return (
    <View className={styles.page}>
      <NavBar title="客户预览" />

      <ScrollView scrollY className={styles.scrollArea}>
        <View className={styles.statsBar}>
          <View className={styles.statItem}>
            <Text className={styles.statNum}>{localViews}</Text>
            <Text className={styles.statLabel}>浏览</Text>
          </View>
          <View className={styles.statDivider} />
          <View className={styles.statItem}>
            <Text className={styles.statNum}>{localShares}</Text>
            <Text className={styles.statLabel}>分享</Text>
          </View>
          <View className={styles.statDivider} />
          <View className={styles.statItem}>
            <Text className={styles.statNum}>3</Text>
            <Text className={styles.statLabel}>咨询</Text>
          </View>
        </View>

        <View className={styles.posterWrap}>
          <View className={classnames(styles.posterPreview, styles.square)}>
            <Image
              className={styles.posterImage}
              src={matchedProperty?.images?.[0] || work.cover}
              mode="aspectFill"
              onError={(e) => console.error('[Preview] 海报图加载失败:', e)}
            />
            <View className={styles.posterContent}>
              <Text className={styles.posterCommunity}>
                {matchedProperty?.communityName || work.community || work.title}
              </Text>
              <View className={styles.posterPrice}>
                {matchedProperty?.price || '688'}
                <Text className={styles.unit}>万</Text>
              </View>
              <View className={styles.posterInfo}>
                <Text className={styles.posterInfoItem}>
                  {matchedProperty?.layout || '三室两厅'}
                </Text>
                <Text className={styles.posterInfoItem}>
                  {matchedProperty?.area || '128'}㎡
                </Text>
                <Text className={styles.posterInfoItem}>
                  {matchedProperty?.orientation || '南北通透'}
                </Text>
                <Text className={styles.posterInfoItem}>
                  {matchedProperty?.floor || '中楼层'}
                </Text>
              </View>
              <View className={styles.posterFeatures}>
                {(matchedProperty?.features || ['品质房源', '性价比高', '业主急售']).map((f, i) => (
                  <Text key={i} className={styles.posterFeature}>
                    {f}
                  </Text>
                ))}
              </View>
              {matchedProperty?.address && (
                <View className={styles.posterAddress}>
                  <Text>📍</Text>
                  <Text>{matchedProperty.address}</Text>
                </View>
              )}
              <View className={styles.posterAgent}>
                <Image
                  className={styles.agentAvatar}
                  src={agentInfo.avatar || 'https://picsum.photos/id/64/100/100'}
                  mode="aspectFill"
                />
                <View className={styles.agentInfo}>
                  <Text className={styles.agentName}>{agentInfo.name || '小王'}</Text>
                  <Text className={styles.agentCompany}>
                    {agentInfo.company || '链家房产'} · {agentInfo.phone || '13888888888'}
                  </Text>
                </View>
                <View className={styles.qrCodeBox}>
                  <View className={styles.qrCodeInner}>
                    <View className={classnames(styles.qrCorner, styles.tl)} />
                    <View className={classnames(styles.qrCorner, styles.tr)} />
                    <View className={classnames(styles.qrCorner, styles.bl)} />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View className={styles.workMeta}>
          <Text className={styles.workTitle}>{work.title}</Text>
          <Text className={styles.workSub}>模板：{work.templateName} · 创建于 {work.createTime}</Text>
          {work.status === 'draft' && (
            <View style={{ marginTop: 8 }}>
              <Text style={{ fontSize: 22, color: '#FF7D00', background: '#FFF3E8', padding: '4rpx 16rpx', borderRadius: 8 }}>
                草稿
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      <View className={styles.bottomBar}>
        <View className={styles.consultBtn} onClick={handleCopyConsultation}>
          <Text className={styles.consultIcon}>📋</Text>
          <Text className={styles.consultText}>复制咨询话术</Text>
        </View>
        <View className={styles.shareBtn} onClick={handleShareClick}>
          <Text className={styles.shareIcon}>📤</Text>
          <Text className={styles.shareText}>分享给客户</Text>
        </View>
        <View className={styles.saveBtn} onClick={handleSaveImage}>
          <Text className={styles.saveIcon}>💾</Text>
          <Text className={styles.saveText}>保存图片</Text>
        </View>
      </View>
    </View>
  );
};

export default PreviewPage;
