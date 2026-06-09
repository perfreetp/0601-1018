import React from 'react';
import { View, Text } from '@tarojs/components';
import classnames from 'classnames';
import styles from './index.module.scss';

interface TagItemProps {
  text: string;
  type?: 'default' | 'primary' | 'success' | 'warning' | 'info';
  size?: 'small' | 'medium' | 'large';
  selected?: boolean;
  onClick?: () => void;
}

const TagItem: React.FC<TagItemProps> = ({
  text,
  type = 'default',
  size = 'medium',
  selected = false,
  onClick
}) => {
  return (
    <View
      className={classnames(
        styles.tag,
        styles[type],
        styles[size],
        selected && styles.selected
      )}
      onClick={onClick}
    >
      <Text className={styles.text}>{text}</Text>
    </View>
  );
};

export default TagItem;
