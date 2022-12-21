import { CRUDservice } from 'api/crud.service';
import { getPostsUrl } from 'config/api.config';

export const PostsService = CRUDservice(getPostsUrl, 'posts')
