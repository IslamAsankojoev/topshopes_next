import { getErrorMessage } from 'utils/getErrorMessage';
import { axiosClassic } from 'api/interceptor';
import { getPostsUrl } from 'config/api.config';
import { toast } from 'react-toastify';

export const PostsService = {
  getPosts: async () => {
    try {
      const response = await axiosClassic.get(getPostsUrl(''));
      return response.data;
    } catch (error) {
			toast.error(`posts: ${getErrorMessage(error)}`)
      throw error;
    }
  },
  getOnePost: async (id: string) => {
    try {
      const response = await axiosClassic.get(getPostsUrl(`${id}/`));
      return response.data;
    } catch (error) {
			toast.error(`posts: ${getErrorMessage(error)}`)
      throw error;
    }
  },
};
