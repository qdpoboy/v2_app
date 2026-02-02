import { Stack, useRouter } from 'expo-router';
import { View, StyleSheet } from 'react-native';
// import AntDesign from '@expo/vector-icons/AntDesign';

import '../global.css';

// function HeaderLeft() {
//   const router = useRouter();
//   return (
//     <View style={style.detailHeaderLeft}>
//       <AntDesign name="close" size={24} color="#8e8e93" onPress={() => router.dismiss()} />
//     </View>
//   );
// }

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        title: "",
        headerTitleAlign: "center", // 标题居中
        animation: "slide_from_right", // 安卓使用左右切屏
        // headerStyle: {
        //   backgroundColor: "#e6e6e6" // 设置导航栏背景色
        // },
        headerTintColor: "#1D2E38", // 导航中图标和文字颜色
        headerTitleStyle: {
          fontWeight: "bold" // 标题加粗
        },
        headerBackButtonDisplayMode: "minimal", // 只显示返回箭头
        headerShadowVisible: false // 去掉底部边框
      }}
    >
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen
        name="topic/[id]"
        options={{
          title: "详情页",
          // presentation: "modal",
          // headerLeft: () => <HeaderLeft />
        }}
      />

      <Stack.Screen
        name="notice"
        options={{
          title: "通知"
        }}
      />

      <Stack.Screen
        name="node"
        options={{
          title: "节点"
        }}
      />
    </Stack>
  );
}

const style = StyleSheet.create({
  detailHeaderLeft: {
    width: 30,
    marginLeft: 5
  }
});