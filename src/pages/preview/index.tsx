import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, Button } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import NavBar from '@/components/NavBar';
import { works, shareRecords } from '@/data/works';
import { copyToClipboard } from '@/utils';
import styles from './index.module.scss';

const PreviewPage: React.FC = () => {
  const router = useRouter();
  const workId = router.params.workId;
  const [viewCount, setViewCount] = useState(0);

  const work = workId ? works.find((w) => w.id === workId) : works[0];
  const shareRecord = workId ? shareRecords.find((r) => r.workId === workId) : shareRecords[0];

  useEffect(() => {
    if (workId) {
      const baseCount = work?.views || 0;
      setViewCount(baseCount + Math.floor(Math.random() * 10));
      console.log('[Preview] 预览作品:', workId);
    }
  }, [workId, work]);

  const handleCopyConsult = async () => {
    const consultText = `您好！我对【${work?.title}】很感兴趣，方便详细介绍一下吗？`;
    const success = await copyToClipboard(consultText);
    if (success) {
      Taro.showToast({ title: '咨询话术已复制', icon: 'success' });
    }
  };

  const handleShare = () => {
    console.log('[Preview] 分享作品');
    Taro.showActionSheet({
      itemList: ['分享到朋友圈', '分享给好友', '分享到微信群', '生成分享海报'],
      success: (res) => {
        const platforms = ['朋友圈', '好友', '微信群', '海报'];
        Taro.showToast({
          title: `已分享到${platforms[res.tapIndex]}`,
          icon: 'success'
        });
      }
    });
  };

  const handleSave = () => {
    console.log('[Preview] 保存作品');
    Taro.showModal({
      title: '保存成功',
      content: '海报已保存到手机相册',
      showCancel: false
    });
  };

  const features = [
    '南北通透，采光极佳，户型方正实用',
    '学区对口市重点实验小学，步行5分钟',
    '地铁2号线500米，出行便利',
    '满五唯一，税费低，性价比超高'
  ];

  return (
    <View className={styles.page}>
      <NavBar
        title="作品预览"
        rightContent={
          <Text
            style={{ fontSize: 28, color: '#fff', fontWeight: 600 }}
            onClick={() => Taro.navigateBack()}
          >
            返回
          </Text>
        }
      />

      <View className={styles.statsBar}>
        <View className={styles.statItem}>
          <Text className={styles.statIcon}>👁</Text>
          <Text className={styles.statText}>{viewCount || work?.views || 0} 次浏览</Text>
        </View>
        <View className={styles.statItem}>
          <Text className={styles.statIcon}>↗</Text>
          <Text className={styles.statText}>{work?.shares || 0} 次分享</Text>
        </View>
        <View className={styles.statItem}>
          <Text className={styles.statIcon}>💬</Text>
          <Text className={styles.statText}>{Math.floor((viewCount || 10) / 5)} 次咨询</Text>
        </View>
      </View>

      <ScrollView scrollY>
        <View className={styles.previewContainer}>
          <View className={styles.posterWrap}>
            <Image
              className={styles.posterImage}
              src={work?.cover || 'https://picsum.photos/id/1048/700/550'}
              mode="aspectFill"
              onError={(e) => console.error('[Preview] 海报图加载失败:', e)}
            />
            <View className={styles.posterBody}>
              <Text className={styles.communityName}>
                {work?.community || '万科翡翠滨江'}
              </Text>
              <View className={styles.priceRow}>
                <Text className={styles.priceValue}>{work?.title?.match(/\d+/)?.[0] || '688'}</Text>
                <Text className={styles.priceUnit}>万</Text>
                <Text className={styles.pricePerSqm}>约 53,750 元/㎡</Text>
              </View>
              <View className={styles.infoTags}>
                <Text className={styles.infoTag}>三室两厅两卫</Text>
                <Text className={styles.infoTag}>128㎡</Text>
                <Text className={styles.infoTag}>南北通透</Text>
                <Text className={styles.infoTag}>中楼层/18层</Text>
                <Text className={styles.infoTag}>精装修</Text>
              </View>

              <Text className={styles.featuresTitle}>房源亮点</Text>
              <View className={styles.featuresList}>
                {features.map((f, i) => (
                  <Text key={i} className={styles.featureItem}>{f}</Text>
                ))}
              </View>

              <View className={styles.descriptionSection}>
                <Text className={styles.descTitle}>房源描述</Text>
                <Text className={styles.descContent}>
                  本房源位于小区中心位置，前后无遮挡，视野开阔。业主自住保养好，全屋品牌家电家具全送。
                  对口重点学区，孩子上学无忧。周边配套齐全，超市、医院、学校一应俱全。
                  业主诚心出售，价格可谈，随时可以看房。
                </Text>
              </View>

              <View className={styles.agentCard}>
                <Image
                  className={styles.agentAvatar}
                  src="https://picsum.photos/id/64/100/100"
                  mode="aspectFill"
                  onError={(e) => console.error('[Preview] 头像加载失败:', e)}
                />
                <View className={styles.agentDetails}>
                  <Text className={styles.agentName}>小王 经纪人</Text>
                  <Text className={styles.agentCompany}>链家房产 · 金牌经纪人</Text>
                  <Text className={styles.agentPhone}>📱 138****8888</Text>
                </View>
                <View className={styles.qrCode}>
                  <Text>📱</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View className={styles.bottomBar}>
        <Button className={`${styles.actionBtn} ${styles.outline}`} onClick={handleCopyConsult}>
          复制咨询话术
        </Button>
        <Button className={`${styles.actionBtn} ${styles.gradient}`} onClick={handleShare}>
          分享给客户
        </Button>
        <Button className={`${styles.actionBtn} ${styles.gold}`} onClick={handleSave}>
          保存图片
        </Button>
      </View>
    </View>
  );
};

export default PreviewPage;
