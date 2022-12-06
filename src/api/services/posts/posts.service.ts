import { axiosClassic } from 'api/interceptor';
import { getPostsUrl } from 'config/api.config';

export const PostsService = {
  getPosts: async () => {
    try {
      const response = await axiosClassic.get(getPostsUrl(''));
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getOnePost: async (id: string) => {
    try {
      const response = await axiosClassic.get(getPostsUrl(`/${id}`));
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
