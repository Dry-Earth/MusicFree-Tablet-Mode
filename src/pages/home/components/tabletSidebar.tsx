import Divider from "@/components/base/divider";
import { IIconName } from "@/components/base/icon.tsx";
import ListItem from "@/components/base/listItem";
import PageBackground from "@/components/base/pageBackground";
import ThemeText from "@/components/base/themeText";
import { useI18N } from "@/core/i18n";
import { ROUTE_PATH, useNavigate } from "@/core/router";
import TrackPlayer from "@/core/trackPlayer";
import { checkUpdateAndShowResult } from "@/hooks/useCheckUpdate.ts";
import NativeUtils from "@/native/utils";
import rpx from "@/utils/rpx";
import { useScheduleCloseCountDown } from "@/utils/scheduleClose";
import timeformat from "@/utils/timeformat";
import React, { memo, useCallback } from "react";
import { BackHandler, Platform, ScrollView, StyleSheet, View } from "react-native";
import { default as DeviceInfo, default as deviceInfoModule } from "react-native-device-info";

interface ISettingOptions {
    icon: IIconName;
    title: string;
    onPress?: () => void;
}

function TabletSidebar() {
    const navigate = useNavigate();
    const { t, getLanguage } = useI18N();

    function navigateToSetting(settingType: string) {
        navigate(ROUTE_PATH.SETTING, { type: settingType });
    }

    const basicSetting: ISettingOptions[] = [
        { icon: "cog-8-tooth" as IIconName, title: t("sidebar.basicSettings"), onPress: () => navigateToSetting("basic") },
        { icon: "javascript" as IIconName, title: t("sidebar.pluginManagement"), onPress: () => navigateToSetting("plugin") },
        { icon: "t-shirt-outline" as IIconName, title: t("sidebar.themeSettings"), onPress: () => navigateToSetting("theme") },
    ];

    const otherSetting: ISettingOptions[] = [
        { icon: "circle-stack" as IIconName, title: t("sidebar.backupAndResume"), onPress: () => navigateToSetting("backup") },
    ];

    if (Platform.OS === "android") {
        otherSetting.push({
            icon: "shield-keyhole-outline" as IIconName,
            title: t("sidebar.permissionManagement"),
            onPress: () => navigate(ROUTE_PATH.PERMISSIONS),
        });
    }

    const handleExitApp = useCallback(async () => {
        await TrackPlayer.reset();
        NativeUtils.exitApp();
    }, []);

    return (
        <View style={style.sidebarWrapper}>
            <PageBackground />
            <ScrollView
                style={style.scrollWrapper}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: rpx(24) }}>
                <View style={style.header}>
                    <ThemeText fontSize="appbar" fontWeight="bold">
                        {DeviceInfo.getApplicationName()}
                    </ThemeText>
                </View>
                <View style={style.card}>
                    <ListItem withHorizontalPadding heightType="smallest">
                        <ListItem.ListItemText fontSize="subTitle" fontWeight="bold">
                            {t("common.setting")}
                        </ListItem.ListItemText>
                    </ListItem>
                    {basicSetting.map((item, index) => (
                        <ListItem
                            withHorizontalPadding
                            key={"tablet-basic-" + index}
                            onPress={item.onPress}>
                            <ListItem.ListItemIcon icon={item.icon} width={rpx(48)} />
                            <ListItem.Content title={item.title} />
                        </ListItem>
                    ))}
                </View>
                <View style={style.card}>
                    <ListItem withHorizontalPadding heightType="smallest">
                        <ListItem.ListItemText fontSize="subTitle" fontWeight="bold">
                            {t("common.other")}
                        </ListItem.ListItemText>
                    </ListItem>
                    <CountDownItem />
                    {otherSetting.map((item, index) => (
                        <ListItem
                            withHorizontalPadding
                            key={"tablet-other-" + index}
                            onPress={item.onPress}>
                            <ListItem.ListItemIcon icon={item.icon} width={rpx(48)} />
                            <ListItem.Content title={item.title} />
                        </ListItem>
                    ))}
                    <ListItem
                        withHorizontalPadding
                        key="tablet-language"
                        onPress={() => {
                            // 语言设置打开对话框需要 Panel，这里简化跳转设置页
                            navigateToSetting("basic");
                        }}>
                        <ListItem.ListItemIcon icon="language" width={rpx(48)} />
                        <ListItem.Content title={t("sidebar.languageSettings")} />
                        <ListItem.ListItemText
                            position="right"
                            fontSize="subTitle">
                            {getLanguage().name}
                        </ListItem.ListItemText>
                    </ListItem>
                </View>
                <View style={style.card}>
                    <ListItem withHorizontalPadding heightType="smallest">
                        <ListItem.ListItemText fontSize="subTitle" fontWeight="bold">
                            {t("common.software")}
                        </ListItem.ListItemText>
                    </ListItem>
                    <ListItem
                        withHorizontalPadding
                        key="tablet-update"
                        onPress={() => checkUpdateAndShowResult(true)}>
                        <ListItem.ListItemIcon icon="arrow-path" width={rpx(48)} />
                        <ListItem.Content title={t("sidebar.checkUpdate")} />
                        <ListItem.ListItemText position="right" fontSize="subTitle">
                            {`${t("sidebar.currentVersion")}${deviceInfoModule.getVersion()}`}
                        </ListItem.ListItemText>
                    </ListItem>
                    <ListItem
                        withHorizontalPadding
                        key="tablet-about"
                        onPress={() => navigateToSetting("about")}>
                        <ListItem.ListItemIcon icon="information-circle" width={rpx(48)} />
                        <ListItem.Content
                            title={`${t("common.about")} ${deviceInfoModule.getApplicationName()}`}
                        />
                    </ListItem>
                </View>
                <Divider />
                <ListItem
                    withHorizontalPadding
                    onPress={() => BackHandler.exitApp()}>
                    <ListItem.ListItemIcon icon="home-outline" width={rpx(48)} />
                    <ListItem.Content title={t("sidebar.backToDesktop")} />
                </ListItem>
                <ListItem
                    withHorizontalPadding
                    onPress={handleExitApp}>
                    <ListItem.ListItemIcon icon="power-outline" width={rpx(48)} />
                    <ListItem.Content title={t("sidebar.exitApp")} />
                </ListItem>
            </ScrollView>
        </View>
    );
}

function CountDownItem() {
    const countDown = useScheduleCloseCountDown();
    const { t } = useI18N();

    return (
        <ListItem
            withHorizontalPadding
            onPress={() => {
                // 平板侧边栏简化，不打开 panel
            }}>
            <ListItem.ListItemIcon icon="alarm-outline" width={rpx(48)} />
            <ListItem.Content title={t("sidebar.scheduleClose")} />
            <ListItem.ListItemText position="right" fontSize="subTitle">
                {countDown ? timeformat(countDown) : ""}
            </ListItem.ListItemText>
        </ListItem>
    );
}

const style = StyleSheet.create({
    sidebarWrapper: {
        width: rpx(360),
        backgroundColor: "#f5f5f5",
    },
    scrollWrapper: {
        flexGrow: 1,
    },
    header: {
        height: rpx(100),
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingLeft: rpx(24),
    },
    card: {
        marginBottom: rpx(24),
    },
});

export default memo(TabletSidebar);
