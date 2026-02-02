import { getFetch } from '../utils/request';

// 帖子类型
export interface Topic {
  id: number;
  title: string;
  content: string;
  content_rendered: string;
  created: number;
  last_modified: number;
  last_touched: number;
  last_reply_by: string;
  replies: number;
  url: string;
  member: {
    id: number;
    username: string;
    avatar_large: string;
    avatar_normal: string;
    avatar_mini: string;
    avatar_xlarge: string;
    avatar_xxlarge: string;
    avatar_xxxlarge: string;
    bio: string;
    created: number;
    url: string;
    website: string;
  };
  node: {
    id: number;
    name: string;
    title: string;
    title_alternative: string;
    url: string;
    topics: number;
    stars: number;
    avatar_large: string;
    avatar_normal: string;
    avatar_mini: string;
  };
}

// 回复类型
export interface Reply {
  id: number;
  content: string;
  content_rendered: string;
  created: number;
  member: {
    id: number;
    username: string;
    avatar_large: string;
    avatar_normal: string;
    avatar_mini: string;
    avatar_xlarge: string;
    avatar_xxlarge: string;
    avatar_xxxlarge: string;
    bio: string;
    created: number;
    url: string;
    website: string;
  };
}

export const topicService = {
  // ===========v1===========
  // 获取热门帖子
  getHotTopics: () => getFetch<Topic[]>('/topics/hot.json'),

  // 获取最新帖子
  getLatestTopics: () => getFetch<Topic[]>('/topics/latest.json'),

  // 获取帖子回复
  getReplies: (topicId: number) => getFetch<Reply[]>('/replies/show.json', { topic_id: topicId }),

  // ===========v2===========

};
