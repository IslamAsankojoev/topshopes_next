import { IReview } from 'shared/types/product.types';
import { getReviewUrl } from 'config/api.config'
import { toast } from 'react-toastify'
import { getErrorMessage } from 'utils/getErrorMessage'
import { instance } from 'api/interceptor'

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
