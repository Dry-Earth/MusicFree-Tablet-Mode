import React from "react";
import { StyleSheet, View } from "react-native";

import NavBar from "./components/navBar";
import MusicBar from "@/components/musicBar";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeDrawer from "./components/drawer";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBar from "@/components/base/statusBar";
import HorizontalSafeAreaView from "@/components/base/horizontalSafeAreaView.tsx";
import globalStyle from "@/constants/globalStyle";
import Theme from "@/core/theme";
import HomeBody from "./components/homeBody";
import HomeBodyHorizontal from "./components/homeBodyHorizontal";
import useOrientation from "@/hooks/useOrientation";
import useIsTablet from "@/hooks/useTablet";
import TabletSidebar from "./components/tabletSidebar";

function Home() {
    const orientation = useOrientation();
    const isTablet = useIsTablet();

    return (
        <SafeAreaView edges={["top", "bottom"]} style={styles.appWrapper}>
            <HomeStatusBar />
            <HorizontalSafeAreaView style={globalStyle.flex1}>
                {isTablet ? (
                    <TabletLayout orientation={orientation}>
                        <NavBar />
                        {orientation === "vertical" ? (
                            <HomeBody />
                        ) : (
                            <HomeBodyHorizontal />
                        )}
                    </TabletLayout>
                ) : (
                    <>
                        <NavBar />
                        {orientation === "vertical" ? (
                            <HomeBody />
                        ) : (
                            <HomeBodyHorizontal />
                        )}
                    </>
                )}
            </HorizontalSafeAreaView>
            <MusicBar />
        </SafeAreaView>
    );
}

function TabletLayout({
    children,
    orientation,
}: {
    children: React.ReactNode;
    orientation: "vertical" | "horizontal";
}) {
    return (
        <View style={styles.tabletWrapper}>
            <View style={styles.tabletSidebar}>
                <TabletSidebar />
            </View>
            <View
                style={[
                    styles.tabletContent,
                    orientation === "horizontal" && styles.tabletContentLandscape,
                ]}>
                {children}
            </View>
        </View>
    );
}

function HomeStatusBar() {
    const theme = Theme.useTheme();

    return (
        <StatusBar
            backgroundColor="transparent"
            barStyle={theme.dark ? undefined : "dark-content"}
        />
    );
}

const LeftDrawer = createDrawerNavigator();
export default function App() {
    return (
        <LeftDrawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerStyle: {
                    width: "80%",
                },
            }}
            initialRouteName="HOME-MAIN"
            drawerContent={props => <HomeDrawer {...props} />}>
            <LeftDrawer.Screen name="HOME-MAIN" component={Home} />
        </LeftDrawer.Navigator>
    );
}

const styles = StyleSheet.create({
    appWrapper: {
        flexDirection: "column",
        flex: 1,
    },
    tabletWrapper: {
        flex: 1,
        flexDirection: "row",
    },
    tabletSidebar: {
        width: 360,
        backgroundColor: "#f5f5f5",
    },
    tabletContent: {
        flex: 1,
    },
    tabletContentLandscape: {},
});
