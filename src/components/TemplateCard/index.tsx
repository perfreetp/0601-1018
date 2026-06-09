import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import type { Template } from '@/types';
import styles from './index.module.scss';

interface TemplateCardProps {
  template: Template;
  onClick?: () => void;
  selected?: boolean;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, onClick, selected }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      Taro.navigateTo({
        url: `/pages/import/index?templateId=${template.id}`
      });
    }
  };

  return (
    <View
      className={classnames(styles.card, selected && styles.selected)}
      onClick={handleClick}
    >
      <View className={styles.imageWrap}>
        <Image
          className={styles.image}
          src={template.cover}
          mode="aspectFill"
          onError={(e) => console.error('[TemplateCard] 图片加载失败:', e)}
        />
        <View className={styles.tagWrap}>
          {template.isHot && <View className={classnames(styles.tag, styles.hotTag)}>热销</View>}
          {template.isNew && <View className={classnames(styles.tag, styles.newTag)}>新品</View>}
        </View>
      </View>
      <View className={styles.info}>
        <Text className={styles.name}>{template.name}</Text>
        <View className={styles.tags}>
          {template.tags.slice(0, 2).map((tag, idx) => (
            <Text key={idx} className={styles.miniTag}>{tag}</Text>
          ))}
        </View>
      </View>
    </View>
  );
};

export default TemplateCard;
