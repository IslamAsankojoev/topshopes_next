import { IReview } from 'src/shared/types/product.types';
import { getReviewUrl } from 'src/config/api.config'
import { instance } from 'src/api/interceptor'

export const ReviewService = {
    create: async (slug: string, values: IReview) => {
        try {
            instance.post(getReviewUrl(slug), values)
        }catch (e: any) {
            // console.dir(e)
            // toast.error(`review: ${getErrorMessage(e)}`)
        }
    }
}
