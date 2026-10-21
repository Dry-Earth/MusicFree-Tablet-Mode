import { useI18N } from "@/core/i18n";
import { ROUTE_PATH, useNavigate } from "@/core/router";
import rpx from "@/utils/rpx";
import React from "react";
import { StyleSheet, View } from "react-native";
import ActionButton from "../ActionButton";
import useIsTablet from "@/hooks/useTablet";

export default function Operations() {
    const navigate = useNavigate();
    const { t } = useI18N();
    const isTablet = useIsTablet();

    const actionButtons = [
        {
            iconName: "fire",
            title: t("home.recommendSheet"),
            action() {
                navigate(ROUTE_PATH.RECOMMEND_SHEETS);
            },
        },
        {
            iconName: "trophy",
            title: t("home.topList"),
            action() {
                navigate(ROUTE_PATH.TOP_LIST);
            },
        },
        {
            iconName: "clock-outline",
            title: t("home.playHistory"),
            action() {
                navigate(ROUTE_PATH.HISTORY);
            },
        },
        {
            iconName: "folder-music-outline",
            title: t("home.localMusic"),
            action() {
                navigate(ROUTE_PATH.LOCAL);
            },
        },
    ] as const;

    const perRow = isTablet ? 6 : 4;
    const itemWidth = isTablet ? rpx(160) : rpx(157.5);
    const itemHeight = isTablet ? rpx(180) : rpx(160);
    const containerWidth = isTablet ? undefined : rpx(750);

    return (
        <View
            style={[
                styles.container,
                { width: containerWidth, flexWrap: isTablet ? "wrap" : "nowrap" },
            ]}>
            {actionButtons.map((action, index) => (
                <ActionButton
                    style={[
                        styles.actionButtonStyle,
                        { width: itemWidth, height: itemHeight },
                        index % perRow !== 0 ? styles.actionMarginLeft : null,
                    ]}
                    key={action.title}
                    {...action}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: rpx(24),
        marginVertical: rpx(32),
        flexDirection: "row",
    },
    actionButtonStyle: {
        borderRadius: rpx(18),
        marginBottom: rpx(24),
    },
    actionMarginLeft: {
        marginLeft: rpx(24),
    },
});
