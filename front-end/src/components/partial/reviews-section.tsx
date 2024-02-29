import { Heading, SimpleGrid } from '@chakra-ui/react'
import ReviewCard from '../ui/review-card'

const ReviewsSection = () => {
	return (
		<div className="mt-12 max-md:text-center  px-2">
			<Heading size="md" className="mb-6">
				Reviews
			</Heading>
			<SimpleGrid minChildWidth={'xs'} spacing={5}>
				{Array.from({ length: 10 }).map((_, i) => (
					<ReviewCard key={i} />
				))}
			</SimpleGrid>
		</div>
	)
}
export default ReviewsSection
