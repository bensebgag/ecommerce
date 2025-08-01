import { Tabs } from "expo-router";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";
import {COLORS} from "@/Util/Colors";

export default function RootLayout() {

        return (
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        backgroundColor: "#ffffff",
                        borderRadius: 100,
                        marginHorizontal: 10,
                        marginBottom: 10,
                        height: 60,
                    },
                    tabBarItemStyle: {
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-around",
                    },
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View
                                style={[
                                    styles.iconContainer,
                                    {
                                        backgroundColor: focused ? COLORS.Primary : "",
                                    },
                                ]}
                            >
                                <MaterialCommunityIcons
                                    name={focused ? "home" : "home-outline"}
                                    size={27}
                                    color={focused ? "white":"#111827"}
                                />
                            </View>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="search"
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View
                                style={[
                                    styles.iconContainer,
                                    {
                                        backgroundColor: focused ? COLORS.Primary : "",
                                    },
                                ]}
                            >
                                <Ionicons name="search-outline" size={27}   color={focused ? "white":"#111827"} />
                            </View>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="shope"
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View
                                style={[
                                    styles.iconContainer,
                                    {
                                        backgroundColor: focused ? COLORS.Primary : "",
                                    },
                                ]}
                            >
                                <MaterialCommunityIcons name="shopping-outline" size={27}  color={focused ? "white":"#111827"} />
                            </View>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View
                                style={[
                                    styles.iconContainer,
                                    {
                                        backgroundColor: focused ? COLORS.Primary : "",
                                    },
                                ]}
                            >
                                <MaterialCommunityIcons name="account-circle-outline" size={27}   color={focused ? "white":"#111827"} />
                            </View>
                        ),
                    }}
                />
            </Tabs>
        );
    }


const styles = StyleSheet.create({
    iconContainer: {
        borderRadius: 25,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 40,
        height: 40,
    },
});