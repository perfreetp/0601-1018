import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import type { Work } from '@/types';
import styles from './index.module.scss';

interface WorkCardProps {
  work: Work;
  onClick?: () => void;
}

const WorkCard: React.FC<WorkCardProps> = ({ work, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      Taro.navigateTo({
        url: `/pages/preview/index?workId=${work.id}`
      });
    }
  };

  return (
    <View className={styles.card} onClick={handleClick}>
      <View className={styles.imageWrap}>
        <Image
          className={styles.image}
          src={work.cover}
          mode="aspectFill"
          onError={(e) => console.error('[WorkCard] 图片加载失败:', e)}
        />
        {work.status === 'draft' && (
          <View className={styles.draftTag}>草稿</View>
        )}
      </View>
      <View className={styles.info}>
        <Text className={styles.title}>{work.title}</Text>
        <Text className={styles.template}>{work.templateName}</Text>
        <View className={styles.footer}>
          <Text className={styles.time}>{work.createTime}</Text>
          <View className={styles.stats}>
            <Text className={styles.stat}>👁 {work.views}</Text>
            <Text className={styles.stat}>↗ {work.shares}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default WorkCard;
