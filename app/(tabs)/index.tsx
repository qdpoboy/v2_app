import { useEffect, useState } from "react";
import { Text, View, ScrollView, Image, Pressable, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import { topicService, Topic } from '@/services/topicService';

function formatTime(timestamp: number): string {
  const seconds = Math.floor(Date.now() / 1000) - timestamp;
  if (seconds < 60) return `${seconds}秒前`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}分钟前`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}小时前`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}天前`;
  return new Date(timestamp * 1000).toLocaleDateString();
}

export default function App() {
  const router = useRouter();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    return topicService.getHotTopics();
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const res = await fetchData();
      setTopics(res);
    } catch (err) {
      console.error('获取热门帖子失败:', err);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <ScrollView
      className="flex-1 bg-gray-200 will-change-variable"
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <View className="flex gap-2 p-2">
        {topics.map((topic) => (
          <Pressable
            key={topic.id}
            onPress={() => router.push({
              pathname: `/topic/${topic.id}`,
              params: { topic: JSON.stringify(topic) }
            })}
            style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
          >
            <View className="flex gap-2 bg-white rounded-lg px-4 py-4">
              <View className="flex flex-row items-center gap-2">
                <Image src={topic.member.avatar_large} className="w-10 h-10 rounded-full" />
                <View className="flex-1">
                  <View>
                    <Text className="text-sm">{topic.member.username}</Text>
                  </View>
                  <View className="flex flex-row">
                    <Text className="text-xs text-gray-500">
                      <Text>{formatTime(topic.created)}</Text>
                      <Text> · </Text>
                      <Text>最后的回复来自 {topic.last_reply_by || '未知'}</Text>
                    </Text>
                  </View>
                </View>
                <View className="flex flex-row gap-2 self-start items-center">
                  <Text className="text-gray-400 text-sm p-1 bg-gray-100 rounded-md text-xs">{topic.node.title}</Text>
                  <AntDesign name="message" size={12} color="#9ca3af" />
                  <Text className="text-gray-400 text-sm">{topic.replies}</Text>
                </View>
              </View>
              <View>
                <Text>{topic.title}</Text>
              </View>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}