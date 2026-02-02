import { Link, Tabs } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

function HeaderLeft() {
  return (
    <Link href="/notice" asChild>
      <MaterialIcons name="notifications-active" size={24} color="#8e8e93" style={{ paddingLeft: 16 }} />
    </Link>
  );
}

function HeaderRight() {
  return (
    <Link href="/node" asChild>
      <AntDesign name="more" size={24} color="#8e8e93" style={{ paddingRight: 16 }} />
    </Link>
  );
}

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        title: "",
        headerTitleAlign: "center", // 标题居中
        headerLeft: () => <HeaderLeft />,
        headerRight: () => <HeaderRight />,
        headerShadowVisible: false, // 去掉底部边框
        tabBarActiveTintColor: "#1f99b0",
        // 安卓点击有水波纹效果，去掉
        tabBarButton: (props) => (
          <TouchableOpacity
            {...props as any}
            activeOpacity={1}
            style={[
              props.style,
              {
                backgroundColor: "transparent"
              }
            ]}
          />
        )
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "主页",
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={24} color={color} />
        }}
      />
      <Tabs.Screen
        name="my"
        options={{
          title: "我的",
          tabBarIcon: ({ color }) => <FontAwesome name="user" size={24} color={color} />
        }}
      />
    </Tabs >
  );
}