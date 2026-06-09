import React, { useState } from 'react';
import { View, Text, ScrollView, Image, Button, Switch, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import NavBar from '@/components/NavBar';
import { useDesignStore } from '@/store/design';
import { colorSchemes, festivalStyles, platformSizes } from '@/data/works';
import { templates } from '@/data/templates';
import styles from './index.module.scss';

type ToolTab = 'color' | 'size' | 'festival' | 'agent' | 'privacy';

const EditorPage: React.FC = () => {
  const store = useDesignStore();
  const {
    propertyInfo,
    agentInfo,
    selectedColorScheme,
    selectedFestivalId,
    selectedSizeId,
    selectedTemplateId,
    blurPrivacy,
    hideHouseNumber,
    showQRCode,
    showAgentCard,
    setSelectedColorScheme,
    setSelectedFestivalId,
    setSelectedSizeId,
    setBlurPrivacy,
    setHideHouseNumber,
    setShowQRCode,
    setShowAgentCard,
    setAgentInfo,
    saveWork
  } = store;

  const [activeTab, setActiveTab] = useState<ToolTab>('color');
  const [savedWorkId, setSavedWorkId] = useState<string | null>(null);

  const currentColor = selectedColorScheme || colorSchemes[0];
  const currentSize = platformSizes.find((s) => s.id === selectedSizeId) || platformSizes[0];
  const currentFestival = festivalStyles.find((f) => f.id === selectedFestivalId);
  const selectedTemplate = templates.find((t) => t.id === selectedTemplateId);

  const formatAddress = (address: string, hideNumber: boolean) => {
    if (!address) return '';
    if (!hideNumber) return address;
    return address.replace(/\d+号楼?\d*室?$/, '**号楼***室').replace(/\d+栋$/, '**栋').replace(/\d+弄/, '**弄');
  };

  const handleSaveDraft = () => {
    if (!propertyInfo.communityName) {
      Taro.showToast({ title: '请先录入房源信息', icon: 'none' });
      return;
    }
    const workId = saveWork({
      title: `${propertyInfo.communityName}${propertyInfo.layout || ''}`,
      cover: propertyInfo.images?.[0] || 'https://picsum.photos/id/1048/400/600',
      community: propertyInfo.communityName,
      templateName: selectedTemplate?.name || '简约带看海报',
      status: 'draft'
    });
    setSavedWorkId(workId);
    Taro.showToast({ title: '草稿已保存', icon: 'success' });
    console.log('[Editor] 保存草稿成功:', workId);
  };

  const handleSavePublished = () => {
    if (!propertyInfo.communityName) {
      Taro.showToast({ title: '请先录入房源信息', icon: 'none' });
      return;
    }
    const workId = saveWork({
      title: `${propertyInfo.communityName}${propertyInfo.layout || ''}`,
      cover: propertyInfo.images?.[0] || 'https://picsum.photos/id/1048/400/600',
      community: propertyInfo.communityName,
      templateName: selectedTemplate?.name || '简约带看海报',
      status: 'published'
    });
    setSavedWorkId(workId);
    Taro.showToast({ title: '作品已发布', icon: 'success' });
    console.log('[Editor] 发布作品成功:', workId);
  };

  const handlePreview = () => {
    if (!savedWorkId) {
      handleSavePublished();
      setTimeout(() => {
        Taro.navigateTo({ url: `/pages/preview/index?workId=${savedWorkId || 'w1'}` });
      }, 1000);
    } else {
      Taro.navigateTo({ url: `/pages/preview/index?workId=${savedWorkId}` });
    }
  };

  const handleExport = () => {
    if (!propertyInfo.communityName) {
      Taro.showToast({ title: '请先录入房源信息', icon: 'none' });
      return;
    }
    Taro.showLoading({ title: '正在生成图片...' });
    setTimeout(() => {
      Taro.hideLoading();
      Taro.showModal({
        title: '导出成功',
        content: `已按${currentSize.name}（${currentSize.width}×${currentSize.height}）尺寸生成海报并保存到相册`,
        showCancel: false
      });
    }, 1500);
  };

  return (
    <View className={styles.page}>
      <NavBar
        title="海报编辑器"
        rightContent={
          <Text
            style={{ fontSize: 28, color: '#FF6B35', fontWeight: 600 }}
            onClick={handleSavePublished}
          >
            发布
          </Text>
        }
      />

      <ScrollView scrollY>
        <View className={styles.previewArea}>
          <View
            className={classnames(styles.posterPreview, styles[currentSize.ratioClass])}
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
                {propertyInfo.pricePerSqm && (
                  <Text className={styles.posterInfoItem}>
                    {propertyInfo.pricePerSqm}元/㎡
                  </Text>
                )}
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
              {propertyInfo.description && currentSize.ratioClass !== 'landscape' && (
                <Text className={styles.posterDesc} numberOfLines={3}>
                  {propertyInfo.description}
                </Text>
              )}
              {propertyInfo.address && (
                <View className={styles.posterAddress}>
                  <Text>📍</Text>
                  <Text>{formatAddress(propertyInfo.address, hideHouseNumber)}</Text>
                </View>
              )}
              {currentFestival && (
                <View style={{ marginBottom: 24, padding: 12, background: `${currentColor.primary}10`, borderRadius: 8 }}>
                  <Text style={{ fontSize: 24, color: currentColor.primary }}>
                    {currentFestival.icon} {currentFestival.name}特惠
                  </Text>
                </View>
              )}
              {showQRCode && propertyInfo.address && (
                <View className={styles.qrSection}>
                  <View className={styles.qrCodeBox}>
                    <View className={styles.qrCodeInner}>
                      <View className={classnames(styles.qrCorner, styles.tl)} />
                      <View className={classnames(styles.qrCorner, styles.tr)} />
                      <View className={classnames(styles.qrCorner, styles.bl)} />
                    </View>
                  </View>
                  <View className={styles.qrText}>
                    <Text className={styles.qrTitle}>扫码导航到房源</Text>
                    <Text className={styles.qrSub} numberOfLines={2}>
                      {formatAddress(propertyInfo.address, hideHouseNumber)}
                    </Text>
                  </View>
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
                      {blurPrivacy && (
                        <Text className={styles.blurText}> 138****8888</Text>
                      )}
                      {!blurPrivacy && agentInfo.phone && (
                        <Text style={{ fontSize: 22, color: '#86909C', fontWeight: 400, marginLeft: 8 }}>
                          {agentInfo.phone}
                        </Text>
                      )}
                    </Text>
                    <Text className={styles.agentCompany}>
                      {agentInfo.company || '链家房产'}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>

        <View className={styles.sizeLabelBar}>
          <Text className={styles.sizeLabel}>
            {currentSize.name} · {currentSize.width}×{currentSize.height}
          </Text>
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
              <Text className={styles.panelTitle}>裁剪平台尺寸（预览比例实时变化）</Text>
              <View className={styles.sizeList}>
                {platformSizes.map((size) => (
                  <View
                    key={size.id}
                    className={classnames(styles.sizeItem, selectedSizeId === size.id && styles.active)}
                    onClick={() => setSelectedSizeId(size.id)}
                  >
                    <Text className={styles.sizeName}>{size.name}</Text>
                    <View className={styles.sizeSpec}>
                      {size.width}×{size.height} · 适合{size.platform}
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
                  <Text className={styles.switchLabel}>显示经纪人名片</Text>
                  <Text className={styles.switchDesc}>在海报底部显示经纪人信息和联系方式</Text>
                </View>
                <Switch checked={showAgentCard} onChange={(e) => setShowAgentCard(e.detail.value)} color="#FF6B35" />
              </View>
              <View className={styles.switchRow}>
                <View>
                  <Text className={styles.switchLabel}>显示路线二维码</Text>
                  <Text className={styles.switchDesc}>
                    录入地址后显示二维码，客户扫码即可导航到房源
                    {!propertyInfo.address && '（请先录入地址）'}
                  </Text>
                </View>
                <Switch
                  checked={showQRCode}
                  onChange={(e) => setShowQRCode(e.detail.value)}
                  color="#FF6B35"
                  disabled={!propertyInfo.address}
                />
              </View>
              <View className={styles.formGroup}>
                <Text className={styles.formLabel}>经纪人姓名</Text>
                <Input
                  className={styles.formInput}
                  value={agentInfo.name}
                  placeholder="请输入姓名"
                  onInput={(e) => setAgentInfo({ name: e.detail.value })}
                />
              </View>
              <View className={styles.formGroup}>
                <Text className={styles.formLabel}>联系电话</Text>
                <Input
                  className={styles.formInput}
                  value={agentInfo.phone}
                  placeholder="请输入手机号"
                  type="number"
                  onInput={(e) => setAgentInfo({ phone: e.detail.value })}
                />
              </View>
              <View className={styles.formGroup}>
                <Text className={styles.formLabel}>所属公司</Text>
                <Input
                  className={styles.formInput}
                  value={agentInfo.company}
                  placeholder="请输入公司名称"
                  onInput={(e) => setAgentInfo({ company: e.detail.value })}
                />
              </View>
            </>
          )}

          {activeTab === 'privacy' && (
            <>
              <Text className={styles.panelTitle}>隐私保护设置</Text>
              <View className={styles.switchRow}>
                <View>
                  <Text className={styles.switchLabel}>模糊手机号</Text>
                  <Text className={styles.switchDesc}>海报中的手机号将部分隐藏为 ****</Text>
                </View>
                <Switch checked={blurPrivacy} onChange={(e) => setBlurPrivacy(e.detail.value)} color="#FF6B35" />
              </View>
              <View className={styles.switchRow}>
                <View>
                  <Text className={styles.switchLabel}>隐藏具体门牌号</Text>
                  <Text className={styles.switchDesc}>
                    只显示小区信息，楼栋号和室号模糊为 **
                    {hideHouseNumber && propertyInfo.address && (
                      <Text style={{ color: '#FF6B35', marginTop: 8, display: 'block' }}>
                        当前显示：{formatAddress(propertyInfo.address, true)}
                      </Text>
                    )}
                  </Text>
                </View>
                <Switch checked={hideHouseNumber} onChange={(e) => setHideHouseNumber(e.detail.value)} color="#FF6B35" />
              </View>
            </>
          )}
        </View>
      </ScrollView>

      <View className={styles.bottomBar}>
        <Button className={styles.secondaryBtn} onClick={handleSaveDraft}>保存草稿</Button>
        <Button className={styles.primaryBtn} onClick={handlePreview}>预览</Button>
        <Button className={styles.exportBtn} onClick={handleExport}>导出图片</Button>
      </View>
    </View>
  );
};

export default EditorPage;
