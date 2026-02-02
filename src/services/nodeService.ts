import { getFetch } from '../utils/request';

export const nodeService = {
  // ===========v1===========

  // 获取节点列表
  getNodeList: (sortBy = 'topics', reverse = '1') => {
    let fields = ['id', 'name', 'title', 'url', 'topics', 'stars', 'aliases', 'parent_node_name', 'avatar_large', 'header'];
    return getFetch<[]>('/nodes/list.json', { fields: fields.join(','), sort_by: sortBy, reverse: reverse });
  },

  // 获取节点下的帖子列表
  getNodeTopics: (nodeName: string) => getFetch<[]>('/topics/show.json', { node_name: nodeName }),

  // ===========v2===========

};
