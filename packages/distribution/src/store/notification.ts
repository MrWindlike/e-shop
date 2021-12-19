import {
  ActionTree,
} from 'vuex';
import * as notificationService from '@/services/notification';

const actions: ActionTree<null, null> = {
  async fetchNotifications(store, params) {
    const { data } = await notificationService.fetchNotifications(params);

    const list = data.list.map((notification) => ({
      id: notification.id,
      content: notification.content,
      createdTime: notification.created_at,
    }));

    return {
      list,
      total: data.total,
    };
  },
};

export default {
  namespaced: true,
  actions,
};
