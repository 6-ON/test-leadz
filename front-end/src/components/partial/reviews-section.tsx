import { Heading } from '@chakra-ui/react'
import ReviewCard from '../ui/review-card'
import { Review } from '@/interfaces'
type Props = {
	reviews: Review[]
}
const ReviewsSection: React.FC<Props> = ({ reviews }) => {
	return (
		<div className="mt-12 max-md:text-center  px-2 mb-12">
			<Heading size="md" className="mb-6">
				Reviews
			</Heading>
			<div className="flex flex-wrap gap-4 justify-center">
				{reviews.map((review) => (
					<ReviewCard key={review['@id']} review={review} />
				))}
			</div>
		</div>
	)
}
export default ReviewsSection
