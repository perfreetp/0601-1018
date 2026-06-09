import React from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import styles from './index.module.scss';

interface NavBarProps {
  title: string;
  showBack?: boolean;
  rightContent?: React.ReactNode;
  onBack?: () => void;
}

const NavBar: React.FC<NavBarProps> = ({
  title,
  showBack = true,
  rightContent,
  onBack
}) => {
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      Taro.navigateBack().catch(() => {
        Taro.switchTab({ url: '/pages/home/index' });
      });
    }
  };

  return (
    <View className={styles.navBar}>
      <View className={styles.leftArea}>
        {showBack && (
          <View className={styles.backBtn} onClick={handleBack}>
            <Text className={styles.backIcon}>←</Text>
          </View>
        )}
      </View>
      <View className={styles.titleArea}>
        <Text className={styles.title}>{title}</Text>
      </View>
      <View className={styles.rightArea}>{rightContent}</View>
    </View>
  );
};

export default NavBar;
