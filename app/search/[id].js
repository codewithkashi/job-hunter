import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { useState } from "react";
import { COLORS, icons, images, SIZES } from "../../constants";
import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
} from "../../components";
const Home = () => {
  const router = useRouter();
  const params = useSearchParams();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS.lightWhite,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              handlePress={() => router.back()}
              dimension={"60%"}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
          ),
          headerTitle: "",
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.medium }}>
          <Nearbyjobs title={`Results for ${params.id}`} search={params.id} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
