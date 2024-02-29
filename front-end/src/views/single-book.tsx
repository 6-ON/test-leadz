import { Heading } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import ReviewsSection from '@/components/partial/reviews-section'
import BookOverview from '@/components/partial/book-overview'

const SingleBookPage = () => {
	const { id } = useParams<{ id: string }>()
	return (
		<div>
			<Heading textAlign="center" m="12">
				Book Overview
			</Heading>
			<BookOverview />
			<ReviewsSection />
		</div>
	)
}

export default SingleBookPage
