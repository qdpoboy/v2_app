import { getFetch } from '../utils/request';

export const nodeService = {
  // ===========v1===========
  // 获取节点下的帖子列表
  getNodeTopics: (nodeName: string) => getFetch<[]>('/topics/show.json', { node_name: nodeName }),

  // ===========v2===========

};
