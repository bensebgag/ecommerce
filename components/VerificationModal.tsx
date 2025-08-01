import { useState } from "react";
import { View, Text, Modal, Image } from "react-native";

import { router } from "expo-router";
import Button from "@/components/Button";

export default function VerificationModal() {
    const [modalVisible, setModalVisible] = useState(true);
    function onPress() {
        router.replace("/(tabs)/");
    }
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View className={"flex-1 p-4 bg-[#3333334D] justify-center items-center"}>
                <View
                    className={
                        "bg-white py-12 px-4 w-full rounded-xl flex flex-col items-center gap-3 "
                    }
                >
                    <Image
                        className={" rounded-full"}
                        source={require("../assets/images/VerifiIcon.png")}
                    />
                    <Text className={"text-2xl text-[#333333] font-medium text-center "}>
                        {" "}
                        Verified!
                    </Text>
                    <Text className={"text-lg text-[#858585] text-center"}>
                        You have successfully verified your account.
                    </Text>
                    < Button onPress={onPress} title={"Browse Home"} />
                </View>
            </View>
        </Modal>
    );
}