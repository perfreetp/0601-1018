import React, { useState } from 'react';
import { View, Text, ScrollView, Input, Image, Button, Textarea } from '@tarojs/components';
import Taro from '@tarojs/taro';
import NavBar from '@/components/NavBar';
import TagItem from '@/components/TagItem';
import { useDesignStore } from '@/store/design';
import { generateSellPoints } from '@/utils';
import styles from './index.module.scss';

const sampleImages = [
  'https://picsum.photos/id/1048/400/400',
  'https://picsum.photos/id/164/400/400',
  'https://picsum.photos/id/1043/400/400'
];

const ImportPage: React.FC = () => {
  const { propertyInfo, setPropertyInfo, setSelectedTemplateId } = useDesignStore();
  const [newFeature, setNewFeature] = useState('');
  const [images, setImages] = useState<string[]>(sampleImages);

  const handleInputChange = (field: string, value: string) => {
    setPropertyInfo({ [field]: value } as any);
    console.log('[Import] 字段更新:', field, value);
  };

  const handleAutoGenerate = () => {
    const points = generateSellPoints(propertyInfo);
    setPropertyInfo({ features: points });
    Taro.showToast({ title: '已自动生成卖点', icon: 'success' });
    console.log('[Import] 自动生成卖点:', points);
  };

  const handleAddFeature = () => {
    if (!newFeature.trim()) return;
    const features = [...(propertyInfo.features || []), newFeature.trim()];
    setPropertyInfo({ features });
    setNewFeature('');
  };

  const handleRemoveFeature = (index: number) => {
    const features = [...(propertyInfo.features || [])];
    features.splice(index, 1);
    setPropertyInfo({ features });
  };

  const handleAddImage = () => {
    Taro.chooseImage({
      count: 9 - images.length,
      success: (res) => {
        setImages([...images, ...res.tempFilePaths]);
      },
      fail: (err) => {
        console.error('[Import] 选择图片失败:', err);
        const newImage = `https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/400/400`;
        setImages([...images, newImage]);
      }
    });
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleSubmit = () => {
    if (!propertyInfo.communityName) {
      Taro.showToast({ title: '请输入小区名称', icon: 'none' });
      return;
    }
    setPropertyInfo({ images });
    if (!propertyInfo.features || propertyInfo.features.length === 0) {
      handleAutoGenerate();
    }
    console.log('[Import] 提交房源信息:', propertyInfo);
    Taro.showToast({ title: '录入成功', icon: 'success' });
    setTimeout(() => {
      Taro.navigateTo({ url: '/pages/editor/index' });
    }, 1000);
  };

  const handleCancel = () => {
    Taro.navigateBack();
  };

  return (
    <View className={styles.page}>
      <NavBar title="房源信息录入" />
      <ScrollView scrollY>
        <View className={styles.formCard}>
          <View className={styles.formSection}>
            <Text className={styles.sectionTitle}>基本信息</Text>
            <View className={styles.formItem}>
              <Text className={styles.formLabel}>小区名称</Text>
              <Input
                className={styles.formInput}
                placeholder="请输入小区名称"
                placeholderClass={styles.formInputPlaceholder}
                value={propertyInfo.communityName}
                onInput={(e) => handleInputChange('communityName', e.detail.value)}
              />
            </View>
            <View className={styles.formItem}>
              <Text className={styles.formLabel}>户型</Text>
              <Input
                className={styles.formInput}
                placeholder="如：三室两厅两卫"
                placeholderClass={styles.formInputPlaceholder}
                value={propertyInfo.layout}
                onInput={(e) => handleInputChange('layout', e.detail.value)}
              />
            </View>
            <View className={styles.formItem}>
              <Text className={styles.formLabel}>建筑面积</Text>
              <Input
                className={styles.formInput}
                placeholder="请输入面积（㎡）"
                placeholderClass={styles.formInputPlaceholder}
                value={propertyInfo.area}
                onInput={(e) => handleInputChange('area', e.detail.value)}
              />
            </View>
            <View className={styles.formItem}>
              <Text className={styles.formLabel}>总价</Text>
              <Input
                className={styles.formInput}
                placeholder="请输入总价（万元）"
                placeholderClass={styles.formInputPlaceholder}
                value={propertyInfo.price}
                onInput={(e) => handleInputChange('price', e.detail.value)}
              />
            </View>
            <View className={styles.formItem}>
              <Text className={styles.formLabel}>单价</Text>
              <Input
                className={styles.formInput}
                placeholder="请输入单价（元/㎡）"
                placeholderClass={styles.formInputPlaceholder}
                value={propertyInfo.pricePerSqm}
                onInput={(e) => handleInputChange('pricePerSqm', e.detail.value)}
              />
            </View>
          </View>

          <View className={styles.formSection}>
            <Text className={styles.sectionTitle}>详细信息</Text>
            <View className={styles.formItem}>
              <Text className={styles.formLabel}>楼层</Text>
              <Input
                className={styles.formInput}
                placeholder="如：中楼层/共18层"
                placeholderClass={styles.formInputPlaceholder}
                value={propertyInfo.floor}
                onInput={(e) => handleInputChange('floor', e.detail.value)}
              />
            </View>
            <View className={styles.formItem}>
              <Text className={styles.formLabel}>朝向</Text>
              <Input
                className={styles.formInput}
                placeholder="如：南北通透"
                placeholderClass={styles.formInputPlaceholder}
                value={propertyInfo.orientation}
                onInput={(e) => handleInputChange('orientation', e.detail.value)}
              />
            </View>
            <View className={styles.formItem}>
              <Text className={styles.formLabel}>装修</Text>
              <Input
                className={styles.formInput}
                placeholder="如：精装修"
                placeholderClass={styles.formInputPlaceholder}
                value={propertyInfo.decoration}
                onInput={(e) => handleInputChange('decoration', e.detail.value)}
              />
            </View>
            <View className={styles.formItem}>
              <Text className={styles.formLabel}>建成年代</Text>
              <Input
                className={styles.formInput}
                placeholder="如：2020年"
                placeholderClass={styles.formInputPlaceholder}
                value={propertyInfo.buildYear}
                onInput={(e) => handleInputChange('buildYear', e.detail.value)}
              />
            </View>
            <View className={styles.formItem}>
              <Text className={styles.formLabel}>地址</Text>
              <Input
                className={styles.formInput}
                placeholder="请输入详细地址"
                placeholderClass={styles.formInputPlaceholder}
                value={propertyInfo.address}
                onInput={(e) => handleInputChange('address', e.detail.value)}
              />
            </View>
          </View>

          <View className={styles.formSection}>
            <Text className={styles.sectionTitle}>
              房源图片
              <Text className={styles.autoBtn}>已选{images.length}/9</Text>
            </Text>
            <View className={styles.uploadGrid}>
              {images.map((img, idx) => (
                <View key={idx} className={styles.uploadItem}>
                  <Image
                    className={styles.uploadImage}
                    src={img}
                    mode="aspectFill"
                    onError={(e) => console.error('[Import] 图片加载失败:', e)}
                  />
                  <View className={styles.uploadDelete} onClick={() => handleRemoveImage(idx)}>
                    ×
                  </View>
                </View>
              ))}
              {images.length < 9 && (
                <View className={styles.uploadAdd} onClick={handleAddImage}>
                  <Text className={styles.uploadAddIcon}>+</Text>
                  <Text className={styles.uploadAddText}>添加图片</Text>
                </View>
              )}
            </View>
          </View>

          <View className={styles.formSection}>
            <View className={styles.featureSection}>
              <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '$spacing-md' }}>
                <Text className={styles.sectionTitle}>房源卖点</Text>
                <Text className={styles.autoBtn} onClick={handleAutoGenerate}>一键生成</Text>
              </View>
              <View className={styles.featuresWrap}>
                {(propertyInfo.features || []).map((feature, idx) => (
                  <TagItem
                    key={idx}
                    text={feature}
                    type="primary"
                    size="medium"
                    onClick={() => handleRemoveFeature(idx)}
                  />
                ))}
                <Input
                  className={styles.featureInput}
                  placeholder="输入卖点..."
                  value={newFeature}
                  onInput={(e) => setNewFeature(e.detail.value)}
                  onConfirm={handleAddFeature}
                />
                <View className={styles.featureAdd} onClick={handleAddFeature}>
                  + 添加
                </View>
              </View>
            </View>
          </View>

          <View className={styles.formSection}>
            <Text className={styles.sectionTitle}>房源描述</Text>
            <Textarea
              className={styles.formInput}
              placeholder="请输入房源描述信息..."
              placeholderStyle="color: #86909C"
              value={propertyInfo.description}
              onInput={(e) => handleInputChange('description', e.detail.value)}
              style={{ width: '100%', minHeight: 160, textAlign: 'left', padding: 16, background: '#F7F8FA', borderRadius: 12 }}
            />
          </View>
        </View>
      </ScrollView>

      <View className={styles.bottomBar}>
        <Button className={styles.cancelBtn} onClick={handleCancel}>取消</Button>
        <Button className={styles.submitBtn} onClick={handleSubmit}>开始设计</Button>
      </View>
    </View>
  );
};

export default ImportPage;
