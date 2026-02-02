import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Image, TextInput, Pressable, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { topicService, Topic, Reply } from '../../src/services/topicService';

function formatTime(timestamp: number): string {
  const seconds = Math.floor(Date.now() / 1000) - timestamp;
  if (seconds < 60) return `${seconds}秒前`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}分钟前`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}小时前`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}天前`;
  return new Date(timestamp * 1000).toLocaleDateString();
}

export default function Detail() {
  const { id, topic: topicJson } = useLocalSearchParams();
  const [commentText, setCommentText] = useState('');
  const [topic, setTopic] = useState<Topic | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [repliesLoading, setRepliesLoading] = useState(false);

  useEffect(() => {
    if (topicJson) {
      try {
        setTopic(JSON.parse(topicJson as string));
      } catch (e) {
        console.error('解析帖子数据失败:', e);
      }
    }
  }, [topicJson]);

  useEffect(() => {
    const topicId = Number(id);
    if (!topicId) return;

    setRepliesLoading(true);
    topicService.getReplies(topicId)
      .then((repliesRes) => {
        setReplies(repliesRes || []);
      })
      .catch((err) => {
        console.error('获取回复失败:', err);
      })
      .finally(() => {
        setRepliesLoading(false);
      });
  }, [id]);

  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100} className="flex-1">
      <ScrollView
        className="flex-1 p-2"
        keyboardShouldPersistTaps="handled"
      >
        {topic && (
          <View className="bg-white rounded-lg p-4">
            <View className="flex-row items-center gap-3">
              <Image src={topic.member.avatar_large} className="w-12 h-12 rounded-full" />
              <View className="flex-1">
                <Text className="text-sm font-medium">{topic.member.username}</Text>
                <Text className="text-xs text-gray-500">{formatTime(topic.created)} · {topic.node.title}</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Text className="text-gray-400 text-sm p-1 bg-gray-100 rounded-md text-xs">{topic.node.title}</Text>
              </View>
            </View>

            <View className="mt-3">
              <Text className="text-base font-semibold mb-2">{topic.title}</Text>
              <Text className="text-sm text-gray-700 leading-6">{topic.content}</Text>
            </View>
          </View>
        )}

        <View className="mt-4">
          <Text className="text-sm text-gray-500">回复 {replies?.length || 0}</Text>
          <View className="mt-2 bg-white rounded-lg p-2">
            {repliesLoading && replies.length === 0 ? (
              <View className="py-8 flex-col items-center gap-2">
                <ActivityIndicator size="small" color="#9ca3af" />
                <Text className="text-center text-gray-400">让我获取一下回复列表...</Text>
              </View>
            ) : replies.length === 0 ? (
              <View className="py-8">
                <Text className="text-center text-gray-400">暂无回复</Text>
              </View>
            ) : (
              replies.map((reply, index) => (
                <View key={reply.id} className="flex-row gap-3 py-3 border-b border-gray-100">
                  <Image src={reply.member.avatar_large} className="w-8 h-8 rounded-full" />
                  <View className="flex-1">
                    <View className="flex-row items-center justify-between">
                      <View className="flex flex-row gap-1">
                        <Text className="text-sm">
                          {reply.member.username}
                        </Text>
                        <Text className="text-gray-300 text-sm">
                          {index + 1}楼
                        </Text>
                      </View>
                      <Text className="text-xs text-gray-400">{formatTime(reply.created)}</Text>
                    </View>
                    <Text className="text-sm text-gray-700 mt-1">{reply.content}</Text>
                  </View>
                </View>
              ))
            )}
          </View>
        </View>
      </ScrollView>

      <View className="border-t border-gray-200 bg-white px-3 pt-2 pb-10 flex-row items-center gap-2">
        {topic && <Image src={topic.member.avatar_large} className="w-8 h-8 rounded-full" />}
        <TextInput
          value={commentText}
          onChangeText={setCommentText}
          placeholder="添加评论..."
          className="flex-1 bg-gray-100 rounded-lg px-4 h-10 leading-5 text-sm"
        />
        <Pressable onPress={() => { setCommentText(''); }} style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}>
          <Text className="text-sm text-white px-4 py-2 bg-blue-500 rounded-md">发送</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
