import React, { useState } from 'react';
import { View, Text, ScrollView, Image, Button, Switch } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import NavBar from '@/components/NavBar';
import { useDesignStore } from '@/store/design';
import { colorSchemes, festivalStyles, platformSizes } from '@/data/works';
import styles from './index.module.scss';

type ToolTab = 'color' | 'size' | 'festival' | 'agent' | 'privacy';

const EditorPage: React.FC = () => {
  const {
    propertyInfo,
    agentInfo,
    selectedColorScheme,
    selectedFestivalId,
    selectedSizeId,
    blurPrivacy,
    setSelectedColorScheme,
    setSelectedFestivalId,
    setSelectedSizeId,
    setBlurPrivacy,
    setAgentInfo
  } = useDesignStore();

  const [activeTab, setActiveTab] = useState<ToolTab>('color');
  const [showAgentCard, setShowAgentCard] = useState(true);
  const [showQRCode, setShowQRCode] = useState(true);

  const handleSave = () => {
    console.log('[Editor] 保存作品');
    Taro.showToast({ title: '保存成功', icon: 'success' });
  };

  const handlePreview = () => {
    console.log('[Editor] 预览作品');
    Taro.navigateTo({ url: '/pages/preview/index' });
  };

  const handleExport = () => {
    console.log('[Editor] 导出作品');
    Taro.showModal({
      title: '导出成功',
      content: '海报已保存到相册',
      showCancel: false
    });
  };

  const currentColor = selectedColorScheme || colorSchemes[0];
  const currentSize = platformSizes.find((s) => s.id === selectedSizeId) || platformSizes[0];
  const currentFestival = festivalStyles.find((f) => f.id === selectedFestivalId);

  return (
    <View className={styles.page}>
      <NavBar
        title="海报编辑器"
        rightContent={
          <Text
            style={{ fontSize: 28, color: '#FF6B35', fontWeight: 600 }}
            onClick={handleSave}
          >
            保存
          </Text>
        }
      />

      <ScrollView scrollY>
        <View className={styles.previewArea}>
          <View
            className={styles.posterPreview}
            style={{ borderTop: `8rpx solid ${currentColor.primary}` }}
          >
            <Image
              className={styles.posterImage}
              src={propertyInfo.images?.[0] || 'https://picsum.photos/id/1048/600/500'}
              mode="aspectFill"
              onError={(e) => console.error('[Editor] 海报图加载失败:', e)}
            />
            <View className={styles.posterContent}>
              <Text className={styles.posterCommunity}>
                {propertyInfo.communityName || '万科翡翠滨江'}
              </Text>
              <View className={styles.posterPrice}>
                {propertyInfo.price || '688'}
                <Text className={styles.unit}>万</Text>
              </View>
              <View className={styles.posterInfo}>
                <Text className={styles.posterInfoItem}>
                  {propertyInfo.layout || '三室两厅'}
                </Text>
                <Text className={styles.posterInfoItem}>
                  {propertyInfo.area || '128'}㎡
                </Text>
                <Text className={styles.posterInfoItem}>
                  {propertyInfo.orientation || '南北通透'}
                </Text>
                <Text className={styles.posterInfoItem}>
                  {propertyInfo.floor || '中楼层'}
                </Text>
              </View>
              <View className={styles.posterFeatures}>
                {(propertyInfo.features || ['品质房源', '性价比高', '业主急售']).map((f, i) => (
                  <Text
                    key={i}
                    className={styles.posterFeature}
                    style={{ background: `${currentColor.primary}15`, color: currentColor.primary }}
                  >
                    {f}
                  </Text>
                ))}
              </View>
              {currentFestival && (
                <View style={{ marginBottom: 24, padding: 12, background: `${currentColor.primary}10`, borderRadius: 8 }}>
                  <Text style={{ fontSize: 24, color: currentColor.primary }}>
                    {currentFestival.icon} {currentFestival.name}特惠
                  </Text>
                </View>
              )}
              {showAgentCard && (
                <View className={styles.posterAgent}>
                  <Image
                    className={styles.agentAvatar}
                    src={agentInfo.avatar || 'https://picsum.photos/id/64/100/100'}
                    mode="aspectFill"
                    onError={(e) => console.error('[Editor] 头像加载失败:', e)}
                  />
                  <View className={styles.agentInfo}>
                    <Text className={styles.agentName}>
                      {agentInfo.name || '小王'}
                      {blurPrivacy && <Text style={{ filter: 'blur(4rpx)' }}> ****</Text>}
                    </Text>
                    <Text className={styles.agentCompany}>
                      {agentInfo.company || '链家房产'}
                    </Text>
                  </View>
                  {showQRCode && (
                    <View className={styles.qrCode}>
                      <Text>📱</Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          </View>
        </View>

        <View className={styles.toolsTab}>
          {[
            { key: 'color', label: '配色' },
            { key: 'size', label: '尺寸' },
            { key: 'festival', label: '节日' },
            { key: 'agent', label: '名片' },
            { key: 'privacy', label: '隐私' }
          ].map((tab) => (
            <Text
              key={tab.key}
              className={classnames(styles.toolTabItem, activeTab === tab.key && styles.active)}
              onClick={() => setActiveTab(tab.key as ToolTab)}
            >
              {tab.label}
            </Text>
          ))}
        </View>

        <View className={styles.toolPanel}>
          {activeTab === 'color' && (
            <>
              <Text className={styles.panelTitle}>选择配色方案</Text>
              <View className={styles.colorList}>
                {colorSchemes.map((scheme) => (
                  <View
                    key={scheme.id}
                    className={styles.colorItem}
                    onClick={() => setSelectedColorScheme(scheme)}
                  >
                    <View
                      className={classnames(
                        styles.colorPreview,
                        selectedColorScheme?.id === scheme.id && styles.active
                      )}
                      style={{ background: scheme.primary }}
                    />
                    <Text className={styles.colorName}>{scheme.name}</Text>
                  </View>
                ))}
              </View>
            </>
          )}

          {activeTab === 'size' && (
            <>
              <Text className={styles.panelTitle}>裁剪平台尺寸</Text>
              <View className={styles.sizeList}>
                {platformSizes.map((size) => (
                  <View
                    key={size.id}
                    className={classnames(styles.sizeItem, selectedSizeId === size.id && styles.active)}
                    onClick={() => setSelectedSizeId(size.id)}
                  >
                    <Text className={styles.sizeName}>{size.name}</Text>
                    <View className={styles.sizeSpec}>
                      {size.width}×{size.height}
                    </View>
                  </View>
                ))}
              </View>
            </>
          )}

          {activeTab === 'festival' && (
            <>
              <Text className={styles.panelTitle}>套用节日风格</Text>
              <View className={styles.festivalList}>
                <View
                  className={classnames(styles.festivalItem, !selectedFestivalId && styles.active)}
                  onClick={() => setSelectedFestivalId(null)}
                >
                  <Text className={styles.festivalIcon}>🚫</Text>
                  <Text className={styles.festivalName}>不使用</Text>
                </View>
                {festivalStyles.map((festival) => (
                  <View
                    key={festival.id}
                    className={classnames(
                      styles.festivalItem,
                      selectedFestivalId === festival.id && styles.active
                    )}
                    onClick={() => setSelectedFestivalId(festival.id)}
                  >
                    <Text className={styles.festivalIcon}>{festival.icon}</Text>
                    <Text className={styles.festivalName}>{festival.name}</Text>
                  </View>
                ))}
              </View>
            </>
          )}

          {activeTab === 'agent' && (
            <>
              <Text className={styles.panelTitle}>经纪人名片设置</Text>
              <View className={styles.switchRow}>
                <View>
                  <Text className={styles.switchLabel}>显示名片</Text>
                  <Text className={styles.switchDesc}>在海报底部显示经纪人信息</Text>
                </View>
                <Switch checked={showAgentCard} onChange={(e) => setShowAgentCard(e.detail.value)} />
              </View>
              <View className={styles.switchRow}>
                <View>
                  <Text className={styles.switchLabel}>显示路线二维码</Text>
                  <Text className={styles.switchDesc}>客户扫码即可导航到房源</Text>
                </View>
                <Switch checked={showQRCode} onChange={(e) => setShowQRCode(e.detail.value)} />
              </View>
            </>
          )}

          {activeTab === 'privacy' && (
            <>
              <Text className={styles.panelTitle}>隐私保护设置</Text>
              <View className={styles.switchRow}>
                <View>
                  <Text className={styles.switchLabel}>模糊手机号</Text>
                  <Text className={styles.switchDesc}>海报中的手机号将部分隐藏</Text>
                </View>
                <Switch checked={blurPrivacy} onChange={(e) => setBlurPrivacy(e.detail.value)} />
              </View>
              <View className={styles.switchRow}>
                <View>
                  <Text className={styles.switchLabel}>隐藏具体门牌号</Text>
                  <Text className={styles.switchDesc}>只显示小区和楼栋信息</Text>
                </View>
                <Switch checked={false} />
              </View>
            </>
          )}
        </View>
      </ScrollView>

      <View className={styles.bottomBar}>
        <Button className={styles.secondaryBtn} onClick={handleSave}>保存草稿</Button>
        <Button className={styles.primaryBtn} onClick={handlePreview}>预览</Button>
        <Button className={styles.exportBtn} onClick={handleExport}>导出图片</Button>
      </View>
    </View>
  );
};

export default EditorPage;
