import { CRUDservice } from 'src/api/crud.service';
import { getPostsUrl } from 'src/config/api.config';

export const PostsService = CRUDservice(getPostsUrl, 'posts')
