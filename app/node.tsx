import { useEffect, useState } from 'react';
import { Text, View, ScrollView, Image, Pressable, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import { nodeService } from '@/services/nodeService';

interface Node {
  id: number;
  name: string;
  title: string;
  avatar_large: string;
  topics: number;
}

export default function Node() {
  const router = useRouter();
  const [nodes, setNodes] = useState<Node[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    nodeService.getNodeList()
      .then((res) => {
        setNodes(res || []);
      })
      .catch((err) => {
        console.error('获取节点列表失败:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <View className="flex-1 bg-white">
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="small" color="#9ca3af" />
          <Text className="text-gray-400 mt-2">加载中...</Text>
        </View>
      ) : (
        <ScrollView className="flex-1 p-2">
          <View className="flex-row flex-wrap gap-2 justify-center">
            {nodes.map((node) => (
              <Pressable
                key={node.id}
                className="bg-white rounded-lg items-center gap-3 shadow-sm"
                style={{ width: '30%' }}
                onPress={() => router.push({ pathname: '/topic', params: { nodeName: node.name } })}
              >
                <Image src={node.avatar_large} className="w-12 h-12 rounded-lg" />
                <View className="flex-1">
                  <Text className="text-sm font-medium truncate">{node.title}</Text>
                  <Text className="text-xs text-gray-400 mt-0.5">{node.topics} 帖子</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}