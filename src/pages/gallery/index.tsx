import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, Image, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import NavBar from '@/components/NavBar';
import EmptyState from '@/components/EmptyState';
import styles from './index.module.scss';

const categories = [
  { id: 'all', name: '全部图片' },
  { id: 'interior', name: '室内照片' },
  { id: 'exterior', name: '外景照片' },
  { id: 'layout', name: '户型图' },
  { id: 'community', name: '小区环境' }
];

const generateGalleryImages = () => {
  const ids = [1048, 164, 1043, 1040, 1031, 177, 1059, 1057, 1025, 1033, 1079, 1018, 1015, 1036, 1039, 1044];
  return ids.map((id, idx) => ({
    id: `img_${idx}`,
    url: `https://picsum.photos/id/${id}/400/400`,
    category: ['interior', 'exterior', 'layout', 'community'][idx % 4],
    name: `图片${idx + 1}`
  }));
};

const GalleryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [images, setImages] = useState(generateGalleryImages());

  const filteredImages = useMemo(() => {
    if (activeCategory === 'all') return images;
    return images.filter((img) => img.category === activeCategory);
  }, [images, activeCategory]);

  const handleImageClick = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const handleUpload = () => {
    Taro.chooseImage({
      count: 9,
      success: (res) => {
        console.log('[Gallery] 上传图片:', res.tempFilePaths);
        const newImages = res.tempFilePaths.map((path, idx) => ({
          id: `new_${Date.now()}_${idx}`,
          url: path,
          category: 'interior',
          name: `新图片${idx + 1}`
        }));
        setImages([...newImages, ...images]);
        Taro.showToast({ title: '上传成功', icon: 'success' });
      },
      fail: (err) => {
        console.error('[Gallery] 选择图片失败:', err);
        Taro.showToast({ title: '已添加示例图片', icon: 'none' });
        const demoImages = [
          { id: `demo_${Date.now()}_1`, url: 'https://picsum.photos/id/237/400/400', category: 'interior', name: '示例图1' },
          { id: `demo_${Date.now()}_2`, url: 'https://picsum.photos/id/238/400/400', category: 'interior', name: '示例图2' }
        ];
        setImages([...demoImages, ...images]);
      }
    });
  };

  const handleDelete = () => {
    if (selectedIds.size === 0) return;
    Taro.showModal({
      title: '确认删除',
      content: `确定要删除选中的 ${selectedIds.size} 张图片吗？`,
      success: (res) => {
        if (res.confirm) {
          setImages(images.filter((img) => !selectedIds.has(img.id)));
          setSelectedIds(new Set());
          Taro.showToast({ title: '删除成功', icon: 'success' });
        }
      }
    });
  };

  const handleConfirm = () => {
    if (selectedIds.size === 0) return;
    console.log('[Gallery] 选中图片:', selectedIds);
    Taro.showToast({ title: `已选择 ${selectedIds.size} 张图片`, icon: 'success' });
    setTimeout(() => Taro.navigateBack(), 1000);
  };

  return (
    <View className={styles.page}>
      <NavBar
        title="我的图库"
        rightContent={
          selectedIds.size > 0 ? (
            <Text
              style={{ fontSize: 28, color: '#FF6B35', fontWeight: 600 }}
              onClick={() => setSelectedIds(new Set())}
            >
              取消选择
            </Text>
          ) : null
        }
      />

      <ScrollView scrollY>
        <View className={styles.categoryBar}>
          {categories.map((cat) => (
            <Text
              key={cat.id}
              className={classnames(styles.categoryItem, activeCategory === cat.id && styles.active)}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.name}
            </Text>
          ))}
        </View>

        <View className={styles.uploadBar}>
          <View className={styles.uploadInfo}>
            <Text className={styles.uploadTitle}>上传房源图片</Text>
            <Text className={styles.uploadDesc}>支持室内图、外景图、户型图等</Text>
          </View>
          <Button className={styles.uploadBtn} onClick={handleUpload}>
            + 上传
          </Button>
        </View>

        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>图片列表</Text>
          <Text className={styles.sectionCount}>{filteredImages.length} 张</Text>
        </View>

        {filteredImages.length > 0 ? (
          <View className={styles.imageGrid}>
            {filteredImages.map((img) => (
              <View
                key={img.id}
                className={styles.imageItem}
                onClick={() => handleImageClick(img.id)}
              >
                <Image
                  className={styles.image}
                  src={img.url}
                  mode="aspectFill"
                  onError={(e) => console.error('[Gallery] 图片加载失败:', e)}
                />
                {selectedIds.has(img.id) && (
                  <View className={classnames(styles.imageMask, styles.selected)}>
                    <Text className={styles.checkIcon}>✓</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        ) : (
          <EmptyState
            icon="🖼️"
            title="暂无图片"
            description="点击上方按钮上传第一张图片吧"
            actionText="去上传"
            onAction={handleUpload}
          />
        )}
      </ScrollView>

      {selectedIds.size > 0 && (
        <View className={styles.bottomBar}>
          <Text className={styles.selectedCount}>已选择 {selectedIds.size} 张</Text>
          <Button className={styles.deleteBtn} onClick={handleDelete}>
            删除
          </Button>
          <Button className={styles.confirmBtn} onClick={handleConfirm}>
            确认选择
          </Button>
        </View>
      )}
    </View>
  );
};

export default GalleryPage;
